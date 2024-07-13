import { Layout } from '@web/layout';
import provinces from '@web/json/vietnam/provinces.json';
import { NextPage } from 'next';
import { ChangeEvent, useRef, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { TanstackVirtualTable } from '@web/components/TanStack/VirtualTable';
import { TanStackTable } from '@web/components/TanStack/Table';

const NODE_ENV = process.env.NODE_ENV;

type Province = {
  level: string;
  name: string;
  capital: string;
  macroregion: string;
  region: string;
};

const columnHelper = createColumnHelper<Province>();

const columns = [
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
  columnHelper.accessor('macroregion', {
    id: 'macroregion',
    header: () => 'macroregion',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('region', {
    id: 'region',
    header: () => 'region',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
];

export const ProvincesPage: NextPage = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [filterOptions, setFilterOptions] = useState<{
    level: string;
    macroregion: string;
    region: string;
  }>({
    level: '',
    macroregion: '',
    region: '',
  });

  const filteredProvinces = provinces.filter(
    ({ level, region, macroregion }) => {
      const levelFlag: boolean =
        filterOptions.level === '' ? true : level === filterOptions.level;
      const regionFlag: boolean =
        filterOptions.region === '' ? true : region === filterOptions.region;
      const macroregionFlag: boolean =
        filterOptions.macroregion === ''
          ? true
          : macroregion === filterOptions.macroregion;
      return levelFlag && regionFlag && macroregionFlag;
    }
  );

  const macroregions: string[] = [
    ...new Set(provinces.map(({ macroregion }) => macroregion)),
  ];
  const regions: string[] = [
    ...new Set(filteredProvinces.map(({ region }) => region)),
  ];

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
                    <option value='province'>Province</option>
                    <option value='municipality'>Municipality</option>
                  </select>
                </div>
                <div className='col-span-1'>
                  <select
                    id='macroregion'
                    name='macroregion'
                    className='select select-bordered w-full'
                    value={filterOptions.macroregion}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                      setFilterOptions({
                        ...filterOptions,
                        macroregion: event.target.value,
                      })
                    }>
                    <option value=''>Macroregion</option>
                    {macroregions.map((macroregion: string) => {
                      return (
                        <option key={macroregion} value={macroregion}>
                          {macroregion}
                        </option>
                      );
                    })}
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
              </div>
              <div className='grow'>
                {NODE_ENV === 'production' ? (
                  <TanStackTable data={filteredProvinces} columns={columns} />
                ) : (
                  <div className='h-full overflow-auto' ref={parentRef}>
                    <TanstackVirtualTable
                      parentRef={parentRef}
                      data={filteredProvinces}
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

export default ProvincesPage;
