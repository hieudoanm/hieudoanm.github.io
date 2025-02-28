import { NextPage } from 'next';
import Link from 'next/link';
import { JSX } from 'react';
import { FaDotCircle } from 'react-icons/fa';
import {
  FaCamera,
  FaEye,
  FaEyeSlash,
  FaFlag,
  FaFlask,
  FaGithub,
  FaI,
  FaImages,
  FaJ,
  FaLightbulb,
  FaMarkdown,
  FaQrcode,
  FaRulerCombined,
  FaSquareJs,
  FaTable,
  FaTelegram,
  FaY,
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
      id: 'convert-code-braille',
      href: 'convert/code/braille',
      name: 'Braille',
      icon: <FaEyeSlash className="text-2xl" />,
    },
    {
      id: 'convert-code-morse',
      href: 'convert/code/morse',
      name: 'Morse',
      icon: <FaDotCircle className="text-2xl" />,
    },
    {
      id: 'convert-data-csv-html',
      href: 'convert/data/csv/html',
      name: 'CSV to HTML',
      icon: <FaTable className="text-2xl" />,
    },
    {
      id: 'convert-data-csv-json',
      href: 'convert/data/csv/json',
      name: 'CSV to JSON',
      icon: <FaTable className="text-2xl" />,
    },
    {
      id: 'convert-data-csv-md',
      href: 'convert/data/csv/md',
      name: 'CSV to MD',
      icon: <FaTable className="text-2xl" />,
    },
    {
      id: 'convert-data-csv-sql',
      href: 'convert/data/csv/sql',
      name: 'CSV to SQL',
      icon: <FaTable className="text-2xl" />,
    },
    {
      id: 'convert-data-json-csv',
      href: 'convert/data/json/csv',
      name: 'JSON to CSV',
      icon: <FaJ className="text-2xl" />,
    },
    {
      id: 'convert-data-json-yaml',
      href: 'convert/data/json/yaml',
      name: 'JSON to YAML',
      icon: <FaJ className="text-2xl" />,
    },
    {
      id: 'convert-data-yaml-json',
      href: 'convert/data/yaml/json',
      name: 'YAML to JSON',
      icon: <FaY className="text-2xl" />,
    },
    {
      id: 'convert-image-png2ico',
      href: 'convert/images/png2ico',
      name: 'PNG to ICO',
      icon: <FaImages className="text-2xl" />,
    },
    {
      id: 'convert-image-svg2png',
      href: 'convert/images/svg2png',
      name: 'SVG to PNG',
      icon: <FaImages className="text-2xl" />,
    },
    {
      id: 'editor-manifest.json',
      href: 'editor/manifest.json',
      name: 'manifest.json',
      icon: <FaSquareJs className="text-2xl" />,
    },
    {
      id: 'editor-markdown',
      href: 'editor/markdown',
      name: 'Markdown',
      icon: <FaMarkdown className="text-2xl" />,
    },
    {
      id: 'github-cover',
      href: 'github/cover',
      name: 'GitHub Cover',
      icon: <FaGithub className="text-2xl" />,
    },
    {
      id: 'github-languages',
      href: 'github/languages',
      name: 'GitHub Languages',
      icon: <FaGithub className="text-2xl" />,
    },
    {
      id: 'generate-qrcode',
      href: 'generate/qrcode',
      name: 'QR',
      icon: <FaQrcode className="text-2xl" />,
    },
    {
      id: 'generate-uuid',
      href: 'generate/uuid',
      name: 'UUID',
      icon: <FaI className="text-2xl" />,
    },
    {
      id: 'grayify',
      href: 'grayify',
      name: 'Grayify',
      icon: <FaCamera className="text-2xl" />,
    },
    {
      id: 'list-chemistry',
      href: 'list/chemistry',
      name: 'Chemistry',
      icon: <FaFlask className="text-2xl" />,
    },
    {
      id: 'list-countries',
      href: 'list/countries',
      name: 'Countries',
      icon: <FaFlag className="text-2xl" />,
    },
    {
      id: 'ocr',
      href: 'ocr',
      name: 'OCR',
      icon: <FaEye className="text-2xl" />,
    },
    {
      id: 'resolution',
      href: 'resolution',
      name: 'Resolution',
      icon: <FaRulerCombined className="text-2xl" />,
    },
    {
      id: 'status',
      href: 'status',
      name: 'Status',
      icon: <FaLightbulb className="text-2xl" />,
    },
    {
      id: 'telegram-webhook',
      href: 'telegram/webhook',
      name: 'Telegram Webhook',
      icon: <FaTelegram className="text-2xl" />,
    },
  ];

  return (
    <div className="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="container mx-auto h-full p-4 md:p-8">
        <div className="grid h-full grid-cols-4 grid-rows-7 gap-4 md:grid-cols-7 md:grid-rows-4 md:gap-8">
          {apps.map(({ id, href, name, icon }) => {
            return (
              <div key={id} className="col-span-1">
                <div className="flex h-full items-center justify-center">
                  <Link
                    href={`/apps/${href}`}
                    className="flex flex-col items-center gap-y-1">
                    <div className="flex aspect-square w-16 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-gray-100 hover:bg-red-500">
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
