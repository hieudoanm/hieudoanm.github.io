import { renderHook, act, waitFor } from '@testing-library/react';
import { useEntitySync } from '../useEntitySync';

jest.mock('@/lib/db', () => ({
  db: {
    getAll: jest.fn().mockResolvedValue([]),
    put: jest.fn().mockResolvedValue(undefined),
    putAll: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn().mockResolvedValue(undefined),
    STORES: {
      user: 'user',
      companies: 'companies',
      submissions: 'submissions',
      audits: 'audits',
      calculatorHistory: 'calculatorHistory',
    },
  },
}));

describe('useEntitySync', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
  });

  it('initializes with loading true', () => {
    const { result } = renderHook(() => useEntitySync('user' as never, []));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
  });

  it('loads data from db on mount', async () => {
    const mockData = [{ id: '1', name: 'Test' }];
    const { db } = require('@/lib/db');
    db.getAll.mockResolvedValue(mockData);

    const { result } = renderHook(() => useEntitySync('user' as never, []));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual(mockData);
  });

  it('falls back to initial data on load error', async () => {
    const { db } = require('@/lib/db');
    db.getAll.mockRejectedValue(new Error('DB error'));

    const initialData = [{ id: '1', name: 'Initial' }];
    const { result } = renderHook(() =>
      useEntitySync('user' as never, initialData as never)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual(initialData);
  });

  it('uses initial data when db returns empty', async () => {
    const { db } = require('@/lib/db');
    db.getAll.mockResolvedValue([]);

    const initialData = [{ id: '1', name: 'Initial' }];
    const { result } = renderHook(() =>
      useEntitySync('user' as never, initialData as never)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual(initialData);
  });

  it('setData updates data directly', async () => {
    const { result } = renderHook(() => useEntitySync('user' as never, []));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setData([{ id: '1', name: 'New' }] as never);
    });
    expect(result.current.data).toEqual([{ id: '1', name: 'New' }]);
  });

  it('persist saves items to db and updates state', async () => {
    const { db } = require('@/lib/db');
    const { result } = renderHook(() => useEntitySync('user' as never, []));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const items = [{ id: '1', name: 'Persisted' }];
    await act(async () => {
      await result.current.persist(items as never);
    });

    expect(db.putAll).toHaveBeenCalledWith('user', items);
    expect(result.current.data).toEqual(items);
  });

  it('persistOne saves single item to db', async () => {
    const { db } = require('@/lib/db');
    const { result } = renderHook(() => useEntitySync('user' as never, []));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const item = { id: '1', name: 'Single' };
    await act(async () => {
      await result.current.persistOne(item as never);
    });

    expect(db.put).toHaveBeenCalledWith('user', item);
    expect(result.current.data).toContainEqual(item);
  });

  it('persistOne updates existing item', async () => {
    const { db } = require('@/lib/db');
    db.getAll.mockResolvedValue([{ id: '1', name: 'Old' }]);

    const { result } = renderHook(() => useEntitySync('user' as never, []));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const item = { id: '1', name: 'Updated' };
    await act(async () => {
      await result.current.persistOne(item as never);
    });

    expect(result.current.data).toEqual([item]);
  });

  it('removeOne deletes item from db and state', async () => {
    const { db } = require('@/lib/db');
    db.getAll.mockResolvedValue([
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
    ]);

    const { result } = renderHook(() => useEntitySync('user' as never, []));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.removeOne('1');
    });

    expect(db.remove).toHaveBeenCalledWith('user', '1');
    expect(result.current.data).toEqual([{ id: '2', name: 'B' }]);
  });
});
