from google import genai
from google.genai.errors import ServerError
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
            except ServerError as e:
                if "503" in str(e) or "UNAVAILABLE" in str(e):
                    if attempt < retries - 1:
                        time.sleep(2)
                        continue
                    # try next model
                    break
                raise
            except (json.JSONDecodeError, Exception) as e:
                if attempt < retries - 1:
                    time.sleep(1)
                    continue
                raise
    raise RuntimeError("All models unavailable. Try again in a moment.")
