"""Rank projects against personal interests and explicitly assessed fit."""

from __future__ import annotations

import csv
import math
from pathlib import Path

from categorize import SUBJECT_CATEGORIES, METHOD_CATEGORIES


CSV_DIR = Path(__file__).parent.parent / "csv"
INPUT = CSV_DIR / "projects_categories.csv"
OUTPUT = CSV_DIR / "projects_rankings.csv"
WEIGHTS = CSV_DIR / "projects_weights.csv"
METHOD_WEIGHTS = CSV_DIR / "projects_method_weights.csv"
PROFILE = CSV_DIR / "projects_profile.csv"
DIMENSION_WEIGHTS = CSV_DIR / "ranking_weights.csv"
FEASIBILITY = CSV_DIR / "projects_feasibility.csv"
OVERLAP_FAMILIES = {
    "Language focus": {"Language, reading & communication", "Language development"},
}


def read_rows(path: Path) -> list[dict[str, str]]:
    """Read a CSV file and fail clearly when it is missing or empty."""
    if not path.is_file():
        raise FileNotFoundError(f"{path} is missing")
    with path.open(newline="", encoding="utf-8-sig") as source:
        rows = list(csv.DictReader(source))
    if not rows:
        raise ValueError(f"{path} has no data rows")
    return rows


def read_projects(path: Path = INPUT) -> list[dict[str, str]]:
    """Load categorized projects and validate the category column."""
    rows = read_rows(path)
    if "Categories" not in rows[0]:
        raise ValueError(f"{path} has no Categories column")
    return rows


def read_category_weights(path: Path = WEIGHTS) -> dict[str, float]:
    """Load finite non-negative category multipliers for subject categories."""
    rows = read_rows(path)
    if not {"Category", "Weight"}.issubset(rows[0]):
        raise ValueError(f"{path} must have Category and Weight columns")
    weights: dict[str, float] = {}
    for row in rows:
        category = (row.get("Category") or "").strip()
        weight = parse_nonnegative(row.get("Weight", ""), f"category {category!r}")
        if not category or category in weights:
            raise ValueError(f"Category names must be non-empty and unique: {category!r}")
        weights[category] = weight
    validate_category_names(weights, is_method=False)
    return weights


def read_method_weights(path: Path = METHOD_WEIGHTS) -> dict[str, float]:
    """Load finite non-negative method multipliers."""
    rows = read_rows(path)
    if not {"Category", "Weight"}.issubset(rows[0]):
        raise ValueError(f"{path} must have Category and Weight columns")
    weights: dict[str, float] = {}
    for row in rows:
        category = (row.get("Category") or "").strip()
        weight = parse_nonnegative(row.get("Weight", ""), f"method {category!r}")
        if not category or category in weights:
            raise ValueError(f"Method names must be non-empty and unique: {category!r}")
        weights[category] = weight
    validate_category_names(weights, is_method=True)
    return weights


def parse_nonnegative(value: str, label: str) -> float:
    """Parse a finite, non-negative numeric value with context."""
    try:
        number = float(value)
    except (TypeError, ValueError) as error:
        raise ValueError(f"Invalid number for {label}: {value!r}") from error
    if not math.isfinite(number) or number < 0:
        raise ValueError(f"Value for {label} must be finite and non-negative")
    return number


def validate_category_names(values: dict[str, float], is_method: bool = False) -> None:
    """Reject category labels that do not match the taxonomy."""
    taxonomy = METHOD_CATEGORIES if is_method else SUBJECT_CATEGORIES
    unknown = set(values).difference(taxonomy)
    if unknown:
        label = "methods" if is_method else "categories"
        raise ValueError(f"Unknown {label}: {', '.join(sorted(unknown))}")


def read_profile(path: Path = PROFILE) -> dict[str, dict[str, float]]:
    """Load interest and method preferences separately from scoring controls."""
    rows = read_rows(path)
    required = {"Profile type", "Value", "Priority"}
    if not required.issubset(rows[0]):
        raise ValueError(f"{path} must have {', '.join(sorted(required))} columns")
    profile: dict[str, dict[str, float]] = {"interest": {}, "method": {}}
    for row in rows:
        kind = (row.get("Profile type") or "").strip().casefold()
        category = (row.get("Value") or "").strip()
        raw_priority = (row.get("Priority") or "").strip()
        if kind not in profile or not category or not raw_priority:
            continue
        priority = parse_nonnegative(raw_priority, f"{kind} preference {category!r}")
        if priority > 5:
            raise ValueError(f"Priority for {category!r} must be between 0 and 5")
        profile[kind][category] = priority
    validate_category_names(profile["interest"], is_method=False)
    validate_category_names(profile["method"], is_method=True)
    if not any(value > 0 for value in profile["interest"].values()):
        raise ValueError(f"Add at least one positive interest priority to {path}")
    return profile


