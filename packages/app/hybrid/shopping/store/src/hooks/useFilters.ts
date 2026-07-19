'use client';

import { useCallback, useMemo, useState } from 'react';
import type { AppData } from '@/lib/downloads';
import type { Platform } from '@/lib/os';
import type { SortKey, ViewMode } from '@/lib/types';

interface UseFiltersOptions {
  apps: AppData[];
  deferredQuery: string;
  filtering: boolean;
  isFavorite: (slug: string) => boolean;
}

interface UseFiltersReturn {
  activePlatform: Platform | 'all';
  setActivePlatform: (p: Platform | 'all') => void;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  sortKey: SortKey;
  sortAsc: boolean;
  toggleSort: (key: SortKey) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (v: boolean) => void;
  hasFilters: boolean;
  clearFilters: () => void;
  filteredBySection: Record<string, AppData[]>;
  sectionOrder: string[];
  totalResults: number;
  categories: string[];
}

export const matchesQuery = (app: AppData, q: string): boolean => {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const haystack = [
    app.label,
    app.slug,
    app.primaryCategory,
    app.secondaryCategory,
    app.section,
    app.version,
    app.fileSize,
    app.lastUpdated,
    ...app.downloads.map((d) => `${d.label} ${d.platform}`),
  ]
    .join(' ')
    .toLowerCase();
  return terms.every((term) => haystack.includes(term));
};

export const useFilters = ({
  apps,
  deferredQuery,
  filtering,
  isFavorite,
}: UseFiltersOptions): UseFiltersReturn => {
  const [activePlatform, setActivePlatform] = useState<Platform | 'all'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const categories = useMemo(
    () => [...new Set(apps.map((a) => a.primaryCategory))].sort(),
    [apps]
  );

  const sections = useMemo(() => {
    const grouped: Record<string, AppData[]> = {};
    for (const app of apps) {
      const key = app.section;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(app);
    }
    return grouped;
  }, [apps]);

  const sectionOrder = useMemo(() => Object.keys(sections).sort(), [sections]);

  const sortApps = useCallback(
    (items: AppData[]) => {
      const sorted = [...items];
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
      const sectionApps = sections[key];
      const filtered = sectionApps.filter((a) => {
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

  const clearFilters = useCallback(() => {
    setActivePlatform('all');
    setActiveCategory('all');
    setShowFavoritesOnly(false);
  }, []);

  const toggleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) setSortAsc(!sortAsc);
      else {
        setSortKey(key);
        setSortAsc(true);
      }
    },
    [sortKey, sortAsc]
  );

  return {
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
  };
};
