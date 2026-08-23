import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, "data", "db.json");

function seedData() {
  return {
    users: [
      {
        id: "u_teacher_1",
        role: "teacher",
        name: "Sara Iyer",
        email: "sara.iyer@edubridge.test",
        password: "password123",
        subject: "Computer Science",
        standard: "Class 11 - 12",
        initials: "SI",
      },
    ],
    teachers: [
      {
        id: "t1",
        userId: "u_teacher_1",
        name: "Sara Iyer",
        subject: "Computer Science",
        standard: "Class 11 - 12",
        initials: "SI",
        students: 355,
      },
      {
        id: "t2",
        userId: null,
        name: "Priyanka Rao",
        subject: "Physics",
        standard: "Class 11",
        initials: "PR",
        students: 480,
      },
      {
        id: "t3",
        userId: null,
        name: "Karan Mehta",
        subject: "Mathematics",
        standard: "Class 9 - 10",
        initials: "KM",
        students: 610,
      },
    ],
    tests: [
      {
        id: "d1",
        teacherId: "t2",
        title: "Laws of Motion — Unit Test",
        code: "PHY201",
        subject: "Physics",
        standard: "Class 11",
        chapters: ["Newton's Laws"],
        status: "live",
        startAt: new Date().toISOString(),
        endAt: new Date(Date.now() + 7 * 86400000).toISOString(),
        questions: [
          {
            id: 1,
            prompt: "What does Newton's First Law describe?",
            options: [
              "The relationship between force and acceleration",
              "An object's tendency to resist changes in motion (inertia)",
              "Every action has an equal and opposite reaction",
              "The rate of change of momentum",
            ],
            correct: 1,
            explanation:
              "The First Law is the law of inertia — an object stays at rest or in uniform motion unless acted on by a net external force.",
          },
        ],
        attempts: [],
      },
      {
        id: "d2",
        teacherId: "t3",
        title: "Quadratic Equations",
        code: "MAT045",
        subject: "Mathematics",
        standard: "Class 9 - 10",
        chapters: ["Quadratic Equations"],
        status: "live",
        startAt: new Date().toISOString(),
        endAt: new Date(Date.now() + 7 * 86400000).toISOString(),
        questions: [
          {
            id: 1,
            prompt: "The quadratic formula solves equations of which form?",
            options: ["ax + b = 0", "ax^2 + bx + c = 0", "ax^3 + b = 0", "a/x + b = 0"],
            correct: 1,
            explanation:
              "The quadratic formula x = (-b ± sqrt(b^2 - 4ac)) / 2a solves any equation of the form ax^2 + bx + c = 0.",
          },
        ],
        attempts: [],
      },
      {
        id: "d3",
        teacherId: "t1",
        title: "Linked Lists Deep Dive",
        code: "CSC112",
        subject: "Computer Science",
        standard: "Class 11 - 12",
        chapters: ["Linked Lists"],
        status: "live",
        startAt: new Date().toISOString(),
        endAt: new Date(Date.now() + 7 * 86400000).toISOString(),
        questions: [
          {
            id: 1,
            prompt: "What does each node in a singly linked list store?",
            options: [
              "Only its value",
              "Its value and a pointer to the next node",
              "Its value and pointers to both neighbors",
              "Only a pointer to the next node",
            ],
            correct: 1,
            explanation:
              "A node holds data and knows where the next one lives. Pointers to both neighbors would describe a doubly linked list instead.",
          },
          {
            id: 2,
            prompt: "What is the time complexity of inserting a node at the head of a linked list?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
            correct: 0,
            explanation:
              "Inserting at the head just means creating a node and pointing it at the current head — constant time, no traversal.",
          },
        ],
        attempts: [],
      },
    ],
    doubts: [
      {
        id: "dbt_1",
        studentId: null,
        studentName: "Rohan P.",
        subject: "Computer Science",
        chapter: "Linked Lists",
        questionText: "Why is inserting at the head of a linked list O(1) but inserting at the head of an array is O(n)?",
        createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
        answers: [
          {
            id: "ans_1",
            teacherId: "t1",
            teacherName: "Sara Iyer",
            teacherInitials: "SI",
            text: "An array's elements sit in contiguous memory, so adding at the front means shifting every other element one slot over — that's O(n). A linked list node just needs a new node created and pointed at the old head, no shifting required — O(1).",
            createdAt: new Date(Date.now() - 3 * 3600000 + 600000).toISOString(),
            likes: 4,
            likedBy: [],
          },
        ],
      },
      {
        id: "dbt_2",
        studentId: null,
        studentName: "Meera S.",
        subject: "Physics",
        chapter: "Laws of Motion",
        questionText: "If every action has an equal and opposite reaction, why do things move at all?",
        createdAt: new Date(Date.now() - 20 * 3600000).toISOString(),
        answers: [
          {
            id: "ans_2",
            teacherId: "t2",
            teacherName: "Priyanka Rao",
            teacherInitials: "PR",
            text: "The two forces in an action-reaction pair act on two different objects, not the same one. When you push the ground, the ground pushes you back — but since those forces act on different bodies, they don't cancel out for either object individually, so motion still happens.",
            createdAt: new Date(Date.now() - 20 * 3600000 + 900000).toISOString(),
            likes: 7,
            likedBy: [],
          },
          {
            id: "ans_3",
            teacherId: "t1",
            teacherName: "Sara Iyer",
            teacherInitials: "SI",
            text: "Think of it as forces never cancel across two different bodies — only forces on the SAME body can cancel. That's the piece most people miss.",
            createdAt: new Date(Date.now() - 20 * 3600000 + 1500000).toISOString(),
            likes: 2,
            likedBy: [],
          },
        ],
      },
      {
        id: "dbt_3",
        studentId: null,
        studentName: "Aditya K.",
        subject: "Mathematics",
        chapter: "Quadratic Equations",
        questionText: "How do I know if a quadratic has real roots without solving it fully?",
        createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
        answers: [],
      },
      {
        id: "dbt_4",
        studentId: null,
        studentName: "Zara F.",
        subject: "Chemistry",
        chapter: "Chemical Bonding",
        questionText: "What's the actual difference between an ionic bond and a covalent bond?",
        createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
        answers: [],
      },
    ],
  };
}

function ensureDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(seedData(), null, 2));
  }
}

export function readDb() {
  ensureDb();
  const raw = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(raw);
}

export function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export function resetDb() {
  fs.writeFileSync(DB_FILE, JSON.stringify(seedData(), null, 2));
  return readDb();
}
