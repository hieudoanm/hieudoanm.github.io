import { createColumnHelper } from '@tanstack/react-table';
import { TanStackTable } from '@web/components/TanStack/Table';
import presidents from '@web/json/usa/presidents.json';
import { Layout } from '@web/layout';
import { NextPage } from 'next';

type President = {
  no: number;
  name: string;
  fullName: string;
  party: string;
  affiliatedState: string;
  dieInOffice: string;
};

const columnHelper = createColumnHelper<President>();

const columns = [
  columnHelper.accessor('no', {
    id: 'no',
    header: () => '#',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name', {
    id: 'name',
    header: () => 'Name',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('fullName', {
    id: 'Full Name',
    header: () => 'Full Name',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('party', {
    id: 'party',
    header: () => 'Party',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('affiliatedState', {
    id: 'affiliatedState',
    header: () => 'Affiliated State',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('dieInOffice', {
    id: 'dieInOffice',
    header: () => 'Die In Office',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
];

const PresidentPage: NextPage = () => {
  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='overflow-auto'>
            <TanStackTable data={presidents} columns={columns} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PresidentPage;
