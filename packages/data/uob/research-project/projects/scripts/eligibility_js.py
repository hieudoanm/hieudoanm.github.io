"""Client-side port of the project eligibility and fit helpers in `scoring.py`.

These are the checks that decide whether a project is scored at all, and the two
single-value dimensions. They are emitted inside the scoring region so
`make verify-js` exercises them too.
"""

ELIGIBILITY_JS = r"""
const PROGRAMME_STOPWORDS = new Set(["msc", "mres", "bsc", "and", "&", "of", "the", "in", "a"]);

/** Mirrors scoring.programme_tokens: drop punctuation and filler words. */
function programmeTokens(value) {
  const words = (value || "").toLowerCase().match(/[a-z0-9]+/g) || [];
  return [...new Set(words)].filter((token) => !PROGRAMME_STOPWORDS.has(token));
}

/** Mirrors scoring.split_programme: base degree and route after the dash. */
function splitProgramme(value) {
  const [base, route = ""] = (value || "").split(" - ");
  return [new Set(programmeTokens(base)), new Set(programmeTokens(route))];
}

function intersectionSize(left, right) {
  let count = 0;
  left.forEach((value) => { if (right.has(value)) count += 1; });
  return count;
}

function sameSet(left, right) {
  return left.size === right.size && intersectionSize(left, right) === left.size;
}

/** Mirrors scoring.programme_fit: graded 0/50/100, ignoring the route suffix. */
function programmeFit(project, cfg) {
  if (!cfg.programme) return null;
  const [targetBase, targetRoute] = splitProgramme(cfg.programme);
  if (targetBase.size === 0) return null;
  let best = 0;
  (project.programmes || []).forEach((name) => {
    const [base, route] = splitProgramme(name);
    if (base.size === 0) return;
    if (sameSet(base, targetBase)) {
      const openRoute = route.size === 0 || sameSet(route, targetRoute);
      best = Math.max(best, openRoute ? 100 : 50);
    } else if (intersectionSize(base, targetBase) >= 2) {
      best = Math.max(best, 50);
    }
  });
  return best;
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
