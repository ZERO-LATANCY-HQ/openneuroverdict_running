from google import genai
import json, os, re, time
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-lite"]

def _parse_json(text):
    clean = re.sub(r"```(?:json)?\s*|```", "", text).strip()
    return json.loads(clean)

def generate(prompt, retries=2):
    for model in MODELS:
        for attempt in range(retries):
            try:
                res = client.models.generate_content(model=model, contents=prompt)
                return _parse_json(res.text)
            except Exception as e:
                err = str(e)
                # Rate limit or quota — skip to next model immediately
                if "429" in err or "RESOURCE_EXHAUSTED" in err or "quota" in err.lower():
                    break
                # Overloaded — wait and retry same model
                if "503" in err or "UNAVAILABLE" in err:
                    if attempt < retries - 1:
                        time.sleep(2)
                        continue
                    break
                # JSON parse error — retry once
                if isinstance(e, (json.JSONDecodeError, ValueError)):
                    if attempt < retries - 1:
                        time.sleep(1)
                        continue
                raise
    raise RuntimeError("All Gemini models exhausted or quota exceeded. Try again later.")
