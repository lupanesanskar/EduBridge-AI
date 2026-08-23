import { Router } from "express";
import { answerDoubt } from "../services/aiService.js";

const router = Router();

// POST /api/chat  { message: string }
router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ error: "message is required" });
  }
  const result = await answerDoubt(message.trim());
  res.json(result);
});

export default router;
