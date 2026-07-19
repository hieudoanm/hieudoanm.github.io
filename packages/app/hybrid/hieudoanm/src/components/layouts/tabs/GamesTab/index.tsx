import { useRouter } from 'next/navigation';
import { FC, useDeferredValue, useMemo, useState } from 'react';
import { PiGameController, PiMagnifyingGlass } from 'react-icons/pi';

import { matchTool } from '@hieudoanm.github.io/components/pages/start/constants';
import { GAME_SECTIONS, GameSection } from './data';
import { Game, GameCard } from './GameCard';

const buildSections = (router: ReturnType<typeof useRouter>): GameSection[] =>
  GAME_SECTIONS.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      onClick: () => router.push(`/games/${section.slug}/${item.toolId}`),
    })),
  }));

export const GamesTab: FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const filtering = deferredQuery.trim().length > 0;

  const sections = useMemo(() => buildSections(router), [router]);

  const allFlat = useMemo(
    () =>
      sections
        .flatMap((s) => s.items)
        .sort((a, b) => a.label.localeCompare(b.label)),
    [sections]
  );

  const filteredSections = useMemo(
    () =>
      sections
        .map((s) => ({
          ...s,
          filtered: filtering
            ? s.items.filter((t) => matchTool(t, deferredQuery))
            : s.items,
        }))
        .filter((s) => !filtering || s.filtered.length > 0),
    [sections, filtering, deferredQuery]
  );

  return (
    <div className="flex h-full flex-col">
      <div className="border-base-300 flex items-center gap-2 border-b px-3 py-2.5">
        <PiGameController className="text-base-content/60 h-4 w-4 shrink-0" />
        <span className="text-[10px] font-normal tracking-widest uppercase">
          Games
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
            placeholder="Search games..."
            className="input-ghost text-xs outline-none placeholder:text-[10px] placeholder:tracking-widest placeholder:uppercase"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {filtering && filteredSections.length === 0 ? (
          <p className="text-base-content/30 text-center text-xs">
            No games match &quot;{query}&quot;
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredSections.map(({ label, slug, filtered }) => (
              <div key={slug}>
                <p className="text-base-content/40 mb-2 text-[10px] tracking-widest uppercase">
                  {label}
                  <span className="text-base-content/20 ml-1">
                    ({filtered.length})
                  </span>
                </p>
                <div className="flex flex-col gap-1.5">
                  {filtered.map((t) => (
                    <GameCard key={t.label} {...t} />
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
GamesTab.displayName = 'GamesTab';
