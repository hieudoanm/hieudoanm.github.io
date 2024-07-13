import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { logger } from '@web/log';
import { FC, RefObject, useEffect, useState } from 'react';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

export type ColumnSort = {
  id: string;
  desc: boolean;
};

export type SortingState = ColumnSort[];

export type TanstackVirtualTableProps = {
  parentRef: RefObject<HTMLDivElement>;
  columns: any[];
  data: any[];
};

export const TanstackVirtualTable: FC<TanstackVirtualTableProps> = ({
  parentRef = {} as RefObject<HTMLDivElement>,
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

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 20,
  });

  useEffect(() => {
    logger.info('current', parentRef.current);
  }, [parentRef.current]);

  if (parentRef.current === null) {
    return <></>;
  }

  return (
    <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
      <table className='table'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}>
                        <div className='flex items-center justify-between'>
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
                key={row.id}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${
                    virtualRow.start - index * virtualRow.size
                  }px)`,
                }}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      <p className='truncate'>
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
