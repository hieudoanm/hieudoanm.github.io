// app/page.tsx (or pages/index.tsx)
import { BookmarkCard } from '@hieudoanm/components/cards/BookmarkCard';
import { Tool, ToolCard } from '@hieudoanm/components/cards/ToolCard';
import { BrailleModal } from '@hieudoanm/components/modals/BrailleModal';
import { ColorsModal } from '@hieudoanm/components/modals/ColorsModal';
import { CountdownModal } from '@hieudoanm/components/modals/CountdownModal';
import { DOIModal } from '@hieudoanm/components/modals/DOIModal';
import { HouseModal } from '@hieudoanm/components/modals/HouseModal';
import { IPModal } from '@hieudoanm/components/modals/IPModal';
import { KaprekarModal } from '@hieudoanm/components/modals/KaprekarModal';
import { MorseModal } from '@hieudoanm/components/modals/MorseModal';
import { PomodoroModal } from '@hieudoanm/components/modals/PomodoroModal';
import { QRCodeModal } from '@hieudoanm/components/modals/QRCodeModal';
import { StringModal } from '@hieudoanm/components/modals/StringModal';
import { UUIDModal } from '@hieudoanm/components/modals/UUIDModal';
import { RightSidebar } from '@hieudoanm/components/sidebars/RightSidebar';
import { LeftSidebar } from '@hieudoanm/components/sidebars/LeftSidebar';
import {
  ai as aiBookmarks,
  websites as websiteBookmarks,
} from '@hieudoanm/data/bookmarks';
import { getTimeInZone, timezones } from '@hieudoanm/data/timezones';
import { WeatherData } from '@hieudoanm/data/weather';
import { useQueries } from '@tanstack/react-query';
import { NextPage } from 'next';
import { FC, useEffect, useState } from 'react';
import { EmojisModal } from '@hieudoanm/components/modals/EmojisModal';

// ── Extracted to avoid duplicating the center column JSX ──────────────────────

const MainContent: FC<{ today: string; tools: Tool[] }> = ({
  today = '',
  tools = [],
}) => (
  <main className="flex flex-col items-center overflow-y-auto px-8 py-12">
    <p className="text-base-content/30 mb-2 font-mono text-xs tracking-widest uppercase">
      {today}
    </p>
    <h1 className="mb-10 text-3xl font-black tracking-tight">Start Page</h1>

    <section aria-label="AI Bookmarks" className="w-full max-w-2xl">
      <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
        AI Assistants
      </p>
      <div className="grid grid-cols-4 gap-4">
        {aiBookmarks.map((bm) => (
          <BookmarkCard key={bm.label} {...bm} />
        ))}
      </div>
    </section>

    <section aria-label="Bookmarks" className="mt-10 w-full max-w-2xl">
      <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
        Bookmarks
      </p>
      <div className="grid grid-cols-4 gap-4">
        {websiteBookmarks.map((bm) => (
          <BookmarkCard key={bm.label} {...bm} />
        ))}
      </div>
    </section>

    <section aria-label="Tools" className="mt-10 w-full max-w-2xl">
      <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
        Tools
      </p>
      <div className="grid grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.label} {...tool} />
        ))}
      </div>
    </section>
  </main>
);

type ModalId =
  | 'braille'
  | 'colors'
  | 'countdown'
  | 'doi'
  | 'emojis'
  | 'house'
  | 'ip'
  | 'morse'
  | 'kaprekar'
  | 'pomodoro'
  | 'qr'
  | 'string'
  | 'uuid'
  | null;

type SidebarTab = 'status' | 'clock' | null;

