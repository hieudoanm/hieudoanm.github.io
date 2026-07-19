import { FC, useDeferredValue, useMemo, useState } from 'react';
import { PiMagnifyingGlass, PiPackage } from 'react-icons/pi';
import { DownloadCard } from './DownloadCard';
import { clis, extensions, packages } from './data';

import { match } from '../../../../constants';

const downloadSections = [
  { label: 'CLIs', items: clis },
  { label: 'Extensions', items: extensions },
  { label: 'Packages', items: packages },
] as const;

const filterBy = <T extends { id?: string }>(
  items: readonly T[],
  query: string
) => items.filter((item) => match(String(item.id ?? ''), query));

export const DownloadsTab: FC = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const filtering = deferredQuery.trim().length > 0;

  const allFlat = useMemo(
    () =>
      downloadSections
        .flatMap((s) => s.items)
        .sort((a, b) => a.id.localeCompare(b.id)),
    []
  );

  const filteredSections = useMemo(
    () =>
      downloadSections
        .map((s) => ({
          ...s,
          filtered: filtering ? filterBy(s.items, deferredQuery) : s.items,
        }))
        .filter((s) => !filtering || s.filtered.length > 0),
    [filtering, deferredQuery]
  );

  return (
    <div className="flex h-full flex-col">
      <div className="border-base-300 flex items-center gap-2 border-b px-3 py-2.5">
        <PiPackage className="text-base-content/60 h-4 w-4 shrink-0" />
        <span className="text-[10px] font-normal tracking-widest uppercase">
          Downloads
        </span>
        <span className="badge badge-xs ml-auto">{allFlat.length}</span>
      </div>

      <div className="border-base-300 border-b px-3 py-2">
        <div className="flex items-center gap-2">
          <PiMagnifyingGlass className="text-base-content/40 h-3.5 w-3.5 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search downloads..."
            className="input-ghost text-xs outline-none placeholder:text-[10px] placeholder:tracking-widest placeholder:uppercase"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {filtering && filteredSections.length === 0 ? (
          <p className="text-base-content/30 text-center text-xs">
            No downloads match &quot;{query}&quot;
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredSections.map(({ label, filtered }) => (
              <div key={label}>
                <p className="text-base-content/40 mb-2 text-[10px] tracking-widest uppercase">
                  {label}
                  <span className="text-base-content/20 ml-1">
                    ({filtered.length})
                  </span>
                </p>
                <div className="flex flex-col gap-1.5">
                  {filtered.map((a) => (
                    <DownloadCard key={a.id} {...a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

DownloadsTab.displayName = 'DownloadsTab';
