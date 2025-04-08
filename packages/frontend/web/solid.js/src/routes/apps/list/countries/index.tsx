import { createColumnHelper } from '@tanstack/solid-table';
import { createSignal, onMount } from 'solid-js';
import { TanStackTable } from '~/components/TanStackTable';
import countriesJSON from '~/json/countries.json';
import { copyToClipboard } from '~/utils/navigator';

export type Country = {
  name: { common: string; official: string };
  capital: string[];
  region: string;
  subregion: string;
  cca2: string;
  cca3: string;
  flag: string;
  flags: { svg: string };
  unMember: boolean;
};

const columnHelper = createColumnHelper<Country>();

const columns = [
  columnHelper.accessor('flag', {
    id: 'flag',
    header: () => 'Flag',
    cell: (info) => (
      <button
        type="button"
        class="w-full text-center text-xl"
        onClick={() => copyToClipboard(info.renderValue() ?? '')}>
        {info.renderValue()}
      </button>
    ),
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
    cell: (info) => (
      <div class="w-60 truncate" title={info.renderValue() ?? ''}>
        {info.renderValue()}
      </div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('cca2', {
    id: 'cca2',
    header: () => 'CCA2',
    cell: (info) => (
      <div class="text-center text-red-500">{info.renderValue()}</div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('cca3', {
    id: 'cca3',
    header: () => 'CCA3',
    cell: (info) => (
      <div class="text-center text-red-500">{info.renderValue()}</div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name.common', {
    id: 'common',
    header: () => 'Name (Common)',
    cell: (info) => (
      <div class="w-60 truncate" title={info.renderValue() ?? ''}>
        {info.renderValue()}
      </div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name.official', {
    id: 'official',
    header: () => 'Name (Official)',
    cell: (info) => (
      <div class="w-60 truncate" title={info.renderValue() ?? ''}>
        {info.renderValue()}
      </div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('capital', {
    id: 'capital',
    header: () => 'Capital',
    cell: (info) => {
      const capitals: string = (info.renderValue() ?? []).join(', ');
      return (
        <div class="w-60 truncate" title={capitals}>
          {capitals}
        </div>
      );
    },
    footer: (info) => info.column.id,
  }),
];

const CountriesPage = () => {
  const [countries, setCountries] = createSignal<Country[]>([]);

  onMount(() => {
    countriesJSON.sort((a, b) => {
      if (a.region === b.region) {
        return (a.subregion ?? '') > (b.subregion ?? '') ? 1 : -1;
      }
      return a.region > b.region ? 1 : -1;
    });
    setCountries(countriesJSON as Country[]);
  });

  return (
    <div class="h-screen w-screen p-8">
      <TanStackTable data={countries()} columns={columns} />
    </div>
  );
};

export const dynamic = 'force-static';

export default CountriesPage;
