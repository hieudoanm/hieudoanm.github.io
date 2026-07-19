import { renderHook, act } from '@testing-library/react';
import { useFavorites, useRecentlyViewed, useSearchHistory } from '../hooks';

beforeEach(() => {
  localStorage.clear();
});

describe('useFavorites', () => {
  it('returns empty array initially', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('toggleFavorite adds a slug', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.toggleFavorite('chess');
    });
    expect(result.current.favorites).toContain('chess');
  });

  it('toggleFavorite removes a slug', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.toggleFavorite('chess');
    });
    act(() => {
      result.current.toggleFavorite('chess');
    });
    expect(result.current.favorites).not.toContain('chess');
  });

  it('isFavorite returns true for favorited slugs', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.toggleFavorite('chess');
    });
    expect(result.current.isFavorite('chess')).toBe(true);
    expect(result.current.isFavorite('other')).toBe(false);
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.toggleFavorite('chess');
    });
    const stored = JSON.parse(localStorage.getItem('store:favorites') || '[]');
    expect(stored).toContain('chess');
  });

  it('reads existing favorites from localStorage', () => {
    localStorage.setItem(
      'store:favorites',
      JSON.stringify(['chess', 'sudoku'])
    );
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual(['chess', 'sudoku']);
  });
});

describe('useRecentlyViewed', () => {
  it('returns empty array initially', () => {
    const { result } = renderHook(() => useRecentlyViewed());
    expect(result.current.slugs).toEqual([]);
  });

  it('addRecent adds a slug', () => {
    const { result } = renderHook(() => useRecentlyViewed());
    act(() => {
      result.current.addRecent('chess');
    });
    expect(result.current.slugs).toContain('chess');
  });

  it('addRecent moves slug to front if already present', () => {
    const { result } = renderHook(() => useRecentlyViewed());
    act(() => {
      result.current.addRecent('chess');
    });
    act(() => {
      result.current.addRecent('sudoku');
    });
    act(() => {
      result.current.addRecent('chess');
    });
    expect(result.current.slugs[0]).toBe('chess');
    expect(result.current.slugs).toHaveLength(2);
  });

  it('limits to 10 recent slugs', () => {
    const { result } = renderHook(() => useRecentlyViewed());
    for (let i = 0; i < 15; i++) {
      act(() => {
        result.current.addRecent(`app-${i}`);
      });
    }
    expect(result.current.slugs).toHaveLength(10);
    expect(result.current.slugs[0]).toBe('app-14');
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useRecentlyViewed());
    act(() => {
      result.current.addRecent('chess');
    });
    const stored = JSON.parse(
      localStorage.getItem('store:recently-viewed') || '[]'
    );
    expect(stored).toContain('chess');
  });

  it('reads existing recent slugs from localStorage', () => {
    localStorage.setItem(
      'store:recently-viewed',
      JSON.stringify(['chess', 'sudoku'])
    );
    const { result } = renderHook(() => useRecentlyViewed());
    expect(result.current.slugs).toEqual(['chess', 'sudoku']);
  });
});

describe('useSearchHistory', () => {
  it('returns empty array initially', () => {
    const { result } = renderHook(() => useSearchHistory());
    expect(result.current.history).toEqual([]);
  });

  it('addSearch adds an entry', () => {
    const { result } = renderHook(() => useSearchHistory());
    act(() => {
      result.current.addSearch('chess');
    });
    expect(result.current.history[0].q).toBe('chess');
  });

  it('ignores empty search', () => {
    const { result } = renderHook(() => useSearchHistory());
    act(() => {
      result.current.addSearch('   ');
    });
    expect(result.current.history).toEqual([]);
  });

  it('moves repeated queries to the front without duplicates', () => {
    const { result } = renderHook(() => useSearchHistory());
    act(() => {
      result.current.addSearch('chess');
    });
    act(() => {
      result.current.addSearch('clock');
    });
    act(() => {
      result.current.addSearch('chess');
    });
    expect(result.current.history[0].q).toBe('chess');
    expect(result.current.history).toHaveLength(2);
  });

  it('limits history to 8 entries', () => {
    const { result } = renderHook(() => useSearchHistory());
    for (let i = 0; i < 12; i++) {
      act(() => {
        result.current.addSearch(`query-${i}`);
      });
    }
    expect(result.current.history).toHaveLength(8);
    expect(result.current.history[0].q).toBe('query-11');
  });

  it('persists history to localStorage', () => {
    const { result } = renderHook(() => useSearchHistory());
    act(() => {
      result.current.addSearch('chess');
    });
    const stored = JSON.parse(
      localStorage.getItem('store:search-history') || '[]'
    );
    expect(stored[0].q).toBe('chess');
  });

  it('reads existing history from localStorage', () => {
    localStorage.setItem(
      'store:search-history',
      JSON.stringify([{ q: 'chess', ts: 123 }])
    );
    const { result } = renderHook(() => useSearchHistory());
    expect(result.current.history[0].q).toBe('chess');
  });

  it('clearHistory removes all entries', () => {
    const { result } = renderHook(() => useSearchHistory());
    act(() => {
      result.current.addSearch('chess');
    });
    act(() => {
      result.current.clearHistory();
    });
    expect(result.current.history).toEqual([]);
    expect(localStorage.getItem('store:search-history')).toBeNull();
  });
});
