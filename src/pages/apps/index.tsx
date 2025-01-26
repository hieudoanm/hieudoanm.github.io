import { NextPage } from 'next';
import Link from 'next/link';
import { JSX } from 'react';
import {
  FaFlag,
  FaFlask,
  FaI,
  FaMarkdown,
  FaQrcode,
  FaRulerCombined,
  FaSquareJs,
  FaTable,
} from 'react-icons/fa6';

type NothingApp = {
  id: string;
  href: string;
  name: string;
  icon: JSX.Element;
};

const WidgetsPage: NextPage = () => {
  const apps: NothingApp[] = [
    {
      id: 'chemistry',
      href: 'chemistry',
      name: 'Chemistry',
      icon: <FaFlask className="text-2xl" />,
    },
    {
      id: 'countries',
      href: 'countries',
      name: 'Countries',
      icon: <FaFlag className="text-2xl" />,
    },
    {
      id: 'csv',
      href: 'csv',
      name: 'CSV',
      icon: <FaTable className="text-2xl" />,
    },
    {
      id: 'manifest.json',
      href: 'manifest.json',
      name: 'manifest.json',
      icon: <FaSquareJs className="text-2xl" />,
    },
    {
      id: 'markdown',
      href: 'markdown',
      name: 'Markdown',
      icon: <FaMarkdown className="text-2xl" />,
    },
    {
      id: 'qrcode',
      href: 'qrcode',
      name: 'QR',
      icon: <FaQrcode className="text-2xl" />,
    },
    {
      id: 'resolution',
      href: 'resolution',
      name: 'Resolution',
      icon: <FaRulerCombined className="text-2xl" />,
    },
    {
      id: 'uuid',
      href: 'uuid',
      name: 'UUID',
      icon: <FaI className="text-2xl" />,
    },
  ];

  return (
    <div className="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="container mx-auto h-full p-4 md:p-8">
        <div className="grid h-full grid-cols-2 grid-rows-4 gap-4 md:grid-cols-4 md:grid-rows-2 md:gap-8">
          {apps.map(({ id, href, name, icon }) => {
            return (
              <div key={id} className="col-span-1">
                <div className="flex h-full items-center justify-center">
                  <Link
                    href={`/apps/${href}`}
                    className="flex flex-col items-center gap-y-1">
                    <div className="flex aspect-square w-16 items-center justify-center overflow-hidden rounded-full bg-black text-white hover:bg-red-500">
                      {icon}
                    </div>
                    <p className="w-24 truncate text-center text-sm font-semibold">
                      {name}
                    </p>
                  </Link>
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
