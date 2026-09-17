/**
 * The frame model shared by every engineering simulator.
 *
 * An algorithm is written as a pure function that records what the array looks
 * like at each meaningful moment. The player then walks that list. Keeping the
 * recorder pure is what makes the algorithms testable without a DOM.
 */

export type CellState =
  | 'idle'
  | 'active'
  | 'compare'
  | 'swap'
  | 'pivot'
  | 'sorted'
  | 'found'
  | 'miss'
  | 'overwritten'
  | 'taken'
  | 'rejected';

export interface AuxBuffer {
  label: string;
  values: (number | null)[];
}

/** One recorded moment in an algorithm's run. */
export interface Frame {
  values: number[];
  states: CellState[];
  /** A highlighted window, e.g. the current slice in binary search. */
  range?: [number, number];
  /** A secondary array, e.g. a merge buffer or a hash table's buckets. */
  aux?: AuxBuffer;
  /** One-line explanation shown under the visualisation. */
  note: string;
  /** Comparison count after this step, for the complexity readouts. */
  comparisons?: number;
  /** Count of index writes after this step. */
  writes?: number;
}

export const EMPTY_STATES: CellState[] = [];

/** Builds a frame where every cell carries the same state. */
export const uniformFrame = (
  values: number[],
  state: CellState,
  note: string,
  extra: Partial<Frame> = {}
): Frame => ({
  values: [...values],
  states: values.map(() => state),
  note,
  ...extra,
});
