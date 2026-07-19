jest.mock(
  '@frontend/native',
  () => {
    let store: Record<string, any> = {};
    return {
      createClipboard: () => ({
        isSupported: jest.fn(() => true),
        paste: jest.fn(() => Promise.resolve('pasted text')),
        copy: jest.fn(() => Promise.resolve()),
      }),
      createStorage: () => ({
        get: (key: string) => store[key] ?? null,
        set: (key: string, val: any) => {
          store[key] = val;
        },
        remove: (key: string) => {
          delete store[key];
        },
      }),
    };
  },
  { virtual: true }
);

import { renderHook, act } from '@testing-library/react';
import { useClipboard } from '../useClipboard';

describe('useClipboard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes with empty clips', () => {
    const { result } = renderHook(() => useClipboard());
    expect(result.current.clips).toEqual([]);
    expect(result.current.tab).toBe('history');
  });

  it('captures clipboard text', async () => {
    const { result } = renderHook(() => useClipboard());
    await act(async () => {
      await result.current.capture();
    });
    expect(result.current.clips.length).toBeGreaterThan(0);
    expect(result.current.clips[0].content).toBe('pasted text');
  });

  it('copies text via clipboard', async () => {
    const { result } = renderHook(() => useClipboard());
    await act(async () => {
      await result.current.copy('test text');
    });
    expect(result.current.error).toBeNull();
  });

  it('removes a clip by id', async () => {
    const { result } = renderHook(() => useClipboard());
    await act(async () => {
      await result.current.capture();
    });
    const id = result.current.clips[0].id;
    act(() => {
      result.current.remove(id);
    });
    expect(result.current.clips).toHaveLength(0);
  });

  it('clears all clips', async () => {
    const { result } = renderHook(() => useClipboard());
    await act(async () => {
      await result.current.capture();
    });
    act(() => {
      result.current.clearAll();
    });
    expect(result.current.clips).toHaveLength(0);
    expect(result.current.selected).toBeNull();
  });
});
