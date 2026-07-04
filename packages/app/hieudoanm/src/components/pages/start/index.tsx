import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { MainScreen } from './components/main';
import { AppsView } from './components/main/AppsView';
import { SearchBar } from './components/main/BookmarksView/SearchBar';
import { DesktopSidebar } from './components/sidebars/DesktopSidebar';
import { GRID_MOBILE } from './constants';
import { useAllSections } from './hooks/useAllSections';
import { makeTools } from './menu';
import { ModalId } from './types';

export const Start: FC = () => {
  const [today, setToday] = useState('');
  const [activeApp, setActiveApp] = useState<ModalId | null>(null);
  const [query, setQuery] = useState('');

  const close = useCallback(() => setActiveApp(null), []);
  const open = useCallback((id: ModalId) => () => setActiveApp(id), []);
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
  }, []);

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      <div className="hidden h-screen overflow-hidden lg:flex">
        <DesktopSidebar toolSections={toolSections} />
        <main className="border-base-200 flex flex-1 flex-col overflow-hidden border-l">
          <MainScreen
            today={today}
            query={query}
            onQueryChange={setQuery}
            activeApp={activeApp}
            onAppClose={close}
          />
        </main>
      </div>

      <div className="flex min-h-screen flex-col lg:hidden">
        <main className="flex-1 overflow-y-auto px-4 py-8">
          {activeApp ? (
            <AppsView appId={activeApp} onBack={close} />
          ) : (
            <>
              <p className="text-base-content/30 mb-2 text-center font-mono text-xs tracking-widest uppercase">
                {today}
              </p>
              <h1 className="mb-6 text-center text-2xl font-thin tracking-tight">
                Start Page
              </h1>

              <div className="mx-auto mb-6 w-full max-w-2xl">
                <SearchBar query={query} onChange={setQuery} />
              </div>

              {allSections
                .filter(({ items }) => items.length > 0)
                .map(({ label, items, Card }, idx) => (
                  <section
                    key={`${label}-${idx}`}
                    aria-label={label}
                    className="mx-auto mt-8 w-full max-w-2xl">
                    <p className="text-base-content/30 mb-4 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase">
                      {label}
                      <span className="bg-primary/20 text-primary border-primary/30 badge badge-xs font-mono tracking-normal normal-case">
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
                    No results for &quot;{query}&quot; &mdash; press 🔍 to
                    search Google.
                  </p>
                )}

              <div className="h-20" />
            </>
          )}
        </main>
      </div>
    </div>
  );
};
Start.displayName = 'Start';
