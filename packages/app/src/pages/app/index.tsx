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
import { PitchModal } from '@hieudoanm/components/modals/apps/PitchModal';
import { PomodoroModal } from '@hieudoanm/components/modals/apps/PomodoroModal';
import { QRCodeModal } from '@hieudoanm/components/modals/apps/QRCodeModal';
import { StringModal } from '@hieudoanm/components/modals/apps/StringModal';
import { UUIDModal } from '@hieudoanm/components/modals/apps/UUIDModal';
import { FlashcardsModal } from '@hieudoanm/components/modals/education/FlashcardsModal';
import { PeriodicTableModal } from '@hieudoanm/components/modals/education/PeriodicTableModal';
import { BlackjackModal } from '@hieudoanm/components/modals/games/BlackjackModal';
import { PiModal } from '@hieudoanm/components/modals/games/PIModal';
import { PokerModal } from '@hieudoanm/components/modals/games/PokerModal';
import { RecallModal } from '@hieudoanm/components/modals/games/RecallModal';
import { T3Modal } from '@hieudoanm/components/modals/games/T3Modal';
import { TowersModal } from '@hieudoanm/components/modals/games/TowersModal';
import { TypoglycemiaModal } from '@hieudoanm/components/modals/games/TypoglycemiaModal';
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
import { FC, useEffect, useMemo, useRef, useState } from 'react';

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
  | 'pitch'
  | 'pomodoro'
  | 'qr'
  | 'string'
  | 'uuid'
  | 'flashcards'
  | 'periodic-table'
  | 'blackjack'
  | 'pi'
  | 'poker'
  | 'recall'
  | 't3'
  | 'towers'
  | 'typoglycemia'
  | 'wordle';

type SidebarTab = 'status' | 'clock' | null;

/* ------------------------------------------------------------------ */
/* Modal registry                                                       */
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
  pitch: PitchModal,
  pomodoro: PomodoroModal,
  qr: QRCodeModal,
  string: StringModal,
  uuid: UUIDModal,
  flashcards: FlashcardsModal,
  'periodic-table': PeriodicTableModal,
  blackjack: BlackjackModal,
  pi: PiModal,
  poker: PokerModal,
  recall: RecallModal,
  t3: T3Modal,
  towers: TowersModal,
  typoglycemia: TypoglycemiaModal,
  wordle: WordleModal,
};

/* ------------------------------------------------------------------ */
/* Filter helper                                                        */
/* ------------------------------------------------------------------ */

const match = (label: string, q: string) =>
  label.toLowerCase().includes(q.toLowerCase());

/* ------------------------------------------------------------------ */
/* SearchBar                                                            */
/* ------------------------------------------------------------------ */

