import { ItemCard } from '@hieudoanm.github.io/components/pages/start/cards/ItemCard';
import { ToolCard } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import {
  agents as agentsBookmarks,
  code as codeBookmarks,
  google as googleBookmarks,
  messaging as messagingBookmarks,
  music as musicBookmarks,
  social as socialBookmarks,
  work as workBookmarks,
} from '@hieudoanm.github.io/data/bookmarks';
import {
  agents,
  clis,
  extensions,
  packages,
} from '@hieudoanm.github.io/data/downloads';
import {
  FC,
  memo,
  useEffect,
  useDeferredValue,
  useMemo,
  useState,
} from 'react';

import { match, GRID } from '../constants';
import { makeTools } from '../tools';
import { SearchBar } from './SearchBar';
import { Section } from './Section';

type MainTab = 'bookmarks' | 'downloads' | 'tools';

interface MainContentProps {
  today: string;
  query: string;
  onQueryChange: (v: string) => void;
  toolSections: ReturnType<typeof makeTools>;
}

const TABS: { id: MainTab; label: string; emoji: string }[] = [
  { id: 'bookmarks', label: 'Bookmarks', emoji: '🔖' },
  { id: 'downloads', label: 'Downloads', emoji: '📦' },
  { id: 'tools', label: 'Tools', emoji: '🔧' },
];

const bookmarkSections = [
  { label: 'Agents', items: agentsBookmarks },
  { label: 'Code', items: codeBookmarks },
  { label: 'Google Workspace', items: googleBookmarks },
  { label: 'Messaging', items: messagingBookmarks },
  { label: 'Music', items: musicBookmarks },
  { label: 'Social', items: socialBookmarks },
  { label: 'Work', items: workBookmarks },
] as const;

const downloadSections = [
  { label: 'Agents', items: agents },
  { label: 'CLIs', items: clis },
  { label: 'Extensions', items: extensions },
  { label: 'Packages', items: packages },
] as const;

const filterBy = <T extends { label?: string; id?: string }>(
  items: T[],
  key: keyof T,
  query: string
) => items.filter((item) => match(String(item[key] ?? ''), query));

