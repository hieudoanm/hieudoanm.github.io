import { useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import type { DbPageState } from '@/hooks/useDbPageState';
import type { SqliteCell } from '@/types/sqlite';
import { filterAndSortRows, paginate } from '@/utils/tableData';

export const PAGE_SIZE = 100;

interface SelectionProps {
  state: Pick<
    DbPageState,
    | 'search'
    | 'setSearch'
    | 'colFilters'
    | 'setColFilters'
    | 'sortCol'
    | 'setSortCol'
    | 'sortDir'
    | 'setSortDir'
    | 'page'
    | 'setPage'
  >;
  rows: SqliteCell[][];
}

export interface DbPageSelection {
  sortCol: number | null;
  sortDir: 1 | -1;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  colFilters: Record<number, string>;
  setColFilters: Dispatch<SetStateAction<Record<number, string>>>;
  filteredRows: SqliteCell[][];
  totalPages: number;
  pageRows: SqliteCell[][];
  pageOriginalIndices: number[];
  handleSort: (colIdx: number) => void;
  resetPage: () => void;
}

export const useDbPageSelection = ({
  state,
  rows,
}: SelectionProps): DbPageSelection => {
  const { search, colFilters, sortCol, sortDir, page } = state;

  const filtered = useMemo(
    () => filterAndSortRows(rows, { search, colFilters, sortCol, sortDir }),
    [rows, search, colFilters, sortCol, sortDir]
  );

  const filteredRows = filtered.map((x) => x.row);
  const { totalPages, pageRows, pageOriginalIndices } = paginate(
    filtered,
    page,
    PAGE_SIZE
  );

  const resetPage = () => state.setPage(0);

  const handleSort = (colIdx: number) => {
    if (sortCol === colIdx)
      state.setSortDir((d) => (d === 1 ? -1 : 1) as 1 | -1);
    else {
      state.setSortCol(colIdx);
      state.setSortDir(1);
    }
  };

  return {
    sortCol,
    sortDir,
    page,
    setPage: state.setPage,
    search,
    setSearch: state.setSearch,
    colFilters,
    setColFilters: state.setColFilters,
    filteredRows,
    totalPages,
    pageRows,
    pageOriginalIndices,
    handleSort,
    resetPage,
  };
};
