import { createColumnHelper } from '@tanstack/react-table';
import { TanStackTable } from '@web/components/TanStack/Table';
import { TanstackVirtualTable } from '@web/components/TanStack/VirtualTable';
import positions from '@web/json/chess/positions.json';
import { Layout } from '@web/layout';
import { FC, useRef } from 'react';

const NODE_ENV = process.env.NODE_ENV;

type Position = { id: string; position: string };

const columnHelper = createColumnHelper<Position>();

const columns = [
  columnHelper.accessor('id', {
    id: 'id',
    header: () => 'ID',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
    filterFn: 'equals',
  }),
  columnHelper.accessor('position', {
    id: 'position',
    header: () => 'Name',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
    filterFn: 'equals',
  }),
];

export const Chess960: FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const positionsWithIndex = positions.map(
    (position: string, index: number) => ({
      id: index,
      position,
    })
  );

  return (
    <Layout nav full>
      <div ref={parentRef} className='h-full overflow-y-auto'>
        <div className='container mx-auto'>
          <div className='p-4 md:p-8'>
            {NODE_ENV === 'production' ? (
              <TanStackTable data={positionsWithIndex} columns={columns} />
            ) : (
              <TanstackVirtualTable
                parentRef={parentRef}
                data={positionsWithIndex}
                columns={columns}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
