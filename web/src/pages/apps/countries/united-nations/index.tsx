import { createColumnHelper } from '@tanstack/react-table';
import { TanStackTable } from '@web/components/TanStack/Table';
import { TanstackVirtualTable } from '@web/components/TanStack/VirtualTable';
import countries from '@web/json/countries.json';
import { Layout } from '@web/layout';
import { NextPage } from 'next';
import { useRef, useState } from 'react';

const NODE_ENV = process.env.NODE_ENV;

type Country = {
  flag: string;
  cca2: string;
  cca3: string;
  region: string;
  subregion: string;
  capital: string[];
  name: { common: string; official: string };
};

const columnHelper = createColumnHelper<Country>();

const columns = [
  columnHelper.accessor('flag', {
    id: 'flag',
    header: () => 'Flag',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('cca2', {
    id: 'cca2',
    header: () => 'CCA2',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('cca3', {
    id: 'cca3',
    header: () => 'CCA3',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name.common', {
    id: 'common',
    header: () => 'Name (Common)',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name.official', {
    id: 'official',
    header: () => 'Name (Official)',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('capital', {
    id: 'capital',
    header: () => 'Capital',
    cell: (info) => {
      const capitals: string[] = info.renderValue() ?? [];
      return capitals.join(', ');
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('region', {
    id: 'region',
    header: () => 'Region',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('subregion', {
    id: 'subregion',
    header: () => 'Subregion',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
];

const UnitedNationsPage: NextPage = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [filterOptions, setFilterOptions] = useState<{
    region: string;
    subregion: string;
  }>({
    region: '',
    subregion: '',
  });

  const unitedNationMembers = countries.filter(
    ({ unMember }: { unMember: boolean }) => unMember
  );
  const filteredUnitedNationMembers = unitedNationMembers.filter(
    ({ region, subregion = '' }) => {
      const regionFlag: boolean =
        filterOptions.region !== '' ? filterOptions.region === region : true;
      const subregionFlag: boolean =
        filterOptions.subregion !== ''
          ? filterOptions.subregion === subregion
          : true;
      return regionFlag && subregionFlag;
    }
  );
  filteredUnitedNationMembers.sort((a, b) => {
    if (a.region === b.region) {
      if ((a.subregion ?? '') === (b.subregion ?? '')) {
        return a.name.common > b.name.common ? 1 : -1;
      }
      return (a.subregion ?? '') > (b.subregion ?? '') ? 1 : -1;
    }
    return a.region > b.region ? 1 : -1;
  });
  // Regions
  const regions: string[] = [
    ...new Set(
      unitedNationMembers.map(({ region }: { region: string }) => region)
    ),
  ];
  regions.sort((a, b) => (a > b ? 1 : -1));
  // Subregions
  const subregions: string[] = [
    ...new Set(
      filteredUnitedNationMembers
        .map(({ subregion }: { subregion?: string }) => subregion ?? '')
        .filter((subregion: string) => subregion !== '')
    ),
  ];
  subregions.sort((a, b) => (a > b ? 1 : -1));

  return (
    <Layout nav full>
      <div className='h-full overflow-hidden'>
        <div className='container mx-auto h-full'>
          <div className='h-full p-4 md:p-8'>
            <div className='flex h-full flex-col gap-y-4 md:gap-y-8'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8'>
                <select
                  name='region'
                  className='select select-bordered'
                  value={filterOptions.region}
                  onChange={(event) =>
                    setFilterOptions({
                      ...filterOptions,
                      region: event.target.value,
                    })
                  }>
                  <option value=''>Region</option>
                  {regions.map((region: string) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                <select
                  name='subregion'
                  className='select select-bordered'
                  value={filterOptions.subregion}
                  onChange={(event) =>
                    setFilterOptions({
                      ...filterOptions,
                      subregion: event.target.value,
                    })
                  }>
                  <option value=''>Subregion</option>
                  {subregions.map((subregion: string) => (
                    <option key={subregion} value={subregion}>
                      {subregion}
                    </option>
                  ))}
                </select>
              </div>
              <div className='grow overflow-auto' ref={parentRef}>
                {NODE_ENV === 'production' ? (
                  <TanStackTable
                    data={filteredUnitedNationMembers}
                    columns={columns}
                  />
                ) : (
                  <TanstackVirtualTable
                    parentRef={parentRef}
                    data={filteredUnitedNationMembers}
                    columns={columns}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UnitedNationsPage;
