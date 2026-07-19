import { FC, memo, useDeferredValue, useMemo } from 'react';
import { GRID, match } from '../../../constants';
import { ItemCard } from './ItemCard';
import { SearchBar } from './SearchBar';
import { Section } from './Section';
import {
  agents as agentsBookmarks,
  code as codeBookmarks,
  google as googleBookmarks,
  messaging as messagingBookmarks,
  music as musicBookmarks,
  social as socialBookmarks,
  work as workBookmarks,
} from './data';

interface MainContentProps {
  today: string;
  query: string;
  onQueryChange: (v: string) => void;
}

const bookmarkSections = [
  { label: 'Agents', items: agentsBookmarks },
  { label: 'Code', items: codeBookmarks },
  { label: 'Google Workspace', items: googleBookmarks },
  { label: 'Messaging', items: messagingBookmarks },
  { label: 'Music', items: musicBookmarks },
  { label: 'Social', items: socialBookmarks },
  { label: 'Work', items: workBookmarks },
] as const;

const filterBy = <T extends { label?: string; id?: string }>(
  items: T[],
  key: keyof T,
  query: string
) => items.filter((item) => match(String(item[key] ?? ''), query));

export const MainContent: FC<MainContentProps> = memo(
  ({ today, query, onQueryChange }) => {
    const deferredQuery = useDeferredValue(query);
    const filtering = deferredQuery.trim().length > 0;

    const filteredBookmarks = useMemo(
      () =>
        bookmarkSections.map((s) => ({
          ...s,
          filtered: filtering
            ? filterBy(s.items, 'label', deferredQuery)
            : s.items,
        })),
      [filtering, deferredQuery]
    );

    const hasAnyResult = filteredBookmarks.some((s) => s.filtered.length > 0);

    return (
      <main className="flex flex-col items-center overflow-y-auto px-8 py-12">
        <p className="text-base-content/30 mb-2 font-mono text-xs tracking-widest uppercase">
          {today}
        </p>
        <h1 className="mb-6 text-3xl font-thin tracking-tight">Start Page</h1>
        <div className="mb-6 w-full max-w-3xl">
          <SearchBar query={query} onChange={onQueryChange} />
        </div>

        {filteredBookmarks.map(({ label, filtered }) =>
          !filtering || filtered.length > 0 ? (
            <Section key={label} label={label} count={filtered.length}>
              <div className={GRID}>
                {filtered.map((bm) => (
                  <ItemCard key={bm.label} {...bm} />
                ))}
              </div>
            </Section>
          ) : null
        )}

        {filtering && !hasAnyResult && (
          <p className="text-base-content/30 mt-20 text-sm">
            No bookmarks match &quot;{query}&quot;
          </p>
        )}
      </main>
    );
  }
);

MainContent.displayName = 'MainContent';
