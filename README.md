# Smart Tutor — Kids Chatbot UI (Dark) + Quiz + Rewards

Full-stack starter:
- **Frontend**: React (Vite) dark-themed, kid-friendly UI (chat + quizzes + rewards).
- **Backend**: Node/Express API (port 4000) that proxies to a **Python Flask** microservice (port 5001).
- **Python service**: Simple rule-based tutor + quiz bank for Math/Science/English.

> This is a minimal, local, free-to-run stack — no paid APIs. You can plug LLMs later.

---

## Quick Start

### 1) Python service (quiz + tutor logic)
```bash
cd service-python
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py
# runs on http://localhost:5001
```

### 2) Node API (proxy + rewards + leaderboard)
```bash
cd server-node
npm install
npm start
# runs on http://localhost:4000
```

### 3) React UI
```bash
cd client
npm install
npm run dev
# dev server on http://localhost:5173 (proxy /api -> Node)
```

Open **http://localhost:5173** in the browser.

---

## What’s Inside

- **client/** – React UI (Vite), dark playful layout
  - Left sidebar: subjects (Math, Science, English)
  - Center: chat and quiz choices inside the conversation
  - Right: Quizzes (start), Rewards/Leaderboard (stars/XP)
  - Bottom bar: message input + mic + send
- **server-node/** – Express API
  - `/api/chat` – forwards message+subject to Flask `/tutor`
  - `/api/quiz` – returns a random quiz from Flask `/quiz`
  - `/api/quiz/answer` – validates answer via Flask `/check-answer`, awards stars
  - `/api/leaderboard` – returns demo leaderboard
- **service-python/** – Flask microservice
  - `/tutor` – rule-based tutor reply, can suggest a quiz when asked
  - `/quiz` – random quiz by subject
  - `/check-answer` – answer validation

---

## Environment / Config

- Node calls Flask at `http://localhost:5001`
- React dev server proxies `/api` to `http://localhost:4000`
- CORS enabled for local dev.

---

## Extend It

- Swap the Flask rule-based replies with a real model (OpenAI, Gemini, etc.).
- Persist state (PostgreSQL/SQLite) instead of the in-memory store in Node.
- Add login for kids/parents; show progress over time.
- Add more question types (drag-drop, image-based questions).

Enjoy! 🚀
