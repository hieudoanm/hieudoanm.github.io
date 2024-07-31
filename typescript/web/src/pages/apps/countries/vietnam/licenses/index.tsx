import { createColumnHelper } from '@tanstack/react-table';
import { TanStackTable } from '@web/components/TanStack/Table';
import { TanstackVirtualTable } from '@web/components/TanStack/VirtualTable';
import licenses from '@web/json/vietnam/licenses.json';
import { Layout } from '@web/layout';
import { NextPage } from 'next';
import { ChangeEvent, useRef, useState } from 'react';

const NODE_ENV = process.env.NODE_ENV;

type License = { code: string; name: string };

const columnHelper = createColumnHelper<License>();

const columns = [
  columnHelper.accessor('code', {
    id: 'code',
    header: () => 'Code',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name', {
    id: 'name',
    header: () => 'Name',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
];

export const LicensesPage: NextPage = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');

  const filteredLicenses = licenses.filter(({ code = '' }) =>
    code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout nav full>
      <div className='h-full overflow-y-auto'>
        <div className='container mx-auto h-full'>
          <div className='h-full p-4 md:p-8'>
            <div className='flex h-full flex-col gap-y-4 md:gap-y-8'>
              <div>
                <label className='input input-bordered flex items-center gap-2'>
                  <span>License</span>
                  <input
                    id='query'
                    name='query'
                    placeholder='License'
                    className='grow'
                    value={query}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setQuery(event.target.value)
                    }
                  />
                </label>
              </div>
              <div className='grow'>
                {NODE_ENV === 'production' ? (
                  <TanStackTable data={filteredLicenses} columns={columns} />
                ) : (
                  <div className='h-full overflow-auto' ref={parentRef}>
                    <TanstackVirtualTable
                      parentRef={parentRef}
                      data={filteredLicenses}
                      columns={columns}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LicensesPage;
