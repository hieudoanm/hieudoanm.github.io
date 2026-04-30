import { AppCard } from '@hieudoanm/components/cards/AppCard';
import { BookmarkCard } from '@hieudoanm/components/cards/BookmarkCard';
import { Tool, ToolCard } from '@hieudoanm/components/cards/ToolCard';
import { BrailleModal } from '@hieudoanm/components/modals/apps/BrailleModal';
import { BreakingBadModal } from '@hieudoanm/components/modals/apps/BreakingBadModal';
import { CalculatorModal } from '@hieudoanm/components/modals/apps/CalculatorModal';
import { ColorsModal } from '@hieudoanm/components/modals/apps/ColorsModal';
import { ConverterModal } from '@hieudoanm/components/modals/apps/ConverterModal';
import { CountdownModal } from '@hieudoanm/components/modals/apps/CountdownModal';
import { DOIModal } from '@hieudoanm/components/modals/apps/DOIModal';
import { EmojisModal } from '@hieudoanm/components/modals/apps/EmojisModal';
import { HouseModal } from '@hieudoanm/components/modals/apps/HouseModal';
import { IPModal } from '@hieudoanm/components/modals/apps/IPModal';
import { KaprekarModal } from '@hieudoanm/components/modals/apps/KaprekarModal';
import { MorseModal } from '@hieudoanm/components/modals/apps/MorseModal';
import { PomodoroModal } from '@hieudoanm/components/modals/apps/PomodoroModal';
import { QRCodeModal } from '@hieudoanm/components/modals/apps/QRCodeModal';
import { StringModal } from '@hieudoanm/components/modals/apps/StringModal';
import { UUIDModal } from '@hieudoanm/components/modals/apps/UUIDModal';
import { FlashcardsModal } from '@hieudoanm/components/modals/education/FlashcardsModal';
import { PeriodicTableModal } from '@hieudoanm/components/modals/education/PeriodicTableModal';
import { BlackjackModal } from '@hieudoanm/components/modals/games/BlackjackModal';
import { PiModal } from '@hieudoanm/components/modals/games/PIModal';
import { RecallModal } from '@hieudoanm/components/modals/games/RecallModal';
import { T3Modal } from '@hieudoanm/components/modals/games/T3Modal';
import { TowersModal } from '@hieudoanm/components/modals/games/TowersModal';
import { WordleModal } from '@hieudoanm/components/modals/games/WordleModal';
import { LeftSidebar } from '@hieudoanm/components/sidebars/LeftSidebar';
import { RightSidebar } from '@hieudoanm/components/sidebars/RightSidebar';
import { apps } from '@hieudoanm/data/apps';
import {
  ai as aiBookmarks,
  google as googleBookmarks,
  websites as websiteBookmarks,
} from '@hieudoanm/data/bookmarks';
import { getTimeInZone, timezones } from '@hieudoanm/data/timezones';
import { WeatherData } from '@hieudoanm/data/weather';
import { useQueries } from '@tanstack/react-query';
import { NextPage } from 'next';
import { FC, useEffect, useState } from 'react';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type ModalId =
  | 'braille'
  | 'breaking-bad'
  | 'calculator'
  | 'colors'
  | 'converter'
  | 'countdown'
  | 'doi'
  | 'emojis'
  | 'house'
  | 'ip'
  | 'kaprekar'
  | 'morse'
  | 'pomodoro'
  | 'qr'
  | 'string'
  | 'uuid'
  | 'flashcards'
  | 'periodic-table'
  | 'blackjack'
  | 'pi'
  | 'recall'
  | 't3'
  | 'towers'
  | 'wordle';

type SidebarTab = 'status' | 'clock' | null;

/* ------------------------------------------------------------------ */
/* Modal registry — single source of truth                             */
/* ------------------------------------------------------------------ */

