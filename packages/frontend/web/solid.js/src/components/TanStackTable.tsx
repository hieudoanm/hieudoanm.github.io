/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import { createSignal } from 'solid-js';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

export type ColumnSort = {
  id: string;
  desc: boolean;
};

export type SortingState = ColumnSort[];

export type TanStackTableProps = {
  columns: any[];
  data: any[];
};

export const TanStackTable = ({
  columns = [],
  data = [],
}: TanStackTableProps) => {
  const [sorting, setSorting] = createSignal<SortingState>([]);

  const table = createSolidTable({
    data: data ?? [],
    columns,
    state: { sorting: sorting() },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: NODE_ENV === 'development',
  });

  return (
    <div class="no-scrollbar h-full overflow-auto rounded-xl border bg-gray-900 text-gray-100">
      <table class="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr title={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    title={header.id}
                    colSpan={header.colSpan}
                    class="px-2 py-1"
                    style={{ width: header.getSize().toString() }}>
                    {header.isPlaceholder ? null : (
                      <button
                        {...{
                          class: header.column.getCanSort()
                            ? 'cursor-pointer select-none w-full'
                            : 'w-full',
                          onClick: header.column.getToggleSortingHandler(),
                        }}>
                        <div class="flex w-full items-center justify-between">
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          <div>
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </div>
                      </button>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr title={row.id} class="border-t">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td title={cell.id} class="px-2 py-1">
                      <div class="truncate">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
