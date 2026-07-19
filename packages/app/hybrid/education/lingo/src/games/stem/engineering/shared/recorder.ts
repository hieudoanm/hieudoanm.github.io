import type { CellState, Frame } from './types';

/**
 * A mutable cursor over an array that records a frame after every meaningful
 * operation.
 *
 * The algorithms stay readable as ordinary imperative code — the recording is
 * handled here instead of being woven through each sort by hand.
 */
export class Recorder {
  private values: number[];
  private states: CellState[];
  private aux: (number | null)[] = [];
  private auxLabel = '';
  private range: [number, number] | undefined;
  private comparisons = 0;
  private writes = 0;
  private readonly frames: Frame[] = [];
  private note = '';

  constructor(initial: readonly number[], auxSize = 0) {
    this.values = [...initial];
    this.states = this.values.map(() => 'idle');
    this.aux = Array.from({ length: auxSize }, () => null);
  }

  /** Records the current state. Safe to call with no argument to reuse `note`. */
  push(note?: string): void {
    if (note !== undefined) this.note = note;
    this.frames.push({
      values: [...this.values],
      states: [...this.states],
      range: this.range,
      aux: this.aux.length
        ? { label: this.auxLabel, values: [...this.aux] }
        : undefined,
      note: this.note,
      comparisons: this.comparisons,
      writes: this.writes,
    });
  }

  get result(): Frame[] {
    return this.frames;
  }

  get counts(): { comparisons: number; writes: number } {
    return { comparisons: this.comparisons, writes: this.writes };
  }

  markAll(state: CellState, from = 0, to = this.values.length - 1): void {
    for (
      let i = Math.max(0, from);
      i <= Math.min(to, this.values.length - 1);
      i++
    ) {
      this.states[i] = state;
    }
  }

  clearMarks(state: CellState = 'idle'): void {
    this.states = this.states.map(() => state);
  }

  setRange(range: [number, number] | undefined): void {
    this.range = range;
  }

  setAux(label: string, size: number): void {
    this.auxLabel = label;
    this.aux = Array.from({ length: size }, () => null);
  }

  setAuxAt(i: number, value: number | null): void {
    this.aux[i] = value;
  }

  auxAt(i: number): number | null {
    return this.aux[i] ?? null;
  }

  get auxSize(): number {
    return this.aux.length;
  }

  read(i: number): number {
    return this.values[i];
  }

  get length(): number {
    return this.values.length;
  }

  /** Counts one comparison and marks both operands. */
  compare(i: number, j: number): void {
    this.comparisons++;
    this.states[i] = 'compare';
    this.states[j] = 'compare';
  }

  /** True when the value at `i` sorts before the value at `j`. */
  less(i: number, j: number): boolean {
    this.compare(i, j);
    return this.values[i] < this.values[j];
  }

  /** True when the value at `i` sorts after the value at `j`. */
  greater(i: number, j: number): boolean {
    this.compare(i, j);
    return this.values[i] > this.values[j];
  }

  /** Records a comparison between values that are not in the main array. */
  countComparison(): void {
    this.comparisons++;
  }

  swap(i: number, j: number): void {
    this.writes += 2;
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
    this.states[i] = 'swap';
    this.states[j] = 'swap';
  }

  write(i: number, value: number): void {
    this.writes++;
    this.values[i] = value;
    this.states[i] = 'overwritten';
  }

  at(i: number): number {
    return this.values[i];
  }

  setAllSorted(): void {
    this.markAll('sorted');
  }

  /** The final ordering, for the closing frame. */
  get sorted(): number[] {
    return [...this.values].sort((a, b) => a - b);
  }
}
