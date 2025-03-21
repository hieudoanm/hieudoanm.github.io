import { NothingApp } from '@web/types';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaBook,
  FaChessKnight,
  FaCircleDot,
  FaClock,
  FaEye,
  FaEyeSlash,
  FaFlag,
  FaFlask,
  FaGithub,
  FaGoogle,
  FaImages,
  FaJs,
  FaLightbulb,
  FaMarkdown,
  FaPalette,
  FaQrcode,
  FaRobot,
  FaRulerCombined,
  FaSquareJs,
  FaTable,
  FaTelegram,
  FaTextWidth,
  FaU,
  FaY,
} from 'react-icons/fa6';

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
      id: 'clock',
      href: 'clock',
      name: 'Clock',
      shortName: 'clock',
      icon: <FaClock className="text-xl md:text-2xl" />,
    },
    {
      id: 'colors',
      href: 'colors',
      name: 'Colors',
      shortName: 'colors',
      icon: <FaPalette className="text-xl md:text-2xl" />,
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
      icon: <FaCircleDot className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-csv',
      href: 'converter/data/csv',
      name: 'CSV',
      shortName: 'csv',
      icon: <FaTable className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-json',
      href: 'converter/data/json',
      name: 'JSON',
      shortName: 'json',
      icon: <FaJs className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-yaml',
      href: 'converter/data/yaml',
      name: 'YAML',
      shortName: 'yaml',
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
      id: 'gen.ai',
      href: 'gen.ai',
      name: 'GenAI',
      shortName: 'gen.ai',
      icon: <FaRobot className="text-xl md:text-2xl" />,
    },
    {
      id: 'github',
      href: 'github',
      name: 'GitHub',
      shortName: 'gh',
      icon: <FaGithub className="text-xl md:text-2xl" />,
    },
    {
      id: 'google',
      href: 'google',
      name: 'Google',
      shortName: 'ggl',
      icon: <FaGoogle className="text-xl md:text-2xl" />,
    },
    {
      id: 'images',
      href: 'images',
      name: 'Images',
      shortName: 'images',
      icon: <FaImages className="text-xl md:text-2xl" />,
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
      id: 'string',
      href: 'string',
      name: 'String',
      shortName: 'string',
      icon: <FaTextWidth className="text-xl md:text-2xl" />,
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
    {
      id: 'words-english',
      href: 'words/english',
      name: 'English',
      shortName: 'eng',
      icon: <FaBook className="text-xl md:text-2xl" />,
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
        <div className="grid h-full grow grid-cols-4 grid-rows-6 gap-4 md:grid-cols-6 md:grid-rows-4 md:gap-8">
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
                        <span className="inline lowercase md:hidden">
                          {shortName}
                        </span>
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
