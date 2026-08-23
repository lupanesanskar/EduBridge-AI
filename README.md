# EduBridge AI

Hackathon prototype built for OOSC 4.0 Hackathon (IIIT Allahabad) by our team Orbit X.

## What is this

We built an AI tutoring app for engineering students. The idea came from a pretty simple problem - when you're stuck on a doubt at 11pm, you don't always have a teacher around, and searching random YouTube videos wastes time. So we made something where:

- Students can ask doubts and get an actual grounded answer (not just a generic chatbot reply)
- Students can practice with auto-generated MCQs on any topic
- Teachers can create a test in a couple minutes and share it with just a code, no accounts needed for students to join
- There's a live leaderboard when a test is running

We built both the frontend and backend ourselves for this, it's a full stack app not just a UI.

edubridge/
├── backend/ Node.js + Express API
└── frontend/ React + Vite + Tailwind


## Why we used a JSON file instead of a real database

Honestly because setting up Postgres/Mongo takes time and we didn't want the judges to have to install anything just to run our project. The JSON file acts like a real database - it saves data and persists between restarts, we just didn't want the setup headache mid-hackathon. It's structured so it could be swapped for a real DB later (only `backend/src/store.js` would need to change).

## About the AI part

We use Groq's API for the actual LLM calls, but we also built an offline fallback in `backend/src/services/aiService.js` in case the API key runs out of quota or wifi is bad during judging (this actually happened to us once during testing so we didn't want to risk it). If there's no API key set, it just uses a built-in knowledge base + template questions instead. Add the key and it switches to real AI automatically.

## API routes (if anyone wants to poke around)

| Method | Route | What it does |
|---|---|---|
| POST | `/api/auth/signup` | student signup |
| POST | `/api/auth/login` | login for both roles |
| POST | `/api/chat` | doubt chat, returns answer + sources |
| GET | `/api/teachers?query=` | search teachers |
| POST | `/api/tests/join` | join a live test with a code |
| POST | `/api/tests/:id/attempts` | submit test answers, graded instantly |
| POST | `/api/tests/generate` | generate MCQs for a subject |
| POST | `/api/tests` | publish a test |
| GET | `/api/tests?teacherId=` | teacher's own tests |
| PATCH | `/api/tests/:id/conclude` | end a live test |
| DELETE | `/api/tests/:id` | delete an unpublished test |
| GET | `/api/doubts?subject=&status=` | public doubt board |
| POST | `/api/doubts` | post a doubt |
| POST | `/api/doubts/:id/answers` | teacher answers a doubt |
| POST | `/api/doubts/:id/answers/:answerId/like` | like an answer |
| GET | `/api/doubts/leaderboard` | teacher leaderboard by likes |

## Solve Doubt feature

This is separate from the AI chat. Students can post a doubt publicly and any teacher can answer it (like a mini Quora for the app). Students like the answers that actually help them, and that builds up a teacher's rating and rank on the leaderboard. We added this because we felt just AI answers isn't enough, sometimes you need an actual human to explain it differently.

## How to run it

Need Node.js 18+.

**Backend:**

cd backend
npm install
npm start


Should print something like:

EduBridge backend running on http://localhost:4000
AI mode: OFFLINE fallback (no ANTHROPIC_API_KEY set)


If you want real AI responses instead of the offline fallback:

cp .env.example .env

then open `.env` and paste your key in.

**Frontend (separate terminal):**

cd frontend
npm install
npm run dev


Then open http://localhost:5173

(frontend expects backend running on port 4000, if you change that set `VITE_API_URL` in a `frontend/.env`)

## Trying it out

There's no pre-made login for either role - just sign up as whichever you want to try:

- **Student signup:** just needs a name, email, and password.
- **Teacher signup:** needs a name, email, password, subject, and standard/class you teach.

Both create a real account through the backend, so feel free to make as many as you want to test different flows.

Test codes you can join right away without logging in:

- PHY201 - Laws of Motion
- MAT045 - Quadratic Equations
- CSC112 - Linked Lists

If you mess up the data and want to reset it, hit `POST http://localhost:4000/api/reset` or just delete `backend/src/data/db.json` and restart.

## Demo flow we're following for the video

1. Sign up as student, ask a doubt like "what is a linked list", show the answer with sources
2. Go to Practice, do a quiz, show results page
3. Go to TeachHub, join test with code CSC112, get graded
4. Log in as teacher, create a test, generate questions, publish it
5. Show dashboard, have a student join, submit, refresh dashboard to show leaderboard update

## What's actually working vs what's mocked

Being honest here since judges will ask anyway:

**Actually working:** login/signup, generating tests, publishing, joining by code, grading, leaderboard. All of it goes through the backend and saves to the database, nothing is fake in the frontend.

**Mocked on purpose:** the AI fallback when there's no API key - this is intentional so our demo doesn't break if wifi is bad.

**Didn't get to:** proper password hashing, real database instead of JSON, teachers signing up themselves (right now we seed the one teacher account), and the doubt chat could use better retrieval/RAG if we had more time.

## Team - Orbit X

- Rajdeep Waragade
