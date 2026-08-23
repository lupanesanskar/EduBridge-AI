import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import teacherRoutes from "./routes/teachers.js";
import testRoutes from "./routes/tests.js";
import chatRoutes from "./routes/chat.js";
import doubtRoutes from "./routes/doubts.js";
import { resetDb } from "./store.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", usingLiveAI: Boolean(process.env.ANTHROPIC_API_KEY) });
});

app.use("/api/auth", authRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/doubts", doubtRoutes);

// Handy for demos: reset the JSON "database" back to seed data
app.post("/api/reset", (req, res) => {
  const db = resetDb();
  res.json({ ok: true, db });
});

app.listen(PORT, () => {
  console.log(`EduBridge backend running on http://localhost:${PORT}`);
  console.log(
    process.env.ANTHROPIC_API_KEY
      ? "AI mode: LIVE (Anthropic API key detected)"
      : "AI mode: OFFLINE fallback (no ANTHROPIC_API_KEY set)"
  );
});
