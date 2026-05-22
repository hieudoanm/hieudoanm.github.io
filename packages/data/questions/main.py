import csv
import json
from pathlib import Path
from collections import defaultdict

CSV_DIR = Path("csv")
JSON_DIR = Path("json")

total_files = 0
total_questions = 0

metadata = {
    "totalFiles": 0,
    "totalQuestions": 0,
    "categories": defaultdict(
        lambda: {"quizCount": 0, "questionCount": 0, "quizzes": []}
    ),
}

for csv_file in CSV_DIR.rglob("*.csv"):
    total_files += 1

    # Preserve subfolder structure
    relative_path = csv_file.relative_to(CSV_DIR)
    json_file = (JSON_DIR / relative_path).with_suffix(".json")

    json_file.parent.mkdir(parents=True, exist_ok=True)

    questions = []

    with csv_file.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        for row in reader:
            questions.append(
                {
                    "question": row["question"],
                    "answers": {
                        "red": row["red"],
                        "yellow": row["yellow"],
                        "blue": row["blue"],
                        "green": row["green"],
                    },
                    "correct": row["correct"],
                }
            )

    with json_file.open("w", encoding="utf-8") as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)

    print(f"✅ Converted {csv_file} → {json_file}")

    # ----- metadata aggregation -----
    category = (
        relative_path.parent.name if relative_path.parent != Path(".") else "root"
    )
    q_count = len(questions)

    metadata["categories"][category]["quizCount"] += 1
    metadata["categories"][category]["questionCount"] += q_count
    metadata["categories"][category]["quizzes"].append(
        {"file": json_file.as_posix(), "questions": q_count}
    )

    total_questions += q_count

# Finalize metadata
metadata["totalFiles"] = total_files
metadata["totalQuestions"] = total_questions
metadata["categories"] = dict(metadata["categories"])

# Write single metadata.json
metadata_file = JSON_DIR / "metadata.json"
metadata_file.parent.mkdir(exist_ok=True)

with metadata_file.open("w", encoding="utf-8") as f:
    json.dump(metadata, f, indent=2, ensure_ascii=False)

print("\n🎉 All CSV files converted successfully.")
print(f"📁 Total files processed: {total_files}")
print(f"🧠 Total questions: {total_questions}")
print(f"📝 Metadata written → {metadata_file}")
