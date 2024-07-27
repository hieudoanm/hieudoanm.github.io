import { createColumnHelper } from '@tanstack/react-table';
import { TanStackTable } from '@web/components/TanStack/Table';
import stocks from '@web/json/vietnam/vnindex/symbols.json';
import { Layout } from '@web/layout';
import { NextPage } from 'next';

type Stock = {
  symbol: string;
  name: string;
  market: string;
};

const columnHelper = createColumnHelper<Stock>();

const columns = [
  columnHelper.accessor('market', {
    id: 'market',
    header: () => 'Market',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('symbol', {
    id: 'symbol',
    header: () => 'Symbol',
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

const StockPage: NextPage = () => {
  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='overflow-x-auto'>
            <TanStackTable data={stocks} columns={columns}></TanStackTable>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StockPage;
