# Research project explorer

Run `make` in this directory to rebuild the analytical store, rankings, CSV exports, and the published site in `public/`. `make serve` previews `public/` at `http://localhost:8000/`, which is exactly what GitHub Pages serves. `make ingest`, `make rank`, `make dashboard`, and `make query` run individual steps; `make help` lists the targets.

`make check` is the gate for any change to the scoring: `make verify-js` reruns the shipped `scripts.js` scorer under node and fails if it disagrees with Python on any score, rank or active dimension, and `make smoke-js` drives the built page in a real DOM (jsdom) to check the tabs, the ranking editors, persistence and the top-5 rule. The browser scorer is a hand-written port of `scripts/scoring.py`, so this is the only thing standing between the two drifting apart.

Published at `/uob/research-projects/`.

## Layers

The pipeline has three layers, so analysis never depends on scraping a generated CSV.

1. **Inputs** — committed text and configuration you edit.
2. **Store** — `public/research.sqlite`, a normalised analytical store rebuilt from the inputs.
3. **Outputs** — CSV exports, plus `public/`, which is the deployable site.

```
data/md/projects/*.md ─┐
data/csv/projects_*.csv ─┴─▶ scripts/ingest.py ─▶ public/research.sqlite ─┬─▶ data/csv/*.csv
                        scripts/schema.sql                           └─▶ public/index.html
data/csv/ranking_weights.csv ─▶ scripts/runs.py (scores, exports)
```

`public/` is committed, because GitHub Pages can only deploy what is in the repository. That makes the SQLite binary part of git history; `make reset` deletes it and the next `make` regenerates all three from the inputs.

## Inputs

- `data/md/projects/` is the canonical Markdown source for the 70 projects. `scripts/taxonomy.py` parses these files and maps their fields into the store.
- `data/csv/projects_supervisors.csv` is the curated supervisor seed: `name`, `birmingham_email`, `birmingham_website`, and `research_focus`. It holds one row per supervisor and covers every supervisor named across the 70 projects. `focus_status` is not a column; `scripts/ingest.py` derives it from the focus text, so a focus line that reads as unverified is never scored as a poor match. `data/md/supervisors/` is not read by the pipeline.
- `data/md/projects/index.md` is a hand-maintained table of contents, so the ingester reads the other 70 files as projects.
- `data/csv/projects_profile.csv` describes your interests and optional methods, programme, skill ratings, project type, skill goals, and exclusions. Your current interests are AI/ML, brain imaging, and language/reading/communication; your preferred method is software & tool development.
- **Position in the ranking *is* the weight.** There is no priority control: drag a subject area or method into the ranked block at the top and it counts 5, the one below it 4, down to 1 for the fifth. Dragging a ranked row out past the fifth stops it counting, so a shorter profile is possible: a three-method profile counts exactly three methods and the rows beneath it weigh 0 rather than picking up spare weight. The same rule applies to interests and methods.
- **Rows can be reordered without dragging.** Each row carries ▲ and ▼ buttons, because HTML5 drag-and-drop does not work on touch screens and a mouse-only control would leave the ranking unusable on a phone. They are focusable and labelled, so the list is keyboard operable too.
- **The CSV priority only sets the default order.** `data/csv/projects_profile.csv` still carries a 0–5 priority column, used solely to sort the default ranking (ties broken by name) before it is reduced to positions 1–5. The resolved weight is stored next to it as `interest.ranked_weight` so SQL consumers see the same number the dashboard scores with.
- **The old multiplier tables are inert.** `data/csv/projects_weights.csv` and `data/csv/projects_method_weights.csv` no longer affect scoring. They are still loaded into the `category_weight` table and surfaced as `csv_multiplier` in `v_supervisor_interest`, purely as a record of the old multipliers.
- `data/csv/ranking_weights.csv` sets the dimension weights. Missing dimensions are omitted and the remaining weights are normalized, so adding a dimension never silently rescales the others.
- `data/csv/projects_feasibility.csv` is a manual 1–5 assessment for skill fit, workload fit, and resource access. Leave ratings blank until reviewed.

## Scoring

| Dimension            | Weight | Active when |
| -------------------- | ------ | ----------- |
| Programme relevance  | 0.40   | your programme is chosen |
| Interest match       | 0.40   | always, from your top 3 ranked subject areas |
| Supervisor focus     | 0.10   | a supervisor has verified research focus |
| Method match         | 0.05   | your top 3 ranked methods are non-empty |
| Feasibility          | 0.05   | all three ratings are filled for every project |

Programme relevance is graded: it scores `100` when the project offers the degree and route you chose, or leaves the route open; `50` when the degree matches a different route or shares a stem; and `0` otherwise. The route after the dash (such as `COMPUTATIONAL neuroscience`) is matched leniently, so it never forces a miss on the degree itself.