const MODAL_MAP: Record<ModalId, FC<{ onClose: () => void }>> = {
  braille: BrailleModal,
  'breaking-bad': BreakingBadModal,
  calculator: CalculatorModal,
  colors: ColorsModal,
  converter: ConverterModal,
  countdown: CountdownModal,
  doi: DOIModal,
  emojis: EmojisModal,
  house: HouseModal,
  ip: IPModal,
  kaprekar: KaprekarModal,
  morse: MorseModal,
  pomodoro: PomodoroModal,
  qr: QRCodeModal,
  string: StringModal,
  uuid: UUIDModal,
  flashcards: FlashcardsModal,
  'periodic-table': PeriodicTableModal,
  blackjack: BlackjackModal,
  pi: PiModal,
  recall: RecallModal,
  t3: T3Modal,
  towers: TowersModal,
  wordle: WordleModal,
};

/* ------------------------------------------------------------------ */
/* Shared section component                                            */
/* ------------------------------------------------------------------ */

const Section: FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <section aria-label={label} className="mt-10 w-full max-w-2xl">
    <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
      {label}
    </p>
    {children}
  </section>
);

/* ------------------------------------------------------------------ */
/* Center column                                                        */
/* ------------------------------------------------------------------ */

const MainContent: FC<{
  today: string;
  tools: Tool[];
  education: Tool[];
  games: Tool[];
}> = ({ today, tools, education, games }) => (
  <main className="flex flex-col items-center overflow-y-auto px-8 py-12">
    <p className="text-base-content/30 mb-2 font-mono text-xs tracking-widest uppercase">
      {today}
    </p>
    <h1 className="mb-10 text-3xl font-black tracking-tight">Start Page</h1>

    <Section label="AI Assistants">
      <div className="grid grid-cols-4 gap-4">
        {aiBookmarks.map((bm) => (
          <BookmarkCard key={bm.label} {...bm} />
        ))}
      </div>
    </Section>

    <Section label="Google Workspace">
      <div className="grid grid-cols-4 gap-4">
        {googleBookmarks.map((bm) => (
          <BookmarkCard key={bm.label} {...bm} />
        ))}
      </div>
    </Section>

    <Section label="Websites">
      <div className="grid grid-cols-4 gap-4">
        {websiteBookmarks.map((bm) => (
          <BookmarkCard key={bm.label} {...bm} />
        ))}
      </div>
    </Section>

    <Section label="Tools">
      <div className="grid grid-cols-4 gap-4">
        {tools.map((t) => (
          <ToolCard key={t.label} {...t} />
        ))}
      </div>
    </Section>

    <Section label="Education">
      <div className="grid grid-cols-4 gap-4">
        {education.map((t) => (
          <ToolCard key={t.label} {...t} />
        ))}
      </div>
    </Section>

    <Section label="Games">
      <div className="grid grid-cols-4 gap-4">
        {games.map((t) => (
          <ToolCard key={t.label} {...t} />
        ))}
      </div>
    </Section>

    <Section label="Apps">
      <div className="grid grid-cols-4 gap-4">
        {apps.map((a) => (
          <AppCard key={a.id} {...a} />
        ))}
      </div>
    </Section>
  </main>
);

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

