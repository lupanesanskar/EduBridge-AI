// AI service used by both the Doubt Chat and the Test Generator.
//
// If ANTHROPIC_API_KEY is set in the environment, it calls the real
// Anthropic API. Otherwise it falls back to a small offline "grounded"
// knowledge base + template question generator, so the whole prototype
// keeps working with zero configuration and zero internet dependency
// (important for a hackathon demo / offline judging round).

const API_KEY = process.env.ANTHROPIC_API_KEY;

// ---- Tiny offline knowledge base used for the doubt-chat fallback -------
const KNOWLEDGE_BASE = [
  {
    keywords: ["linked list", "node", "pointer"],
    topic: "Linked Lists",
    answer:
      "A linked list is a chain of nodes, where each node stores a value and a pointer to the next node. Unlike arrays, nodes aren't stored contiguously in memory, so insertion/deletion is cheap (just relink pointers) but random access is slow (you must walk from the head).",
    sources: ["NCERT Computer Science, Ch. 4", "Open DSA Textbook, Sec 2.1"],
  },
  {
    keywords: ["newton", "law of motion", "inertia", "force"],
    topic: "Laws of Motion",
    answer:
      "Newton's First Law (inertia) says an object keeps its state of motion unless acted on by a net external force. The Second Law relates force, mass and acceleration as F = ma. The Third Law says every action has an equal and opposite reaction.",
    sources: ["NCERT Physics Part 1, Ch. 5"],
  },
  {
    keywords: ["quadratic", "equation", "discriminant"],
    topic: "Quadratic Equations",
    answer:
      "A quadratic equation has the form ax^2 + bx + c = 0. Its roots are found with x = (-b ± sqrt(b^2 - 4ac)) / 2a. The discriminant (b^2 - 4ac) tells you whether the roots are real and distinct, real and equal, or complex.",
    sources: ["NCERT Mathematics, Ch. 4"],
  },
  {
    keywords: ["photosynthesis", "chlorophyll"],
    topic: "Photosynthesis",
    answer:
      "Photosynthesis converts light energy into chemical energy stored in glucose, using chlorophyll in chloroplasts. The overall reaction is 6CO2 + 6H2O + light -> C6H12O6 + 6O2.",
    sources: ["NCERT Biology, Ch. 13"],
  },
];

function offlineAnswerDoubt(message) {
  const lower = message.toLowerCase();
  const match = KNOWLEDGE_BASE.find((entry) =>
    entry.keywords.some((k) => lower.includes(k))
  );
  if (match) {
    return { text: match.answer, sources: match.sources, topic: match.topic };
  }
  return {
    text:
      "I don't have a grounded textbook passage for that exact question yet in this offline demo, but here's a general approach: break the concept into its definition, a worked example, and the common mistake students make. Try asking about linked lists, Newton's laws, quadratic equations, or photosynthesis to see grounded, cited answers.",
    sources: [],
    topic: "General",
  };
}

function offlineGenerateQuestions(subject, chapters, count) {
  const bankBySubject = {
    "Computer Science": [
      {
        prompt: "What does each node in a singly linked list store?",
        options: [
          "Only its value",
          "Its value and a pointer to the next node",
          "Its value and pointers to both neighbors",
          "Only a pointer to the next node",
        ],
        correct: 1,
        explanation:
          "A node holds data and knows where the next one lives — that's what distinguishes it from a doubly linked list node.",
      },
      {
        prompt: "What is the time complexity of inserting a node at the head of a linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correct: 0,
        explanation: "No traversal is needed — just create the node and point it at the current head.",
      },
      {
        prompt: "Which data structure uses LIFO ordering?",
        options: ["Queue", "Stack", "Linked list", "Array"],
        correct: 1,
        explanation: "A stack is Last-In-First-Out; the most recently pushed element is popped first.",
      },
    ],
    Physics: [
      {
        prompt: "Newton's Second Law is expressed as:",
        options: ["F = ma", "E = mc^2", "V = IR", "P = mv"],
        correct: 0,
        explanation: "Force equals mass times acceleration — the core relation of the Second Law.",
      },
      {
        prompt: "What is the SI unit of force?",
        options: ["Joule", "Watt", "Newton", "Pascal"],
        correct: 2,
        explanation: "Force is measured in Newtons (N), named after Isaac Newton.",
      },
    ],
    Mathematics: [
      {
        prompt: "The quadratic formula solves equations of the form:",
        options: ["ax + b = 0", "ax^2 + bx + c = 0", "ax^3 + b = 0", "a/x + b = 0"],
        correct: 1,
        explanation: "The quadratic formula applies specifically to ax^2 + bx + c = 0.",
      },
      {
        prompt: "If the discriminant is negative, the roots of a quadratic are:",
        options: ["Real and equal", "Real and distinct", "Complex (non-real)", "Undefined"],
        correct: 2,
        explanation: "A negative discriminant means the square root is of a negative number — complex roots.",
      },
    ],
  };

  const pool = bankBySubject[subject] || bankBySubject["Computer Science"];
  const questions = [];
  for (let i = 0; i < count; i++) {
    const base = pool[i % pool.length];
    questions.push({
      id: i + 1,
      prompt: chapters?.length ? `[${chapters[i % chapters.length]}] ${base.prompt}` : base.prompt,
      options: base.options,
      correct: base.correct,
      explanation: base.explanation,
    });
  }
  return questions;
}

async function callAnthropic(prompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  const text = (data.content || []).map((b) => b.text || "").join("\n");
  return text;
}

export async function answerDoubt(message) {
  if (!API_KEY) return offlineAnswerDoubt(message);
  try {
    const text = await callAnthropic(
      `A student asked this doubt: "${message}". Give a short, clear, grounded explanation (3-5 sentences) suitable for a high-school/college student. Do not use markdown.`
    );
    return { text, sources: ["Claude (live)"], topic: "AI" };
  } catch (err) {
    console.error("Anthropic call failed, falling back to offline KB:", err.message);
    return offlineAnswerDoubt(message);
  }
}

export async function generateQuestions(subject, chapters, count) {
  if (!API_KEY) return offlineGenerateQuestions(subject, chapters, count);
  try {
    const prompt = `Generate ${count} multiple choice questions for subject "${subject}", chapters: ${chapters.join(
      ", "
    )}. Respond ONLY as a JSON array, no preamble, each item: {"prompt": string, "options": [4 strings], "correct": index of correct option (0-3), "explanation": string}.`;
    const text = await callAnthropic(prompt);
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return parsed.map((q, i) => ({ id: i + 1, ...q }));
  } catch (err) {
    console.error("Anthropic generation failed, falling back to offline bank:", err.message);
    return offlineGenerateQuestions(subject, chapters, count);
  }
}