Two rules keep scores comparable:

- A dimension with no usable data is omitted rather than scored as zero, and the remaining weights are renormalized. Because the ranking always has a top 3, `Interest match` and `Method match` stay active even when you have ranked nothing yourself; a category at weight 0 never contributes.
- Supervisor focus follows the same rule. Focus is `verified` with no overlap against your profile, it scores `0`. Focus that is `unverified` or missing yields no score at all and leaves the cell blank, so an unverified record is never mistaken for a mismatch.

Each run is stored in `score_run` with a hash of every configuration row, so you can tell whether two rankings were produced from the same settings.

## Store

`scripts/schema.sql` holds the schema. The parts worth knowing:

- `category` is unique on `(name, dimension)`. The two lists no longer overlap: `Software & tool development` is a method only, and the 20 subject areas and 10 methods are disjoint.
- `project_category` and `supervisor_category` are many-to-many bridges that also store the matching `evidence` text, so every label can be traced back to the source line that triggered it.
- `project_supervisor` is many-to-many, so co-supervised projects keep both supervisors.
- Typed configuration tables (`interest`, `method_preference`, `category_weight`, `dimension_weight`, `programme`, `skill`, `skill_goal`, `project_type_preference`, `exclusion`, `feasibility_rating`) replace ad-hoc parsing of the profile CSV.
- Scoring results are stored, not just recomputed: `project_score`, `score_contribution` (the weight behind each dimension), `score_match` (matched preferences with the weight applied), and `supervisor_score`.

Views for the common questions: `latest_run`, `v_ranking_export`, `v_project_export`, `v_contributions`, `v_matches`, `v_supervisor_interest`, `v_supervisor_score`.

```bash
make query    # sqlite3 -header -column public/research.sqlite

SELECT name, focus_match, focus_categories
  FROM v_supervisor_score
 WHERE focus_match IS NOT NULL
 ORDER BY focus_match DESC LIMIT 10;
```

## Outputs

- `data/csv/projects_categories.csv` — project subjects, methods, requirements, programmes, multi-label categories and methods, and the evidence snippet behind each label. Keyword matches are suggestions; review false positives before relying on them.
- `data/csv/projects_rankings.csv` — the 0–100 fit score, dimension scores, matched interests and focus, evidence, requirements to clarify, and each dimension's contribution.
- `data/csv/supervisors_alignment.csv` — one row per supervisor with focus status, focus categories, best interest match, and supervised project count. Generated from the store; edit `data/csv/projects_supervisors.csv` instead.
- `data/csv/projects_supervisors.csv` — the supervisor seed. An input, not an output. It is upserted by name on every build, so edits apply without `make reset`.
- `public/index.html` — the deployed dashboard, shipped as three files: the markup, `styles.css`, and `scripts.js`. Two tabs: **Your preferences** (degree dropdown, ranked interests and methods) and **Results**, which leads with *Find projects* — search, filters and the ranked table — followed by the summary cards, scatter, heatmap, supervisor leaderboard and focus graph that exist to make the ranking easier to read. Preferences live in `localStorage` and the page rescores itself in the browser, so it works from a `file://` URL as well as over HTTP.
- `public/research.sqlite` — the same data as a downloadable SQLite file. The page links to it directly.
- The page head carries `description`, `canonical`, Open Graph and Twitter card tags, so a shared link previews with the title and summary. `scripts/og_image.py` builds `public/og.svg` from the current store — the totals, your ranked categories and their weights — and rasterises it to `public/og.png`, which the `og:image` and `twitter:image` tags point at. The SVG is the source and the PNG is the artefact, so a link preview is a 1200×630 raster that cannot drift from the page. If no rasteriser is installed, the page still ships and the preview falls back to a text card.

## Publishing

`public/` is the deployable folder and follows the same shape as the other landing pages in this repository.

1. `make` regenerates `public/index.html` and `public/research.sqlite`.
2. `make serve` previews it locally.
3. `scripts/build-docs.sh` copies `public/` to `docs/uob/research-projects/` and writes `.nojekyll`.
4. `.github/workflows/ci-github-pages.yaml` deploys `docs/` and triggers on changes under this `public/` folder.

Because the store is a binary committed to git, prefer `make` over `make reset` unless you need a clean rebuild: `reset` throws the file away, and the next build reproduces it byte for byte apart from the score run timestamp.

## Interpretation

`Score` is a ranking aid, not a project-quality measure. The `Information completeness (%)` view measures documentation coverage, not how ready you are to take on a project. Requirements and source completeness are reported separately from personal fit.

Review `Requirement review`, `Skills & requirements`, `Ethical approval status`, methods, and any missing practical or module recommendations before deciding. Project descriptions do not consistently state prerequisites or equipment access, so confirm those with supervisors.
