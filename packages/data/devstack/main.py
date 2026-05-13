import csv
import json

csv_file = "csv/devstack.csv"
json_file = "json/devstack.json"

with open(csv_file, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open(json_file, "w", encoding="utf-8") as f:
    json.dump(rows, f, indent=2, ensure_ascii=False)

print("✅ Converted CSV to JSON")