def profile_values(profile_type: str, path: Path = PROFILE) -> list[str]:
    """Return configured values for a non-scoring profile setting."""
    return [
        value for row in read_rows(path)
        if (row.get("Profile type") or "").strip().casefold() == profile_type.casefold()
        and (value := (row.get("Value") or "").strip())
    ]


def read_dimension_weights(path: Path = DIMENSION_WEIGHTS) -> dict[str, float]:
    """Load the relative weights used to combine configured score dimensions."""
    rows = read_rows(path)
    if not {"Dimension", "Weight"}.issubset(rows[0]):
        raise ValueError(f"{path} must have Dimension and Weight columns")
    weights: dict[str, float] = {}
    for row in rows:
        dimension = (row.get("Dimension") or "").strip()
        weight = parse_nonnegative(row.get("Weight", ""), f"dimension {dimension!r}")
        if not dimension or dimension in weights:
            raise ValueError(f"Dimension names must be non-empty and unique: {dimension!r}")
        weights[dimension] = weight
    return weights


def read_feasibility(path: Path = FEASIBILITY) -> dict[str, dict[str, str]]:
    """Load optional manual project feasibility ratings, retaining blanks."""
    rows = read_rows(path)
    dimensions = ("Skill fit (1-5)", "Workload fit (1-5)", "Resource access (1-5)")
    if "Project ID" not in rows[0] or not set(dimensions).issubset(rows[0]):
        raise ValueError(f"{path} needs Project ID and feasibility rating columns")
    result: dict[str, dict[str, str]] = {}
    for row in rows:
        project_id = (row.get("Project ID") or "").strip()
        if not project_id or project_id in result:
            raise ValueError(f"Project IDs must be non-empty and unique in {path}")
        for dimension in dimensions:
            value = (row.get(dimension) or "").strip()
            if value:
                score = parse_nonnegative(value, f"{project_id}: {dimension}")
                if not 1 <= score <= 5:
                    raise ValueError(f"{project_id}: {dimension} must be between 1 and 5")
        result[project_id] = row
    return result


def category_family(category: str) -> str:
    """Return an overlap family so near-duplicate tags count once."""
    return next((name for name, labels in OVERLAP_FAMILIES.items() if category in labels), category)


def family_categories(category: str) -> set[str]:
    """Return all labels treated as the same underlying preference."""
    return next((labels for labels in OVERLAP_FAMILIES.values() if category in labels), {category})


def preference_scores(
    categories: set[str], preferences: dict[str, float], weights: dict[str, float]
) -> tuple[float | None, list[str], str]:
    """Score matching weighted preferences, capping duplicate labels per family."""
    maxima: dict[str, float] = {}
    matched: list[str] = []
    contributions: dict[str, tuple[str, float]] = {}
    grouped_preferences: dict[str, list[str]] = {}
    for category, priority in preferences.items():
        possible = priority * weights[category]
        family = category_family(category)
        maxima[family] = max(maxima.get(family, 0), possible)
        grouped_preferences.setdefault(family, []).append(category)
    for family, preferred_categories in grouped_preferences.items():
        direct_matches = [category for category in preferred_categories if category in categories]
        family_labels = set().union(*(family_categories(category) for category in preferred_categories))
        matching_tags = set(direct_matches)
        if not direct_matches and len(preferred_categories) == 1:
            matching_tags = categories.intersection(family_labels)
        candidates = [category for category in preferred_categories if category in matching_tags]
        if not candidates and matching_tags:
            candidates = preferred_categories
        if candidates:
            best = max(candidates, key=lambda category: preferences[category] * weights[category])
            matched.extend(sorted(matching_tags))
            contributions[family] = (best, preferences[best] * weights[best])
    denominator = sum(maxima.values())
    if denominator == 0:
        return None, [], ""
    score = 100 * sum(value for _, value in contributions.values()) / denominator
    detail = ";".join(f"{category}={value:g}" for category, value in contributions.values())
    return score, sorted(set(matched)), detail


