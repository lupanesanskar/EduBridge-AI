import { Router } from "express";
import { nanoid } from "nanoid";
import { readDb, writeDb } from "../store.js";
import { computeTeacherRatings } from "../services/ratings.js";

const router = Router();

// GET /api/doubts?subject=&status=open|answered
// Public doubt board — students post here, any teacher can answer.
router.get("/", (req, res) => {
  const { subject, status } = req.query;
  const db = readDb();
  let doubts = [...db.doubts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (subject) {
    doubts = doubts.filter((d) => d.subject === subject);
  }
  if (status === "open") {
    doubts = doubts.filter((d) => d.answers.length === 0);
  } else if (status === "answered") {
    doubts = doubts.filter((d) => d.answers.length > 0);
  }

  res.json({ doubts });
});

// GET /api/doubts/leaderboard  -> teachers ranked by total likes earned on answers
router.get("/leaderboard", (req, res) => {
  const db = readDb();
  const stats = computeTeacherRatings(db);
  const leaderboard = db.teachers
    .map((t) => ({ ...t, rating: stats[t.id]?.rating || 0, rank: stats[t.id]?.rank || null }))
    .sort((a, b) => a.rank - b.rank);
  res.json({ leaderboard });
});

// POST /api/doubts  { studentId, studentName, subject, chapter?, questionText }
router.post("/", (req, res) => {
  const { studentId, studentName, subject, chapter, questionText } = req.body;
  if (!studentName || !subject || !questionText || !questionText.trim()) {
    return res.status(400).json({ error: "studentName, subject and questionText are required" });
  }
  const db = readDb();
  const doubt = {
    id: `dbt_${nanoid(8)}`,
    studentId: studentId || null,
    studentName,
    subject,
    chapter: chapter || "",
    questionText: questionText.trim(),
    createdAt: new Date().toISOString(),
    answers: [],
  };
  db.doubts.unshift(doubt);
  writeDb(db);
  res.status(201).json({ doubt });
});

// POST /api/doubts/:id/answers  { teacherId, teacherName, teacherInitials, text }
router.post("/:id/answers", (req, res) => {
  const { teacherId, teacherName, teacherInitials, text } = req.body;
  if (!teacherId || !teacherName || !text || !text.trim()) {
    return res.status(400).json({ error: "teacherId, teacherName and text are required" });
  }
  const db = readDb();
  const doubt = db.doubts.find((d) => d.id === req.params.id);
  if (!doubt) return res.status(404).json({ error: "Doubt not found" });

  const answer = {
    id: `ans_${nanoid(8)}`,
    teacherId,
    teacherName,
    teacherInitials: teacherInitials || teacherName.slice(0, 2).toUpperCase(),
    text: text.trim(),
    createdAt: new Date().toISOString(),
    likes: 0,
    likedBy: [],
  };
  doubt.answers.push(answer);
  writeDb(db);
  res.status(201).json({ doubt });
});

// POST /api/doubts/:id/answers/:answerId/like  { studentId }
// Toggles the like for that student (like / un-like). studentId can be any
// stable identifier — falls back to "anon" for logged-out browsing.
router.post("/:id/answers/:answerId/like", (req, res) => {
  const { studentId } = req.body;
  const likerId = studentId || "anon";
  const db = readDb();
  const doubt = db.doubts.find((d) => d.id === req.params.id);
  if (!doubt) return res.status(404).json({ error: "Doubt not found" });
  const answer = doubt.answers.find((a) => a.id === req.params.answerId);
  if (!answer) return res.status(404).json({ error: "Answer not found" });

  answer.likedBy = answer.likedBy || [];
  const alreadyLiked = answer.likedBy.includes(likerId);
  if (alreadyLiked) {
    answer.likedBy = answer.likedBy.filter((id) => id !== likerId);
    answer.likes = Math.max(0, answer.likes - 1);
  } else {
    answer.likedBy.push(likerId);
    answer.likes += 1;
  }
  writeDb(db);
  res.json({ doubt, liked: !alreadyLiked });
});

export default router;
