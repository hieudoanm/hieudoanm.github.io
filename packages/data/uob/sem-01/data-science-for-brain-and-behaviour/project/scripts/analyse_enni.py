"""Run a provisional CHAT-based MLCU approximation and age-slope analysis."""

from __future__ import annotations

import csv
import random
import re
from pathlib import Path
from statistics import mean


PROJECT = Path(__file__).resolve().parents[1]
RAW = PROJECT / "data" / "raw" / "ENNI"
OUT = PROJECT / "data" / "processed"
TIME = re.compile(r"\x15.*?\x15")
ANNOTATION = re.compile(r"\[[^]]*\]")
WORD = re.compile(r"[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*|xxx", re.I)
FILLERS = {"um", "uh", "erm", "er", "hm", "hmm"}
TWO_WORD_CONTRACTIONS = re.compile(
    r"\b(i['’]m|you['’]re|we['’]re|they['’]re|he['’]s|she['’]s|it['’]s|"
    r"that['’]s|there['’]s|who['’]s|what['’]s|let['’]s|[a-z]+n['’]t)\b",
    re.I,
)
AGE = re.compile(r"^(\d+);(\d+)(?:\.(\d+))?$")


def parse_age(chat_id: str) -> float | None:
    """Return age in years from the target-child CHAT ID field."""
    match = AGE.fullmatch(chat_id.strip())
    if match is None:
        return None
    years, months, days = int(match[1]), int(match[2]), int(match[3] or 0)
    if months > 11 or days > 31:
        return None
    return years + months / 12 + days / 365.25


def metadata(path: Path) -> tuple[float | None, str]:
    """Read child age and use the corpus folder as the group label."""
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("@ID:"):
            fields = line.split("\t", 1)[-1].split("|")
            if len(fields) > 5 and fields[2] == "CHI":
                return parse_age(fields[3]), path.relative_to(RAW).parts[0]
    raise ValueError(f"No target-child @ID record in {path}")


def drop_retracings(text: str) -> str:
    """Remove marked retraced material, including simple unbracketed repeats."""
    pattern = re.compile(r"<([^<>]*)>\s*\[(?:/|//)\]")
    while pattern.search(text):
        text = pattern.sub("", text)
    text = re.sub(r"\b([\w’'-]+)\s+\[/\]\s+\1\b", r"\1", text, flags=re.I)
    text = re.sub(r"\b[\w’'-]+\s+\[(?:/|//)\]", " ", text)
    return re.sub(r"\[[/]\]|\[//\]", " ", text)


def word_count(text: str) -> int:
    """Count surface words after CHAT markup, fillers, and maze spans are removed."""
    text = TIME.sub(" ", text)
    text = drop_retracings(text)
    text = re.sub(r"&[-+][\w-]+", " ", text)
    text = re.sub(r"&=[\w-]+", " ", text)
    text = re.sub(r"\b[\w’'-]+\s+\[:\s*([^]]+)\]", r" \1", text)
    text = ANNOTATION.sub(" ", text)
    tokens = WORD.findall(text)
    count = sum(token.casefold() not in FILLERS for token in tokens)
    contractions = TWO_WORD_CONTRACTIONS.findall(text)
    return count + len(contractions)


def collect_turns(lines: list[str]) -> list[tuple[str, bool]]:
    """Return examiner and child main tiers with a child-speaker flag."""
    return [
        (line.split(":", 1)[1], line.startswith("*CHI:"))
        for line in lines
        if line.startswith(("*CHI:", "*EXA:"))
    ]


def count_child_turn(
    turn: str, follows_question: bool, exclude_question_responses: bool
) -> tuple[int, int, int, int, int]:
    """Return word, unit, exclusion, and question-response counts for a turn."""
    if follows_question and exclude_question_responses:
        return 0, 0, 0, 0, 1
    if "[+ bch]" in turn:
        return 0, 0, 1, 0, int(follows_question)
    if "+..." in turn or "+/" in turn:
        return 0, 0, 0, 1, int(follows_question)
    words = word_count(turn)
    return words, int(words > 0), 0, 0, int(follows_question)


def tally_turns(turns: list[tuple[str, bool]], exclude_question_responses: bool) -> dict[str, int]:
    """Count candidate words, units, and transcript exclusions."""
    totals = [0, 0, 0, 0, 0]
    examiner_asked_question = False
    for turn, is_child in turns:
        if not is_child:
            examiner_asked_question = TIME.sub("", turn).rstrip().endswith("?")
            continue
        for index, count in enumerate(count_child_turn(turn, examiner_asked_question, exclude_question_responses)):
            totals[index] += count
        examiner_asked_question = False
    return {
        "eligible_words": totals[0],
        "eligible_c_units": totals[1],
        "turns_excluded_bch": totals[2],
        "turns_excluded_breakoff": totals[3],
        "turns_after_examiner_question": totals[4],
    }