def mean_feasibility(row: dict[str, str] | None) -> float | None:
    """Average the feasibility ratings actually entered for a project."""
    if row is None:
        return None
    dimensions = ("Skill fit (1-5)", "Workload fit (1-5)", "Resource access (1-5)")
    ratings = [float(row[key]) for key in dimensions if (row.get(key) or "").strip()]
    return 20 * sum(ratings) / len(ratings) if ratings else None


def requirement_review(project: dict[str, str]) -> str:
    """List missing or uncertain requirements without pretending to assess fit."""
    flags = []
    for field, label in (
        ("Skills & requirements", "skills/requirements not listed"),
        ("Recommended practical", "recommended practical not listed"),
        ("Recommended data science module", "recommended data-science module not listed"),
    ):
        value = (project.get(field) or "").strip()
        if not value or value.startswith("_"):
            flags.append(label)
    ethics = (project.get("Ethical approval status") or "").strip()
    if not ethics or "approved" not in ethics.casefold():
        flags.append(f"ethics: {ethics or 'status not listed'}")
    return "; ".join(flags) if flags else "No obvious source-data gaps"


def information_completeness(project: dict[str, str]) -> float:
    """Measure whether key project details are documented, not personal fit."""
    fields = ("Project Type", "Ethical approval status", "Skills & requirements",
              "Recommended practical", "Recommended data science module")
    present = sum(bool((project.get(field) or "").strip()) for field in fields)
    return 100 * present / len(fields)


def configured_dimensions(
    project: dict[str, str],
    categories: set[str],
    methods: set[str],
    profile: dict[str, dict[str, float]],
    category_weights: dict[str, float],
    method_weights: dict[str, float],
    feasibility: dict[str, dict[str, str]],
    programme: str,
    project_types: list[str],
) -> dict[str, float | None]:
    """Compute only dimensions supported by the current user and project data."""
    interest, _, _ = preference_scores(categories, profile["interest"], category_weights)
    method, _, _ = preference_scores(methods, profile["method"], method_weights)
    feasibility_score = mean_feasibility(feasibility.get(project["Project ID"]))
    programme_score = None
    if programme:
        programmes = (project.get("relevant programmes") or "").casefold()
        programme_score = 100.0 if programme.casefold() in programmes else 0.0
    project_type_score = None
    if project_types:
        options = {value.casefold() for item in project_types for value in item.split(";")}
        project_type_score = 100.0 if (project.get("Project Type") or "").casefold() in options else 0.0
    return {
        "Interest match": interest,
        "Method match": method,
        "Feasibility": feasibility_score,
        "Programme fit": programme_score,
        "Project type fit": project_type_score,
    }


def is_excluded(project: dict[str, str], profile_path: Path = PROFILE) -> bool:
    """Apply only explicit profile exclusions; blank settings exclude nothing."""
    categories = {tag.strip().casefold() for tag in project.get("Categories", "").split(";")}
    project_type = (project.get("Project Type") or "").casefold()
    ethics = (project.get("Ethical approval status") or "").casefold()
    rules = {
        "exclude category": categories,
        "exclude project type": {project_type},
        "exclude ethics status": {ethics},
    }
    for profile_type, values in rules.items():
        configured = {value.casefold() for item in profile_values(profile_type, profile_path)
                      for value in item.split(";") if value.strip()}
        if profile_type == "exclude ethics status":
            if any(value in ethics for value in configured):
                return True
        elif configured.intersection(values):
            return True
    return False


