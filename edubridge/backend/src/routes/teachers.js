import { Router } from "express";
import { readDb } from "../store.js";
import { computeTeacherRatings } from "../services/ratings.js";

const router = Router();

// GET /api/teachers?query=...
// Returns teachers along with only their LIVE tests (what students should see in TeachHub),
// plus their doubt-answer rating and leaderboard rank.
router.get("/", (req, res) => {
  const q = (req.query.query || "").toLowerCase().trim();
  const db = readDb();
  const stats = computeTeacherRatings(db);

  const teachers = db.teachers
    .filter((t) => !q || t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q))
    .map((t) => {
      const tests = db.tests
        .filter((test) => test.teacherId === t.id)
        .map((test) => ({
          id: test.id,
          code: test.code,
          title: test.title,
          questions: test.questions.length,
          duration: Math.max(5, test.questions.length * 2),
          status: test.status,
        }));
      return { ...t, tests, rating: stats[t.id]?.rating || 0, rank: stats[t.id]?.rank || null };
    });

  res.json({ teachers });
});

export default router;