const SearchBar: FC<{ query: string; onChange: (v: string) => void }> = ({
  query,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const googleSearch = () => {
    if (!query.trim()) return;
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(query.trim())}`,
      '_blank'
    );
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') googleSearch();
  };

  return (
    <div className="join w-full">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search or filter…"
        className="input input-bordered join-item w-full"
      />
      <button
        className="btn join-item btn-neutral"
        onClick={googleSearch}
        aria-label="Search with Google">
        🔍
      </button>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

const Section: FC<{
  label: string;
  count?: number;
  children: React.ReactNode;
}> = ({ label, count, children }) => (
  <section aria-label={label} className="mt-10 w-full max-w-2xl">
    <p className="text-base-content/30 mb-4 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase">
      {label}
      {count !== undefined && (
        <span className="badge badge-xs badge-neutral font-mono tracking-normal normal-case">
          {count}
        </span>
      )}
    </p>
    {children}
  </section>
);

/* ------------------------------------------------------------------ */
/* MainContent                                                          */
/* ------------------------------------------------------------------ */

const MainContent: FC<{
  today: string;
  query: string;
  onQueryChange: (v: string) => void;
  tools: Tool[];
  education: Tool[];
  games: Tool[];
}> = ({ today, query, onQueryChange, tools, education, games }) => {
  const filtering = query.trim().length > 0;

  const filteredAI = aiBookmarks.filter((b) => match(b.label, query));
  const filteredGoogle = googleBookmarks.filter((b) => match(b.label, query));
  const filteredWebsites = websiteBookmarks.filter((b) =>
    match(b.label, query)
  );
  const filteredTools = tools.filter((t) => match(t.label, query));
  const filteredEducation = education.filter((t) => match(t.label, query));
  const filteredGames = games.filter((t) => match(t.label, query));
  const filteredApps = apps.filter((a) => match(a.id, query));

  return (
    <main className="flex flex-col items-center overflow-y-auto px-8 py-12">
      <p className="text-base-content/30 mb-2 font-mono text-xs tracking-widest uppercase">
        {today}
      </p>
      <h1 className="mb-6 text-3xl font-black tracking-tight">Start Page</h1>

      <div className="mb-10 w-full max-w-2xl">
        <SearchBar query={query} onChange={onQueryChange} />
      </div>

      {(!filtering || filteredAI.length > 0) && (
        <Section label="AI Assistants" count={filteredAI.length}>
          <div className="grid grid-cols-4 gap-4">
            {filteredAI.map((bm) => (
              <BookmarkCard key={bm.label} {...bm} />
            ))}
          </div>
        </Section>
      )}

      {(!filtering || filteredGoogle.length > 0) && (
        <Section label="Google Workspace" count={filteredGoogle.length}>
          <div className="grid grid-cols-4 gap-4">
            {filteredGoogle.map((bm) => (
              <BookmarkCard key={bm.label} {...bm} />
            ))}
          </div>
        </Section>
      )}

      {(!filtering || filteredWebsites.length > 0) && (
        <Section label="Websites" count={filteredWebsites.length}>
          <div className="grid grid-cols-4 gap-4">
            {filteredWebsites.map((bm) => (
              <BookmarkCard key={bm.label} {...bm} />
            ))}
          </div>
        </Section>
      )}

      {(!filtering || filteredTools.length > 0) && (
        <Section label="Tools" count={filteredTools.length}>
          <div className="grid grid-cols-4 gap-4">
            {filteredTools.map((t) => (
              <ToolCard key={t.label} {...t} />
            ))}
          </div>
        </Section>
      )}

      {(!filtering || filteredEducation.length > 0) && (
        <Section label="Education" count={filteredEducation.length}>
          <div className="grid grid-cols-4 gap-4">
            {filteredEducation.map((t) => (
              <ToolCard key={t.label} {...t} />
            ))}
          </div>
        </Section>
      )}

      {(!filtering || filteredGames.length > 0) && (
        <Section label="Games" count={filteredGames.length}>
          <div className="grid grid-cols-4 gap-4">
            {filteredGames.map((t) => (
              <ToolCard key={t.label} {...t} />
            ))}
          </div>
        </Section>
      )}

      {(!filtering || filteredApps.length > 0) && (
        <Section label="Apps" count={filteredApps.length}>
          <div className="grid grid-cols-4 gap-4">
            {filteredApps.map((a) => (
              <AppCard key={a.id} {...a} />
            ))}
          </div>
        </Section>
      )}

      {filtering &&
        filteredAI.length === 0 &&
        filteredGoogle.length === 0 &&
        filteredWebsites.length === 0 &&
        filteredTools.length === 0 &&
        filteredEducation.length === 0 &&
        filteredGames.length === 0 &&
        filteredApps.length === 0 && (
          <p className="text-base-content/30 mt-20 text-sm">
            No results for "{query}" — press 🔍 to search Google.
          </p>
        )}
    </main>
  );
};

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
  const [query, setQuery] = useState('');

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
      label: 'Pitch',
      description: 'Training',
      emoji: '🎹',
      color: '#8b5cf6',
      onClick: open('pitch'),
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
      label: 'Poker',
      description: 'Odds Calculator',
      emoji: '🃏',
      color: '#f59e0b',
      onClick: open('poker'),
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
      label: 'Typoglycemia',
      description: 'Scrambled text',
      emoji: '🔀',
      color: '#f59e0b',
      onClick: open('typoglycemia'),
    },
    {
      label: 'Wordle',
      description: 'Guess the word',
      emoji: '🟩',
      color: '#f59e0b',
      onClick: open('wordle'),
    },
  ];

  // Mobile filtered lists
  const filtering = query.trim().length > 0;
  const mobileFilteredSections = useMemo(
    () => [
      {
        label: 'AI Assistants',
        items: aiBookmarks.filter((b) => !filtering || match(b.label, query)),
        Card: BookmarkCard,
        cols: 'grid-cols-2 sm:grid-cols-3',
      },
      {
        label: 'Google Workspace',
        items: googleBookmarks.filter(
          (b) => !filtering || match(b.label, query)
        ),
        Card: BookmarkCard,
        cols: 'grid-cols-2 sm:grid-cols-3',
      },
      {
        label: 'Websites',
        items: websiteBookmarks.filter(
          (b) => !filtering || match(b.label, query)
        ),
        Card: BookmarkCard,
        cols: 'grid-cols-2 sm:grid-cols-3',
      },
      {
        label: 'Tools',
        items: tools.filter((t) => !filtering || match(t.label, query)),
        Card: ToolCard,
        cols: 'grid-cols-2 sm:grid-cols-3',
      },
      {
        label: 'Education',
        items: education.filter((t) => !filtering || match(t.label, query)),
        Card: ToolCard,
        cols: 'grid-cols-2 sm:grid-cols-3',
      },
      {
        label: 'Games',
        items: games.filter((t) => !filtering || match(t.label, query)),
        Card: ToolCard,
        cols: 'grid-cols-2 sm:grid-cols-3',
      },
      {
        label: 'Apps',
        items: apps.filter((a) => !filtering || match(a.id, query)),
        Card: AppCard,
        cols: 'grid-cols-2 sm:grid-cols-3',
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ],
    [query]
  );

  const ActiveModal = activeModal ? MODAL_MAP[activeModal] : null;
  const sidebarContent = {
    status: <LeftSidebar />,
    clock: <RightSidebar times={times} weatherQueries={weatherQueries} />,
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      {/* Desktop */}
      <div
        className="hidden h-screen overflow-hidden lg:grid"
        style={{ gridTemplateColumns: '280px 2fr 320px' }}>
        <LeftSidebar />
        <MainContent
          today={today}
          query={query}
          onQueryChange={setQuery}
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
          <h1 className="mb-6 text-center text-2xl font-black tracking-tight">
            Start Page
          </h1>

          <div className="mx-auto mb-6 w-full max-w-2xl">
            <SearchBar query={query} onChange={setQuery} />
          </div>

          {mobileFilteredSections
            .filter(({ items }) => items.length > 0)
            .map(({ label, items, Card, cols }) => (
              <section
                key={label}
                aria-label={label}
                className="mx-auto mt-8 w-full max-w-2xl">
                <p className="text-base-content/30 mb-4 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase">
                  {label}
                  <span className="badge badge-xs badge-neutral font-mono tracking-normal normal-case">
                    {items.length}
                  </span>
                </p>
                <div className={`grid ${cols} gap-3`}>
                  {items.map((item: any) => (
                    <Card key={item.label ?? item.id} {...item} />
                  ))}
                </div>
              </section>
            ))}

          {filtering &&
            mobileFilteredSections.every(({ items }) => items.length === 0) && (
              <p className="text-base-content/30 mt-20 text-center text-sm">
                No results for "{query}" — press 🔍 to search Google.
              </p>
            )}

          <div className="h-20" />
        </main>

        {/* Bottom nav */}
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

        {/* Sidebar drawer */}
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

      {ActiveModal && <ActiveModal onClose={close} />}
    </div>
  );
};

export default AppPage;
