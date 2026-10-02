# Research project explorer

Run `make` in this directory to rebuild project categories, rankings, and the interactive dashboard at `reports/projects_dashboard.html`. Open that HTML file in a browser. `make categorize`, `make rank`, and `make dashboard` run individual steps; `make help` lists the targets.

## Inputs

- `md/projects/` is the canonical Markdown source for the 70 projects. The category script reads these files directly.
- `csv/projects_profile.csv` describes your interests and optional methods, programme, skill ratings, project type, skill goals, and exclusions. Interest and method priorities use a 0–5 scale. Your current interest priorities are AI/ML, language development, brain imaging, and software/tool development. General language has a lower priority and is grouped with language development so the two labels cannot double-count. Software & tool development is now a subject category (not a method).
- `csv/projects_weights.csv` contains per-subject-category multipliers. It starts at `1.0` for every category; adjust a category to zero to ignore it or raise it to increase its influence. The profile expresses what you care about; this file adjusts how much each category contributes.
- `csv/projects_method_weights.csv` contains per-method multipliers. It starts at `1.0` for every method; adjust a method to zero to ignore it or raise it to increase its influence.
- `csv/ranking_weights.csv` sets the relative weights for interest, method, feasibility, and programme fit. Missing dimensions are omitted and the remaining weights are normalized. Feasibility is included in the overall score only when all three ratings are filled for every project, so a partly rated list does not create incomparable totals.
- `csv/projects_feasibility.csv` is a manual 1–5 assessment for skill fit, workload fit, and resource access. Leave ratings blank until reviewed with project details or a supervisor.

## Outputs and interpretation

- `csv/projects_categories.csv` contains project subjects, methods, requirements, programme information, multi-label categories, multi-label methods, and text snippets that triggered each label. Keyword matches are suggestions; review false positives before relying on them.
- `csv/projects_rankings.csv` contains the overall 0–100 fit score, dimension scores, matched interests, matched methods, source evidence, requirements to clarify, and the contribution behind the score. Requirements and source completeness are shown separately from personal fit.
- `csv/projects_supervisors.csv` contains supervisor contact and research-focus information. The dashboard links each project back to its Markdown source and shows interest comparisons, information completeness, and a supervisor-to-interest graph.

`Score` is a ranking aid, not a project-quality measure. It uses the interest profile first. Method fit counts only after you add method preferences; programme fit counts only after you enter your programme; feasibility counts only after the full project list has been rated. The `Information completeness (%)` view measures documentation coverage, not how ready you are to take on a project.

Review `Requirement review`, `Skills & requirements`, `Ethical approval status`, methods, and any missing practical/module recommendations before deciding. Project descriptions do not consistently state prerequisites or equipment access, so confirm those with supervisors.
