import { Router } from "express";
import { nanoid } from "nanoid";
import { readDb, writeDb } from "../store.js";
import { generateQuestions } from "../services/aiService.js";

const router = Router();

function subjectPrefix(subject) {
  return (subject || "GEN").replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase();
}

function publicTest(test) {
  // hide answers/explanations from the student before they submit
  return {
    ...test,
    questions: test.questions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options })),
  };
}

// GET /api/tests?teacherId=t1   -> teacher dashboard list
router.get("/", (req, res) => {
  const { teacherId } = req.query;
  const db = readDb();
  const tests = teacherId ? db.tests.filter((t) => t.teacherId === teacherId) : db.tests;
  res.json({ tests });
});

// GET /api/tests/:id  -> full detail incl. attempts (teacher view)
router.get("/:id", (req, res) => {
  const db = readDb();
  const test = db.tests.find((t) => t.id === req.params.id);
  if (!test) return res.status(404).json({ error: "Test not found" });
  res.json({ test });
});

// POST /api/tests/join  { code, name }
router.post("/join", (req, res) => {
  const { code, name } = req.body;
  if (!code || !name) return res.status(400).json({ error: "code and name are required" });
  const db = readDb();
  const test = db.tests.find((t) => t.code.toUpperCase() === code.trim().toUpperCase());
  if (!test) return res.status(404).json({ error: "No test found for that code." });
  if (test.status !== "live") return res.status(400).json({ error: "This test isn't live right now." });
  const teacher = db.teachers.find((t) => t.id === test.teacherId);
  res.json({ teacher, test: publicTest(test) });
});

// POST /api/tests/:id/attempts  { name, answers: { [questionId]: optionIndex } }
router.post("/:id/attempts", (req, res) => {
  const { name, answers } = req.body;
  if (!name || !answers) return res.status(400).json({ error: "name and answers are required" });
  const db = readDb();
  const test = db.tests.find((t) => t.id === req.params.id);
  if (!test) return res.status(404).json({ error: "Test not found" });

  let score = 0;
  const review = test.questions.map((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correct;
    if (isCorrect) score += 1;
    return { id: q.id, prompt: q.prompt, options: q.options, correct: q.correct, explanation: q.explanation, userAnswer, isCorrect };
  });

  const attempt = {
    name,
    score,
    total: test.questions.length,
    submittedAt: new Date().toISOString(),
  };
  test.attempts.push(attempt);
  writeDb(db);

  res.json({ score, total: test.questions.length, review });
});

// POST /api/tests/generate  { subject, chapters, numQuestions }
router.post("/generate", async (req, res) => {
  const { subject, chapters, numQuestions } = req.body;
  if (!subject || !chapters?.length || !numQuestions) {
    return res.status(400).json({ error: "subject, chapters and numQuestions are required" });
  }
  const clampedCount = Math.max(1, Math.min(100, Number(numQuestions) || 1));
  const questions = await generateQuestions(subject, chapters, clampedCount);
  const title = chapters.length === 1 ? `${chapters[0]} — Test` : `${subject} — Mixed Chapter Test`;
  res.json({ draft: { title, subject, chapters, questions } });
});

// POST /api/tests  (publish)  { teacherId, title, subject, standard, chapters, questions, startAt, endAt, code? }
router.post("/", (req, res) => {
  const { teacherId, title, subject, standard, chapters, questions, startAt, endAt, code: requestedCode } = req.body;
  if (!teacherId || !title || !questions?.length) {
    return res.status(400).json({ error: "teacherId, title and questions are required" });
  }
  const db = readDb();
  if (requestedCode && db.tests.some((t) => t.code.toUpperCase() === requestedCode.toUpperCase())) {
    return res.status(409).json({ error: `Test code "${requestedCode}" is already in use.` });
  }
  const code = requestedCode?.trim().toUpperCase() || `${subjectPrefix(subject)}${Math.floor(100 + Math.random() * 900)}`;
  const test = {
    id: `test_${nanoid(8)}`,
    teacherId,
    title,
    code,
    subject,
    standard,
    chapters,
    status: startAt && new Date(startAt) > new Date() ? "scheduled" : "live",
    startAt: startAt || new Date().toISOString(),
    endAt: endAt || new Date(Date.now() + 7 * 86400000).toISOString(),
    questions: questions.slice(0, 100),
    attempts: [],
  };
  db.tests.unshift(test);
  writeDb(db);
  res.status(201).json({ test });
});

// PATCH /api/tests/:id/conclude
router.patch("/:id/conclude", (req, res) => {
  const db = readDb();
  const test = db.tests.find((t) => t.id === req.params.id);
  if (!test) return res.status(404).json({ error: "Test not found" });
  test.status = "concluded";
  writeDb(db);
  res.json({ test });
});

// DELETE /api/tests/:id  (unpublish a scheduled test)
router.delete("/:id", (req, res) => {
  const db = readDb();
  const before = db.tests.length;
  db.tests = db.tests.filter((t) => t.id !== req.params.id);
  if (db.tests.length === before) return res.status(404).json({ error: "Test not found" });
  writeDb(db);
  res.json({ ok: true });
});

export default router;
