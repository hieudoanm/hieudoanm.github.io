import { renderHook, act } from '@testing-library/react';
import { matchesQuery, useFilters } from '../useFilters';
import type { AppData } from '@/lib/downloads';

const mockApps: AppData[] = [
  {
    slug: 'app-a',
    label: 'Alpha App',
    primaryCategory: 'Utilities',
    secondaryCategory: 'Tools',
    section: 'hybrid',
    icon: 'PiPackage',
    href: '/app/app-a/',
    platforms: ['macos', 'windows'],
    downloads: [],
    version: '1.0.0',
    lastUpdated: '2024-01-01',
    fileSize: '10 MB',
    screenshots: [],
  },
  {
    slug: 'app-b',
    label: 'Beta App',
    primaryCategory: 'Games',
    secondaryCategory: 'Action',
    section: 'hybrid',
    icon: 'PiPackage',
    href: '/app/app-b/',
    platforms: ['android'],
    downloads: [],
    version: '1.0.0',
    lastUpdated: '2024-01-01',
    fileSize: '5 MB',
    screenshots: [],
  },
];

describe('matchesQuery', () => {
  it('matches on primary category', () => {
    expect(matchesQuery(mockApps[0], 'utilities')).toBe(true);
  });

  it('matches on slug', () => {
    expect(matchesQuery(mockApps[0], 'app-a')).toBe(true);
  });

  it('matches on section', () => {
    expect(matchesQuery(mockApps[0], 'hybrid')).toBe(true);
  });

  it('matches on version and file size', () => {
    expect(matchesQuery(mockApps[1], '5 mb')).toBe(true);
    expect(matchesQuery(mockApps[0], '1.0.0')).toBe(true);
  });

  it('requires every term to match', () => {
    expect(matchesQuery(mockApps[0], 'alpha utilities')).toBe(true);
    expect(matchesQuery(mockApps[0], 'alpha games')).toBe(false);
  });

  it('returns false for unrelated queries', () => {
    expect(matchesQuery(mockApps[0], 'zzz-nonexistent')).toBe(false);
  });
});

describe('useFilters', () => {
  const isFavorite = () => false;

  it('returns default filter state', () => {
    const { result } = renderHook(() =>
      useFilters({
        apps: mockApps,
        deferredQuery: '',
        filtering: false,
        isFavorite,
      })
    );
    expect(result.current.activePlatform).toBe('all');
    expect(result.current.activeCategory).toBe('all');
    expect(result.current.viewMode).toBe('grid');
    expect(result.current.sortKey).toBe('name');
    expect(result.current.hasFilters).toBe(false);
  });

  it('filters by platform', () => {
    const { result } = renderHook(() =>
      useFilters({
        apps: mockApps,
        deferredQuery: '',
        filtering: false,
        isFavorite,
      })
    );

    act(() => {
      result.current.setActivePlatform('android');
    });

    expect(result.current.hasFilters).toBe(true);
    expect(result.current.totalResults).toBe(1);
  });

  it('filters by category', () => {
    const { result } = renderHook(() =>
      useFilters({
        apps: mockApps,
        deferredQuery: '',
        filtering: false,
        isFavorite,
      })
    );

    act(() => {
      result.current.setActiveCategory('Games');
    });

    expect(result.current.totalResults).toBe(1);
  });

  it('clears all filters', () => {
    const { result } = renderHook(() =>
      useFilters({
        apps: mockApps,
        deferredQuery: '',
        filtering: false,
        isFavorite,
      })
    );

    act(() => {
      result.current.setActivePlatform('android');
      result.current.setActiveCategory('Games');
    });

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.activePlatform).toBe('all');
    expect(result.current.activeCategory).toBe('all');
    expect(result.current.hasFilters).toBe(false);
  });

  it('toggles sort key', () => {
    const { result } = renderHook(() =>
      useFilters({
        apps: mockApps,
        deferredQuery: '',
        filtering: false,
        isFavorite,
      })
    );

    act(() => {
      result.current.toggleSort('category');
    });

    expect(result.current.sortKey).toBe('category');
    expect(result.current.sortAsc).toBe(true);
  });

  it('reverses sort direction when same key', () => {
    const { result } = renderHook(() =>
      useFilters({
        apps: mockApps,
        deferredQuery: '',
        filtering: false,
        isFavorite,
      })
    );

    act(() => {
      result.current.toggleSort('name');
    });

    expect(result.current.sortAsc).toBe(false);
  });

  it('returns categories', () => {
    const { result } = renderHook(() =>
      useFilters({
        apps: mockApps,
        deferredQuery: '',
        filtering: false,
        isFavorite,
      })
    );

    expect(result.current.categories).toEqual(['Games', 'Utilities']);
  });

  it('toggles view mode', () => {
    const { result } = renderHook(() =>
      useFilters({
        apps: mockApps,
        deferredQuery: '',
        filtering: false,
        isFavorite,
      })
    );

    act(() => {
      result.current.setViewMode('list');
    });

    expect(result.current.viewMode).toBe('list');
  });
});