def score_project(
    project: dict[str, str],
    profile: dict[str, dict[str, float]],
    category_weights: dict[str, float],
    method_weights: dict[str, float],
    dimension_weights: dict[str, float],
    feasibility: dict[str, dict[str, str]],
    programme: str,
    project_types: list[str],
    feasibility_enabled: bool,
) -> dict[str, str]:
    """Create a score row with dimension contributions and source evidence."""
    categories = {tag.strip() for tag in project["Categories"].split(";") if tag.strip()}
    methods = {tag.strip() for tag in project.get("Methods", "").split(";") if tag.strip()}
    scores = configured_dimensions(project, categories, methods, profile, category_weights, method_weights,
                                   feasibility, programme, project_types)
    active = [(key, score, dimension_weights.get(key, 0)) for key, score in scores.items()
              if score is not None and dimension_weights.get(key, 0) > 0
              and (key != "Feasibility" or feasibility_enabled)]
    total_weight = sum(weight for _, _, weight in active)
    total = sum(score * weight for _, score, weight in active) / total_weight if total_weight else 0
    interest, matches, details = preference_scores(categories, profile["interest"], category_weights)
    method_match, method_matches, method_details = preference_scores(methods, profile["method"], method_weights)
    row = {key: project.get(key, "") for key in (
        "Project ID", "Project title", "Supervisor", "Project Type", "Ethical approval status",
        "relevant programmes", "Topic", "Methodology", "Skills & requirements",
        "Recommended practical", "Recommended data science module", "Optional modules",
        "Categories", "Methods", "Category evidence", "Method evidence", "Source file",
    )}
    row.update({
        "Score": f"{total:.2f}",
        "Interest fit (%)": "" if interest is None else f"{interest:.1f}",
        "Method fit (%)": "" if scores["Method match"] is None else f"{scores['Method match']:.1f}",
        "Feasibility (%)": "" if scores["Feasibility"] is None else f"{scores['Feasibility']:.1f}",
        "Information completeness (%)": f"{information_completeness(project):.1f}",
        "Programme fit (%)": "" if scores["Programme fit"] is None else f"{scores['Programme fit']:.1f}",
        "Project type fit (%)": "" if scores["Project type fit"] is None else f"{scores['Project type fit']:.1f}",
        "Active dimensions": "; ".join(name for name, _, _ in active),
        "Matching interests": ";".join(matches),
        "Matching methods": ";".join(method_matches),
        "Weighted category contributions": details,
        "Weighted method contributions": method_details,
        "Requirement review": requirement_review(project),
        "Why ranked here": details or "No configured preference matched",
    })
    return row


def rank_projects(
    projects: list[dict[str, str]],
    profile: dict[str, dict[str, float]],
    category_weights: dict[str, float],
    method_weights: dict[str, float],
    dimension_weights: dict[str, float],
    feasibility: dict[str, dict[str, str]],
    programme: str,
    project_types: list[str],
) -> list[dict[str, str]]:
    """Score by configured dimensions and sort by descending fit."""
    rating_fields = ("Skill fit (1-5)", "Workload fit (1-5)", "Resource access (1-5)")
    projects = [project for project in projects if not is_excluded(project)]
    if not projects:
        raise ValueError("The current profile exclusions removed every project")
    feasibility_enabled = all(
        project["Project ID"] in feasibility
        and all((feasibility[project["Project ID"]].get(field) or "").strip() for field in rating_fields)
        for project in projects
    )
    ranked = [score_project(p, profile, category_weights, method_weights, dimension_weights, feasibility, programme,
                            project_types,
                            feasibility_enabled) for p in projects]
    ranked.sort(key=lambda row: (-float(row["Score"]), -float(row["Interest fit (%)"] or 0),
                                 row["Project title"].casefold()))
    for position, project in enumerate(ranked, start=1):
        project["Rank"] = str(position)
    return ranked


def write_ranking(projects: list[dict[str, str]], path: Path = OUTPUT) -> None:
    """Write ordered project scores with review fields and evidence."""
    if not projects:
        raise ValueError("No projects to rank")
    fields = ["Rank", "Score", "Interest fit (%)", "Method fit (%)", "Feasibility (%)",
              "Information completeness (%)",
              "Programme fit (%)", "Project type fit (%)", "Active dimensions", "Matching interests", "Matching methods",
              "Why ranked here", "Weighted category contributions", "Weighted method contributions",
              "Project ID", "Project title", "Supervisor",
              "Project Type", "Ethical approval status", "relevant programmes", "Topic",
              "Methodology", "Skills & requirements", "Recommended practical",
              "Recommended data science module", "Optional modules", "Requirement review",
              "Categories", "Methods", "Category evidence", "Method evidence", "Source file"]
    with path.open("w", newline="", encoding="utf-8") as output:
        writer = csv.DictWriter(output, fieldnames=fields)
        writer.writeheader()
        writer.writerows(projects)


def main() -> None:
    """Regenerate the transparent, profile-aware project ranking."""
    projects = read_projects()
    category_weights = read_category_weights()
    method_weights = read_method_weights()
    profile = read_profile()
    dimension_weights = read_dimension_weights()
    feasibility = read_feasibility()
    programme = next(iter(profile_values("programme")), "")
    project_types = profile_values("project type")
    ranked = rank_projects(projects, profile, category_weights, method_weights, dimension_weights, feasibility,
                          programme, project_types)
    write_ranking(ranked)
    print(f"Ranked {len(ranked)} projects in {OUTPUT}")


if __name__ == "__main__":
    main()
