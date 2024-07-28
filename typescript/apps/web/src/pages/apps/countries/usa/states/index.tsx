import { createColumnHelper } from '@tanstack/react-table';
import { TanStackTable } from '@web/components/TanStack/Table';
import { TanstackVirtualTable } from '@web/components/TanStack/VirtualTable';
import states from '@web/json/usa/states.json';
import { Layout } from '@web/layout';
import { NextPage } from 'next';
import { ChangeEvent, useRef, useState } from 'react';

const NODE_ENV = process.env.NODE_ENV;

type State = {
  abbreviation: string;
  level: string;
  name: string;
  capital: string;
  region: string;
  division: string;
  admission: string;
};

const columnHelper = createColumnHelper<State>();

const columns = [
  columnHelper.accessor('abbreviation', {
    id: 'abbreviation',
    header: () => 'Abbreviation',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('level', {
    id: 'level',
    header: () => 'Level',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name', {
    id: 'name',
    header: () => 'Name',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('capital', {
    id: 'capital',
    header: () => 'Capital',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('region', {
    id: 'region',
    header: () => 'Region',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('division', {
    id: 'division',
    header: () => 'division',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('admission', {
    id: 'admission',
    header: () => 'Admission',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
];
const UnitedStatesPage: NextPage = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [filterOptions, setFilterOptions] = useState<{
    level: string;
    region: string;
    division: string;
  }>({
    level: '',
    region: '',
    division: '',
  });

  const filteredStates = states.filter(({ level, region, division }) => {
    const levelFlag: boolean =
      filterOptions.level === '' ? true : level === filterOptions.level;
    const regionFlag: boolean =
      filterOptions.region === '' ? true : region === filterOptions.region;
    const divisionFlag: boolean =
      filterOptions.division === ''
        ? true
        : division === filterOptions.division;
    return levelFlag && regionFlag && divisionFlag;
  });
  // Regions
  const regions: string[] = [
    ...new Set(
      states.map(({ region }) => region).filter((region: string) => region)
    ),
  ];
  regions.sort((a: string, b: string) => (a > b ? 1 : -1));
  // Divisions
  const divisions: string[] = [
    ...new Set(
      filteredStates
        .map(({ division }) => division)
        .filter((division: string) => division)
    ),
  ];
  divisions.sort((a: string, b: string) => (a > b ? 1 : -1));

  return (
    <Layout nav full>
      <div className='h-full overflow-hidden'>
        <div className='container mx-auto h-full'>
          <div className='h-full p-4 md:p-8'>
            <div className='flex h-full flex-col gap-y-4 md:gap-y-8'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8'>
                <div className='col-span-1'>
                  <select
                    id='level'
                    name='level'
                    className='select select-bordered w-full'
                    value={filterOptions.level}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                      setFilterOptions({
                        ...filterOptions,
                        level: event.target.value,
                      })
                    }>
                    <option value=''>Level</option>
                    <option value='state'>State</option>
                    <option value='territory'>Territory</option>
                    <option value='federal-district'>Federal District</option>
                  </select>
                </div>
                <div className='col-span-1'>
                  <select
                    id='region'
                    name='region'
                    className='select select-bordered w-full'
                    value={filterOptions.region}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                      setFilterOptions({
                        ...filterOptions,
                        region: event.target.value,
                      })
                    }>
                    <option value=''>Region</option>
                    {regions.map((region: string) => {
                      return (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='col-span-1'>
                  <select
                    id='division'
                    name='division'
                    className='select select-bordered w-full'
                    value={filterOptions.division}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                      setFilterOptions({
                        ...filterOptions,
                        division: event.target.value,
                      })
                    }>
                    <option value=''>Division</option>
                    {divisions.map((division: string) => {
                      return (
                        <option key={division} value={division}>
                          {division}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className='grow'>
                {NODE_ENV === 'production' ? (
                  <TanStackTable data={filteredStates} columns={columns} />
                ) : (
                  <div className='h-full overflow-auto' ref={parentRef}>
                    <TanstackVirtualTable
                      parentRef={parentRef}
                      data={filteredStates}
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

export default UnitedStatesPage;
