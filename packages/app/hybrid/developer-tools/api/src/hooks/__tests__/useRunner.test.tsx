import { renderHook, act, waitFor } from '@testing-library/react';
import { useRunner } from '@/hooks/useRunner';
import { executeRequest, emptyRequest } from '@/lib/http';
import { RequestCollection, ResponseMeta } from '@/types/api-client';

jest.mock('@/lib/http', () => ({
  executeRequest: jest.fn(),
  emptyRequest: jest.requireActual('@/lib/http').emptyRequest,
}));

const mockExecuteRequest = executeRequest as jest.Mock;

const collection = (): RequestCollection => ({
  id: 'c1',
  name: 'Users API',
  groups: [
    {
      id: 'g1',
      name: 'Users',
      entries: [
        {
          id: 'e1',
          name: 'List users',
          request: {
            ...emptyRequest(),
            method: 'GET',
            url: 'https://api.example.com/users',
            params: [],
            headers: [],
            body: '',
            authType: 'none',
            token: '',
            username: '',
            password: '',
          },
        },
        {
          id: 'e2',
          name: 'Create user',
          request: {
            ...emptyRequest(),
            method: 'POST',
            url: 'https://api.example.com/users',
            params: [],
            headers: [],
            body: '{"name":"{{name}}"}',
            authType: 'none',
            token: '',
            username: '',
            password: '',
          },
        },
      ],
    },
  ],
});

const meta = (): ResponseMeta => ({
  status: 200,
  statusText: 'OK',
  url: 'https://api.example.com/users',
  headers: {},
  body: '{}',
  timeMs: 4,
  sizeBytes: 2,
});

describe('useRunner', () => {
  beforeEach(() => {
    mockExecuteRequest.mockReset();
  });

  it('selects the first collection by default', () => {
    const { result } = renderHook(() => useRunner([collection()], [], []));
    expect(result.current.collectionId).toBe('c1');
  });

  it('starts empty when there are no collections', () => {
    const { result } = renderHook(() => useRunner([], [], []));
    expect(result.current.collectionId).toBe('');
    act(() => result.current.addMonitor('Solo', 5));
    expect(result.current.monitors).toEqual([]);
  });

  it('does not add a monitor without a selected collection', () => {
    const { result } = renderHook(() => useRunner([collection()], [], []));
    act(() => result.current.setCollectionId('missing'));
    act(() => result.current.addMonitor('Solo', 5));
    expect(result.current.monitors).toEqual([]);
  });

  it('runs the selected collection and stores the summary', async () => {
    mockExecuteRequest.mockResolvedValue(meta());
    const { result } = renderHook(() => useRunner([collection()], [], []));
    await act(async () => {
      await result.current.run();
    });
    expect(mockExecuteRequest).toHaveBeenCalledTimes(2);
    expect(result.current.summary?.totalRequests).toBe(2);
    expect(result.current.summary?.passed).toBe(2);
    expect(result.current.running).toBe(false);
  });

  it('shows an error when no collection is selected', async () => {
    const { result } = renderHook(() => useRunner([collection()], [], []));
    act(() => result.current.setCollectionId('missing'));
    await act(async () => {
      await result.current.run();
    });
    expect(result.current.runError).toBe('Select a collection to run');
    expect(mockExecuteRequest).not.toHaveBeenCalled();
  });

  it('runs data-driven iterations when a data source is set', async () => {
    mockExecuteRequest.mockResolvedValue(meta());
    const { result } = renderHook(() => useRunner([collection()], [], []));
    act(() => {
      result.current.setDataType('csv');
      result.current.setDataText('name\nAlice\nBob');
    });
    await act(async () => {
      await result.current.run();
    });
    expect(mockExecuteRequest).toHaveBeenCalledTimes(4);
    expect(result.current.summary?.iterations).toBe(2);
    expect(result.current.rows).toHaveLength(2);
  });

  it('rejects runs with an empty data source', async () => {
    const { result } = renderHook(() => useRunner([collection()], [], []));
    act(() => result.current.setDataType('json'));
    await act(async () => {
      await result.current.run();
    });
    expect(result.current.runError).toBe('Data file has no rows');
    expect(mockExecuteRequest).not.toHaveBeenCalled();
  });

  it('adds a monitor for the selected collection', () => {
    const { result } = renderHook(() => useRunner([collection()], [], []));
    act(() => result.current.addMonitor('Daily', 5));
    expect(result.current.monitors).toHaveLength(1);
    expect(result.current.monitors[0].name).toBe('Daily');
    expect(result.current.monitors[0].collectionId).toBe('c1');
    expect(result.current.monitors[0].intervalMs).toBe(300000);
  });

  it('skips scheduled runs for monitors whose collection is missing', async () => {
    jest.useFakeTimers();
    mockExecuteRequest.mockResolvedValue(meta());
    const { result, rerender } = renderHook(
      ({ collections: next }: { collections: RequestCollection[] }) =>
        useRunner(next, [], []),
      { initialProps: { collections: [collection()] } }
    );
    act(() => result.current.addMonitor('Check', 1));
    const monitorId = result.current.monitors[0].id;
    act(() => result.current.onToggleMonitor(monitorId));

    rerender({ collections: [] });
    await act(async () => {
      await jest.advanceTimersByTimeAsync(60000);
    });

    expect(mockExecuteRequest).not.toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('runs monitors on their interval and records the last result', async () => {
    jest.useFakeTimers();
    mockExecuteRequest.mockResolvedValue(meta());
    const { result } = renderHook(() => useRunner([collection()], [], []));
    act(() => result.current.addMonitor('Check', 1));
    const monitorId = result.current.monitors[0].id;
    act(() => result.current.onToggleMonitor(monitorId));
    expect(result.current.monitors[0].running).toBe(true);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(60000);
    });

    expect(mockExecuteRequest).toHaveBeenCalledTimes(2);
    expect(result.current.monitors[0].lastResult?.totalRequests).toBe(2);
    expect(result.current.monitors[0].lastRunAt).not.toBeNull();

    act(() => result.current.onRemoveMonitor(monitorId));
    await act(async () => {
      await jest.advanceTimersByTimeAsync(120000);
    });
    expect(mockExecuteRequest).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });
});
