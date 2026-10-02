"""HTML shell for the published dashboard: two tabs, one payload."""

from __future__ import annotations

from pathlib import Path

from preferences_js import PREFERENCES_JS
from script import SCRIPT
from eligibility_js import ELIGIBILITY_JS
from ranking_js import RANKING_JS
from scoring_js import SCORING_JS
from style import STYLE


OUTPUT = Path(__file__).parent.parent / "public" / "index.html"
SITE_URL = "https://hieudoanm.github.io/uob/research-projects/"
DESCRIPTION = ("Rank doctoral research projects by your interests, methods, supervisor research focus "
               "and programme, then download the whole normalised dataset.")

HEADER = """
<h1>Research project explorer</h1>
<div class="muted">70 doctoral research projects with supervisor research focus, interests, methods,
requirements and programmes. Set your degree and rank what you care about, then read the results.
The full normalised dataset is published alongside this page as
<a href="research.sqlite" download>research.sqlite</a>.</div>
"""

SETUP_PANEL = """
<section>
  <h2>Your degree</h2>
  <p class="muted">Programme fit scores a project 100 when it is open to the programme you pick.
  Choose <b>Any programme</b> to drop the dimension from the ranking entirely.</p>
  <label>Degree or programme<select id="programme"></select></label>
</section>

<section>
  <h2>Rank your interests</h2>
  <p class="muted">Drag a row into the block at the top to rank it, or use the ▲ and ▼ buttons.
  There is no separate priority control: your <b>first choice counts 3</b>, the second 2, the third 1.
  Anything past your <b>top 3</b> counts 0, so it is still listed but never counted.</p>
  <div class="setup-actions">
    <button class="action primary" id="to-results" type="button">See results</button>
    <button class="action" id="reset" type="button">Reset to repository defaults</button>
    <span class="muted" id="setup-summary"></span>
  </div>
  <div class="setup">
    <div><h2>Subject areas</h2><ul class="rank-list" id="interest-list"></ul></div>
    <div><h2>Methods</h2><ul class="rank-list" id="method-list"></ul>
      <p class="family-note">Methods follow the same rule: only the top 3 count.</p></div>
  </div>
</section>
"""

RESULTS_PANEL = """
<section class="find">
  <h2>Find projects</h2>
  <div class="filters">
    <label>Search title, supervisor or requirements<input id="search" type="search" placeholder="e.g. EEG, Python, language"></label>
    <label>Project type<select id="type"><option value="">All types</option></select></label>
    <label>Interest area<select id="interest"><option value="">All preferred interests</option></select></label>
    <label>Research method<select id="method"><option value="">All methods</option></select></label>
    <label>Minimum interest fit<input id="minimum" type="range" min="0" max="100" value="0"><span id="minimum-value">0%</span></label>
    <label>Minimum supervisor focus fit<input id="minimum-focus" type="range" min="0" max="100" value="0"><span id="minimum-focus-value">0%</span></label>
  </div>
  <p id="result-count" class="muted"></p>
  <div class="table-wrap"><table><thead><tr><th>Rank / fit</th><th>Project</th><th>Supervisor</th>
  <th>Categories</th><th>Methods</th><th>Why it matched</th><th>Requirements to review</th><th>Ethics</th></tr></thead>
  <tbody id="projects"></tbody></table></div>
</section>

<div class="muted">Score = <span id="active-dimensions"></span>.</div>
<div class="cards">
  <div class="card"><b>Projects</b><div id="project-count"></div></div>
  <div class="card"><b>Best interest fit</b><div id="best-fit"></div></div>
  <div class="card"><b>Best supervisor focus</b><div id="best-focus"></div></div>
  <div class="card"><b>Feasibility assessed</b><div id="feasibility-count"></div></div>
</div>
<p class="notice">Supervisor focus fit scores a supervisor's own research agenda against your
interests, not the topic of the project. An unverified focus is left blank, never counted as a
mismatch. Scatter plot shows interest fit against how completely the source documents requirements.</p>

<div class="charts">
  <section><h2>Interest fit vs. information completeness</h2><div id="scatter"></div></section>
  <section><h2>Interest heatmap &middot; top 20</h2><div id="heatmap"></div></section>
</div>

<section>
  <h2>Supervisor research focus</h2>
  <div class="muted">Each supervisor scored on their own stated research agenda against your interests.
  This is independent of the projects they happen to supervise.</div>
  <p><label>Search supervisors<input id="supervisor-search" type="search" placeholder="e.g. language, sleep, autism"></label></p>
  <div class="table-wrap"><table><thead><tr><th>Supervisor</th><th>Focus fit</th><th>Projects</th>
  <th>Research focus</th><th>Matched interests</th><th>Contact</th></tr></thead>
  <tbody id="supervisors"></tbody></table></div>
</section>

<section>
  <h2>Supervisor and interest graph</h2>
  <div class="muted">Edges join a supervisor to your preferred interests, using the supervisor's own
  research focus. Edge width is the ranked weight. Top 20 supervisors by interests covered.</div>
  <div class="network" id="network"></div>
</section>
"""

# The sentinels let scripts/verify_js.py run the scoring region on its own in
# node, without a DOM. Keep them on one line so the regex stays simple. The
# payload is declared first because the scoring region reads `data` as it loads.
SCRIPTS = ("const data=__DATA__;"
           f"/* scoring:start */{SCORING_JS}{ELIGIBILITY_JS}{RANKING_JS}/* scoring:end */"
           f"{SCRIPT}{PREFERENCES_JS}")

PAGE = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Research project explorer</title>
<meta name="description" content="{DESCRIPTION}">
<link rel="canonical" href="{SITE_URL}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="UOB research projects">
<meta property="og:title" content="Research project explorer">
<meta property="og:description" content="{DESCRIPTION}">
<meta property="og:url" content="{SITE_URL}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Research project explorer">
<meta name="twitter:description" content="{DESCRIPTION}">
<!--og:image-->
<link rel="stylesheet" href="styles.css"></head>
<body><main>{HEADER}
<div class="tabs" role="tablist">
  <button role="tab" id="tab-setup" aria-controls="panel-setup" aria-selected="true" type="button">1 &middot; Your preferences</button>
  <button role="tab" id="tab-results" aria-controls="panel-results" aria-selected="false" type="button">2 &middot; Results</button>
</div>
<div class="panel" id="panel-setup" role="tabpanel" aria-labelledby="tab-setup">{SETUP_PANEL}</div>
<div class="panel" id="panel-results" role="tabpanel" aria-labelledby="tab-results" hidden>{RESULTS_PANEL}</div>
</main><script src="scripts.js"></script></body></html>
"""


OG_IMAGE_META = (f'<meta property="og:image" content="{SITE_URL}og.png">\n'
                 '<meta property="og:image:type" content="image/png">\n'
                 f'<meta property="og:image:width" content="1200">\n'
                 f'<meta property="og:image:height" content="630">\n'
                 f'<meta property="og:image:alt" content="{DESCRIPTION}">\n'
                 '<meta name="twitter:image" content="og.png">')


def page(og_image: bool = False) -> str:
    """Return the dashboard document; behaviour and styling live in sibling files.

    The og:image tags are only emitted when the card was actually rasterised,
    because a preview pointing at a missing file is worse than no preview image.
    """
    return PAGE.replace("<!--og:image-->", OG_IMAGE_META if og_image else "")


def styles() -> str:
    """Return the stylesheet served next to the dashboard."""
    return STYLE


def scripts(payload: str) -> str:
    """Return the script file with the JSON payload injected."""
    return SCRIPTS.replace("__DATA__", payload)
