import { memo, useRef, useState, type FC, type KeyboardEvent } from 'react';
import {
  FiDownload,
  FiMoreHorizontal,
  FiPlus,
  FiSearch,
  FiUpload,
} from 'react-icons/fi';

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
  pageOriginalIndices?: number[];
  colFilters?: Record<number, string>;
  editable?: boolean;
  onSearch: (v: string) => void;
  onColFilter?: (colIdx: number, value: string) => void;
  onSort: (colIdx: number) => void;
  onExport: () => void;
  onImport?: () => void;
  onAddRow?: () => void;
  onUpdateCell?: (rowIndex: number, colIdx: number, value: SqliteCell) => void;
  onDeleteRow?: (rowIndex: number) => void;
  onCopyRow?: (rowIndex: number, format: 'sql' | 'json') => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

interface EditingState {
  row: number;
  col: number;
  draft: string;
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
    pageOriginalIndices,
    colFilters = {},
    editable = false,
    onSearch,
    onColFilter,
    onSort,
    onExport,
    onImport,
    onAddRow,
    onUpdateCell,
    onDeleteRow,
    onCopyRow,
    onPrevPage,
    onNextPage,
  }) => {
    const hasColumns = queryResult.columns.length > 0;
    const [editing, setEditing] = useState<EditingState | null>(null);
    const [menuRow, setMenuRow] = useState<number | null>(null);
    const draftRef = useRef<HTMLInputElement>(null);

    const originalIndex = (displayRow: number): number =>
      pageOriginalIndices?.[displayRow] ?? page * PAGE_SIZE + displayRow;

    const startEdit = (displayRow: number, col: number, value: SqliteCell) => {
      if (!editable || value instanceof Uint8Array) return;
      setEditing({
        row: displayRow,
        col,
        draft: value === null ? '' : String(value),
      });
    };

    const commitEdit = (displayRow: number, col: number) => {
      if (!editing) return;
      const old = pageRows[displayRow]?.[col];
      const text = editing.draft;
      const parsed: SqliteCell =
        text === ''
          ? null
          : typeof old === 'number' &&
              text.trim() !== '' &&
              !Number.isNaN(Number(text))
            ? Number(text)
            : text;
      setEditing(null);
      if (parsed === old) return;
      onUpdateCell?.(originalIndex(displayRow), col, parsed);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (!editing) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        commitEdit(editing.row, editing.col);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setEditing(null);
      }
    };

    const rowMenu = menuRow !== null && (
      <div
        className="fixed inset-0 z-20"
        onMouseDown={() => setMenuRow(null)}
      />
    );

    return (
      <>
        <div className="border-base-300 bg-base-200/50 flex flex-shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b px-4 py-2.5">
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
            {editable && (
              <button className="btn btn-ghost btn-sm gap-2" onClick={onAddRow}>
                <FiPlus className="size-3.5" /> Row
              </button>
            )}
            {hasColumns && (
              <button className="btn btn-ghost btn-sm gap-2" onClick={onExport}>
                <FiDownload className="size-3.5" /> Export table
              </button>
            )}
            {hasColumns && activeTable && (
              <button className="btn btn-ghost btn-sm gap-2" onClick={onImport}>
                <FiUpload className="size-3.5" /> Import
              </button>
            )}
            <label className="input input-bordered input-sm bg-base-100 flex w-40 items-center gap-2 sm:w-48">
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
                    <th key={col} className="align-top whitespace-nowrap">
                      <span
                        className="hover:text-primary group flex cursor-pointer items-center gap-1 transition-colors select-none"
                        onClick={() => onSort(i)}>
                        {col}
                        <SortIcon
                          active={sortCol === i}
                          dir={sortCol === i ? sortDir : 0}
                        />
                      </span>
                      {onColFilter && (
                        <input
                          type="text"
                          placeholder="filter"
                          value={colFilters[i] ?? ''}
                          onChange={(e) => onColFilter(i, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="input input-bordered input-xs mt-1 w-full max-w-28 font-mono"
                        />
                      )}
                    </th>
                  ))}
                  {editable && <th className="w-12" />}
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
                      <td
                        key={ci}
                        className={`max-w-[200px] ${editable && !(cell instanceof Uint8Array) ? 'cursor-cell' : ''}`}
                        onDoubleClick={() => startEdit(ri, ci, cell)}>
                        {editing && editing.row === ri && editing.col === ci ? (
                          <input
                            ref={draftRef}
                            autoFocus
                            value={editing.draft}
                            onChange={(e) =>
                              setEditing({ ...editing, draft: e.target.value })
                            }
                            onKeyDown={handleKeyDown}
                            onBlur={() => commitEdit(ri, ci)}
                            className="input input-bordered input-xs w-full min-w-32 font-mono"
                          />
                        ) : (
                          <CellValue value={cell} />
                        )}
                      </td>
                    ))}
                    {editable && (
                      <td className="relative text-right">
                        <button
                          aria-label="Row actions"
                          className="btn btn-ghost btn-xs text-base-content/30 hover:text-base-content"
                          onClick={() =>
                            setMenuRow(menuRow === ri ? null : ri)
                          }>
                          <FiMoreHorizontal className="size-4" />
                        </button>
                        {menuRow === ri && (
                          <div className="bg-base-100 border-base-300 absolute top-7 right-0 z-30 w-44 overflow-hidden rounded-xl border shadow-xl">
                            <button
                              className="hover:bg-base-200 w-full px-3 py-2 text-left font-mono text-xs"
                              onClick={() => {
                                onCopyRow?.(originalIndex(ri), 'sql');
                                setMenuRow(null);
                              }}>
                              Copy SQL INSERT
                            </button>
                            <button
                              className="hover:bg-base-200 w-full px-3 py-2 text-left font-mono text-xs"
                              onClick={() => {
                                onCopyRow?.(originalIndex(ri), 'json');
                                setMenuRow(null);
                              }}>
                              Copy JSON
                            </button>
                            <div className="bg-base-200 h-px" />
                            <button
                              className="hover:bg-error/10 text-error w-full px-3 py-2 text-left font-mono text-xs"
                              onClick={() => {
                                onDeleteRow?.(originalIndex(ri));
                                setMenuRow(null);
                              }}>
                              Delete row
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {rowMenu}
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
