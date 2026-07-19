'use client';

import { useEffect, useState, type FC } from 'react';

import { useSidebar } from '@hieudoanm.github.io/components/layouts/SidebarProvider';
import { AppsView } from './components/main/AppsView';
import { SearchBar } from './components/main/BookmarksView/SearchBar';
import { MainScreen } from './components/main';
import { GRID_MOBILE } from './constants';
import { useAllSections } from './hooks/useAllSections';

export const Start: FC = () => {
  const { activeApp, closeApp, toolSections } = useSidebar();
  const [today, setToday] = useState('');
  const [query, setQuery] = useState('');

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
    <>
      <div className="hidden flex-1 flex-col overflow-hidden lg:flex">
        <MainScreen
          today={today}
          query={query}
          onQueryChange={setQuery}
          activeApp={activeApp}
          onAppClose={closeApp}
        />
      </div>

      <div className="flex min-h-screen flex-col lg:hidden">
        <main className="flex-1 overflow-y-auto px-4 py-8">
          {activeApp ? (
            <AppsView appId={activeApp} onBack={closeApp} />
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
    </>
  );
};
Start.displayName = 'Start';
