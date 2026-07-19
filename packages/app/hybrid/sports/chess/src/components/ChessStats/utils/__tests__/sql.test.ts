import { renderHook, act } from '@testing-library/react';
import { useSQLite } from '../sql';

const mockDatabase = jest.fn();
const mockInitSqlJs = jest.fn();

describe('useSQLite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    globalThis.window = globalThis.window || {};
    globalThis.window.initSqlJs = mockInitSqlJs;
  });

  it('loads database successfully', async () => {
    const dbInstance = { exec: jest.fn() };
    mockInitSqlJs.mockResolvedValue({ Database: mockDatabase });
    mockDatabase.mockReturnValue(dbInstance);

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
    });

    const { result } = renderHook(() => useSQLite('/test.db'));

    expect(result.current.dbLoading).toBe(true);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(result.current.dbLoading).toBe(false);
  });

  it('handles fetch failure', async () => {
    mockInitSqlJs.mockResolvedValue({ Database: mockDatabase });
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 });

    const { result } = renderHook(() => useSQLite('/missing.db'));

    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(result.current.dbError).toBeTruthy();
    expect(result.current.dbLoading).toBe(false);
  });

  it('handles network error', async () => {
    mockInitSqlJs.mockResolvedValue({ Database: mockDatabase });
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useSQLite('/fail.db'));

    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(result.current.dbError?.message).toBe('Network error');
    expect(result.current.dbLoading).toBe(false);
  });

  it('creates script tag when initSqlJs not available', async () => {
    globalThis.window.initSqlJs = undefined;

    const { result } = renderHook(() => useSQLite('/test.db'));
    expect(result.current.dbLoading).toBe(true);

    const script = document.getElementById('sqljs-script');
    expect(script).toBeTruthy();
  });
});
