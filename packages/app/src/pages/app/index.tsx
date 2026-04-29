import { BookmarkCard } from '@hieudoanm/components/cards/BookmarkCard';
import { Tool, ToolCard } from '@hieudoanm/components/cards/ToolCard';
import { ColorsModal } from '@hieudoanm/components/modals/ColorsModal';
import { CountdownModal } from '@hieudoanm/components/modals/CountdownModal';
import { DOIModal } from '@hieudoanm/components/modals/DOIModal';
import { HouseModal } from '@hieudoanm/components/modals/HouseModal';
import { KaprekarModal } from '@hieudoanm/components/modals/KaprekarModal';
import { QRCodeModal } from '@hieudoanm/components/modals/QRCodeModal';
import { StringModal } from '@hieudoanm/components/modals/StringModal';
import { UUIDModal } from '@hieudoanm/components/modals/UUIDModal';
import { RightSidebar } from '@hieudoanm/components/sidebars/RightSidebar';
import { StatusSidebar } from '@hieudoanm/components/sidebars/StatusSidebar';
import { aiBookmarks, bookmarks } from '@hieudoanm/data/bookmarks';
import { getTimeInZone, timezones } from '@hieudoanm/data/timezones';
import { WeatherData } from '@hieudoanm/data/weather';
import { useQueries } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

// ─── Page ─────────────────────────────────────────────────────────────────────

type ModalId =
  | 'colors'
  | 'countdown'
  | 'doi'
  | 'house'
  | 'kaprekar'
  | 'qr'
  | 'string'
  | 'uuid'
  | null;

const AppPage: NextPage = () => {
  const [times, setTimes] = useState(() =>
    timezones.map(({ tz }) => getTimeInZone(tz))
  );
  const [today, setToday] = useState('');
  const [activeModal, setActiveModal] = useState<ModalId>(null);

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
      label: 'House',
      description: 'M.D.',
      emoji: '🏥',
      color: '#ef4444',
      onClick: () => setActiveModal('house'),
    },
    {
      label: 'Kaprekar',
      description: 'Routine',
      emoji: '🔢',
      color: '#f59e0b',
      onClick: () => setActiveModal('kaprekar'),
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
    <div className="bg-base-100 text-base-content h-screen overflow-hidden">
      <div
        className="grid h-full"
        style={{ gridTemplateColumns: '280px 2fr 320px' }}>
        {/* ── Left: Service Status ── */}
        <StatusSidebar />

        {/* ── Center: AI bookmarks + Tools ── */}
        <main className="flex flex-col items-center overflow-y-auto px-8 py-12">
          <p className="text-base-content/30 mb-2 font-mono text-xs tracking-widest uppercase">
            {today}
          </p>
          <h1 className="mb-10 text-3xl font-black tracking-tight">
            Start Page
          </h1>

          {/* AI Assistants */}
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

          {/* Bookmarks */}
          <section aria-label="Bookmarks" className="mt-10 w-full max-w-2xl">
            <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
              Bookmarks
            </p>
            <div className="grid grid-cols-4 gap-4">
              {bookmarks.map((bm) => (
                <BookmarkCard key={bm.label} {...bm} />
              ))}
            </div>
          </section>

          {/* Tools */}
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

        {/* ── Right: Tabbed Clock/Weather + Currency ── */}
        <RightSidebar times={times} weatherQueries={weatherQueries} />
      </div>
      {/* ── Modals ── */}
      {activeModal === 'colors' && <ColorsModal onClose={close} />}
      {activeModal === 'countdown' && <CountdownModal onClose={close} />}
      {activeModal === 'doi' && <DOIModal onClose={close} />}
      {activeModal === 'house' && <HouseModal onClose={close} />}
      {activeModal === 'kaprekar' && <KaprekarModal onClose={close} />}
      {activeModal === 'qr' && <QRCodeModal onClose={close} />}
      {activeModal === 'string' && <StringModal onClose={close} />}
      {activeModal === 'uuid' && <UUIDModal onClose={close} />}
    </div>
  );
};

export default AppPage;
