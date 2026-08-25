'use client';

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { StoreCard } from '@/components/atoms/StoreCard';
import downloadsJson from '@/data/downloads.json';
import {
  getRecommendedDownload,
  parseDownloads,
  type AppData,
} from '@/lib/downloads';
import { PLATFORM_LABELS, detectPlatform, type Platform } from '@/lib/os';

const ALL_APPS = parseDownloads(
  downloadsJson as Parameters<typeof parseDownloads>[0]
);

const ALL_PLATFORMS: { group: string; platforms: Platform[] }[] = [
  { group: 'Desktop', platforms: ['macos', 'windows', 'linux'] },
  { group: 'Mobile', platforms: ['android', 'ios'] },
  { group: 'Unknown', platforms: ['unknown'] },
];

const ALL_CATEGORIES = [...new Set(ALL_APPS.map((a) => a.description))].sort();

const matchesQuery = (app: AppData, q: string): boolean => {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const haystack =
    `${app.label} ${app.description} ${app.category}`.toLowerCase();
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
  const deferredQuery = useDeferredValue(query);
  const filtering = deferredQuery.trim().length > 0;

  useEffect(() => {
    setToday(formatToday());
    setPlatform(detectPlatform());
  }, []);

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

  const filteredBySection = useMemo(() => {
    const result: Record<string, AppData[]> = {};
    for (const key of sectionOrder) {
      const apps = sections[key];
      const filtered = apps.filter((a) => {
        if (filtering && !matchesQuery(a, deferredQuery)) return false;
        if (activePlatform !== 'all' && !a.platforms.includes(activePlatform))
          return false;
        if (activeCategory !== 'all' && a.description !== activeCategory)
          return false;
        return true;
      });
      if (filtered.length > 0) result[key] = filtered;
    }
    return result;
  }, [
    sections,
    sectionOrder,
    filtering,
    deferredQuery,
    activePlatform,
    activeCategory,
  ]);

  const totalResults = useMemo(
    () => Object.values(filteredBySection).reduce((n, a) => n + a.length, 0),
    [filteredBySection]
  );

  const hasFilters =
    activePlatform !== 'all' || activeCategory !== 'all' || filtering;

  const clearFilters = () => {
    setQuery('');
    setActivePlatform('all');
    setActiveCategory('all');
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
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps…"
            className="input input-bordered focus:border-primary focus:outline-primary w-full"
          />
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
            {ALL_PLATFORMS.map((group, gi) => (
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

        <div className="mb-8 w-full max-w-3xl">
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