def score_transcript(path: Path, *, exclude_question_responses: bool = False) -> dict[str, object]:
    """Score child turns with explicit automated exclusions and audit counts."""
    age, group = metadata(path)
    turns = collect_turns(path.read_text(encoding="utf-8").splitlines())
    counts = tally_turns(turns, exclude_question_responses)
    eligible_words = counts["eligible_words"]
    eligible_units = counts["eligible_c_units"]
    mlcu = eligible_words / eligible_units if eligible_units else float("nan")
    return {
        "file": path.relative_to(RAW).as_posix(),
        "group": group,
        "age_years": "" if age is None else round(age, 4),
        "eligible_words": eligible_words,
        "eligible_c_units": eligible_units,
        "mlcu_provisional": round(mlcu, 6),
        "turns_excluded_bch": counts["turns_excluded_bch"],
        "turns_excluded_breakoff": counts["turns_excluded_breakoff"],
        "turns_after_examiner_question": counts["turns_after_examiner_question"],
        "turns_total": sum(is_child for _turn, is_child in turns),
    }


def slope(x: list[float], y: list[float]) -> float:
    """Calculate the ordinary least-squares slope of y on x."""
    x_mean, y_mean = mean(x), mean(y)
    denominator = sum((value - x_mean) ** 2 for value in x)
    if denominator == 0:
        raise ValueError("Age must vary to estimate a slope.")
    return sum((a - x_mean) * (b - y_mean) for a, b in zip(x, y)) / denominator


def permutation_test(
    x: list[float], y: list[float], repeats: int = 10_000
) -> tuple[float, float, list[float]]:
    """Test a zero pooled slope by shuffling outcomes relative to age."""
    observed = slope(x, y)
    randomizer = random.Random(20261001)
    shuffled = y.copy()
    null_slopes = []
    for _ in range(repeats):
        randomizer.shuffle(shuffled)
        null_slopes.append(slope(x, shuffled))
    extreme = sum(abs(value) >= abs(observed) for value in null_slopes)
    return observed, (extreme + 1) / (repeats + 1), null_slopes


def write_scores(path: Path, records: list[dict[str, object]]) -> None:
    """Write score records to a CSV file."""
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(records[0]))
        writer.writeheader()
        writer.writerows(records)


def describe_groups(records: list[dict[str, object]]) -> None:
    """Print descriptive age slopes by corpus group."""
    for group in ("SLI", "TD"):
        subset = [row for row in records if row["group"] == group]
        x = [float(row["age_years"]) for row in subset]
        y = [float(row["mlcu_provisional"]) for row in subset]
        print(f"{group} descriptive slope: n={len(subset)}, {slope(x, y):.4f} per year")


def main() -> None:
    """Write candidate scores and a compact analysis result table."""
    files = sorted(RAW.rglob("*.cha"))
    records = [score_transcript(path) for path in files]
    question_sensitivity = [score_transcript(path, exclude_question_responses=True) for path in files]
    destination = OUT / "mlcu_provisional.csv"
    OUT.mkdir(parents=True, exist_ok=True)
    write_scores(destination, records)
    sensitivity_path = OUT / "mlcu_question_sensitivity.csv"
    write_scores(sensitivity_path, question_sensitivity)
    complete = [row for row in records if row["age_years"] != "" and row["eligible_c_units"]]
    x = [float(row["age_years"]) for row in complete]
    y = [float(row["mlcu_provisional"]) for row in complete]
    observed, p_value, _null_slopes = permutation_test(x, y)
    sensitivity = [row for row in question_sensitivity if row["age_years"] != "" and row["eligible_c_units"]]
    sensitivity_slope, sensitivity_p, _ = permutation_test(
        [float(row["age_years"]) for row in sensitivity],
        [float(row["mlcu_provisional"]) for row in sensitivity],
    )
    print(f"Candidate scores written: {destination} (n={len(complete)})")
    print(f"Pooled age slope: {observed:.4f} MLCU words/unit per year; p={p_value:.4f}")
    print(f"Question-response sensitivity: slope={sensitivity_slope:.4f}; p={sensitivity_p:.4f}; n={len(sensitivity)}")
    describe_groups(complete)


if __name__ == "__main__":
    main()
