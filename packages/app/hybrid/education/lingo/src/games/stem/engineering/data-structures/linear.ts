/**
 * The linear, array-backed structures: array, stack, and queue.
 *
 * They share one push/pop vocabulary and one ring-buffer-free backing store,
 * so they are modelled together and each simulator reuses the same reducer.
 */

export interface Step {
  label: string;
  detail: string;
  items: (number | null)[];
  highlight: number[];
  capacity: number;
  comparisons: number;
  /** Live element count. A front removal leaves a null hole, so the highest
   * filled index is not a reliable occupancy signal. */
  count: number;
}

const occupancy = (items: readonly (number | null)[]): number =>
  items.reduce<number>((n, v) => (v === null ? n : n + 1), 0);

export const empty = (capacity: number): (number | null)[] =>
  Array.from({ length: capacity }, () => null);

export const push = (
  items: (number | null)[],
  value: number,
  label: string,
  detail: string
): Step => {
  const next = [...items];
  const at = next.indexOf(null);
  if (at === -1) {
    return {
      label,
      detail: 'Overflow — the structure is full.',
      items,
      highlight: [],
      capacity: next.length,
      comparisons: 0,
      count: occupancy(items),
    };
  }
  next[at] = value;
  return {
    label,
    detail,
    items: next,
    highlight: [at],
    capacity: next.length,
    comparisons: 0,
    count: occupancy(next),
  };
};

const firstFilled = (items: readonly (number | null)[]): number =>
  items.findIndex((v) => v !== null);

const lastFilled = (items: readonly (number | null)[]): number => {
  for (let i = items.length - 1; i >= 0; i--) if (items[i] !== null) return i;
  return -1;
};

export const pop = (
  items: (number | null)[],
  from: 'front' | 'end',
  label: string
): Step => {
  const at = from === 'end' ? lastFilled(items) : firstFilled(items);
  if (at === -1) {
    return {
      label,
      detail: 'Underflow — nothing to remove.',
      items,
      highlight: [],
      capacity: items.length,
      comparisons: 0,
      count: 0,
    };
  }
  const next = [...items];
  const removed = next[at];
  next[at] = null;
  return {
    label,
    detail: `Removed ${removed} from index ${at}.`,
    items: next,
    highlight: [],
    capacity: next.length,
    comparisons: 0,
    count: occupancy(next),
  };
};

/** Linear scan used to demonstrate what a hash table or an array search costs. */
export const scan = (items: (number | null)[], target: number): Step[] => {
  const steps: Step[] = [];
  let comparisons = 0;
  for (let i = 0; i < items.length; i++) {
    const value = items[i];
    if (value === null) continue;
    comparisons++;
    const hit = value === target;
    steps.push({
      label: `Probe index ${i}`,
      detail: hit
        ? `${target} is at index ${i}.`
        : `Index ${i} holds ${value}.`,
      items: [...items],
      highlight: [i],
      capacity: items.length,
      comparisons,
      count: occupancy(items),
    });
    if (hit) break;
  }
  return steps;
};
