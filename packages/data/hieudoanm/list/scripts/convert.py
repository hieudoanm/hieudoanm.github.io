import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
DATA_DIR = ROOT / "data"
TXT_DIR = DATA_DIR / "txt"
JSON_DIR = DATA_DIR / "json"


def txt_to_json(txt_path: Path) -> None:
    table = txt_path.stem
    lines = txt_path.read_text(encoding="utf-8").splitlines()
    entries = [
        line.strip()
        for line in lines
        if line.strip() and not line.startswith("#")
    ]

    json_path = JSON_DIR / f"{table}.json"
    json_path.write_text(
        json.dumps(entries, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"  [json] {json_path.relative_to(ROOT)} ({len(entries)} entries)")


def main() -> None:
    JSON_DIR.mkdir(parents=True, exist_ok=True)

    txt_files = sorted(TXT_DIR.glob("*.txt"))
    if not txt_files:
        print("No TXT files found.")
        return

    for txt_path in txt_files:
        print(f"Processing {txt_path.name} …")
        txt_to_json(txt_path)


if __name__ == "__main__":
    main()
