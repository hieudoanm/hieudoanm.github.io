import { memo, type FC } from 'react';
import { FiDownload, FiSearch } from 'react-icons/fi';

import { CellValue } from '@/components/atoms/CellValue';
import { SortIcon } from '@/components/atoms/SortIcon';
import type { SqliteCell, SqliteQueryResult } from '@/types/sqlite';
import { formatNumber } from '@/utils/sqlExport';

const PAGE_SIZE = 100;

interface DataViewProps {
  activeTable: string | null;
  loading: boolean;
  queryResult: SqliteQueryResult;
  filteredRows: SqliteCell[][];
  search: string;
  sortCol: number | null;
  sortDir: number;
  page: number;
  totalPages: number;
  pageRows: SqliteCell[][];
  onSearch: (v: string) => void;
  onSort: (colIdx: number) => void;
  onExport: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const DataView: FC<DataViewProps> = memo(
  ({
    activeTable,
    loading,
    queryResult,
    filteredRows,
    search,
    sortCol,
    sortDir,
    page,
    totalPages,
    pageRows,
    onSearch,
    onSort,
    onExport,
    onPrevPage,
    onNextPage,
  }) => {
    const hasColumns = queryResult.columns.length > 0;
    return (
      <>
        <div className="border-base-300 bg-base-200/50 flex flex-shrink-0 items-center gap-3 border-b px-4 py-2.5">
          {activeTable || hasColumns ? (
            <>
              <span className="text-base-content font-mono text-sm font-normal">
                {activeTable ?? 'Query result'}
              </span>
              <div className="badge badge-ghost badge-sm text-base-content/40 font-mono">
                {formatNumber(filteredRows.length)}
                {search && ` / ${formatNumber(queryResult.rows.length)}`} rows
              </div>
            </>
          ) : (
            <span className="text-base-content/40 text-sm italic">
              Select a table
            </span>
          )}
          <div className="ml-auto flex items-center gap-2">
            {loading && (
              <span className="loading loading-spinner loading-xs text-primary" />
            )}
            {hasColumns && (
              <button className="btn btn-ghost btn-sm gap-2" onClick={onExport}>
                <FiDownload className="size-3.5" /> Export table
              </button>
            )}
            <label className="input input-bordered input-sm bg-base-100 flex w-48 items-center gap-2">
              <span className="text-base-content/30">
                <FiSearch className="size-3.5" />
              </span>
              <input
                type="text"
                className="grow bg-transparent font-mono text-xs"
                placeholder="Filter rows…"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => onSearch('')}
                  className="text-base-content/30 hover:text-base-content">
                  &times;
                </button>
              )}
            </label>
          </div>
        </div>

        {hasColumns ? (
          <div className="flex-1 overflow-auto">
            <table className="table-xs table-pin-rows table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th className="text-base-content/20 w-10 text-center font-mono font-normal">
                    #
                  </th>
                  {queryResult.columns.map((col, i) => (
                    <th
                      key={col}
                      className="hover:text-primary group cursor-pointer whitespace-nowrap transition-colors select-none"
                      onClick={() => onSort(i)}>
                      <span className="flex items-center gap-1">
                        {col}
                        <SortIcon
                          active={sortCol === i}
                          dir={sortCol === i ? sortDir : 0}
                        />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row, ri) => (
                  <tr
                    key={ri}
                    className="hover:bg-base-200/40 border-base-300/40 border-b">
                    <td className="text-base-content/20 text-center font-mono text-[10px] tabular-nums">
                      {page * PAGE_SIZE + ri + 1}
                    </td>
                    {row.map((cell, ci) => (
                      <td key={ci} className="max-w-[200px] truncate">
                        <CellValue value={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTable ? (
          <div className="text-base-content/30 flex flex-1 items-center justify-center text-sm italic">
            No data in this table
          </div>
        ) : (
          <div className="text-base-content/30 flex flex-1 items-center justify-center text-sm italic">
            Select a table from the sidebar
          </div>
        )}

        {hasColumns && filteredRows.length > PAGE_SIZE && (
          <div className="border-base-300 bg-base-200/30 flex flex-shrink-0 items-center gap-3 border-t px-4 py-2">
            <button
              className="btn btn-ghost btn-xs"
              disabled={page === 0}
              onClick={onPrevPage}>
              &larr; prev
            </button>
            <span className="text-base-content/40 font-mono text-xs tabular-nums">
              page {page + 1} / {totalPages}
            </span>
            <button
              className="btn btn-ghost btn-xs"
              disabled={page >= totalPages - 1}
              onClick={onNextPage}>
              next &rarr;
            </button>
            <span className="text-base-content/30 ml-auto font-mono text-xs">
              {formatNumber(filteredRows.length)} total
            </span>
          </div>
        )}
      </>
    );
  }
);
DataView.displayName = 'DataView';
