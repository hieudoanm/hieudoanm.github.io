'use client';

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import Link from 'next/link';
import { StoreCard } from '@/components/atoms/StoreCard';
import downloadsJson from '@/data/downloads.json';
import {
  getRecommendedDownload,
  parseDownloads,
  type AppData,
} from '@/lib/downloads';
import { PLATFORM_LABELS, detectPlatform, type Platform } from '@/lib/os';
import { getIcon } from '@/lib/icons';
import { PiGridFour, PiList, PiArrowUp, PiArrowDown } from 'react-icons/pi';
import { useFavorites, useRecentlyViewed } from '@/lib/hooks';

const ALL_APPS = parseDownloads(
  downloadsJson as Parameters<typeof parseDownloads>[0]
);

const ALL_PLATFORMS: { group: string; platforms: Platform[] }[] = [
  { group: 'Desktop', platforms: ['macos', 'windows', 'linux'] },
  { group: 'Mobile', platforms: ['android', 'ios'] },
  { group: 'Unknown', platforms: ['unknown'] },
];

const ALL_CATEGORIES = [
  ...new Set(ALL_APPS.map((a) => a.primaryCategory)),
].sort();

type SortKey = 'name' | 'category' | 'recent';

const matchesQuery = (app: AppData, q: string): boolean => {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const haystack =
    `${app.label} ${app.primaryCategory} ${app.secondaryCategory}`.toLowerCase();
  return terms.every((term) => haystack.includes(term));
};

const formatToday = (): string =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const SECTION_META: Record<string, { label: string; description: string }> = {
  hybrid: {
    label: 'Hybrid',
    description:
      'Cross-platform apps for macOS, Windows, Linux, Android, and iOS',
  },
  android: {
    label: 'Android',
    description: 'Native apps built for Android',
  },
  macos: {
    label: 'macOS',
    description: 'Native apps built for macOS',
  },
};

