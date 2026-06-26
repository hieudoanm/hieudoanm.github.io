import { LeftSidebar } from '@hieudoanm.github.io/components/pages/start/sidebars/LeftSidebar';
import { RightSidebar } from '@hieudoanm.github.io/components/pages/start/sidebars/RightSidebar';
import { getTimeInZone, timezones } from '@hieudoanm.github.io/data/timezones';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { SearchBar } from './components/SearchBar';
import { MainContent } from './components/MainContent';
import { GRID_MOBILE } from './constants';
import { useAllSections } from './hooks/useAllSections';
import { MODAL_MAP } from './modal-map';
import { makeTools } from './tools';
import { ModalId, SidebarTab } from './types';

export const Start: FC = () => {
  const [times, setTimes] = useState(() =>
    timezones.map(({ tz }) => getTimeInZone(tz))
  );
  const [today, setToday] = useState('');
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);
  const [activeSidebar, setActiveSidebar] = useState<SidebarTab | null>(null);
  const [query, setQuery] = useState('');

  const close = useCallback(() => setActiveModal(null), []);
  const open = useCallback((id: ModalId) => () => setActiveModal(id), []);
  const toolSections = useMemo(() => makeTools(open), [open]);
  const allSections = useAllSections(query, toolSections);

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

  const toggleSidebar = useCallback(
    (tab: SidebarTab) =>
      setActiveSidebar((prev) => (prev === tab ? null : tab)),
    []
  );

  const ActiveModal = activeModal ? MODAL_MAP[activeModal] : null;

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
          toolSections={toolSections}
        />
        <RightSidebar times={times} />
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

          {allSections
            .filter(({ items }) => items.length > 0)
            .map(({ label, items, Card }) => (
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
                <div className={GRID_MOBILE}>
                  {items.map((item) => (
                    <Card key={item.label} {...item} />
                  ))}
                </div>
              </section>
            ))}

          {query.trim().length > 0 &&
            allSections.every(({ items }) => items.length === 0) && (
              <p className="text-base-content/30 mt-20 text-center text-sm">
                No results for &quot;{query}&quot; &mdash; press 🔍 to search
                Google.
              </p>
            )}

          <div className="h-20" />
        </main>

        {/* Bottom nav */}
        <nav className="bg-base-100 border-base-300 fixed inset-x-0 bottom-0 z-40 flex border-t">
          {(['tasks', 'clock'] as const).map((tab) => (
            <button
              key={tab}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs transition-colors ${
                activeSidebar === tab
                  ? 'text-primary'
                  : 'text-base-content/40 hover:text-base-content/70'
              }`}
              onClick={() => toggleSidebar(tab)}>
              <span className="text-lg">{tab === 'tasks' ? '📡' : '🕐'}</span>
              {tab === 'tasks' ? 'Tasks' : 'Clock'}
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
                  {activeSidebar === 'tasks' ? 'Tasks' : 'Clock'}
                </span>
                <button
                  className="btn btn-ghost btn-xs btn-circle"
                  onClick={() => setActiveSidebar(null)}>
                  ✕
                </button>
              </div>
              <div className="p-4">
                {activeSidebar === 'tasks' ? (
                  <LeftSidebar />
                ) : (
                  <RightSidebar times={times} />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {ActiveModal && <ActiveModal onClose={close} />}
    </div>
  );
};
Start.displayName = 'Start';
