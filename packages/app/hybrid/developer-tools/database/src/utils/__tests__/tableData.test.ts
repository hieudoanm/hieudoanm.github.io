import { filterAndSortRows, paginate, makeId } from '@/utils/tableData';
import type { SqliteCell } from '@/types/sqlite';

const rows: SqliteCell[][] = [
  ['Bob', 30],
  ['Alice', 25],
  ['Carol', 35],
];

describe('filterAndSortRows', () => {
  it('returns all rows with original indices by default', () => {
    const out = filterAndSortRows(rows);
    expect(out).toHaveLength(3);
    expect(out[0]).toEqual({ row: rows[0], i: 0 });
    expect(out[2].i).toBe(2);
  });

  it('filters rows by search across all columns', () => {
    const out = filterAndSortRows(rows, { search: 'ali' });
    expect(out).toEqual([{ row: rows[1], i: 1 }]);
  });

  it('treats empty search as no filter', () => {
    const out = filterAndSortRows(rows, { search: '   ' });
    expect(out).toHaveLength(3);
    expect(out.map((x) => x.i)).toEqual([0, 1, 2]);
  });

  it('filters by column and ignores empty filter values', () => {
    const out = filterAndSortRows(rows, { colFilters: { 1: '25' } });
    expect(out).toEqual([{ row: rows[1], i: 1 }]);
    const noop = filterAndSortRows(rows, { colFilters: { 0: '' } });
    expect(noop).toHaveLength(3);
  });

  it('sorts ascending by default and descending with sortDir -1', () => {
    const asc = filterAndSortRows(rows, { sortCol: 0, sortDir: 1 });
    expect(asc[0].row[0]).toBe('Alice');
    expect(asc[2].row[0]).toBe('Carol');
    const desc = filterAndSortRows(rows, { sortCol: 0, sortDir: -1 });
    expect(desc[0].row[0]).toBe('Carol');
    expect(desc[2].row[0]).toBe('Alice');
  });

  it('sorts numbers numerically', () => {
    const asc = filterAndSortRows(rows, { sortCol: 1, sortDir: 1 });
    expect(asc.map((x) => x.row[1])).toEqual([25, 30, 35]);
  });

  it('keeps nulls last and equal nulls stable', () => {
    const withNull = [[1], [null], [3], [null]] as unknown as SqliteCell[][];
    const out = filterAndSortRows(withNull, { sortCol: 0, sortDir: 1 });
    expect(out[0].row[0]).toBe(1);
    expect(out[1].row[0]).toBe(3);
    expect(out[2].row[0]).toBe(null);
    expect(out[3].row[0]).toBe(null);
  });

  it('treats Uint8Array values as equal during sort', () => {
    const bytes: SqliteCell[][] = [
      [new Uint8Array([1])],
      [new Uint8Array([2])],
    ];
    const out = filterAndSortRows(bytes, { sortCol: 0, sortDir: 1 });
    expect(out).toHaveLength(2);
  });
});

describe('paginate', () => {
  it('computes total pages, page rows, and original indices', () => {
    const items = filterAndSortRows(rows);
    const page = paginate(items, 1, 2);
    expect(page.totalPages).toBe(2);
    expect(page.pageRows).toEqual([rows[2]]);
    expect(page.pageOriginalIndices).toEqual([2]);
  });

  it('never reports fewer than one page for empty input', () => {
    const page = paginate([], 0, 10);
    expect(page.totalPages).toBe(1);
    expect(page.pageRows).toEqual([]);
    expect(page.pageOriginalIndices).toEqual([]);
  });

  it('slices beyond the last page to an empty page', () => {
    const page = paginate(filterAndSortRows(rows), 5, 2);
    expect(page.pageRows).toEqual([]);
  });
});

describe('makeId', () => {
  it('prefixes ids and is unique', () => {
    const a = makeId('x');
    const b = makeId('x');
    expect(a.startsWith('x-')).toBe(true);
    expect(a).not.toBe(b);
  });
});
