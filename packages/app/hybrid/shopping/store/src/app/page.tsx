'use client';

import { AppSection } from '@/components/molecules/AppSection';
import { CategoryFilter } from '@/components/molecules/CategoryFilter';
import { PlatformFilter } from '@/components/molecules/PlatformFilter';
import { RecentlyViewed } from '@/components/molecules/RecentlyViewed';
import { SearchBar } from '@/components/molecules/SearchBar';
import { SortBar } from '@/components/molecules/SortBar';
import { Featured } from '@/components/molecules/sections/Featured';
import downloadsJson from '@/data/downloads.json';
import { useBrowserDetect } from '@/hooks/useBrowserDetect';
import { useFilters } from '@/hooks/useFilters';
import { useSearch } from '@/hooks/useSearch';
import { BROWSER_LABELS, ENGINE_LABELS } from '@/lib/browser';
import { parseDownloads, type AppData } from '@/lib/downloads';
import { isFeatured } from '@/lib/featured';
import { useFavorites, useRecentlyViewed, useSearchHistory } from '@/lib/hooks';
import { PLATFORM_LABELS, detectPlatform, type Platform } from '@/lib/os';
import { useEffect, useMemo, useState } from 'react';

const ALL_APPS = parseDownloads(
  downloadsJson as Parameters<typeof parseDownloads>[0]
);

const formatToday = (): string =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const HomePage = () => {
  const [today, setToday] = useState('');
  const [platform, setPlatform] = useState<Platform>('unknown');
  const { favorites, isFavorite } = useFavorites();
  const { slugs: recentSlugs } = useRecentlyViewed();
  const {
    history: searchHistory,
    addSearch,
    clearHistory,
  } = useSearchHistory();
  const browserInfo = useBrowserDetect();

  const {
    query,
    setQuery,
    deferredQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    searchRef,
    filtering,
  } = useSearch({ apps: ALL_APPS });

  const {
    activePlatform,
    setActivePlatform,
    activeCategory,
    setActiveCategory,
    sortKey,
    sortAsc,
    toggleSort,
    viewMode,
    setViewMode,
    showFavoritesOnly,
    setShowFavoritesOnly,
    hasFilters,
    clearFilters,
    filteredBySection,
    sectionOrder,
    totalResults,
    categories,
  } = useFilters({
    apps: ALL_APPS,
    deferredQuery,
    filtering,
    isFavorite,
  });

  useEffect(() => {
    setToday(formatToday());
    setPlatform(detectPlatform());
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) {
      setQuery(q);
      setShowSuggestions(false);
    }
  }, [setQuery, setShowSuggestions]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const q = query.trim();
    if (q) url.searchParams.set('q', q);
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url.toString());
  }, [query]);

  const featuredApps = useMemo(
    () => ALL_APPS.filter(isFeatured).slice(0, 6),
    []
  );

  const recentApps = useMemo(
    () =>
      recentSlugs
        .map((slug) => ALL_APPS.find((a) => a.slug === slug))
        .filter(Boolean)
        .slice(0, 4) as AppData[],
    [recentSlugs]
  );

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
          {browserInfo.browser !== 'unknown' &&
            ` \u00b7 ${BROWSER_LABELS[browserInfo.browser]} \u00b7 ${ENGINE_LABELS[browserInfo.engine]}`}
        </p>

        <SearchBar
          query={query}
          setQuery={setQuery}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          suggestions={suggestions}
          searchRef={searchRef}
          history={searchHistory}
          onSearch={addSearch}
          onClearHistory={clearHistory}
        />

        <PlatformFilter active={activePlatform} onChange={setActivePlatform} />

        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <SortBar
          sortKey={sortKey}
          sortAsc={sortAsc}
          toggleSort={toggleSort}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
        />

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

        {!hasFilters && featuredApps.length > 0 && (
          <Featured apps={featuredApps} platform={platform} />
        )}

        {!hasFilters && recentApps.length > 0 && (
          <RecentlyViewed apps={recentApps} />
        )}

        <div className="flex w-full max-w-3xl flex-col gap-10">
          {sectionOrder.map((key) => {
            const apps = filteredBySection[key];
            if (!apps) return null;
            return (
              <AppSection
                key={key}
                sectionKey={key}
                apps={apps}
                platform={platform}
                viewMode={viewMode}
                isFavorite={isFavorite}
                highlightQuery={deferredQuery}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
