import { A } from '@solidjs/router';
import {
  FaBrandsBitcoin,
  FaBrandsFirefoxBrowser,
  FaBrandsYoutube,
  FaSolidBatteryFull,
  FaSolidBus,
  FaSolidCalendarDays,
  FaSolidCamera,
  FaSolidChartLine,
  FaSolidCloudSunRain,
  FaSolidCompass,
  FaSolidEnvelopesBulk,
  FaSolidFileLines,
  FaSolidFileZipper,
  FaSolidFutbol,
  FaSolidGamepad,
  FaSolidGear,
  FaSolidHeart,
  FaSolidHouseChimney,
  FaSolidLanguage,
  FaSolidMapLocationDot,
  FaSolidMessage,
  FaSolidMobile,
  FaSolidMusic,
  FaSolidNewspaper,
  FaSolidPhone,
  FaSolidRectangleList,
  FaSolidTemperatureFull,
  FaSolidWallet,
} from 'solid-icons/fa';
import { NothingApp } from '~/types';

const WidgetsPage = () => {
  const apps: NothingApp[] = [
    {
      id: 'battery',
      href: 'battery',
      name: 'battery',
      shortName: '',
      icon: <FaSolidBatteryFull class="text-2xl" />,
    },
    {
      id: 'browser',
      href: 'browser',
      name: 'browser',
      shortName: '',
      icon: <FaBrandsFirefoxBrowser class="text-2xl" />,
    },
    {
      id: 'calendar',
      href: 'calendar',
      name: 'calendar',
      shortName: '',
      icon: <FaSolidCalendarDays class="text-2xl" />,
    },
    {
      id: 'camera',
      href: 'camera',
      name: 'camera',
      shortName: '',
      icon: <FaSolidCamera class="mx-auto text-2xl" />,
    },
    {
      id: 'compass',
      href: 'compass',
      name: 'compass',
      shortName: '',
      icon: <FaSolidCompass class="text-2xl" />,
    },
    {
      id: 'crypto',
      href: 'crypto',
      name: 'crypto',
      shortName: '',
      icon: <FaBrandsBitcoin class="text-2xl" />,
    },
    {
      id: 'devices',
      href: 'devices',
      name: 'devices',
      shortName: '',
      icon: <FaSolidMobile class="text-2xl" />,
    },
    {
      id: 'files',
      href: 'files',
      name: 'files',
      shortName: '',
      icon: <FaSolidFileZipper class="text-2xl" />,
    },
    {
      id: 'fitness',
      href: 'fitness',
      name: 'fitness',
      shortName: '',
      icon: <FaSolidHeart class="text-2xl" />,
    },
    {
      id: 'games',
      href: 'games',
      name: 'games',
      shortName: '',
      icon: <FaSolidGamepad class="text-2xl" />,
    },
    {
      id: 'health',
      href: 'health',
      name: 'health',
      shortName: '',
      icon: <FaSolidTemperatureFull class="text-2xl" />,
    },
    {
      id: 'home',
      href: 'home',
      name: 'home',
      shortName: '',
      icon: <FaSolidHouseChimney class="text-2xl" />,
    },
    {
      id: 'mail',
      href: 'mail',
      name: 'mail',
      shortName: '',
      icon: <FaSolidEnvelopesBulk class="text-2xl" />,
    },
    {
      id: 'maps',
      href: 'maps',
      name: 'maps',
      shortName: '',
      icon: <FaSolidMapLocationDot class="text-2xl" />,
    },
    {
      id: 'messages',
      href: 'messages',
      name: 'messages',
      shortName: '',
      icon: <FaSolidMessage class="text-2xl" />,
    },
    {
      id: 'music',
      href: 'music',
      name: 'music',
      shortName: '',
      icon: <FaSolidMusic class="text-2xl" />,
    },
    {
      id: 'news',
      href: 'news',
      name: 'news',
      shortName: '',
      icon: <FaSolidNewspaper class="text-2xl" />,
    },
    {
      id: 'notes',
      href: 'notes',
      name: 'notes',
      shortName: '',
      icon: <FaSolidFileLines class="text-2xl" />,
    },
    {
      id: 'phone',
      href: 'phone',
      name: 'phone',
      shortName: '',
      icon: <FaSolidPhone class="text-2xl" />,
    },
    {
      id: 'settings',
      href: 'settings',
      name: 'settings',
      shortName: '',
      icon: <FaSolidGear class="text-2xl" />,
    },
    {
      id: 'sports',
      href: 'sports',
      name: 'sports',
      shortName: '',
      icon: <FaSolidFutbol class="text-2xl" />,
    },
    {
      id: 'stocks',
      href: 'stocks',
      name: 'stocks',
      shortName: '',
      icon: <FaSolidChartLine class="text-2xl" />,
    },
    {
      id: 'tasks',
      href: 'tasks',
      name: 'tasks',
      shortName: '',
      icon: <FaSolidRectangleList class="text-2xl" />,
    },
    {
      id: 'translate',
      href: 'translate',
      name: 'translate',
      shortName: '',
      icon: <FaSolidLanguage class="text-2xl" />,
    },
    {
      id: 'transportation',
      href: 'transportation',
      name: 'transportation',
      shortName: '',
      icon: <FaSolidBus class="text-2xl" />,
    },
    {
      id: 'videos',
      href: 'videos',
      name: 'videos',
      shortName: '',
      icon: <FaBrandsYoutube class="text-2xl" />,
    },
    {
      id: 'wallet',
      href: 'wallet',
      name: 'wallet',
      shortName: '',
      icon: <FaSolidWallet class="text-2xl" />,
    },
    {
      id: 'weather',
      href: 'weather',
      name: 'weather',
      shortName: '',
      icon: <FaSolidCloudSunRain class="text-2xl" />,
    },
  ];

  return (
    <div class="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="container mx-auto h-full p-4 md:p-8">
        <div class="grid h-full grid-cols-4 grid-rows-7 gap-4 md:grid-cols-7 md:grid-rows-4 md:gap-8">
          {apps.map(({ id, href, name, icon }) => {
            return (
              <div title={id} class="col-span-1">
                <div class="flex h-full items-center justify-center">
                  <A
                    href={`/widgets/${href}`}
                    class="flex flex-col items-center gap-y-1">
                    <div class="flex aspect-square w-16 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-gray-100 hover:bg-red-500">
                      {icon}
                    </div>
                    <p class="w-24 truncate text-center text-sm font-semibold capitalize">
                      {name}
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

export default WidgetsPage;
