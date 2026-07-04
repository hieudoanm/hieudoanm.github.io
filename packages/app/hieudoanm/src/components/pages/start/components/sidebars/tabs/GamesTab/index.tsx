import { useRouter } from 'next/navigation';
import { FC, useDeferredValue, useMemo, useState } from 'react';
import { PiGameController, PiMagnifyingGlass } from 'react-icons/pi';

import { matchTool } from '../../../../constants';
import { make as arcadeMake } from '../../../../menu/games-arcade';
import { make as casinoMake } from '../../../../menu/games-casino';
import { make as chessMake } from '../../../../menu/games-chess';
import { make as countriesMake } from '../../../../menu/games-countries';
import { make as memoryMake } from '../../../../menu/games-memory';
import { make as puzzleMake } from '../../../../menu/games-puzzle';
import { make as triviaMake } from '../../../../menu/games-trivia';
import { make as wordMake } from '../../../../menu/games-word';
import { Game, GameCard } from './GameCard';

interface GameSection {
  label: string;
  slug: string;
  items: Game[];
}

const GAME_SECTIONS: {
  label: string;
  slug: string;
  make: typeof arcadeMake;
}[] = [
  { label: 'Arcade', slug: 'arcade', make: arcadeMake },
  { label: 'Casino', slug: 'casino', make: casinoMake },
  { label: 'Chess', slug: 'chess', make: chessMake },
  { label: 'Countries', slug: 'countries', make: countriesMake },
  { label: 'Memory', slug: 'memory', make: memoryMake },
  { label: 'Puzzle', slug: 'puzzle', make: puzzleMake },
  { label: 'Trivia', slug: 'trivia', make: triviaMake },
  { label: 'Word', slug: 'word', make: wordMake },
];

const buildSections = (router: ReturnType<typeof useRouter>): GameSection[] =>
  GAME_SECTIONS.map(({ label, slug, make }) => {
    const toolIds: string[] = [];
    const trackId = (id: string) => {
      toolIds.push(id);
      return () => {};
    };
    const tools = make(trackId);
    return {
      label,
      slug,
      items: tools.map((t, i) => ({
        ...t,
        category: slug,
        toolId: toolIds[i],
        onClick: () => router.push(`/games/${slug}/${toolIds[i]}`),
      })),
    };
  });

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
