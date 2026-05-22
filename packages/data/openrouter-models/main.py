import os
import json
import requests
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

if not API_KEY:
    raise RuntimeError("OPENROUTER_API_KEY is not set in .env")

url = "https://openrouter.ai/api/v1/models"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

response = requests.get(url, headers=headers)
response.raise_for_status()

data = response.json()
models = data["data"]

# ---- Sort models by id ----
models = sorted(models, key=lambda m: m.get("id", ""))

# ---- Filter free models ----
free_models = [
    m
    for m in models
    if m.get("pricing", {}).get("prompt") == "0"
    and m.get("pricing", {}).get("completion") == "0"
]

# free models sorted as well
free_models = sorted(free_models, key=lambda m: m.get("id", ""))

# Ensure output directory exists
os.makedirs("json", exist_ok=True)

# Save all models
with open("json/all.json", "w", encoding="utf-8") as f:
    json.dump(models, f, indent=2, ensure_ascii=False)

# Save free models
with open("json/free.json", "w", encoding="utf-8") as f:
    json.dump(free_models, f, indent=2, ensure_ascii=False)

print(f"Saved {len(models)} total models → json/all.json")
print(f"Saved {len(free_models)} free models → json/free.json")
