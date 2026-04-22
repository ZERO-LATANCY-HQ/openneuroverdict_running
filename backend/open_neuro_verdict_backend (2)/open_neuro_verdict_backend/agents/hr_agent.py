from utils.gemini import generate

def run_hr_agent(facts, job):
    prompt = f"""You are an HR expert. Evaluate this candidate.

Candidate Facts: {facts}
Job: {job}

Return ONLY valid JSON, no markdown:
{{"decision": "Hire", "confidence": 0.8, "reason": "explanation"}}"""

    return generate(prompt)
