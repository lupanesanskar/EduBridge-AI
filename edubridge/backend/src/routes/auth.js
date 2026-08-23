import { Router } from "express";
import { nanoid } from "nanoid";
import { readDb, writeDb } from "../store.js";

const router = Router();

function initialsFromName(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "T";
}

// POST /api/auth/signup
// role: "student" (default, unchanged) | "teacher"
router.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "name, email and password are required" });
  }
  const db = readDb();
  if (db.users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: "An account with this email already exists." });
  }

  if (role === "teacher") {
    const { subject, standard } = req.body;
    if (!subject || !standard) {
      return res.status(400).json({ error: "subject and standard are required for teacher accounts" });
    }
    const initials = initialsFromName(name);
    const user = {
      id: `u_${nanoid(8)}`,
      role: "teacher",
      name,
      email,
      password, // NOTE: plaintext for hackathon prototype only — hash in production
      subject,
      standard,
      initials,
    };
    db.users.push(user);

    const teacherRecord = {
      id: `t_${nanoid(8)}`,
      userId: user.id,
      name,
      subject,
      standard,
      initials,
      students: 0,
    };
    db.teachers.push(teacherRecord);

    writeDb(db);
    const { password: _pw, ...safeUser } = user;
    return res.status(201).json({ user: { ...safeUser, teacherId: teacherRecord.id } });
  }

  // --- existing student signup path, unchanged ---
  const { standard, stream } = req.body;
  const user = {
    id: `u_${nanoid(8)}`,
    role: "student",
    name,
    email,
    password, // NOTE: plaintext for hackathon prototype only — hash in production
    standard: standard || "",
    stream: stream || "",
  };
  db.users.push(user);
  writeDb(db);
  const { password: _pw, ...safeUser } = user;
  res.status(201).json({ user: safeUser });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password, role } = req.body;
  const db = readDb();
  const user = db.users.find(
    (u) => u.email.toLowerCase() === (email || "").toLowerCase() && u.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password." });
  }
  if (role && user.role !== role) {
    return res.status(401).json({ error: `This account is registered as a ${user.role}, not a ${role}.` });
  }
  const { password: _pw, ...safeUser } = user;
  const teacherRecord = db.teachers.find((t) => t.userId === user.id);
  res.json({ user: { ...safeUser, teacherId: teacherRecord?.id || null } });
});

export default router;