const HomePage = () => {
  const [today, setToday] = useState('');
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState<Platform>('unknown');
  const [activePlatform, setActivePlatform] = useState<Platform | 'all'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const filtering = deferredQuery.trim().length > 0;
  const searchRef = useRef<HTMLInputElement>(null);
  const { favorites, isFavorite } = useFavorites();
  const { slugs: recentSlugs } = useRecentlyViewed();

  useEffect(() => {
    setToday(formatToday());
    setPlatform(detectPlatform());
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    if (e.key === 'Escape') {
      setQuery('');
      setShowSuggestions(false);
      searchRef.current?.blur();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const suggestions = useMemo(() => {
    if (!filtering) return [];
    const q = deferredQuery.toLowerCase();
    return ALL_APPS.filter((a) => a.label.toLowerCase().includes(q)).slice(
      0,
      5
    );
  }, [deferredQuery, filtering]);

  const recentApps = useMemo(
    () =>
      recentSlugs
        .map((slug) => ALL_APPS.find((a) => a.slug === slug))
        .filter(Boolean)
        .slice(0, 4) as AppData[],
    [recentSlugs]
  );

  const sections = useMemo(() => {
    const grouped: Record<string, AppData[]> = {};
    for (const app of ALL_APPS) {
      const key = app.section;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(app);
    }
    return grouped;
  }, []);

  const sectionOrder = useMemo(() => Object.keys(sections).sort(), [sections]);

  const sortApps = useCallback(
    (apps: AppData[]) => {
      const sorted = [...apps];
      sorted.sort((a, b) => {
        let cmp = 0;
        if (sortKey === 'name') cmp = a.label.localeCompare(b.label);
        else if (sortKey === 'category')
          cmp = a.primaryCategory.localeCompare(b.primaryCategory);
        else if (sortKey === 'recent') cmp = 0;
        return sortAsc ? cmp : -cmp;
      });
      return sorted;
    },
    [sortKey, sortAsc]
  );

  const filteredBySection = useMemo(() => {
    const result: Record<string, AppData[]> = {};
    for (const key of sectionOrder) {
      const apps = sections[key];
      const filtered = apps.filter((a) => {
        if (filtering && !matchesQuery(a, deferredQuery)) return false;
        if (activePlatform !== 'all' && !a.platforms.includes(activePlatform))
          return false;
        if (activeCategory !== 'all' && a.primaryCategory !== activeCategory)
          return false;
        if (showFavoritesOnly && !isFavorite(a.slug)) return false;
        return true;
      });
      if (filtered.length > 0) result[key] = sortApps(filtered);
    }
    return result;
  }, [
    sections,
    sectionOrder,
    filtering,
    deferredQuery,
    activePlatform,
    activeCategory,
    showFavoritesOnly,
    isFavorite,
    sortApps,
  ]);

  const totalResults = useMemo(
    () => Object.values(filteredBySection).reduce((n, a) => n + a.length, 0),
    [filteredBySection]
  );

  const hasFilters =
    activePlatform !== 'all' ||
    activeCategory !== 'all' ||
    filtering ||
    showFavoritesOnly;

  const clearFilters = () => {
    setQuery('');
    setActivePlatform('all');
    setActiveCategory('all');
    setShowFavoritesOnly(false);
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <main className="flex flex-col items-center overflow-y-auto px-8 py-12">
        <p className="text-base-content/30 mb-2 font-mono text-xs tracking-widest uppercase">
          {today}
        </p>
        <h1 className="mb-2 text-3xl font-thin tracking-tight">Store</h1>
        <p className="text-base-content/40 mb-6 text-xs">
          {platform !== 'unknown'
            ? `Detected: ${PLATFORM_LABELS[platform]}`
            : 'Browse all apps'}
        </p>

        <div className="mb-4 w-full max-w-3xl">
          <div className="relative">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Search apps… (press /)"
              className="input input-bordered focus:border-primary focus:outline-primary w-full"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="bg-base-200 border-base-300 absolute top-full right-0 left-0 z-20 mt-1 rounded-lg border shadow-lg">
                {suggestions.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/app/${s.slug}/`}
                    className="hover:bg-base-300 block px-4 py-2 text-sm">
                    {s.label}
                    <span className="text-base-content/40 ml-2 text-xs">
                      {s.primaryCategory}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-2 w-full max-w-3xl">
          <p className="text-base-content/50 mb-2 font-mono text-[10px] tracking-widest uppercase">
            Platform
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            <FilterChip
              label="All"
              active={activePlatform === 'all'}
              onClick={() => setActivePlatform('all')}
            />
            {ALL_PLATFORMS.map((group) => (
              <span key={group.group} className="flex items-center gap-1.5">
                <span className="text-base-content/20">|</span>
                {group.platforms.map((p) => (
                  <FilterChip
                    key={p}
                    label={PLATFORM_LABELS[p]}
                    active={activePlatform === p}
                    onClick={() => setActivePlatform(p)}
                  />
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4 w-full max-w-3xl">
          <p className="text-base-content/50 mb-2 font-mono text-[10px] tracking-widest uppercase">
            Category
          </p>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip
              label="All"
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            />
            {ALL_CATEGORIES.map((c) => (
              <FilterChip
                key={c}
                label={c}
                active={activeCategory === c}
                onClick={() => setActiveCategory(c)}
              />
            ))}
          </div>
        </div>

        <div className="mb-6 w-full max-w-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`btn btn-xs ${showFavoritesOnly ? 'btn-primary' : 'btn-ghost'}`}>
                &#9829; Favorites
              </button>
              <button
                type="button"
                onClick={() => toggleSort('name')}
                className={`btn btn-xs ${sortKey === 'name' ? 'btn-active' : 'btn-ghost'}`}>
                Name{' '}
                {sortKey === 'name' &&
                  (sortAsc ? <PiArrowUp /> : <PiArrowDown />)}
              </button>
              <button
                type="button"
                onClick={() => toggleSort('category')}
                className={`btn btn-xs ${sortKey === 'category' ? 'btn-active' : 'btn-ghost'}`}>
                Category{' '}
                {sortKey === 'category' &&
                  (sortAsc ? <PiArrowUp /> : <PiArrowDown />)}
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`btn btn-ghost btn-xs ${viewMode === 'grid' ? 'btn-active' : ''}`}>
                <PiGridFour />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`btn btn-ghost btn-xs ${viewMode === 'list' ? 'btn-active' : ''}`}>
                <PiList />
              </button>
            </div>
          </div>
        </div>

        {hasFilters && (
          <div className="mb-6 w-full max-w-3xl">
            <button
              type="button"
              onClick={clearFilters}
              className="btn btn-ghost btn-xs font-mono text-xs">
              Clear filters
            </button>
            <span className="text-base-content/30 ml-2 text-xs">
              {totalResults} {totalResults === 1 ? 'app' : 'apps'}
            </span>
          </div>
        )}

        {totalResults === 0 && (
          <p className="text-base-content/30 mt-20 text-sm">
            No results match your filters
          </p>
        )}

        {!hasFilters && recentApps.length > 0 && (
          <div className="mb-8 w-full max-w-3xl">
            <p className="text-base-content/50 mb-3 font-mono text-[10px] tracking-widest uppercase">
              Recently Viewed
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {recentApps.map((app) => {
                const Icon = getIcon(app.icon);
                return (
                  <Link
                    key={app.slug}
                    href={`/app/${app.slug}/`}
                    className="card bg-base-200 border-base-300 hover:bg-base-300 border p-3 text-center transition-colors">
                    <Icon className="text-primary mx-auto mb-1 text-lg" />
                    <div className="truncate text-xs">{app.label}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex w-full max-w-3xl flex-col gap-10">
          {sectionOrder.map((key) => {
            const apps = filteredBySection[key];
            if (!apps) return null;
            const meta = SECTION_META[key] ?? { label: key, description: '' };
            return (
              <section key={key}>
                <div className="mb-4">
                  <h2 className="text-lg font-light tracking-tight">
                    {meta.label}
                  </h2>
                  <p className="text-base-content/40 text-xs">
                    {meta.description}
                  </p>
                </div>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {apps.map((app) => (
                      <StoreCard
                        key={app.slug}
                        app={app}
                        platform={platform}
                        recommended={getRecommendedDownload(app, platform)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {apps.map((app) => (
                      <Link
                        key={app.slug}
                        href={`/app/${app.slug}/`}
                        className="card bg-base-200 border-base-300 hover:bg-base-300 flex flex-row items-center gap-3 border p-3 transition-colors">
                        <span className="text-primary text-sm">
                          {isFavorite(app.slug) ? '♥' : '♡'}
                        </span>
                        <span className="text-sm">{app.label}</span>
                        <span className="text-base-content/40 ml-auto text-xs">
                          {app.primaryCategory}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
};

const FilterChip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`badge badge-sm cursor-pointer font-mono transition-all ${
      active
        ? 'badge-primary'
        : 'bg-base-300 text-base-content/60 hover:bg-base-200'
    }`}>
    {label}
  </button>
);

export default HomePage;
