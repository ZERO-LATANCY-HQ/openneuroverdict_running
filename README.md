# ⚡ OpenNeuroVerdict

> An open-source multi-agent AI hiring system that makes transparent, explainable, and bias-aware hiring decisions through a live debate between specialized AI agents.

---

## 🧠 What Is This?

Traditional AI hiring tools are black boxes — one model, one answer, no explanation. OpenNeuroVerdict replaces that with a **multi-agent debate pipeline** where 4 specialized AI agents analyze, argue, and vote on every hiring decision. Every step is visible, every reason is explained.

---

## 🏗️ Project Structure

```
GOOGLE_HACKATHON/
├── backend/
│   └── open_neuro_verdict_backend/
│       ├── agents/
│       │   ├── fact_analyzer.py       # Extracts structured candidate data
│       │   ├── hr_agent.py            # Evaluates candidate-job fit
│       │   ├── ethics_agent.py        # Detects bias and fairness issues
│       │   └── devil_agent.py         # Challenges the HR decision
│       ├── utils/
│       │   ├── gemini.py              # Shared Gemini client with retry + fallback
│       │   └── voting.py              # Final vote aggregation + fairness score
│       ├── main.py                    # FastAPI app + /analyze endpoint
│       ├── models.py                  # Pydantic request model
│       ├── requirements.txt
│       └── .env                       # GEMINI_API_KEY goes here
│
└── OpenNeuroVerdict/
    └── frontend/
        ├── src/
        │   ├── components/
        │   │   ├── Header.jsx         # Sticky nav with blur
        │   │   ├── FileUpload.jsx     # Drag & drop PDF/DOCX/TXT extractor
        │   │   └── Reveal.jsx         # Scroll-triggered entrance animation
        │   ├── pages/
        │   │   ├── LandingPage.jsx    # Hero + agent preview + features
        │   │   ├── InputPage.jsx      # Resume + JD input with file upload
        │   │   ├── LoadingPage.jsx    # Live agent activity + orbit animation
        │   │   ├── DebatePage.jsx     # Live typing agent debate bubbles
        │   │   └── VerdictPage.jsx    # Final decision + fairness + reasons
        │   ├── utils/
        │   │   └── extractText.js     # PDF/DOCX/TXT text extraction
        │   ├── services/
        │   │   └── api.js             # Axios client for backend
        │   └── App.jsx                # Page router + global styles
        ├── package.json
        └── vite.config.js
```

---

## ⚙️ Tech Stack

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Python | 3.10+ | Runtime |
| FastAPI | latest | REST API framework |
| Uvicorn | latest | ASGI server |
| google-genai | latest | Gemini AI SDK (new official package) |
| python-dotenv | latest | Load `.env` variables |
| Pydantic | (via FastAPI) | Request validation |

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.5 | UI framework |
| Vite | 8.0.9 | Build tool + dev server |
| Axios | 1.15.1 | HTTP client for API calls |
| pdfjs-dist | 5.6.205 | PDF text extraction in browser |
| mammoth | 1.12.0 | DOCX text extraction in browser |

### AI

| Model | Provider | Usage |
|---|---|---|
| gemini-2.5-flash | Google Gemini | Primary model for all 4 agents |
| gemini-2.0-flash | Google Gemini | Fallback if 2.5-flash is unavailable |
| gemini-2.0-flash-lite | Google Gemini | Final fallback (lightest, most available) |

---

## 🤖 Agent Roles

