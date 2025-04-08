import { A } from '@solidjs/router';
import {
  FaBrandsInstagram,
  FaSolidCamera,
  FaSolidImages,
} from 'solid-icons/fa';
import { NothingApp } from '~/types';

const ImagesAppsPage = () => {
  const apps: NothingApp[] = [
    {
      id: 'images-converter-base64',
      href: 'images/converter/base64',
      name: 'Base64',
      shortName: 'base64',
      icon: <FaSolidImages class="text-xl md:text-2xl" />,
    },
    {
      id: 'images-converter-png2ico',
      href: 'images/converter/png2ico',
      name: 'PNG to ICO',
      shortName: 'png2ico',
      icon: <FaSolidImages class="text-xl md:text-2xl" />,
    },
    {
      id: 'images-converter-svg2png',
      href: 'images/converter/svg2png',
      name: 'SVG to PNG',
      shortName: 'svg2png',
      icon: <FaSolidImages class="text-xl md:text-2xl" />,
    },
    {
      id: 'images-filter-golden',
      href: 'images/filter/golden',
      name: 'Filter - Golden',
      shortName: 'golden',
      icon: <FaSolidCamera class="text-xl md:text-2xl" />,
    },
    {
      id: 'images-filter-grayscale',
      href: 'images/filter/grayscale',
      name: 'Filter - Grayscale',
      shortName: 'grayscale',
      icon: <FaSolidCamera class="text-xl md:text-2xl" />,
    },
    {
      id: 'images-instagram',
      href: 'images/instagram',
      name: 'Instagram',
      shortName: 'insta',
      icon: <FaBrandsInstagram class="text-xl md:text-2xl" />,
    },
  ];

  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="container mx-auto flex h-full flex-col gap-y-4 p-4 md:gap-y-8 md:p-8">
        <div class="grid h-full grow grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-8">
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

export default ImagesAppsPage;