const AppPage: NextPage = () => {
  const [times, setTimes] = useState(() =>
    timezones.map(({ tz }) => getTimeInZone(tz))
  );
  const [today, setToday] = useState('');
  const [activeModal, setActiveModal] = useState<ModalId>(null);
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
    const interval = setInterval(() => {
      setTimes(timezones.map(({ tz }) => getTimeInZone(tz)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const weatherQueries = useQueries({
    queries: timezones.map(({ lat, lon }) => ({
      queryKey: ['open-meteo', lat, lon],
      queryFn: async () => {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );
        const data = await res.json();
        return data.current as WeatherData;
      },
      staleTime: 1000 * 60 * 10,
    })),
  });

  const tools: Tool[] = [
    {
      label: 'Braille',
      description: 'Converter',
      emoji: '⠿',
      color: '#8b5cf6',
      onClick: () => setActiveModal('braille'),
    },
    {
      label: 'Colors',
      description: 'Picker',
      emoji: '🎨',
      color: '#ec4899',
      onClick: () => setActiveModal('colors'),
    },
    {
      label: 'Countdown',
      description: 'Timer',
      emoji: '⏳',
      color: '#06b6d4',
      onClick: () => setActiveModal('countdown'),
    },
    {
      label: 'DOI',
      description: 'Cite',
      emoji: '📄',
      color: '#3b82f6',
      onClick: () => setActiveModal('doi'),
    },
    {
      label: 'Emojis',
      description: 'Explorer',
      emoji: '😀',
      color: '#f59e0b',
      onClick: () => setActiveModal('emojis'),
    },
    {
      label: 'House',
      description: 'M.D.',
      emoji: '🏥',
      color: '#ef4444',
      onClick: () => setActiveModal('house'),
    },
    {
      label: 'IP',
      description: 'Inspector',
      emoji: '🌐',
      color: '#f59e0b',
      onClick: () => setActiveModal('ip'),
    },
    {
      label: 'Kaprekar',
      description: 'Routine',
      emoji: '🔢',
      color: '#f59e0b',
      onClick: () => setActiveModal('kaprekar'),
    },
    {
      label: 'Morse Code',
      description: 'Converter',
      emoji: '🔣',
      color: '#f59e0b',
      onClick: () => setActiveModal('morse'),
    },
    {
      label: 'Pomodoro',
      description: 'Timer',
      emoji: '🍅',
      color: '#ef4444',
      onClick: () => setActiveModal('pomodoro'),
    },
    {
      label: 'QR Code',
      description: 'Generator',
      emoji: '▦',
      color: '#22d3ee',
      onClick: () => setActiveModal('qr'),
    },
    {
      label: 'String',
      description: 'Formatter',
      emoji: '✏️',
      color: '#10b981',
      onClick: () => setActiveModal('string'),
    },
    {
      label: 'UUID',
      description: 'Generator',
      emoji: '🔑',
      color: '#a855f7',
      onClick: () => setActiveModal('uuid'),
    },
  ];

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      {/* ── Desktop: 3-column grid, hidden on mobile ── */}
      <div
        className="hidden h-screen overflow-hidden lg:grid"
        style={{ gridTemplateColumns: '280px 2fr 320px' }}>
        <LeftSidebar />
        <MainContent today={today} tools={tools} />
        <RightSidebar times={times} weatherQueries={weatherQueries} />
      </div>

      {/* ── Mobile/tablet layout ── */}
      <div className="flex min-h-screen flex-col lg:hidden">
        {/* Scrollable center content */}
        <main className="flex-1 overflow-y-auto px-4 py-8">
          <p className="text-base-content/30 mb-2 text-center font-mono text-xs tracking-widest uppercase">
            {today}
          </p>
          <h1 className="mb-8 text-center text-2xl font-black tracking-tight">
            Start Page
          </h1>

          <section
            aria-label="AI Bookmarks"
            className="mx-auto w-full max-w-2xl">
            <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
              AI Assistants
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {aiBookmarks.map((bm) => (
                <BookmarkCard key={bm.label} {...bm} />
              ))}
            </div>
          </section>

          <section
            aria-label="Websites"
            className="mx-auto mt-8 w-full max-w-2xl">
            <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
              Websites
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {websiteBookmarks.map((bm) => (
                <BookmarkCard key={bm.label} {...bm} />
              ))}
            </div>
          </section>

          <section aria-label="Tools" className="mx-auto mt-8 w-full max-w-2xl">
            <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
              Tools
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.label} {...tool} />
              ))}
            </div>
          </section>

          {/* Extra bottom padding so content clears the mobile nav bar */}
          <div className="h-20" />
        </main>

        {/* ── Mobile bottom nav ── */}
        <nav className="bg-base-100 border-base-300 fixed inset-x-0 bottom-0 z-40 flex border-t">
          <button
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs transition-colors ${
              activeSidebar === 'status'
                ? 'text-primary'
                : 'text-base-content/40 hover:text-base-content/70'
            }`}
            onClick={() =>
              setActiveSidebar((p) => (p === 'status' ? null : 'status'))
            }>
            <span className="text-lg">📡</span>
            Status
          </button>
          <button
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs transition-colors ${
              activeSidebar === 'clock'
                ? 'text-primary'
                : 'text-base-content/40 hover:text-base-content/70'
            }`}
            onClick={() =>
              setActiveSidebar((p) => (p === 'clock' ? null : 'clock'))
            }>
            <span className="text-lg">🕐</span>
            Clock
          </button>
        </nav>

        {/* ── Mobile sidebar drawers (slide up from bottom) ── */}
        {activeSidebar !== null && (
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
              <div className="p-4">
                {activeSidebar === 'status' && <LeftSidebar />}
                {activeSidebar === 'clock' && (
                  <RightSidebar times={times} weatherQueries={weatherQueries} />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Modals (shared across both layouts) ── */}
      {activeModal === 'braille' && <BrailleModal onClose={close} />}
      {activeModal === 'colors' && <ColorsModal onClose={close} />}
      {activeModal === 'countdown' && <CountdownModal onClose={close} />}
      {activeModal === 'doi' && <DOIModal onClose={close} />}
      {activeModal === 'emojis' && <EmojisModal onClose={close} />}
      {activeModal === 'house' && <HouseModal onClose={close} />}
      {activeModal === 'ip' && <IPModal onClose={close} />}
      {activeModal === 'kaprekar' && <KaprekarModal onClose={close} />}
      {activeModal === 'morse' && <MorseModal onClose={close} />}
      {activeModal === 'pomodoro' && <PomodoroModal onClose={close} />}
      {activeModal === 'qr' && <QRCodeModal onClose={close} />}
      {activeModal === 'string' && <StringModal onClose={close} />}
      {activeModal === 'uuid' && <UUIDModal onClose={close} />}
    </div>
  );
};

export default AppPage;