| Agent | Icon | Role | Output |
|---|---|---|---|
| Fact Analyzer | 🔬 | Extracts skills, experience, education from resume | Structured JSON facts |
| HR Expert | 🧠 | Evaluates candidate fit against job description | Hire/Reject + confidence + reason |
| Ethics Auditor | ⚖️ | Checks for gender, college prestige, experience bias | Agree/Concern + bias flags |
| Devil's Advocate | 😈 | Challenges the HR decision with counter-arguments | Hire/Reject + counter reason |

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:8000
```

### POST `/analyze`

Runs the full multi-agent debate pipeline.

**Request Body**
```json
{
  "resume": "John Smith | john@email.com\nEducation: B.Tech CS...",
  "job_description": "Senior Software Engineer\nRequirements: 3+ years..."
}
```

**Response**
```json
{
  "debate": [
    {
      "agent": "fact",
      "decision": "Analyzed",
      "confidence": 1.0,
      "reason": "Candidate has 4 years Python/React experience..."
    },
    {
      "agent": "hr",
      "decision": "Hire",
      "confidence": 0.82,
      "reason": "Strong technical alignment with JD requirements..."
    },
    {
      "agent": "ethics",
      "decision": "Agree",
      "confidence": 0.75,
      "reason": "No significant bias detected in reasoning..."
    },
    {
      "agent": "devil",
      "decision": "Reject",
      "confidence": 0.4,
      "reason": "Cloud architecture experience not validated at scale..."
    }
  ],
  "verdict": {
    "decision": "Hire",
    "confidence": 0.72,
    "reasons": ["Strong Python/JS skills match JD"],
    "why_not": "Cloud architecture experience not validated at scale"
  },
  "fairness": {
    "score": 85,
    "flags": ["College prestige bias detected"]
  }
}
```

**Response Fields**

| Field | Type | Description |
|---|---|---|
| `debate` | array | All 4 agent outputs in order |
| `debate[].agent` | string | Agent key: `fact`, `hr`, `ethics`, `devil` |
| `debate[].decision` | string | Agent's decision |
| `debate[].confidence` | float | 0.0 – 1.0 confidence score |
| `debate[].reason` | string | Full explanation |
| `verdict.decision` | string | Final: `Hire` or `Reject` |
| `verdict.confidence` | float | Weighted confidence score |
| `verdict.reasons` | array | Key reasons for the decision |
| `verdict.why_not` | string | Best argument for the opposite decision |
| `fairness.score` | int | 0–100 fairness score |
| `fairness.flags` | array | List of detected bias flags |

---

## 🚀 Running the Project

### Prerequisites
- Python 3.10+
- Node.js 18+
- A free Gemini API key from https://aistudio.google.com/apikey

### 1. Clone / navigate to project
```bash
cd "a:\3RD YEAR\GOOGLE_HACKATHON"
```

### 2. Set up backend
```bash
cd "backend/open_neuro_verdict_backend (2)/open_neuro_verdict_backend"
pip install -r requirements.txt
```

Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your-key-here
```

Start the backend:
```bash
python -m uvicorn main:app --reload
```
Backend runs at → **http://localhost:8000**

### 3. Set up frontend
```bash
cd "OpenNeuroVerdict/frontend"
npm install
npm run dev
```
Frontend runs at → **http://localhost:5173**

---

## 🔄 How the Pipeline Works

```
User Input (Resume + JD)
        ↓
  Fact Analyzer
  → Extracts: skills, experience_years, education, summary
        ↓
   HR Expert
  → Reads facts + JD → decision: Hire/Reject + confidence + reason
        ↓
  Ethics Auditor
  → Reads HR decision → checks for bias → bias_flags[]
        ↓
 Devil's Advocate
  → Reads HR decision + facts → builds counter-argument
        ↓
  Voting Engine
  → Weighted score = HR confidence ± Devil confidence ± Ethics penalty
  → Fairness score = 100 - (ethics concern penalty)
        ↓
  Final Response
  → debate[], verdict{}, fairness{}
```

---

## 🎨 Frontend Pages

| Page | Route (state) | Description |
|---|---|---|
| Landing | `landing` | Hero section, agent preview, feature cards |
| Input | `input` | Resume + JD entry with file upload |
| Loading | `loading` | Live agent activity feed + orbit animation |
| Debate | `debate` | Typing animation agent debate bubbles |
| Verdict | `verdict` | Final decision, votes, fairness, reasons |

---

## 📁 File Upload Support

The frontend supports extracting text from:

| Format | Library | Notes |
|---|---|---|
| `.pdf` | pdfjs-dist | Multi-page, runs in browser |
| `.docx` | mammoth | Raw text extraction |
| `.txt` | Native File API | Direct read |

---

## 🔒 Retry & Fallback Logic

All agents use a shared `utils/gemini.py` helper that:
1. Tries `gemini-2.5-flash` first
2. On 503/UNAVAILABLE → waits 2s → retries once
3. Falls back to `gemini-2.0-flash`
4. Falls back to `gemini-2.0-flash-lite`
5. If all fail → raises clean error to frontend

---

## 🌍 Why This Matters

- Promotes **fair AI hiring** by making bias visible
- Enables **explainable decisions** — no black box
- Builds **trust** through transparent multi-agent reasoning
- Extensible to: lending decisions, legal arbitration, content moderation

---

## 👥 Team Roles

| Role | Responsibility |
|---|---|
| P1 — Backend | Agents, debate pipeline, voting logic, `/analyze` API |
| P2 — Frontend | UI, debate visualization, verdict dashboard |
| P3 — Fairness Engineer | Bias detection, fairness scoring, bias flags |
| P4 — Integration & Pitch | Frontend-backend connection, deployment, demo, slides |

---

## 📄 License

Open source — built for Google Hackathon 2025.
