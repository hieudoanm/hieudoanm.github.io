import { ItemCard } from '@hieudoanm.github.io/components/pages/start/cards/ItemCard';
import {
  agents,
  clis,
  extensions,
  packages,
} from '@hieudoanm.github.io/data/downloads';
import { FC, useDeferredValue, useMemo } from 'react';

import { match, GRID } from '../constants';
import { Section } from './Section';

const downloadSections = [
  { label: 'Agents', items: agents },
  { label: 'CLIs', items: clis },
  { label: 'Extensions', items: extensions },
  { label: 'Packages', items: packages },
] as const;

const filterBy = <T extends { id?: string }>(
  items: readonly T[],
  query: string
) => items.filter((item) => match(String(item.id ?? ''), query));

interface DownloadsViewProps {
  query: string;
}

export const DownloadsView: FC<DownloadsViewProps> = ({ query }) => {
  const deferredQuery = useDeferredValue(query);
  const filtering = deferredQuery.trim().length > 0;

  const allFlat = useMemo(
    () =>
      downloadSections
        .flatMap((s) => s.items)
        .sort((a, b) => a.id.localeCompare(b.id)),
    []
  );

  const filteredAll = useMemo(
    () =>
      filtering ? allFlat.filter((d) => match(d.id, deferredQuery)) : allFlat,
    [allFlat, filtering, deferredQuery]
  );

  const filteredSections = useMemo(
    () =>
      downloadSections.map((s) => ({
        ...s,
        filtered: filtering ? filterBy(s.items, deferredQuery) : s.items,
      })),
    [filtering, deferredQuery]
  );

  if (filteredAll.length === 0 && filtering) {
    return (
      <p className="text-base-content/30 mt-20 text-sm">
        No downloads match &quot;{query}&quot;.
      </p>
    );
  }

  return (
    <>
      {filteredSections.map(({ label, filtered }) =>
        !filtering || filtered.length > 0 ? (
          <Section key={label} label={label} count={filtered.length}>
            <div className={GRID}>
              {filtered.map((a) => (
                <ItemCard
                  key={a.id}
                  href={a.url}
                  {...a}
                  actions={a.downloads}
                />
              ))}
            </div>
          </Section>
        ) : null
      )}
      {filtering && !filteredSections.some((s) => s.filtered.length > 0) && (
        <p className="text-base-content/30 mt-20 text-sm">
          No downloads match &quot;{query}&quot;.
        </p>
      )}
    </>
  );
};
DownloadsView.displayName = 'DownloadsView';
