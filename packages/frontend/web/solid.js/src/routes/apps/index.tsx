import { A } from '@solidjs/router';
import {
  FaBrandsGithub,
  FaBrandsGoogle,
  FaBrandsTelegram,
  FaSolidBook,
  FaSolidCalculator,
  FaSolidChessKnight,
  FaSolidCircleDot,
  FaSolidClock,
  FaSolidEye,
  FaSolidEyeSlash,
  FaSolidFlag,
  FaSolidFlask,
  FaSolidG,
  FaSolidImage,
  FaSolidImages,
  FaSolidJ,
  FaSolidLightbulb,
  FaSolidPalette,
  FaSolidPenToSquare,
  FaSolidRobot,
  FaSolidRulerCombined,
  FaSolidTable,
  FaSolidTextWidth,
  FaSolidY,
} from 'solid-icons/fa';
import { createSignal } from 'solid-js';
import { NothingApp } from '~/types';

const AppsPage = () => {
  const [signal, setSignal] = createSignal<{ search: string }>({
    search: '',
  });

  const apps: NothingApp[] = [
    {
      id: 'calculator',
      href: 'calculator',
      name: 'Calculator',
      shortName: 'calculator',
      icon: <FaSolidCalculator class="text-xl md:text-2xl" />,
    },
    {
      id: 'chess',
      href: 'chess',
      name: 'Chess',
      shortName: 'chess',
      icon: <FaSolidChessKnight class="text-xl md:text-2xl" />,
    },
    {
      id: 'clock',
      href: 'clock',
      name: 'Clock',
      shortName: 'clock',
      icon: <FaSolidClock class="text-xl md:text-2xl" />,
    },
    {
      id: 'colors',
      href: 'colors',
      name: 'Colors',
      shortName: 'colors',
      icon: <FaSolidPalette class="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-code-braille',
      href: 'converter/code/braille',
      name: 'Braille',
      shortName: 'braille',
      icon: <FaSolidEyeSlash class="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-code-morse',
      href: 'converter/code/morse',
      name: 'Morse',
      shortName: 'morse',
      icon: <FaSolidCircleDot class="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-csv',
      href: 'converter/data/csv',
      name: 'CSV',
      shortName: 'csv',
      icon: <FaSolidTable class="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-json',
      href: 'converter/data/json',
      name: 'JSON',
      shortName: 'json',
      icon: <FaSolidJ class="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-data-yaml',
      href: 'converter/data/yaml',
      name: 'YAML',
      shortName: 'yaml',
      icon: <FaSolidY class="text-xl md:text-2xl" />,
    },
    {
      id: 'editor',
      href: 'editor',
      name: 'Editor',
      shortName: 'editor',
      icon: <FaSolidPenToSquare class="text-xl md:text-2xl" />,
    },
    {
      id: 'generate',
      href: 'generate',
      name: 'Generate',
      shortName: 'generate',
      icon: <FaSolidG class="text-xl md:text-2xl" />,
    },
    {
      id: 'gen.ai',
      href: 'gen.ai',
      name: 'GenAI',
      shortName: 'gen.ai',
      icon: <FaSolidRobot class="text-xl md:text-2xl" />,
    },
    {
      id: 'github',
      href: 'github',
      name: 'GitHub',
      shortName: 'gh',
      icon: <FaBrandsGithub class="text-xl md:text-2xl" />,
    },
    {
      id: 'google',
      href: 'google',
      name: 'Google',
      shortName: 'ggl',
      icon: <FaBrandsGoogle class="text-xl md:text-2xl" />,
    },
    {
      id: 'images',
      href: 'images',
      name: 'Images',
      shortName: 'images',
      icon: <FaSolidImage class="text-xl md:text-2xl" />,
    },
    {
      id: 'list-chemistry',
      href: 'list/chemistry',
      name: 'Chemistry',
      shortName: 'chemistry',
      icon: <FaSolidFlask class="text-xl md:text-2xl" />,
    },
    {
      id: 'list-countries',
      href: 'list/countries',
      name: 'Countries',
      shortName: 'countries',
      icon: <FaSolidFlag class="text-xl md:text-2xl" />,
    },
    {
      id: 'ocr',
      href: 'ocr',
      name: 'OCR',
      shortName: 'ocr',
      icon: <FaSolidEye class="text-xl md:text-2xl" />,
    },
    {
      id: 'photos',
      href: 'photos',
      name: 'Photos',
      shortName: 'photos',
      icon: <FaSolidImages class="text-xl md:text-2xl" />,
    },
    {
      id: 'resolution',
      href: 'resolution',
      name: 'Resolution',
      shortName: 'resolution',
      icon: <FaSolidRulerCombined class="text-xl md:text-2xl" />,
    },
    {
      id: 'string',
      href: 'string',
      name: 'String',
      shortName: 'string',
      icon: <FaSolidTextWidth class="text-xl md:text-2xl" />,
    },
    {
      id: 'status',
      href: 'status',
      name: 'Status',
      shortName: 'status',
      icon: <FaSolidLightbulb class="text-xl md:text-2xl" />,
    },
    {
      id: 'telegram-webhook',
      href: 'telegram/webhook',
      name: 'Telegram Webhook',
      shortName: 'tele.hook',
      icon: <FaBrandsTelegram class="text-xl md:text-2xl" />,
    },
    {
      id: 'words-english',
      href: 'words/english',
      name: 'English',
      shortName: 'eng',
      icon: <FaSolidBook class="text-xl md:text-2xl" />,
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
            value={signal().search}
            onChange={(event) => {
              setSignal((previous) => ({
                ...previous,
                search: event.target.value,
              }));
            }}
          />
        </div>
        <div class="grid h-full grow grid-cols-4 grid-rows-6 gap-4 md:grid-cols-6 md:grid-rows-4 md:gap-8">
          {apps
            .filter(({ name, shortName }) => {
              const nameBoolean: boolean = name
                .toLowerCase()
                .includes(signal().search.toLowerCase());
              const shortNameBoolean: boolean = shortName
                .toLowerCase()
                .includes(signal().search.toLowerCase());
              return signal().search !== ''
                ? nameBoolean || shortNameBoolean
                : true;
            })
            .map(({ href = '', name = '', shortName = '', icon }) => {
              return (
                <div class="col-span-1 row-span-1">
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

export default AppsPage;
