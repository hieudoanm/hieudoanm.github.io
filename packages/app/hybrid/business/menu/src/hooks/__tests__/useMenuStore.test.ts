import { renderHook, act } from '@testing-library/react';
import { useMenuStore } from '../useMenuStore';

beforeEach(() => {
  localStorage.clear();
});

describe('useMenuStore', () => {
  it('seeds demo data on first run', () => {
    const { result } = renderHook(() => useMenuStore());
    expect(result.current.state.restaurants.length).toBeGreaterThan(0);
    expect(result.current.state.items.length).toBeGreaterThan(0);
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useMenuStore());
    act(() => {
      result.current.setState((s) => ({
        ...s,
        restaurants: [
          {
            id: 'r1',
            name: 'Test',
            accent: 'primary',
            tableCount: 1,
            createdAt: '2025-01-01',
          },
        ],
      }));
    });
    expect(result.current.state.restaurants).toHaveLength(1);
    const stored = JSON.parse(localStorage.getItem('menu_state') || '{}');
    expect(stored.restaurants).toHaveLength(1);
  });

  it('loads persisted state on mount', () => {
    localStorage.setItem(
      'menu_state',
      JSON.stringify({
        restaurants: [
          {
            id: 'r2',
            name: 'Saved',
            accent: 'secondary',
            tableCount: 2,
            createdAt: '2025-01-02',
          },
        ],
        items: [],
        orders: [],
      })
    );
    const { result } = renderHook(() => useMenuStore());
    expect(result.current.state.restaurants[0].name).toBe('Saved');
  });

  it('reset clears state', () => {
    const { result } = renderHook(() => useMenuStore());
    act(() => {
      result.current.setState((s) => ({
        ...s,
        restaurants: [
          {
            id: 'r3',
            name: 'X',
            accent: 'primary',
            tableCount: 1,
            createdAt: '2025-01-01',
          },
        ],
      }));
    });
    expect(result.current.state.restaurants).toHaveLength(1);
    act(() => {
      result.current.reset();
    });
    expect(result.current.state.restaurants).toEqual([]);
  });
});
