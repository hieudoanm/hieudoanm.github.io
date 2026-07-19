import { renderHook, act } from '@testing-library/react';
import { useSearch } from '../useSearch';
import type { AppData } from '@/lib/downloads';

const mockApps: AppData[] = [
  {
    slug: 'test-app',
    label: 'Test App',
    primaryCategory: 'Utilities',
    secondaryCategory: 'Tools',
    section: 'hybrid',
    icon: 'PiPackage',
    href: '/app/test-app/',
    platforms: ['macos', 'windows'],
    downloads: [],
    version: '1.0.0',
    lastUpdated: '2024-01-01',
    fileSize: '10 MB',
    screenshots: [],
  },
  {
    slug: 'other-app',
    label: 'Other App',
    primaryCategory: 'Games',
    secondaryCategory: 'Action',
    section: 'hybrid',
    icon: 'PiPackage',
    href: '/app/other-app/',
    platforms: ['macos'],
    downloads: [],
    version: '1.0.0',
    lastUpdated: '2024-01-01',
    fileSize: '5 MB',
    screenshots: [],
  },
];

describe('useSearch', () => {
  it('returns empty query initially', () => {
    const { result } = renderHook(() => useSearch({ apps: mockApps }));
    expect(result.current.query).toBe('');
    expect(result.current.filtering).toBe(false);
    expect(result.current.suggestions).toEqual([]);
  });

  it('updates query and shows suggestions', () => {
    const { result } = renderHook(() => useSearch({ apps: mockApps }));

    act(() => {
      result.current.setQuery('test');
    });

    expect(result.current.query).toBe('test');
    expect(result.current.filtering).toBe(true);
  });

  it('clears query on Escape', () => {
    const { result } = renderHook(() => useSearch({ apps: mockApps }));

    act(() => {
      result.current.setQuery('test');
    });

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(result.current.query).toBe('');
  });

  it('focuses search on / key', () => {
    const { result } = renderHook(() => useSearch({ apps: mockApps }));

    const focusSpy = jest.fn();
    Object.defineProperty(result.current.searchRef, 'current', {
      value: { focus: focusSpy },
      writable: true,
    });

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: '/' }));
    });

    expect(focusSpy).toHaveBeenCalled();
  });
});
