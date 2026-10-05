'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { useState, type ReactNode } from 'react';

export interface ColumnSpec<T> {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  /** `null` or `undefined` marks a missing value: it sorts last, never as zero. */
  sortValue?: (row: T) => string | number | null | undefined;
  align?: 'left' | 'right';
}

/**
 * One table implementation for run lists, metrics and participants. Sorting is
 * client-side because a run list is a few hundred rows at most.
 */
export const DataTable = <T,>({
  rows,
  columns,
  onRowClick,
  emptyMessage = 'Nothing to show yet.',
  rowKey,
}: {
  rows: T[];
  columns: ColumnSpec<T>[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  rowKey: (row: T) => string;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const headers = columns.map((column) => column.header);
  const helper = createColumnHelper<T>();
  const table = useReactTable({
    data: partitionBySort(rows, columns, sorting),
    columns: columns.map((column) =>
      helper.accessor((row: T) => column.sortValue?.(row), {
        id: column.id,
        header: String(column.header),
        cell: (info) => column.cell(info.row.original),
        sortingFn: (left, right) =>
          compareValues(left.getValue(column.id), right.getValue(column.id)),
      })
    ),
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (rows.length === 0) {
    return (
      <p className="text-base-content/70 px-1 py-6 text-sm">{emptyMessage}</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-zebra table-sm table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer whitespace-nowrap select-none">
                  {headers[header.index] ?? String(header.column.id)}
                  <SortMark direction={header.column.getIsSorted()} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row.original) : undefined}
              className={onRowClick ? 'hover cursor-pointer' : undefined}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <span className="sr-only">{rows.map(rowKey).join(', ')}</span>
    </div>
  );
};

const SortMark = ({ direction }: { direction: false | 'asc' | 'desc' }) => (
  <span className="ml-1 text-xs opacity-60">
    {direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : '↕'}
  </span>
);

type SortableValue = string | number | null | undefined;

const isMissing = (value: unknown): boolean =>
  value === undefined || value === null;

/**
 * Rows missing the value being sorted are moved to the end before the library
 * compares anything, because a table-core sort flips `undefined` to the top in
 * descending order. A missing measurement must never lead a results table.
 */
const partitionBySort = <T,>(
  rows: T[],
  columns: ColumnSpec<T>[],
  sorting: SortingState
): T[] => {
  const active = columns.find((column) => column.id === sorting[0]?.id);
  if (!active?.sortValue) return rows;
  const present = rows.filter((row) => !isMissing(active.sortValue!(row)));
  const absent = rows.filter((row) => isMissing(active.sortValue!(row)));
  return [...present, ...absent];
};

const compareValues = (left: unknown, right: unknown): number => {
  const a = left as SortableValue;
  const b = right as SortableValue;
  if (a === b) return 0;
  // Missing values tie instead of comparing: `partitionBySort` already placed
  // them last, and the library would otherwise flip them to the top in a
  // descending sort.
  if (isMissing(a) || isMissing(b)) return 0;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b));
};
