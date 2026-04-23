from utils.gemini import generate

def run_ethics_agent(hr_output):
    prompt = f"""You are an ethics auditor. Check this hiring decision for bias (gender, college prestige, experience).

Decision: {hr_output}

Return ONLY valid JSON, no markdown:
{{"decision": "Agree", "confidence": 0.7, "reason": "bias explanation", "bias_flags": []}}

Use "Agree" if fair, "Concern" if bias detected."""

    return generate(prompt)
