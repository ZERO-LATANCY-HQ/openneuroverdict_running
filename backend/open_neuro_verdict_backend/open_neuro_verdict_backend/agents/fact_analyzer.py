from utils.gemini import generate

def run_fact_analyzer(resume, job):
    prompt = f"""Extract structured facts from this candidate.

Resume:
{resume}

Job Description:
{job}

Return ONLY valid JSON, no markdown:
{{"skills": [], "experience_years": 0, "education": "", "summary": ""}}"""

    return generate(prompt)
