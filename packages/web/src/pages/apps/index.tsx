import { NextPage } from 'next';
import Link from 'next/link';
import { JSX, useState } from 'react';
import { FaDotCircle } from 'react-icons/fa';
import {
  FaCamera,
  FaChessKnight,
  FaEye,
  FaEyeSlash,
  FaFlag,
  FaFlask,
  FaGithub,
  FaImages,
  FaJs,
  FaLightbulb,
  FaMarkdown,
  FaQrcode,
  FaRulerCombined,
  FaSquareJs,
  FaTable,
  FaTelegram,
  FaU,
  FaY,
} from 'react-icons/fa6';

type NothingApp = {
  id: string;
  href: string;
  name: string;
  shortName: string;
  icon: JSX.Element;
};

const AppsPage: NextPage = () => {
  const [{ search }, setState] = useState<{ search: string }>({ search: '' });

  const apps: NothingApp[] = [
    {
      id: 'chess',
      href: 'chess',
      name: 'Chess',
      shortName: 'chess',
      icon: <FaChessKnight className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-code-braille',
      href: 'converter/code/braille',
      name: 'Braille',
      shortName: 'braille',
      icon: <FaEyeSlash className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-code-morse',
      href: 'converter/code/morse',
      name: 'Morse',
      shortName: 'morse',
      icon: <FaDotCircle className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-csv-html',
      href: 'converter/data/csv/html',
      name: 'CSV to HTML',
      shortName: 'csv2html',
      icon: <FaTable className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-csv-json',
      href: 'converter/data/csv/json',
      name: 'CSV to JSON',
      shortName: 'csv2json',
      icon: <FaTable className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-csv-md',
      href: 'converter/data/csv/md',
      name: 'CSV to MD',
      shortName: 'csv2md',
      icon: <FaTable className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-csv-sql',
      href: 'converter/data/csv/sql',
      name: 'CSV to SQL',
      shortName: 'csv2sql',
      icon: <FaTable className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-json-csv',
      href: 'converter/data/json/csv',
      name: 'JSON to CSV',
      shortName: 'json2csv',
      icon: <FaJs className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-json-yaml',
      href: 'converter/data/json/yaml',
      name: 'JSON to YAML',
      shortName: 'json2yaml',
      icon: <FaJs className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-yaml-json',
      href: 'converter/data/yaml/json',
      name: 'YAML to JSON',
      shortName: 'yaml2json',
      icon: <FaY className="text-xl md:text-2xl" />,
    },
    {
      id: 'editor-manifest.json',
      href: 'editor/manifest.json',
      name: 'manifest.json',
      shortName: 'manifest',
      icon: <FaSquareJs className="text-xl md:text-2xl" />,
    },
    {
      id: 'editor-markdown',
      href: 'editor/markdown',
      name: 'Markdown',
      shortName: 'md',
      icon: <FaMarkdown className="text-xl md:text-2xl" />,
    },
    {
      id: 'generate-qrcode',
      href: 'generate/qrcode',
      name: 'QR Code',
      shortName: 'qr.code',
      icon: <FaQrcode className="text-xl md:text-2xl" />,
    },
    {
      id: 'generate-uuid',
      href: 'generate/uuid',
      name: 'UUID',
      shortName: 'uuid',
      icon: <FaU className="text-xl md:text-2xl" />,
    },
    {
      id: 'github-cover',
      href: 'github/cover',
      name: 'GitHub Cover',
      shortName: 'gh.cover',
      icon: <FaGithub className="text-xl md:text-2xl" />,
    },
    {
      id: 'github-languages',
      href: 'github/languages',
      name: 'GitHub Languages',
      shortName: 'gh.languages',
      icon: <FaGithub className="text-xl md:text-2xl" />,
    },
    {
      id: 'images-converter-png2ico',
      href: 'images/converter/png2ico',
      name: 'PNG to ICO',
      shortName: 'png2ico',
      icon: <FaImages className="text-xl md:text-2xl" />,
    },
    {
      id: 'images-converter-svg2png',
      href: 'images/converter/svg2png',
      name: 'SVG to PNG',
      shortName: 'svg2png',
      icon: <FaImages className="text-xl md:text-2xl" />,
    },
    {
      id: 'images-filter-golden',
      href: 'images/filter/golden',
      name: 'Filter - Golden',
      shortName: 'golden',
      icon: <FaCamera className="text-xl md:text-2xl" />,
    },
    {
      id: 'images-filter-grayscale',
      href: 'images/filter/grayscale',
      name: 'Filter - Grayscale',
      shortName: 'grayscale',
      icon: <FaCamera className="text-xl md:text-2xl" />,
    },
    {
      id: 'list-chemistry',
      href: 'list/chemistry',
      name: 'Chemistry',
      shortName: 'chemistry',
      icon: <FaFlask className="text-xl md:text-2xl" />,
    },
    {
      id: 'list-countries',
      href: 'list/countries',
      name: 'Countries',
      shortName: 'countries',
      icon: <FaFlag className="text-xl md:text-2xl" />,
    },
    {
      id: 'ocr',
      href: 'ocr',
      name: 'OCR',
      shortName: 'ocr',
      icon: <FaEye className="text-xl md:text-2xl" />,
    },
    {
      id: 'resolution',
      href: 'resolution',
      name: 'Resolution',
      shortName: 'resolution',
      icon: <FaRulerCombined className="text-xl md:text-2xl" />,
    },
    {
      id: 'status',
      href: 'status',
      name: 'Status',
      shortName: 'status',
      icon: <FaLightbulb className="text-xl md:text-2xl" />,
    },
    {
      id: 'telegram-webhook',
      href: 'telegram/webhook',
      name: 'Telegram Webhook',
      shortName: 'tele.hook',
      icon: <FaTelegram className="text-xl md:text-2xl" />,
    },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="container mx-auto flex h-full flex-col gap-y-4 p-4 md:gap-y-8 md:p-8">
        <div className="w-full">
          <input
            id="search"
            name="search"
            placeholder="Search"
            className="w-full rounded border border-gray-300 px-4 py-2"
            value={search}
            onChange={(event) => {
              setState((previous) => ({
                ...previous,
                search: event.target.value,
              }));
            }}
          />
        </div>
        <div className="grid h-full grow grid-cols-4 grid-rows-7 gap-4 md:grid-cols-7 md:grid-rows-4 md:gap-8">
          {apps
            .filter(({ name, shortName }) => {
              return search !== ''
                ? name.toLowerCase().includes(search.toLowerCase()) ||
                    shortName.toLowerCase().includes(search.toLowerCase())
                : true;
            })
            .map(({ id = '', href = '', name = '', shortName = '', icon }) => {
              return (
                <div key={id} className="col-span-1 row-span-1">
                  <div className="flex h-full items-center justify-center">
                    <Link
                      href={`/apps/${href}`}
                      className="flex flex-col items-center gap-y-1 md:gap-y-2">
                      <div className="flex aspect-square w-12 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-gray-100 hover:bg-red-500 md:w-16">
                        {icon}
                      </div>
                      <p className="w-full truncate text-center text-xs font-semibold md:text-sm">
                        <span className="inline md:hidden">{shortName}</span>
                        <span className="hidden md:inline">{name}</span>
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

export default AppsPage;
