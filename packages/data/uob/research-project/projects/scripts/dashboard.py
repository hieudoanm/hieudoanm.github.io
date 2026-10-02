"""Build the self-contained interactive dashboard from the store."""

from __future__ import annotations

import json

import config
import db
import export
import og_image
import preferences
import template
import taxonomy as T


PROJECT_COLUMNS = (
    "rank", "total", "interest_match", "supervisor_focus_match", "feasibility",
    "information_completeness", "method_match", "programme_fit", "project_type_fit",
    "title", "source_file", "supervisors", "project_type", "ethics_status",
    "categories", "methods", "matching_interests", "matching_methods", "matching_supervisor_focus",
    "supervisor_research_focus", "supervisor_focus_status", "supervisor_emails", "supervisor_websites",
    "requirement_review", "project_contributions", "supervisor_contributions", "topic",
    "methodology", "skills_requirements", "recommended_practical", "recommended_data_module",
    "programmes", "feasibility",
)

SUPERVISOR_COLUMNS = ("name", "focus_match", "project_count", "focus_categories", "focus_status",
                      "email", "website", "research_focus", "project_titles")

# Source links must be absolute: the page is published under docs/, where a
# relative ../data/md/projects/ path would resolve outside the deployed site.
SOURCE_BASE = ("https://github.com/hieudoanm/hieudoanm.github.io/blob/master/"
               "packages/data/uob/research-project/projects/data/md/projects/")


def select(rows: list[dict], columns: tuple[str, ...]) -> list[dict]:
    """Keep only the columns the dashboard embeds, dropping nulls."""
    return [{key: row.get(key) for key in columns if row.get(key) is not None} for row in rows]


def load_bundle(connection) -> dict:
    """Assemble the dashboard payload from the most recent run."""
    run = db.fetch_one(connection, "SELECT id, created_at, config_hash, active_dimensions FROM latest_run")
    if run is None:
        raise ValueError("No score run found; run `make rank` first")
    projects = export.rows_of(connection, "v_ranking_export", "rank")
    preferences.attach_project_inputs(connection, projects)
    supervisors = export.rows_of(connection, "v_supervisor_score",
                                 "focus_match IS NULL, focus_match DESC, project_count DESC, name")
    interests = [row["name"] for row in db.fetch_all(
        connection, "SELECT c.name FROM interest i JOIN category c ON c.id = i.category_id "
                     "WHERE i.priority > 0 ORDER BY c.name")]
    methods = [row["name"] for row in db.fetch_all(
        connection, "SELECT name FROM category WHERE dimension = 'method' ORDER BY sort_order")]
    return {"run": dict(run),
            "projects": select(projects, PROJECT_COLUMNS),
            "supervisors": select(supervisors, SUPERVISOR_COLUMNS),
            "interests": interests,
            "methods": methods,
            "source_base": SOURCE_BASE,
            "config": preferences.browser_config(connection, config.read_configuration(connection)),
            "families": {family: sorted(labels) for family, labels in T.OVERLAP_FAMILIES.items()}}


def og_counts(bundle: dict) -> tuple[int, int, int]:
    """The totals printed on the preview card."""
    return (len(bundle["projects"]), len(bundle["supervisors"]),
            len(bundle["config"]["subject_categories"]))


def og_ranked(bundle: dict) -> list[str]:
    """The default ranking, strongest first, as shown on the preview card."""
    return config.ranked_order(bundle["config"]["interest"])


def build_dashboard(path=template.OUTPUT) -> str:
    """Write the dashboard and its sibling assets to the published location.

    index.html stays a readable shell: the payload and behaviour live in
    scripts.js and the styling in styles.css, so neither has to be edited in
    place on the published site.
    """
    with db.session(read_only=True) as connection:
        bundle = load_bundle(connection)
    payload = json.dumps(bundle, ensure_ascii=False).replace("<", "\\u003c")
    path.parent.mkdir(parents=True, exist_ok=True)
    has_card = og_image.build(og_counts(bundle), og_ranked(bundle))
    path.write_text(template.page(has_card), encoding="utf-8")
    path.with_name("styles.css").write_text(template.styles(), encoding="utf-8")
    path.with_name("scripts.js").write_text(template.scripts(payload), encoding="utf-8")
    return path


def main() -> None:
    """Rebuild the dashboard from the current store."""
    with db.session(read_only=True) as connection:
        count = len(load_bundle(connection)["projects"])
    print(f"Built dashboard for {count} projects at {build_dashboard()}")


if __name__ == "__main__":
    main()
