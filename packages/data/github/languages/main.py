import json
import yaml
from requests import get, Response
import pandas as pd
import os

os.makedirs("./data", exist_ok=True)

url = "https://raw.githubusercontent.com/github-linguist/linguist/master/lib/linguist/languages.yml"

response: Response = get(url)
languages_yaml: str = response.text

# Save YAML
with open("./data/all/languages.yaml", "w") as file:
    file.write(languages_yaml)

# Convert to JSON
languages_json: dict = yaml.safe_load(languages_yaml)

with open("./data/all/languages.json", "w") as json_file:
    json.dump(languages_json, json_file, indent=2)

# ---- Build flat list ----
languages_list: list[dict] = []
for key, value in languages_json.items():
    item = {**value, "language": key}
    languages_list.append(item)

# Save CSV
df = pd.DataFrame(languages_list)
df.to_csv("./data/all/languages.csv", index=False)

# ---- NEW: language → color map ----
language_color_map = {}

for lang, data in languages_json.items():
    color = data.get("color")
    if color:  # skip languages without color
        language_color_map[lang] = color

with open("./data/colors.json", "w") as f:
    json.dump(language_color_map, f, indent=2)

print("✅ Generated:")
print("- languages.yaml")
print("- languages.json")
print("- languages.csv")
print("- colors.json")
