"""Client-side port of the project eligibility and fit helpers in `scoring.py`.

These are the checks that decide whether a project is scored at all, and the two
single-value dimensions. They are emitted inside the scoring region so
`make verify-js` exercises them too.
"""

ELIGIBILITY_JS = r"""
/** Mirrors scoring.programme_fit: a project must offer the chosen programme. */
function programmeFit(project, cfg) {
  if (!cfg.programme) return null;
  const target = cfg.programme.toLowerCase();
  const names = project.programmes || [];
  return names.some((name) => name.toLowerCase().includes(target)) ? 100 : 0;
}

/** Mirrors scoring.project_type_fit. */
function projectTypeFit(project, cfg) {
  if (!cfg.project_types || cfg.project_types.length === 0) return null;
  const options = new Set(cfg.project_types.flatMap((item) => item.split(";")).map((v) => v.toLowerCase()));
  return options.has((project.project_type || "").toLowerCase()) ? 100 : 0;
}

/** Mirrors scoring.is_excluded. */
function isExcluded(project, cfg) {
  const rules = cfg.exclusions || {};
  const excluded = (kind) => (rules[kind] || []).map((value) => value.toLowerCase());
  const subjects = splitList(project.categories);
  if (subjects.some((name) => excluded("category").includes(name.toLowerCase()))) return true;
  if (excluded("project_type").includes((project.project_type || "").toLowerCase())) return true;
  const ethics = (project.ethics_status || "").toLowerCase();
  return excluded("ethics_status").some((value) => ethics.includes(value));
}
"""
