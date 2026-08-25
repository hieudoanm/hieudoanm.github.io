import { renderHook, act } from '@testing-library/react';
import { useFavorites, useRecentlyViewed } from '../hooks';

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
