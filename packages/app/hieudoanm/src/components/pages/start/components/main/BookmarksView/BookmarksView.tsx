import { FC, useDeferredValue, useMemo } from 'react';
import { GRID, match } from '../../../constants';
import { ItemCard } from './ItemCard';
import { Section } from './Section';
import { agents, code, google, messaging, music, social, work } from './data';

const bookmarkSections = [
  { label: 'Agents', items: agents },
  { label: 'Code', items: code },
  { label: 'Google Workspace', items: google },
  { label: 'Messaging', items: messaging },
  { label: 'Music', items: music },
  { label: 'Social', items: social },
  { label: 'Work', items: work },
] as const;

const filterBy = <T extends { label?: string }>(
  items: readonly T[],
  query: string
) => items.filter((item) => match(String(item.label ?? ''), query));

interface BookmarksViewProps {
  query: string;
}

export const BookmarksView: FC<BookmarksViewProps> = ({ query }) => {
  const deferredQuery = useDeferredValue(query);
  const filtering = deferredQuery.trim().length > 0;

  const allFlat = useMemo(
    () =>
      bookmarkSections
        .flatMap((s) => s.items)
        .sort((a, b) => a.label.localeCompare(b.label)),
    []
  );

  const filteredAll = useMemo(
    () =>
      filtering
        ? allFlat.filter((bm) => match(bm.label, deferredQuery))
        : allFlat,
    [allFlat, filtering, deferredQuery]
  );

  const filteredSections = useMemo(
    () =>
      bookmarkSections.map((s) => ({
        ...s,
        filtered: filtering ? filterBy(s.items, deferredQuery) : s.items,
      })),
    [filtering, deferredQuery]
  );

  if (filteredAll.length === 0 && filtering) {
    return (
      <p className="text-base-content/30 mt-20 text-sm">
        No bookmarks match &quot;{query}&quot;.
      </p>
    );
  }

  return (
    <>
      {filteredSections.map(({ label, filtered }) =>
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
      {filtering && !filteredSections.some((s) => s.filtered.length > 0) && (
        <p className="text-base-content/30 mt-20 text-sm">
          No bookmarks match &quot;{query}&quot;.
        </p>
      )}
    </>
  );
};
BookmarksView.displayName = 'BookmarksView';
