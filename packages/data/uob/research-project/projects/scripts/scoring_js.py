"""Client-side port of `scoring.py`.

GitHub Pages serves static files only, so the page rescores itself in the
browser. These functions mirror `scoring.py` line for line; `make verify-js`
fails if the two ever disagree on the committed profile.
"""

SCORING_JS = r"""
/** Split a `; ` joined list column from the payload into real values. */
function splitList(value) {
  return value ? value.split("; ").filter(Boolean) : [];
}

const FAMILY_ENTRIES = Object.entries(data.families);

function familyLabels(name) {
  const hit = FAMILY_ENTRIES.find(([, labels]) => labels.includes(name));
  return hit ? hit[1] : [name];
}

function categoryFamily(name) {
  const hit = FAMILY_ENTRIES.find(([, labels]) => labels.includes(name));
  return hit ? hit[0] : name;
}

/** Mirrors scoring.family_match: the strongest preferred label in one family. */
function familyMatch(preferred, categories, weights) {
  const direct = preferred.filter((name) => categories.has(name));
  const family = new Set();
  preferred.forEach((name) => familyLabels(name).forEach((label) => family.add(label)));
  let tags = new Set(direct);
  if (direct.length === 0 && preferred.length === 1) {
    tags = new Set([...categories].filter((name) => family.has(name)));
  }
  let candidates = preferred.filter((name) => tags.has(name));
  if (candidates.length === 0 && tags.size > 0) candidates = preferred.slice();
  if (candidates.length === 0) return { best: null, tags: [] };
  // Python's max() keeps the first of equal keys, so only a strict > advances.
  let best = candidates[0];
  let bestKey = weights[best];
  for (const name of candidates.slice(1)) {
    if (weights[name] > bestKey) { best = name; bestKey = weights[name]; }
  }
  return { best, tags: [...tags].sort() };
}

/** Mirrors scoring.preference_scores, capping duplicate labels per family. */
function preferenceScores(categories, weights) {
  const maxima = {};
  const grouped = new Map();
  // A zero weight means the category sits outside the top three.
  const active = {};
  Object.keys(weights).forEach((name) => {
    if (weights[name] > 0) active[name] = weights[name];
  });
  for (const name of Object.keys(active)) {
    const family = categoryFamily(name);
    maxima[family] = Math.max(maxima[family] || 0, active[name]);
    if (!grouped.has(family)) grouped.set(family, []);
    grouped.get(family).push(name);
  }
  const matched = [];
  const contributions = {};
  for (const [, preferred] of grouped) {
    const result = familyMatch(preferred, categories, active);
    if (result.best) {
      result.tags.forEach((tag) => matched.push(tag));
      contributions[result.best] = active[result.best];
    }
  }
  const total = Object.values(maxima).reduce((sum, value) => sum + value, 0);
  if (!total) return { score: null, matched: [], contributions: {} };
  const earned = Object.values(contributions).reduce((sum, value) => sum + value, 0);
  return { score: (100 * earned) / total, matched: [...new Set(matched)].sort(), contributions };
}

/** Mirrors scoring.supervisor_focus_score: unknown focus is never a zero. */
function supervisorFocusScore(entries, cfg) {
  const verified = entries.filter((entry) => entry.status === "verified");
  if (verified.length === 0) return { score: null, matched: [], contributions: {} };
  const covered = new Set();
  verified.forEach((entry) => entry.categories.forEach((name) => covered.add(name)));
  if (covered.size === 0) return { score: null, matched: [], contributions: {} };
  return preferenceScores(covered, cfg.interest);
}

function meanFeasibility(project) {
  const values = Object.values(project.feasibility || {});
  if (values.length === 0) return null;
  return (20 * values.reduce((sum, value) => sum + value, 0)) / values.length;
}

/** Mirrors scoring.combine: weight only the dimensions that have a value. */
function combine(scores, cfg) {
  const active = Object.entries(scores)
    .filter(([name, score]) => score !== null && (cfg.dimension[name] || 0) > 0);
  const totalWeight = active.reduce((sum, [name]) => sum + cfg.dimension[name], 0);
  if (!totalWeight) return { total: 0, active: [] };
  const weighted = active.reduce((sum, [name, score]) => sum + score * cfg.dimension[name], 0);
  return { total: weighted / totalWeight, active: active.map(([name]) => name) };
}

/** Index the payload's supervisors by name, with their focus categories. */
function supervisorIndex() {
  const index = {};
  data.supervisors.forEach((entry) => {
    index[entry.name] = { status: entry.focus_status || "missing", categories: splitList(entry.focus_categories) };
  });
  return index;
}

/** Rebuild a project's supervisor entries, matching the view's parallel lists. */
function supervisorEntries(project, index) {
  const names = splitList(project.supervisors);
  const statuses = splitList(project.supervisor_focus_status);
  return names.map((name, position) => index[name]
    || { status: statuses[position] || "missing", categories: [] });
}

/** Mirrors scoring.dimension_scores: leave a dimension null when data is absent. */
function dimensionScores(project, entries, cfg, feasibilityEnabled) {
  const subjects = new Set(splitList(project.categories));
  const methods = new Set(splitList(project.methods));
  const interest = preferenceScores(subjects, cfg.interest);
  const method = preferenceScores(methods, cfg.method);
  const focus = supervisorFocusScore(entries, cfg);  const scores = {
    "Interest match": interest.score,
    "Method match": method.score,
    "Supervisor focus match": focus.score,
    "Feasibility": feasibilityEnabled ? meanFeasibility(project) : null,
    "Programme relevance": programmeFit(project, cfg),
    "Project type fit": projectTypeFit(project, cfg),
  };
  return { scores, interest, method, focus };
}

/** Rescore every project and return them ranked, best fit first. */
function rescoreProjects(cfg) {
  const index = supervisorIndex();
  const kept = data.projects.filter((project) => !isExcluded(project, cfg));
  const rated = kept.length > 0
    && kept.every((project) => Object.keys(project.feasibility || {}).length === 3);
  const rows = kept.map((project) => {
    const entries = supervisorEntries(project, index);
    const parts = dimensionScores(project, entries, cfg, rated);
    const combined = combine(parts.scores, cfg);
    return { project, ...parts, total: combined.total, active: combined.active, entries };
  });
  rows.sort((a, b) => (b.total - a.total)
    || a.project.title.toLowerCase().localeCompare(b.project.title.toLowerCase()));
  rows.forEach((row, position) => { row.rank = position + 1; });
  return rows;
}

/** Rescore each supervisor's own agenda, as the leaderboard shows it. */
function rescoreSupervisors(cfg) {
  return data.supervisors.map((entry) => {
    if (entry.focus_status !== "verified" || !entry.focus_categories) {
      return { ...entry, focus_match: null, matched: [] };
    }
    const result = preferenceScores(new Set(splitList(entry.focus_categories)), cfg.interest);
    return { ...entry, focus_match: result.score, matched: result.matched };
  }).sort((a, b) => {
    if (a.focus_match === null && b.focus_match === null) return a.name.localeCompare(b.name);
    if (a.focus_match === null) return 1;
    if (b.focus_match === null) return -1;
    return (b.focus_match - a.focus_match) || (b.project_count || 0) - (a.project_count || 0)
      || a.name.localeCompare(b.name);
  });
}
"""
