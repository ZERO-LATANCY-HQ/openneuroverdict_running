from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from models import AnalyzeRequest
from agents.fact_analyzer import run_fact_analyzer
from agents.hr_agent import run_hr_agent
from agents.ethics_agent import run_ethics_agent
from agents.devil_agent import run_devil_agent
from utils.voting import final_vote

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
def analyze(data: AnalyzeRequest):
    facts = run_fact_analyzer(data.resume, data.job_description)
    hr = run_hr_agent(facts, data.job_description)
    ethics = run_ethics_agent(hr)
    devil = run_devil_agent(hr, facts)
    final = final_vote(hr, ethics, devil)

    debate = [
        {"agent": "fact", "decision": "Analyzed", "confidence": 1.0, "reason": facts.get("summary", "")},
        {"agent": "hr", "decision": hr["decision"], "confidence": hr["confidence"], "reason": hr["reason"]},
        {"agent": "ethics", "decision": ethics["decision"], "confidence": ethics["confidence"], "reason": ethics["reason"]},
        {"agent": "devil", "decision": devil["decision"], "confidence": devil["confidence"], "reason": devil["reason"]},
    ]

    return {
        "debate": debate,
        "verdict": {
            "decision": final["final_decision"],
            "confidence": round(abs(final["final_score"]) / 2, 2),
            "reasons": [hr["reason"]],
            "why_not": devil["reason"]
        },
        "fairness": {
            "score": final["fairness_score"],
            "flags": ethics.get("bias_flags", [])
        }
    }
