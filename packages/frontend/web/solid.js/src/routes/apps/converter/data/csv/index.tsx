import { NothingApp } from '~/types';
import { createSignal } from 'solid-js';
import {
  FaSolidDatabase,
  FaBrandsHtml5,
  FaBrandsJs,
  FaBrandsMarkdown,
} from 'solid-icons/fa';
import { A } from '@solidjs/router';

const CsvAppsPage = () => {
  const [{ search }, setState] = createSignal<{ search: string }>({
    search: '',
  });

  const apps: NothingApp[] = [
    {
      id: 'converter-data-csv-html',
      href: 'converter/data/csv/html',
      name: 'CSV to HTML',
      shortName: 'csv2html',
      icon: <FaBrandsHtml5 class="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-csv-json',
      href: 'converter/data/csv/json',
      name: 'CSV to JSON',
      shortName: 'csv2json',
      icon: <FaBrandsJs class="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-csv-md',
      href: 'converter/data/csv/md',
      name: 'CSV to MD',
      shortName: 'csv2md',
      icon: <FaBrandsMarkdown class="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-csv-sql',
      href: 'converter/data/csv/sql',
      name: 'CSV to SQL',
      shortName: 'csv2sql',
      icon: <FaSolidDatabase class="text-xl md:text-2xl" />,
    },
  ];

  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="container mx-auto flex h-full flex-col gap-y-4 p-4 md:gap-y-8 md:p-8">
        <div class="w-full">
          <input
            id="search"
            name="search"
            placeholder="Search"
            class="w-full rounded border border-gray-300 px-4 py-2"
            value={search}
            onChange={(event) => {
              setState((previous) => ({
                ...previous,
                search: event.target.value,
              }));
            }}
          />
        </div>
        <div class="grid h-full grow grid-cols-2 grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-8">
          {apps
            .filter(({ name, shortName }) => {
              return search !== ''
                ? name.toLowerCase().includes(search.toLowerCase()) ||
                    shortName.toLowerCase().includes(search.toLowerCase())
                : true;
            })
            .map(({ id = '', href = '', name = '', shortName = '', icon }) => {
              return (
                <div title={id} class="col-span-1 row-span-1">
                  <div class="flex h-full items-center justify-center">
                    <A
                      href={`/apps/${href}`}
                      class="flex flex-col items-center gap-y-1 md:gap-y-2">
                      <div class="flex aspect-square w-12 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-gray-100 hover:bg-red-500 md:w-16">
                        {icon}
                      </div>
                      <p class="w-full truncate text-center text-xs font-semibold md:text-sm">
                        <span class="inline lowercase md:hidden">
                          {shortName}
                        </span>
                        <span class="hidden md:inline">{name}</span>
                      </p>
                    </A>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CsvAppsPage;
