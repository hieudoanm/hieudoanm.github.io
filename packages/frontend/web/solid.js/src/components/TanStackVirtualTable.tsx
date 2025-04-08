/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import { Virtualizer } from '@tanstack/solid-virtual';
import { createEffect, createSignal } from 'solid-js';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

export type ColumnSort = {
  id: string;
  desc: boolean;
};

export type SortingState = ColumnSort[];

export type TanstackVirtualTableProps = {
  parentRef: HTMLDivElement | null;
  columns: any[];
  data: any[];
};

export const TanStackVirtualTable = ({
  parentRef = null as HTMLDivElement | null,
  columns = [],
  data = [],
}: TanstackVirtualTableProps) => {
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

  const { rows } = table.getRowModel();

  const virtualizer = new Virtualizer({
    count: rows.length,
    observeElementRect: () => {},
    estimateSize: () => 34,
    overscan: 20,
    getScrollElement: () => parentRef,
    scrollToFn: () => {},
    observeElementOffset: () => {},
  });

  createEffect(() => {
    console.info('current', parentRef);
  });

  if (parentRef === null) {
    return <></>;
  }

  return (
    <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr title={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    title={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize().toString() }}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          class: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}>
                        <div class="flex items-center justify-between">
                          <p>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </p>
                          <p>
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </p>
                        </div>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {virtualizer.getVirtualItems().map((virtualRow, index) => {
            const row = rows[virtualRow.index];
            return (
              <tr
                title={row.id}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${
                    virtualRow.start - index * virtualRow.size
                  }px)`,
                }}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td title={cell.id}>
                      <p class="truncate">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </p>
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
