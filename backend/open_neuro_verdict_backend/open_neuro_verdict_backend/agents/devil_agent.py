from utils.gemini import generate

def run_devil_agent(hr_output, facts):
    prompt = f"""You are a devil's advocate. Challenge this hiring decision with counter-arguments.

Decision: {hr_output}
Facts: {facts}

Return ONLY valid JSON, no markdown:
{{"decision": "Reject", "confidence": 0.6, "reason": "counter argument"}}"""

    return generate(prompt)
