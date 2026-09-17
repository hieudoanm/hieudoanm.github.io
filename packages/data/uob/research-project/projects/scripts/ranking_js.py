"""Client-side port of `config.ranked_weights`.

The dashboard ranks interests and methods by dragging rows into the block at
the top of the list: first choice counts 3, second 2, third 1. Anything past the
top three weighs 0. Emitted inside the scoring region so `make verify-js`
covers it.
"""

RANKING_JS = r"""
const MAX_RANKED = 3;

/** Mirrors config.ranked_weights: the position in the list is the weight. */
function rankedWeights(ordered) {
  const weights = {};
  ordered.forEach((name, rank) => {
    weights[name] = Math.max(MAX_RANKED - rank, 0);
  });
  return weights;
}

/** Mirrors config.ranked_order: the ranked categories, strongest first. */
function rankedOrder(weights) {
  return Object.keys(weights).filter((name) => weights[name] > 0)
    .sort((a, b) => weights[b] - weights[a] || (a < b ? -1 : a > b ? 1 : 0));
}

/** The categories nobody ranked yet, left in the order the taxonomy lists them. */
function unrankedRest(names, ranked) {
  return names.filter((name) => !ranked.includes(name));
}

/** The rows worth reporting: the ones that landed inside the top three. */
function rankedTop(weights) {
  return Object.keys(weights).filter((name) => weights[name] > 0)
    .sort((a, b) => weights[b] - weights[a]);
}
"""
