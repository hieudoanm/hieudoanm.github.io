"""Score projects against interests, supervisor focus and assessed fit."""

from __future__ import annotations

import re

import taxonomy as T
from config import Configuration


INTEREST = "Interest match"
METHOD = "Method match"
SUPERVISOR_FOCUS = "Supervisor focus match"
FEASIBILITY = "Feasibility"
PROGRAMME = "Programme relevance"
PROJECT_TYPE = "Project type fit"

PROGRAMME_STOPWORDS = frozenset({"msc", "mres", "bsc", "and", "&", "of", "the", "in", "a"})

COMPLETENESS_FIELDS = ("project_type", "ethics_status", "skills_requirements",
                       "recommended_practical", "recommended_data_module")


def family_match(preferred: list[str], categories: set[str],
                 weights: dict[str, float]) -> tuple[str | None, list[str]]:
    """Return the strongest preferred label in one overlap family and the tags it matched."""
    direct = [name for name in preferred if name in categories]
    family_labels = set().union(*(T.family_labels(name) for name in preferred))
    tags = set(direct)
    if not direct and len(preferred) == 1:
        tags = categories & family_labels
    candidates = [name for name in preferred if name in tags]
    if not candidates and tags:
        candidates = list(preferred)
    if not candidates:
        return None, []
    best = max(candidates, key=lambda name: weights[name])
    return best, sorted(tags)


def preference_scores(categories: set[str],
                      weights: dict[str, float]) -> tuple[float | None, list[str], dict[str, float]]:
    """Score matching preferences, capping duplicate labels per family.

    A weight of 0 means the category sits outside the top three, so it is neither
    reported as a match nor counted towards the total.
    """
    active = {name: weight for name, weight in weights.items() if weight > 0}
    maxima: dict[str, float] = {}
    grouped: dict[str, list[str]] = {}
    for name, weight in active.items():
        family = T.category_family(name)
        maxima[family] = max(maxima.get(family, 0), weight)
        grouped.setdefault(family, []).append(name)
    matched: list[str] = []
    contributions: dict[str, float] = {}
    for preferred in grouped.values():
        best, tags = family_match(preferred, categories, active)
        if best:
            matched.extend(tags)
            contributions[best] = active[best]
    total = sum(maxima.values())
    if not total:
        return None, [], {}
    return 100 * sum(contributions.values()) / total, sorted(set(matched)), contributions


def supervisor_focus_score(supervisors: list[dict], config: Configuration):
    """Score a project by its supervisors' focus; unknown focus is never a zero."""
    verified = [entry for entry in supervisors if entry["focus_status"] == "verified"]
    if not verified:
        return None, [], {}
    covered = set().union(*(entry["categories"] for entry in verified))
    if not covered:
        return None, [], {}
    return preference_scores(covered, config.interest)


def mean_feasibility(config: Configuration, project_id: int) -> float | None:
    """Average only the ratings that were actually entered."""
    ratings = config.feasibility.get(project_id, {})
    return 20 * sum(ratings.values()) / len(ratings) if ratings else None


def programme_tokens(value: str) -> frozenset[str]:
    """Tokenise a programme name, dropping punctuation and filler words."""
    return frozenset(re.findall(r"[a-z0-9]+", value.casefold())) - PROGRAMME_STOPWORDS


def split_programme(value: str) -> tuple[frozenset[str], frozenset[str]]:
    """Split a programme into its base degree and the route after the dash."""
    base, _, route = value.partition(" - ")
    return programme_tokens(base), programme_tokens(route)


def programme_fit(project: dict, config: Configuration) -> float | None:
    """Score the programme field against the programme you entered (graded).

    100 when the degree and route agree, or the project leaves the route open;
    50 when the degree matches a different route or shares a stem; else 0. The
    'COMPUTATIONAL neuroscience' suffix is a route, so it never forces a miss.
    """
    if not config.programme:
        return None
    target_base, target_route = split_programme(config.programme)
    if not target_base:
        return None
    best = 0.0
    for name in project.get("programmes") or []:
        base, route = split_programme(name)
        if not base:
            continue
        if base == target_base:
            open_route = not route or route == target_route
            best = max(best, 100.0 if open_route else 50.0)
        elif len(base & target_base) >= 2:
            best = max(best, 50.0)
    return best


def project_type_fit(project: dict, config: Configuration) -> float | None:
    """Score the project type against the types you listed."""
    if not config.project_types:
        return None
    options = {value.casefold() for item in config.project_types for value in item.split(";")}
    return 100.0 if (project.get("project_type") or "").casefold() in options else 0.0


def dimension_scores(project: dict, config: Configuration, feasibility_enabled: bool) -> dict:
    """Compute every dimension the current data supports, leaving gaps as None."""
    interest, _, _ = preference_scores(set(project["subjects"]), config.interest)
    method, _, _ = preference_scores(set(project["methods"]), config.method)
    scores = {
        INTEREST: interest,
        METHOD: method,
        SUPERVISOR_FOCUS: supervisor_focus_score(project.get("supervisor_details", []), config)[0],
        FEASIBILITY: mean_feasibility(config, project["id"]),
        PROGRAMME: programme_fit(project, config),
        PROJECT_TYPE: project_type_fit(project, config),
    }
    return scores if feasibility_enabled else {**scores, FEASIBILITY: None}


def combine(scores: dict, config: Configuration) -> tuple[float, list[str]]:
    """Weight the available dimensions into a total and list what counted."""
    active = [(name, score, config.dimension_weight.get(name, 0)) for name, score in scores.items()
              if score is not None and config.dimension_weight.get(name, 0) > 0]
    total_weight = sum(weight for _, _, weight in active)
    if not total_weight:
        return 0.0, []
    return sum(score * weight for _, score, weight in active) / total_weight, [n for n, _, _ in active]


def is_excluded(project: dict, config: Configuration) -> bool:
    """Apply only explicit exclusions; empty rules exclude nothing."""
    if config.exclusions.get("category", set()) & {name.casefold() for name in project["subjects"]}:
        return True
    if (project.get("project_type") or "").casefold() in config.exclusions.get("project_type", set()):
        return True
    ethics = (project.get("ethics_status") or "").casefold()
    return any(value in ethics for value in config.exclusions.get("ethics_status", set()))


def requirement_review(project: dict) -> str:
    """List missing or uncertain requirements without pretending to assess fit."""
    flags = [label for field, label in (
        ("skills_requirements", "skills/requirements not listed"),
        ("recommended_practical", "recommended practical not listed"),
        ("recommended_data_module", "recommended data-science module not listed"),
    ) if not project.get(field)]
    ethics = project.get("ethics_status") or ""
    if "approved" not in ethics.casefold():
        flags.append(f"ethics: {ethics or 'status not listed'}")
    return "; ".join(flags) if flags else "No obvious source-data gaps"


def information_completeness(project: dict) -> float:
    """Measure whether key project details are documented, not personal fit."""
    present = sum(bool((project.get(field) or "").strip()) for field in COMPLETENESS_FIELDS)
    return 100 * present / len(COMPLETENESS_FIELDS)
