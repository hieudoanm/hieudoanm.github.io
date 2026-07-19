import type { SqliteCell } from '@/types/sqlite';

export interface FilterOptions {
  search?: string;
  colFilters?: Record<number, string>;
  sortCol?: number | null;
  sortDir?: 1 | -1;
}

export interface FilteredItem {
  row: SqliteCell[];
  i: number;
}

export const filterAndSortRows = (
  rows: SqliteCell[][],
  options: FilterOptions = {}
): FilteredItem[] => {
  const { search = '', colFilters = {}, sortCol = null, sortDir = 1 } = options;
  let items: FilteredItem[] = rows.map((row, i) => ({ row, i }));
  if (search.trim()) {
    const q = search.toLowerCase();
    items = items.filter(({ row }) =>
      row.some((v) =>
        String(v ?? '')
          .toLowerCase()
          .includes(q)
      )
    );
  }
  for (const [ci, q] of Object.entries(colFilters)) {
    if (!q) continue;
    const lq = q.toLowerCase();
    const idx = Number(ci);
    items = items.filter(({ row }) =>
      String(row[idx] ?? '')
        .toLowerCase()
        .includes(lq)
    );
  }
  if (sortCol !== null) {
    items.sort((a, b) => {
      const av = a.row[sortCol];
      const bv = b.row[sortCol];
      if (av === null && bv === null) return 0;
      if (av === null) return 1;
      if (bv === null) return -1;
      if (av instanceof Uint8Array || bv instanceof Uint8Array) return 0;
      return av < bv ? -sortDir : av > bv ? sortDir : 0;
    });
  }
  return items;
};

export interface PageResult {
  totalPages: number;
  pageRows: SqliteCell[][];
  pageOriginalIndices: number[];
}

export const paginate = (
  items: FilteredItem[],
  page: number,
  pageSize: number
): PageResult => {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const pageItems = items.slice(page * pageSize, (page + 1) * pageSize);
  return {
    totalPages,
    pageRows: pageItems.map((x) => x.row),
    pageOriginalIndices: pageItems.map((x) => x.i),
  };
};

export const makeId = (prefix: string): string =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