const AppPage: NextPage = () => {
  const [times, setTimes] = useState(() =>
    timezones.map(({ tz }) => getTimeInZone(tz))
  );
  const [today, setToday] = useState('');
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);
  const [activeSidebar, setActiveSidebar] = useState<SidebarTab>(null);

  const close = () => setActiveModal(null);

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
    const interval = setInterval(
      () => setTimes(timezones.map(({ tz }) => getTimeInZone(tz))),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  const weatherQueries = useQueries({
    queries: timezones.map(({ lat, lon }) => ({
      queryKey: ['open-meteo', lat, lon],
      queryFn: async () => {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );
        return (await res.json()).current as WeatherData;
      },
      staleTime: 1000 * 60 * 10,
    })),
  });

  const open = (id: ModalId) => () => setActiveModal(id);

  const tools: Tool[] = [
    {
      label: 'Braille',
      description: 'Converter',
      emoji: '⠿',
      color: '#8b5cf6',
      onClick: open('braille'),
    },
    {
      label: 'Breaking Bad',
      description: 'Element',
      emoji: '🧪',
      color: '#eab308',
      onClick: open('breaking-bad'),
    },
    {
      label: 'Calculator',
      description: 'Math',
      emoji: '➗',
      color: '#8b5cf6',
      onClick: open('calculator'),
    },
    {
      label: 'Colors',
      description: 'Picker',
      emoji: '🎨',
      color: '#ec4899',
      onClick: open('colors'),
    },
    {
      label: 'Converter',
      description: 'Converter',
      emoji: '🔀',
      color: '#8b5cf6',
      onClick: open('converter'),
    },
    {
      label: 'Countdown',
      description: 'Timer',
      emoji: '⏳',
      color: '#06b6d4',
      onClick: open('countdown'),
    },
    {
      label: 'DOI',
      description: 'Cite',
      emoji: '📄',
      color: '#3b82f6',
      onClick: open('doi'),
    },
    {
      label: 'Emojis',
      description: 'Explorer',
      emoji: '😀',
      color: '#f59e0b',
      onClick: open('emojis'),
    },
    {
      label: 'House',
      description: 'M.D.',
      emoji: '🏥',
      color: '#ef4444',
      onClick: open('house'),
    },
    {
      label: 'IP',
      description: 'Inspector',
      emoji: '🌐',
      color: '#f59e0b',
      onClick: open('ip'),
    },
    {
      label: 'Kaprekar',
      description: 'Routine',
      emoji: '🔢',
      color: '#f59e0b',
      onClick: open('kaprekar'),
    },
    {
      label: 'Morse Code',
      description: 'Converter',
      emoji: '🔣',
      color: '#f59e0b',
      onClick: open('morse'),
    },
    {
      label: 'Pomodoro',
      description: 'Timer',
      emoji: '🍅',
      color: '#ef4444',
      onClick: open('pomodoro'),
    },
    {
      label: 'QR Code',
      description: 'Generator',
      emoji: '▦',
      color: '#22d3ee',
      onClick: open('qr'),
    },
    {
      label: 'String',
      description: 'Formatter',
      emoji: '✏️',
      color: '#10b981',
      onClick: open('string'),
    },
    {
      label: 'UUID',
      description: 'Generator',
      emoji: '🔑',
      color: '#a855f7',
      onClick: open('uuid'),
    },
  ];

  const education: Tool[] = [
    {
      label: 'Flashcards',
      description: 'Words',
      emoji: '📓',
      color: '#fefefe',
      onClick: open('flashcards'),
    },
    {
      label: 'Periodic Table',
      description: 'Elements',
      emoji: '📊',
      color: '#f59e0b',
      onClick: open('periodic-table'),
    },
  ];

  const games: Tool[] = [
    {
      label: 'Blackjack',
      description: 'Cards Counter',
      emoji: '🃏',
      color: '#f59e0b',
      onClick: open('blackjack'),
    },
    {
      label: 'PI',
      description: 'Memorization',
      emoji: 'π',
      color: '#f59e0b',
      onClick: open('pi'),
    },
    {
      label: 'Recall',
      description: 'Memorization',
      emoji: '🔣',
      color: '#f59e0b',
      onClick: open('recall'),
    },
    {
      label: 'T3',
      description: 'Tic-Tac-Toe',
      emoji: '❌',
      color: '#f59e0b',
      onClick: open('t3'),
    },
    {
      label: 'Towers',
      description: 'Towers of Hanoi',
      emoji: '🗼',
      color: '#f59e0b',
      onClick: open('towers'),
    },
    {
      label: 'Wordle',
      description: 'Guess the word',
      emoji: '🟩',
      color: '#f59e0b',
      onClick: open('wordle'),
    },
  ];

  // Active modal component resolved from registry
  const ActiveModal = activeModal ? MODAL_MAP[activeModal] : null;

  const sidebarContent = {
    status: <LeftSidebar />,
    clock: <RightSidebar times={times} weatherQueries={weatherQueries} />,
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      {/* Desktop 3-column */}
      <div
        className="hidden h-screen overflow-hidden lg:grid"
        style={{ gridTemplateColumns: '280px 2fr 320px' }}>
        <LeftSidebar />
        <MainContent
          today={today}
          tools={tools}
          education={education}
          games={games}
        />
        <RightSidebar times={times} weatherQueries={weatherQueries} />
      </div>

      {/* Mobile */}
      <div className="flex min-h-screen flex-col lg:hidden">
        <main className="flex-1 overflow-y-auto px-4 py-8">
          <p className="text-base-content/30 mb-2 text-center font-mono text-xs tracking-widest uppercase">
            {today}
          </p>
          <h1 className="mb-8 text-center text-2xl font-black tracking-tight">
            Start Page
          </h1>

          {[
            {
              label: 'AI Assistants',
              items: aiBookmarks,
              Card: BookmarkCard,
              cols: 'grid-cols-2 sm:grid-cols-3',
            },
            {
              label: 'Google Workspace',
              items: googleBookmarks,
              Card: BookmarkCard,
              cols: 'grid-cols-2 sm:grid-cols-3',
            },
            {
              label: 'Websites',
              items: websiteBookmarks,
              Card: BookmarkCard,
              cols: 'grid-cols-2 sm:grid-cols-3',
            },
            {
              label: 'Tools',
              items: tools,
              Card: ToolCard,
              cols: 'grid-cols-2 sm:grid-cols-3',
            },
            {
              label: 'Education',
              items: education,
              Card: ToolCard,
              cols: 'grid-cols-2 sm:grid-cols-3',
            },
            {
              label: 'Games',
              items: games,
              Card: ToolCard,
              cols: 'grid-cols-2 sm:grid-cols-3',
            },
          ].map(({ label, items, Card, cols }) => (
            <section
              key={label}
              aria-label={label}
              className="mx-auto mt-8 w-full max-w-2xl">
              <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
                {label}
              </p>
              <div className={`grid ${cols} gap-3`}>
                {items.map((item: any) => (
                  <Card key={item.label ?? item.id} {...item} />
                ))}
              </div>
            </section>
          ))}

          <section aria-label="Apps" className="mx-auto mt-8 w-full max-w-2xl">
            <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
              Apps
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {apps.map((a) => (
                <AppCard key={a.id} {...a} />
              ))}
            </div>
          </section>

          <div className="h-20" />
        </main>

        {/* Mobile bottom nav */}
        <nav className="bg-base-100 border-base-300 fixed inset-x-0 bottom-0 z-40 flex border-t">
          {(['status', 'clock'] as const).map((tab) => (
            <button
              key={tab}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs transition-colors ${
                activeSidebar === tab
                  ? 'text-primary'
                  : 'text-base-content/40 hover:text-base-content/70'
              }`}
              onClick={() => setActiveSidebar((p) => (p === tab ? null : tab))}>
              <span className="text-lg">{tab === 'status' ? '📡' : '🕐'}</span>
              {tab === 'status' ? 'Status' : 'Clock'}
            </button>
          ))}
        </nav>

        {/* Mobile sidebar drawer */}
        {activeSidebar && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setActiveSidebar(null)}
            />
            <div className="bg-base-100 border-base-300 fixed inset-x-0 bottom-16 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t">
              <div className="bg-base-100 border-base-300 sticky top-0 flex items-center justify-between border-b px-4 py-3">
                <span className="text-sm font-semibold capitalize">
                  {activeSidebar === 'status'
                    ? 'Service Status'
                    : 'Clock & Weather'}
                </span>
                <button
                  className="btn btn-ghost btn-xs btn-circle"
                  onClick={() => setActiveSidebar(null)}>
                  ✕
                </button>
              </div>
              <div className="p-4">{sidebarContent[activeSidebar]}</div>
            </div>
          </>
        )}
      </div>

      {/* Active modal — resolved from registry */}
      {ActiveModal && <ActiveModal onClose={close} />}
    </div>
  );
};

export default AppPage;
