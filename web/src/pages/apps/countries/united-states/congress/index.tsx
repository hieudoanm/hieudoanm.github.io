import { createColumnHelper } from '@tanstack/react-table';
import { TanStackTable } from '@web/components/TanStack/Table';
import congresses from '@web/json/usa/congress.json';
import { Layout } from '@web/layout';
import { NextPage } from 'next';

type Congress = {
  no: number;
  start: string;
  end: string;
  houseSpeaker: string;
  senateLeader: string;
  president: string;
  house: string;
  senate: string;
  congress: string;
  trifecta: string;
};

const columnHelper = createColumnHelper<Congress>();

const getPartyColor = (party: string): string => {
  if (party === 'Federalist') return 'text-violet-500';
  if (party === 'Democrat') return 'text-blue-500';
  if (party === 'Republican') return 'text-red-500';
  if (party === 'Democratic-Republican') return 'text-green-500';
  return '';
};

const columns = [
  columnHelper.accessor('no', {
    id: 'no',
    header: () => '#',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('start', {
    id: 'start',
    header: () => 'Start',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('end', {
    id: 'end',
    header: () => 'End',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('trifecta', {
    id: 'trifecta',
    header: () => 'Trifecta',
    cell: (info) => {
      const value: string = info.renderValue() ?? '';
      const color = getPartyColor(value);
      return <span className={color}>{value}</span>;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('president', {
    id: 'president',
    header: () => 'President',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('congress', {
    id: 'congress',
    header: () => 'congress',
    cell: (info) => {
      const value: string = info.renderValue() ?? '';
      const color = getPartyColor(value);
      return <span className={color}>{value}</span>;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('houseSpeaker', {
    id: 'houseSpeaker',
    header: () => 'House Speaker',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('house', {
    id: 'house',
    header: () => 'House',
    cell: (info) => {
      const value: string = info.renderValue() ?? '';
      const color = getPartyColor(value);
      return <span className={color}>{value}</span>;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('senateLeader', {
    id: 'senateLeader',
    header: () => 'Senate Leader',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('senate', {
    id: 'senate',
    header: () => 'Senate',
    cell: (info) => {
      const value: string = info.renderValue() ?? '';
      const color = getPartyColor(value);
      return <span className={color}>{value}</span>;
    },
    footer: (info) => info.column.id,
  }),
];

const CongressPage: NextPage = () => {
  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='overflow-auto'>
            <TanStackTable data={congresses} columns={columns} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CongressPage;
