jest.mock('@/lib/db', () => ({
  db: {
    getAll: jest.fn(),
    put: jest.fn(),
    putAll: jest.fn(),
  },
}));

jest.mock('@/lib/seed', () => ({
  ensureSeeded: jest.fn().mockResolvedValue(undefined),
}));

import { renderHook, act, waitFor } from '@testing-library/react';
import { useEntitySync } from '../useEntitySync';
import { db } from '@/lib/db';

const seed = [{ id: 'seed-1', name: 'Seed' }];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useEntitySync', () => {
  it('starts with seed data and loading true', () => {
    const { result } = renderHook(() => useEntitySync('user', seed));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual(seed);
  });

  it('replaces seed data when the store has items', async () => {
    const persisted = [{ id: 'p-1', name: 'Persisted' }];
    (db.getAll as jest.Mock).mockResolvedValue(persisted);
    const { result } = renderHook(() => useEntitySync('user', seed));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(persisted);
  });

  it('keeps seed data when the store is empty', async () => {
    (db.getAll as jest.Mock).mockResolvedValue([]);
    const { result } = renderHook(() => useEntitySync('user', seed));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(seed);
  });

  it('keeps seed data and warns when the store load fails', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    (db.getAll as jest.Mock).mockRejectedValue(new Error('load failed'));
    const { result } = renderHook(() => useEntitySync('user', seed));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(seed);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('persists all items', async () => {
    const { result } = renderHook(() => useEntitySync('user', seed));
    await waitFor(() => expect(result.current.loading).toBe(false));
    const next = [{ id: 'p-1', name: 'Persisted' }];
    await act(async () => {
      await result.current.persist(next);
    });
    expect(db.putAll).toHaveBeenCalledWith('user', next);
  });

  it('warns when persisting all items fails', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    (db.putAll as jest.Mock).mockRejectedValue(new Error('putAll failed'));
    const { result } = renderHook(() => useEntitySync('user', seed));
    await waitFor(() => expect(result.current.loading).toBe(false));
    await act(async () => {
      await result.current.persist([{ id: 'p-1', name: 'Persisted' }]);
    });
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('persists a single item', async () => {
    const { result } = renderHook(() => useEntitySync('user', seed));
    await waitFor(() => expect(result.current.loading).toBe(false));
    const item = { id: 'p-1', name: 'Persisted' };
    await act(async () => {
      await result.current.persistOne(item);
    });
    expect(db.put).toHaveBeenCalledWith('user', item);
  });

  it('warns when persisting a single item fails', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    (db.put as jest.Mock).mockRejectedValue(new Error('put failed'));
    const { result } = renderHook(() => useEntitySync('user', seed));
    await waitFor(() => expect(result.current.loading).toBe(false));
    await act(async () => {
      await result.current.persistOne({ id: 'p-1', name: 'Persisted' });
    });
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