export const MainContent: FC<MainContentProps> = memo(
  ({ today, query, onQueryChange, toolSections }) => {
    const [tab, setTab] = useState<MainTab>('bookmarks');
    const [viewMode, setViewMode] = useState<'category' | 'alphabetical'>(
      'category'
    );
    const deferredQuery = useDeferredValue(query);
    const filtering = deferredQuery.trim().length > 0;
    const {
      tools,
      calculators,
      casino,
      clocks,
      converters,
      editors,
      education,
      eyes,
      games,
      memory,
      images,
      visualization,
    } = toolSections;

    const toolSectionDefs = useMemo(
      () => [
        { label: 'Tools', items: tools },
        { label: 'Calculators', items: calculators },
        { label: 'Casino', items: casino },
        { label: 'Clocks', items: clocks },
        { label: 'Converters', items: converters },
        { label: 'Editors', items: editors },
        { label: 'Education', items: education },
        { label: 'Eyes', items: eyes },
        { label: 'Games', items: games },
        { label: 'Memory', items: memory },
        { label: 'Images', items: images },
        { label: 'Visualization', items: visualization },
      ],
      [
        tools,
        calculators,
        casino,
        clocks,
        converters,
        editors,
        education,
        eyes,
        games,
        memory,
        images,
        visualization,
      ]
    );

    const allToolsFlat = useMemo(
      () =>
        toolSectionDefs
          .flatMap((s) => s.items)
          .sort((a, b) => a.label.localeCompare(b.label)),
      [toolSectionDefs]
    );
    const filteredAllTools = useMemo(
      () =>
        filtering
          ? allToolsFlat.filter((t) => match(t.label, deferredQuery))
          : allToolsFlat,
      [allToolsFlat, filtering, deferredQuery]
    );

    const allBookmarksFlat = useMemo(
      () =>
        bookmarkSections
          .flatMap((s) => s.items)
          .sort((a, b) => a.label.localeCompare(b.label)),
      []
    );
    const filteredAllBookmarks = useMemo(
      () =>
        filtering
          ? allBookmarksFlat.filter((bm) => match(bm.label, deferredQuery))
          : allBookmarksFlat,
      [allBookmarksFlat, filtering, deferredQuery]
    );

    const allDownloadsFlat = useMemo(
      () =>
        downloadSections
          .flatMap((s) => s.items)
          .sort((a, b) => a.id.localeCompare(b.id)),
      []
    );
    const filteredAllDownloads = useMemo(
      () =>
        filtering
          ? allDownloadsFlat.filter((d) => match(d.id, deferredQuery))
          : allDownloadsFlat,
      [allDownloadsFlat, filtering, deferredQuery]
    );

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
    const filteredTools = useMemo(
      () =>
        toolSectionDefs.map((s) => ({
          ...s,
          filtered: filtering
            ? filterBy(s.items, 'label', deferredQuery)
            : s.items,
        })),
      [toolSectionDefs, filtering, deferredQuery]
    );
    const filteredDownloads = useMemo(
      () =>
        downloadSections.map((s) => ({
          ...s,
          filtered: filtering
            ? filterBy(s.items, 'id', deferredQuery)
            : s.items,
        })),
      [filtering, deferredQuery]
    );

    useEffect(() => {
      if (!filtering) return;
      const hasTools = filteredTools.some((s) => s.filtered.length > 0);
      const hasBookmarks = filteredBookmarks.some((s) => s.filtered.length > 0);
      const hasDownloads = filteredDownloads.some((s) => s.filtered.length > 0);
      if (tab === 'tools' && !hasTools && hasBookmarks) setTab('bookmarks');
      else if (tab === 'bookmarks' && !hasBookmarks && hasTools)
        setTab('tools');
      else if (tab === 'downloads' && !hasDownloads && hasTools)
        setTab('tools');
    }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

    const hasAnyResult =
      filteredBookmarks.some((s) => s.filtered.length > 0) ||
      filteredTools.some((s) => s.filtered.length > 0) ||
      filteredDownloads.some((s) => s.filtered.length > 0);

    return (
      <main className="flex flex-col items-center overflow-y-auto px-8 py-12">
        <p className="text-base-content/30 mb-2 font-mono text-xs tracking-widest uppercase">
          {today}
        </p>
        <h1 className="mb-6 text-3xl font-black tracking-tight">Start Page</h1>
        <div className="mb-6 w-full max-w-3xl">
          <SearchBar query={query} onChange={onQueryChange} />
        </div>
        <div className="mb-8 w-full max-w-3xl">
          <div className="tabs tabs-boxed w-full justify-center">
            {TABS.map(({ id, label, emoji }) => {
              const count =
                id === 'bookmarks'
                  ? allBookmarksFlat.length
                  : id === 'downloads'
                    ? allDownloadsFlat.length
                    : allToolsFlat.length;
              return (
                <button
                  key={id}
                  className={`tab flex-1 gap-1.5 ${tab === id ? 'tab-active' : ''}`}
                  onClick={() => setTab(id)}>
                  <span>{emoji}</span>
                  <span>{label}</span>
                  <span className="badge badge-xs">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-4 flex w-full max-w-3xl justify-center gap-2">
          <button
            className={`tab tab-xs tab-bordered ${viewMode === 'category' ? 'tab-active' : ''}`}
            onClick={() => setViewMode('category')}>
            Categories
          </button>
          <button
            className={`tab tab-xs tab-bordered ${viewMode === 'alphabetical' ? 'tab-active' : ''}`}
            onClick={() => setViewMode('alphabetical')}>
            A–Z
          </button>
        </div>

        {tab === 'tools' && (
          <>
            {viewMode === 'alphabetical' ? (
              <>
                <div className={GRID}>
                  {filteredAllTools.map((t) => (
                    <ToolCard key={t.label} {...t} />
                  ))}
                </div>
                {filtering && filteredAllTools.length === 0 && (
                  <p className="text-base-content/30 mt-20 text-sm">
                    No tools match &quot;{query}&quot;.
                  </p>
                )}
              </>
            ) : (
              <>
                {filteredTools.map(({ label, filtered }) =>
                  !filtering || filtered.length > 0 ? (
                    <Section key={label} label={label} count={filtered.length}>
                      <div className={GRID}>
                        {filtered.map((t) => (
                          <ToolCard key={t.label} {...t} />
                        ))}
                      </div>
                    </Section>
                  ) : null
                )}
                {filtering &&
                  !filteredTools.some((s) => s.filtered.length > 0) && (
                    <p className="text-base-content/30 mt-20 text-sm">
                      No tools match &quot;{query}&quot;.
                    </p>
                  )}
              </>
            )}
          </>
        )}

        {tab === 'bookmarks' && (
          <>
            {viewMode === 'alphabetical' ? (
              <>
                <div className={GRID}>
                  {filteredAllBookmarks.map((bm) => (
                    <ItemCard key={bm.label} {...bm} />
                  ))}
                </div>
                {filtering && filteredAllBookmarks.length === 0 && (
                  <p className="text-base-content/30 mt-20 text-sm">
                    No bookmarks match &quot;{query}&quot;.
                  </p>
                )}
              </>
            ) : (
              <>
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
                {filtering &&
                  !filteredBookmarks.some((s) => s.filtered.length > 0) && (
                    <p className="text-base-content/30 mt-20 text-sm">
                      No bookmarks match &quot;{query}&quot;.
                    </p>
                  )}
              </>
            )}
          </>
        )}

        {tab === 'downloads' && (
          <>
            {viewMode === 'alphabetical' ? (
              <>
                <div className={GRID}>
                  {filteredAllDownloads.map((a) => (
                    <ItemCard
                      key={a.id}
                      href={a.url}
                      {...a}
                      actions={a.downloads}
                    />
                  ))}
                </div>
                {filtering && filteredAllDownloads.length === 0 && (
                  <p className="text-base-content/30 mt-20 text-sm">
                    No downloads match &quot;{query}&quot;.
                  </p>
                )}
              </>
            ) : (
              <>
                {filteredDownloads.map(({ label, filtered }) =>
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
                {filtering &&
                  !filteredDownloads.some((s) => s.filtered.length > 0) && (
                    <p className="text-base-content/30 mt-20 text-sm">
                      No downloads match &quot;{query}&quot;.
                    </p>
                  )}
              </>
            )}
          </>
        )}

        {filtering && !hasAnyResult && (
          <p className="text-base-content/30 mt-20 text-sm">
            No results for &quot;{query}&quot; &mdash; press 🔍 to search
            Google.
          </p>
        )}
      </main>
    );
  }
);

MainContent.displayName = 'MainContent';
