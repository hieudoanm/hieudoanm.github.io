import csv
import json
import os
import sqlite3
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
DATA_DIR = ROOT / "data"
CSV_DIR = DATA_DIR / "csv"
JSON_DIR = DATA_DIR / "json"
DB_PATH = DATA_DIR / "database" / "hieudoanm.db"


def csv_to_json_and_db(csv_path: Path, conn: sqlite3.Connection) -> None:
    table = csv_path.stem  # e.g. "states" from "states.csv"

    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    if not rows:
        print(f"  [skip] {csv_path.name} is empty")
        return

    # ── JSON ──────────────────────────────────────────────
    json_path = JSON_DIR / f"{table}.json"
    json_path.write_text(
        json.dumps(rows, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"  [json] {json_path.relative_to(ROOT)}")

    # ── SQLite ────────────────────────────────────────────
    cols = list(rows[0].keys())
    placeholders = ", ".join("?" for _ in cols)
    col_defs = ", ".join(f'"{c}" TEXT' for c in cols)

    conn.execute(f'DROP TABLE IF EXISTS "{table}"')
    conn.execute(f'CREATE TABLE "{table}" ({col_defs})')

    quoted_cols = ", ".join(f'"{c}"' for c in cols)
    conn.executemany(
        f'INSERT INTO "{table}" ({quoted_cols}) VALUES ({placeholders})',
        [[row.get(c, "") for c in cols] for row in rows],
    )
    conn.commit()
    print(f"  [db]   {table} ({len(rows)} rows)")


def main() -> None:
    JSON_DIR.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(str(DB_PATH))
    cursor = conn.cursor()

    csv_files = sorted(CSV_DIR.glob("*.csv"))
    if not csv_files:
        print("No CSV files found.")
        return

    for csv_path in csv_files:
        print(f"Processing {csv_path.name} …")
        csv_to_json_and_db(csv_path, conn)

    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    tables = [r[0] for r in cursor.fetchall()]
    print(f"\nDone — {len(tables)} table(s) in DB: {', '.join(tables)}")

    conn.close()


if __name__ == "__main__":
    main()
