'use client';

import { Tool, ToolCard } from '@hieudoanm.github.io/components/atoms';
import { SearchBar, Section } from '@hieudoanm.github.io/components/molecules';
import { FC, useDeferredValue, useEffect, useMemo, useState } from 'react';

const GRID = 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3';

const matchesQuery = (tool: Tool, q: string): boolean => {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const haystack = `${tool.label} ${tool.description}`.toLowerCase();
  return terms.every((term) => haystack.includes(term));
};

export interface StoreSection {
  id?: string;
  label: string;
  items: Tool[];
}

export interface AppsStoreTemplateProps {
  title: string;
  sections: StoreSection[];
  section?: string;
}

const formatToday = (): string =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const AppsStoreTemplate: FC<AppsStoreTemplateProps> = ({
  title,
  sections,
  section,
}) => {
  const [today, setToday] = useState('');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const filtering = deferredQuery.trim().length > 0;

  useEffect(() => {
    setToday(formatToday());
  }, []);

  const filteredSections = useMemo(
    () =>
      sections
        .filter((s) => !section || s.id === section || s.label === section)
        .map(({ label, items }) => ({
          label,
          filtered: filtering
            ? items.filter((t) => matchesQuery(t, deferredQuery))
            : items,
        })),
    [sections, filtering, deferredQuery, section]
  );

  const hasAnyResult = filteredSections.some((s) => s.filtered.length > 0);

  return (
    <div className="flex flex-col overflow-hidden">
      <main className="flex flex-col items-center overflow-y-auto px-8 py-12">
        <p className="text-base-content/30 mb-2 font-mono text-xs tracking-widest uppercase">
          {today}
        </p>
        <h1 className="mb-6 text-3xl font-thin tracking-tight">{title}</h1>
        <div className="mb-6 w-full max-w-3xl">
          <SearchBar query={query} onChange={setQuery} />
        </div>

        {filteredSections.map(({ label, filtered }) =>
          !filtering || filtered.length > 0 ? (
            <Section key={label} label={label} count={filtered.length}>
              <div className={GRID}>
                {filtered.map((t) => (
                  <div key={t.label}>
                    <ToolCard {...t} />
                  </div>
                ))}
              </div>
            </Section>
          ) : null
        )}

        {filtering && !hasAnyResult && (
          <p className="text-base-content/30 mt-20 text-sm">
            No results match &quot;{query}&quot;
          </p>
        )}
      </main>
    </div>
  );
};
AppsStoreTemplate.displayName = 'AppsStoreTemplate';
