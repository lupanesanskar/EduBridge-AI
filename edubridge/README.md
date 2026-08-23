# EduBridge AI — Hackathon Prototype

An AI-assisted learning platform with two roles:

- **Students** — ask doubts in a chat interface and get grounded, cited answers; practice with auto-generated MCQs; join a teacher's live test with just a name + code (no account needed).
- **Teachers** — generate an MCQ test for any subject/chapter in seconds, publish it with a shareable code and a live window, and watch a real-time leaderboard of student attempts.

This repo contains **both** the frontend and the backend, wired together, so the whole thing runs as a real working app — not just a UI mock.

edubridge/
├── backend/ Node.js + Express API (JSON-file database, zero setup)
└── frontend/ React + Vite + Tailwind UI


---

## 1. Architecture (for your submission write-up / video)

┌─────────────────┐ REST/JSON ┌──────────────────┐
│ React (Vite) │ ─────────────────────▶ │ Express API │
│ frontend/src │ ◀───────────────────── │ backend/src │
└─────────────────┘ └──────────┬───────┘
│
┌───────────▼───────────┐
│ aiService.js │
│ - Offline fallback │
│ (works with NO key) │
│ - Optional: real │
│ Anthropic API call │
└───────────┬───────────┘
│
┌───────────▼───────────┐
│ JSON file "database" │
│ backend/src/data/ │
└────────────────────────┘


**Why a JSON-file database?** For a hackathon offline round you need something that a judge can run in 30 seconds with zero installs (no Postgres/Mongo to set up, no native binary compilation). It behaves like a real DB (reads/writes persist across restarts) and can be swapped for Postgres/Mongo later with only `backend/src/store.js` changing.

**Why does AI work without an API key?** `backend/src/services/aiService.js` has an offline "grounded knowledge base" + template question generator that runs with zero configuration, so your demo never breaks because of a missing key, an expired quota, or no internet during judging. If you add `ANTHROPIC_API_KEY` to `backend/.env`, the same functions transparently call the real Claude API instead — useful if you want to show "real AI" in your video.

### Key API endpoints

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/auth/signup` | Student registration |
| POST | `/api/auth/login` | Student or teacher login |
| POST | `/api/chat` | Doubt chat → grounded answer + sources |
| GET | `/api/teachers?query=` | TeachHub: search teachers (now includes rating/rank) |
| POST | `/api/tests/join` | Join a live test by code (no login) |
| POST | `/api/tests/:id/attempts` | Submit answers → graded instantly |
| POST | `/api/tests/generate` | AI-generate MCQs for a subject/chapters (max 100) |
| POST | `/api/tests` | Publish a generated test (assigns a code) |
| GET | `/api/tests?teacherId=` | Teacher dashboard: list own tests |
| PATCH | `/api/tests/:id/conclude` | Close a live test |
| DELETE | `/api/tests/:id` | Unpublish a scheduled test |
| GET | `/api/doubts?subject=&status=` | Public doubt board — list doubts (open/answered/all) |
| POST | `/api/doubts` | Student posts a public doubt |
| POST | `/api/doubts/:id/answers` | Teacher posts an answer to a doubt |
| POST | `/api/doubts/:id/answers/:answerId/like` | Student likes/unlikes an answer (drives teacher rating) |
| GET | `/api/doubts/leaderboard` | Teachers ranked by total likes on their answers |

### New feature: Solve Doubt (public Q&A between students and teachers)

- **Student side** → "Ask Teachers" (from the floating nav on Doubt Chat, separate from the AI chat): post a doubt with a subject/chapter, see every teacher's answer as it comes in, and like the ones that actually help.
- **Teacher side** → sidebar → **Solve Doubt**: browse Open / Answered / All public doubts and reply. Multiple teachers can answer the same doubt.
- Each like a teacher earns becomes their **rating**, shown on their TeachHub profile and search card, plus a **rank** (#1, #2, ...) computed live from `GET /api/doubts/leaderboard`.
- This is entirely separate from the existing AI Doubt Chat — that one still talks to `aiService.js` only.

---

## 2. Run it locally

You need **Node.js 18+** installed. Two terminals — one for the backend, one for the frontend.

### Terminal 1 — backend

cd backend
npm install
npm start


You should see:

EduBridge backend running on http://localhost:4000
AI mode: OFFLINE fallback (no ANTHROPIC_API_KEY set)


Optional — to use a real LLM instead of the offline fallback:

cp .env.example .env

then edit .env and paste: ANTHROPIC_API_KEY=sk-ant-...

### Terminal 2 — frontend

cd frontend
npm install
npm run dev


Open the URL it prints — **http://localhost:5173**.

> The frontend expects the backend on `http://localhost:4000`. If you change the backend port, set `VITE_API_URL` in a `frontend/.env` file.

### Demo login / test codes (seeded automatically on first run)

| Role | Email | Password |
|---|---|---|
| Teacher (Sara Iyer, Computer Science) | `sara.iyer@edubridge.test` | `password123` |

There's no seeded student account — use **Sign up** on the Student flow (it creates a real account via the backend).

Pre-seeded **live test codes** you can join immediately from TeachHub without logging in:

| Code | Test | Subject |
|---|---|---|
| `PHY201` | Laws of Motion — Unit Test | Physics |
| `MAT045` | Quadratic Equations | Mathematics |
| `CSC112` | Linked Lists Deep Dive | Computer Science |

Want a clean slate before recording? `POST http://localhost:4000/api/reset` resets the JSON database back to this seed data (or just delete `backend/src/data/db.json` and restart the server).

---

## 3. Suggested demo flow for your video

1. **Student side**: Sign up as a student → land on Doubt Chat → ask "What is a linked list?" (or "Explain Newton's laws") → show the grounded answer with citation chips.
2. Click **Practice** → answer the quiz → show the results screen with charts → click **Analyse flaws** on a wrong answer.
3. Click **TeachHub** in the floating nav → search for a teacher, or use "Already have a test code?" and enter `CSC112` → take the live test → see instantly graded results.
4. Log out → log in as the teacher (`sara.iyer@edubridge.test` / `password123`) → **Create Test** → pick Standard/Subject/Chapters → **Generate Test** (this is a real backend call) → **Publish** with a code and time window.
5. Show the **Dashboard** with the new test live, then open the test you just had a student take earlier (or open a new browser tab as a student, join with the new code, and submit) → refresh the teacher Dashboard to show the leaderboard updating in real time.

This shows: real auth, a real (if offline-mocked) AI pipeline, real persistence, and a full two-sided workflow — everything a judge wants to see in an "offline round" prototype.

---

## 4. What's mocked vs. real (be upfront about this to judges)

- **Real**: authentication, test generation → publish → join-by-code → grading → leaderboard, all persisted via the backend API — nothing is faked in the React state anymore.
- **Offline-mocked by design**: the AI layer (`aiService.js`) uses a small hand-built knowledge base and question bank when no API key is configured, so the demo is 100% reliable without internet/API access. Wiring in `ANTHROPIC_API_KEY` flips it to real LLM calls with no other code changes.
- **Not built yet** (good "future work" talking points): password hashing/JWT sessions, a real database, teacher self-signup, richer RAG grounding for the doubt chat.
