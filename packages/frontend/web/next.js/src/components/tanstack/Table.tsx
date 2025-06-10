/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FC, useState } from 'react';

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

export const TanStackTable: FC<TanStackTableProps> = ({
  columns = [],
  data = [],
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: NODE_ENV === 'development',
  });

  return (
    <div className="scroll-none h-full overflow-auto rounded-xl border bg-neutral-900 text-neutral-100">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-2 py-1"
                    style={{ width: header.getSize() }}>
                    {header.isPlaceholder ? null : (
                      <button
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none w-full'
                            : 'w-full',
                          onClick: header.column.getToggleSortingHandler(),
                        }}>
                        <div className="flex w-full items-center justify-between">
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
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="px-2 py-1">
                      <div className="truncate">
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
