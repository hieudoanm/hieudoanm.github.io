/**
 * A suffix array: the sorted list of every suffix of a string, plus the
 * ranks used to build it.
 *
 * The doubling algorithm is used rather than a full suffix tree, because it is
 * the version that can actually be animated in a page.
 */

export interface SuffixStep {
  note: string;
  /** Current rank of each starting position. */
  ranks: number[];
  /** Current ordering of positions. */
  order: number[];
  /** The suffix starting at the position just moved. */
  focus?: number;
}

/** Naive suffix ordering by direct string comparison, for small inputs. */
export const naiveSuffixOrder = (text: string): number[] =>
  Array.from({ length: text.length }, (_, i) => i).sort((a, b) =>
    text.slice(a) < text.slice(b) ? -1 : 1
  );

/** The doubling construction: O(n log^2 n) with a comparison sort per round. */
export const buildSuffixArray = (text: string): SuffixStep[] => {
  const n = text.length;
  if (n === 0) return [];
  let ranks = Array.from(text, (c) => c.charCodeAt(0));
  let order = Array.from({ length: n }, (_, i) => i);
  const steps: SuffixStep[] = [];

  for (let k = 1; ; k *= 2) {
    order.sort((a, b) => {
      if (ranks[a] !== ranks[b]) return ranks[a] - ranks[b];
      const ra = a + k < n ? ranks[a + k] : -1;
      const rb = b + k < n ? ranks[b + k] : -1;
      return ra - rb;
    });
    const next = new Array<number>(n);
    next[order[0]] = 0;
    for (let i = 1; i < n; i++) {
      const a = order[i - 1];
      const b = order[i];
      const same =
        ranks[a] === ranks[b] &&
        (a + k < n ? ranks[a + k] : -1) === (b + k < n ? ranks[b + k] : -1);
      next[b] = next[a] + (same ? 0 : 1);
    }
    ranks = next;
    steps.push({
      note: `Compare 2^${Math.log2(k)} = ${k}-character prefixes and re-rank.`,
      ranks: [...ranks],
      order: [...order],
      focus: order[n - 1],
    });
    if (ranks[order[n - 1]] === n - 1) break;
  }
  return steps;
};

/** How many prefixes a given starting position shares with the next one. */
export const lcpOf = (text: string, a: number, b: number): number => {
  let i = 0;
  while (
    a + i < text.length &&
    b + i < text.length &&
    text[a + i] === text[b + i]
  )
    i++;
  return i;
};
