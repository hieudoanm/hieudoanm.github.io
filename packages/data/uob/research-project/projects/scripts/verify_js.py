"""Check the browser's scoring against the Python scorer.

The page recomputes rankings in JavaScript because GitHub Pages is static. That
is only safe if the two implementations agree, so this compares every dimension
and total for the committed profile against `project_score`.
"""

from __future__ import annotations

import json
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

import db

ROOT = pathlib.Path(__file__).parent.parent
PAGE = ROOT / "public" / "index.html"
SCRIPTS = ROOT / "public" / "scripts.js"
# Store column -> the display name the browser uses for the same dimension.
DIMENSIONS = (("interest_match", "Interest match"),
              ("method_match", "Method match"),
              ("supervisor_focus_match", "Supervisor focus match"),
              ("feasibility", "Feasibility"),
              ("programme_fit", "Programme fit"),
              ("project_type_fit", "Project type fit"))

DRIVER = """
// Rebuild the config the way the page does, so the browser's own ranking code
// is under test rather than the weights the server already resolved.
const verifyCfg = { ...data.config,
  interest: rankedWeights(rankedOrder(data.config.interest)),
  method: rankedWeights(rankedOrder(data.config.method)) };
const verifyRows = rescoreProjects(verifyCfg);
const verifySupervisors = rescoreSupervisors(verifyCfg);
console.log(JSON.stringify({
  projects: verifyRows.map((row) => ({
    title: row.project.title,
    total: row.total,
    scores: row.scores,
    rank: row.rank,
    active: row.active,
  })),
  supervisors: verifySupervisors.map((entry) => [entry.name, entry.focus_match]),
}));
"""


def page_scripts() -> tuple[str, str]:
    """Return the embedded payload and the shipped scoring region.

    Only the delimited scoring region is extracted: the rest of scripts.js is
    view code that needs a DOM, which node does not have.
    """
    body = SCRIPTS.read_text(encoding="utf-8")
    # The payload ends where the sentinel starts, so neither check depends on
    # how the file happens to be formatted.
    payload = re.search(r"const data=(\{[\s\S]*?\});\s*/\* scoring:start \*/", body)
    if payload is None:
        raise ValueError("No embedded payload in scripts.js; run `make dashboard` first")
    scoring = re.search(r"/\* scoring:start \*/(.*?)/\* scoring:end \*/", body, re.S)
    if scoring is None:
        raise ValueError("Scoring sentinels missing; the page would ship unscored")
    return payload.group(1), scoring.group(1)


def run_node(script: str) -> dict:
    """Execute a node script and return its JSON output."""
    if shutil.which("node") is None:
        raise SystemExit("node is required to verify the browser scorer")
    with tempfile.NamedTemporaryFile("w", suffix=".js", dir=ROOT / "public", delete=False,
                                     encoding="utf-8") as handle:
        handle.write(script)
        target = pathlib.Path(handle.name)
    try:
        finished = subprocess.run(["node", target.name], cwd=ROOT / "public",
                                  capture_output=True, text=True)
    finally:
        target.unlink()
    if finished.returncode != 0:
        raise SystemExit(f"node failed:\n{finished.stderr.strip()}")
    return json.loads(finished.stdout)


def python_scores(connection) -> dict[str, dict]:
    """Read the scores Python wrote for the latest run."""
    scores: dict[str, dict] = {}
    for row in db.fetch_all(connection, "SELECT p.title, ps.* FROM project_score ps "
                                         "JOIN latest_run r ON r.id = ps.run_id "
                                         "JOIN project p ON p.id = ps.project_id"):
        scores[row["title"]] = {"total": row["total"], "rank": row["rank"],
                                "scores": {label: row[column] for column, label in DIMENSIONS}}
    return scores


def python_dimensions(connection) -> set[str]:
    """Return the dimension names the run recorded as active."""
    row = db.fetch_one(connection, "SELECT active_dimensions FROM latest_run")
    return set((row["active_dimensions"] or "").split("; ")) if row else set()


def python_supervisors(connection) -> dict[str, float]:
    """Read each supervisor's recorded focus score for the latest run."""
    return {row["name"]: row["focus_match"] for row in db.fetch_all(
        connection, "SELECT s.name, sc.focus_match FROM supervisor_score sc "
                     "JOIN latest_run r ON r.id = sc.run_id JOIN supervisor s ON s.id = sc.supervisor_id")}


def close(left, right, tolerance: float = 1e-9) -> bool:
    """Compare two optional floats, treating null as its own value."""
    if left is None or right is None:
        return left is None and right is None
    return abs(left - right) <= tolerance


def compare_projects(javascript: dict, expected: dict) -> list[str]:
    """Report every project whose total, rank or dimension score differs."""
    problems: list[str] = []
    js_rows = {row["title"]: row for row in javascript["projects"]}
    if set(js_rows) != set(expected):
        problems.append(f"project sets differ: {set(expected) ^ set(js_rows)}")
    for title, want in sorted(expected.items()):
        got = js_rows.get(title)
        if got is None:
            continue
        if not close(got["total"], want["total"], 1e-6):
            problems.append(f"{title}: total {got['total']} != {want['total']}")
        if got["rank"] != want["rank"]:
            problems.append(f"{title}: rank {got['rank']} != {want['rank']}")
        for name, value in want["scores"].items():
            if not close(got["scores"].get(name), value, 1e-6):
                problems.append(f"{title}: {name} {got['scores'].get(name)} != {value}")
    return problems


def compare_supervisors(javascript: dict, expected: dict) -> list[str]:
    """Report every supervisor whose focus score differs, and any set difference."""
    problems: list[str] = []
    js_rows = dict(javascript["supervisors"])
    if set(js_rows) != set(expected):
        problems.append(f"supervisor sets differ: {set(expected) ^ set(js_rows)}")
    for name, value in sorted(expected.items()):
        if name in js_rows and not close(js_rows[name], value, 1e-6):
            problems.append(f"{name}: focus_match {js_rows[name]} != {value}")
    return problems


def main() -> None:
    """Fail loudly when the browser and Python scorers disagree."""
    if "scripts.js" not in PAGE.read_text(encoding="utf-8"):
        raise SystemExit(f"{PAGE.name} does not load scripts.js; run `make dashboard` first")
    payload, code = page_scripts()
    javascript = run_node(f"const data={payload};\n{code}\n{DRIVER}")
    with db.session(read_only=True) as connection:
        expected = python_scores(connection)
        expected_supervisors = python_supervisors(connection)
        dimensions = python_dimensions(connection)

    problems = compare_projects(javascript, expected)
    problems += compare_supervisors(javascript, expected_supervisors)
    used = {name for row in javascript["projects"] for name in row["active"]}
    if used != dimensions:
        problems.append(f"active dimensions {sorted(used)} != {sorted(dimensions)}")

    print(f"compared {len(expected)} projects x {len(DIMENSIONS)} dimensions, "
          f"plus {len(expected_supervisors)} supervisor scores")
    if problems:
        print(f"MISMATCH ({len(problems)}):")
        for problem in problems[:25]:
            print("  -", problem)
        sys.exit(1)
    print("OK: the browser scorer reproduces every Python score, rank and active dimension")


if __name__ == "__main__":
    main()
