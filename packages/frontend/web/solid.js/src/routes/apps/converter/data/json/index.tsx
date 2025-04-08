import { NothingApp } from '~/types';
import { FaSolidTable, FaSolidY } from 'solid-icons/fa';
import { A } from '@solidjs/router';

const JsonAppsPage = () => {
  const apps: NothingApp[] = [
    {
      id: 'converter-data-json-csv',
      href: 'converter/data/json/csv',
      name: 'JSON to CSV',
      shortName: 'json2csv',
      icon: <FaSolidTable class="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-json-xml',
      href: 'converter/data/json/xml',
      name: 'JSON to XML',
      shortName: 'json2xml',
      icon: <FaSolidTable class="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-json-yaml',
      href: 'converter/data/json/yaml',
      name: 'JSON to YAML',
      shortName: 'json2yaml',
      icon: <FaSolidY class="text-xl md:text-2xl" />,
    },
  ];

  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="container mx-auto flex h-full flex-col gap-y-4 p-4 md:gap-y-8 md:p-8">
        <div class="grid h-full grow grid-cols-1 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-1 md:gap-8">
          {apps.map(
            ({ id = '', href = '', name = '', shortName = '', icon }) => {
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
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default JsonAppsPage;
