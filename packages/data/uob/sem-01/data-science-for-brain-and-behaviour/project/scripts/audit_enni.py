"""Create a reproducible inventory of ENNI CHAT files and scoring markers."""

from __future__ import annotations

import csv
import re
from collections import Counter
from pathlib import Path


PROJECT_DIR = Path(__file__).resolve().parents[1]
RAW_DIR = PROJECT_DIR / "data" / "raw" / "ENNI"
OUTPUT_DIR = PROJECT_DIR / "data" / "processed"
AGE_PATTERN = re.compile(r"^(\d+);(\d+)(?:\.(\d+))?$")


def parse_age(value: str) -> float | None:
    """Convert CHAT years;months.days to age in years."""
    match = AGE_PATTERN.fullmatch(value.strip())
    if match is None:
        return None
    years, months, days = (int(part or 0) for part in match.groups())
    if months > 11 or days > 31:
        return None
    return years + months / 12 + days / 365.25


def read_child_metadata(lines: list[str]) -> tuple[float | None, str | None]:
    """Read age and group from the target-child @ID line."""
    for line in lines:
        if not line.startswith("@ID:"):
            continue
        fields = line.split("\t", 1)[-1].split("|")
        if len(fields) < 7 or fields[2] != "CHI":
            continue
        return parse_age(fields[3]), fields[5] or None
    return None, None


def inventory_file(path: Path) -> dict[str, object]:
    """Summarize one transcript without changing its source text."""
    lines = path.read_text(encoding="utf-8").splitlines()
    age, header_group = read_child_metadata(lines)
    group = path.relative_to(RAW_DIR).parts[0]
    child_turns = [line for line in lines if line.startswith("*CHI:")]
    story_labels = [line.split("\t", 1)[-1].strip() for line in lines if line.startswith("@G:")]
    return {
        "file": path.relative_to(RAW_DIR).as_posix(),
        "group_folder": group,
        "header_group": header_group or "",
        "age_years": "" if age is None else round(age, 4),
        "child_turns": len(child_turns),
        "bch_turns": sum("[+ bch]" in line for line in child_turns),
        "maze_turns": sum("[//]" in line or "[/]" in line for line in child_turns),
        "filler_turns": sum("&-" in line for line in child_turns),
        "breakoff_turns": sum("+..." in line or "+/" in line for line in child_turns),
        "story_markers": ";".join(story_labels),
        "story_marker_count": len(story_labels),
        "duplicate_story_markers": len(story_labels) - len(set(story_labels)),
    }


def main() -> None:
    """Write an auditable participant-level metadata and marker inventory."""
    files = sorted(RAW_DIR.rglob("*.cha"))
    if not files:
        raise SystemExit(f"No CHAT files found beneath {RAW_DIR}")
    records = [inventory_file(path) for path in files]
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    destination = OUTPUT_DIR / "enni_inventory.csv"
    with destination.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(records[0]))
        writer.writeheader()
        writer.writerows(records)
    counts = Counter(record["group_folder"] for record in records)
    print(f"Transcripts: {len(records)}; group folders: {dict(counts)}")
    print(f"Missing age: {sum(not record['age_years'] for record in records)}")
    print(f"Saved inventory: {destination}")


if __name__ == "__main__":
    main()
