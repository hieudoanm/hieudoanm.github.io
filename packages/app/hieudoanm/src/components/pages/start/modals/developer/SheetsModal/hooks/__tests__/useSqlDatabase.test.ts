import { renderHook, act } from '@testing-library/react';
import { useSqlDatabase } from '../useSqlDatabase';

const mockDbRun = jest.fn();
const mockDbExec = jest.fn();
const mockDbExport = jest.fn().mockReturnValue(new Uint8Array([1, 2, 3]));
const mockDbClose = jest.fn();

const createMockDb = () => ({
  exec: mockDbExec,
  export: mockDbExport,
  close: mockDbClose,
  run: mockDbRun,
});

jest.mock('../../utils/opfs', () => ({
  loadFromOPFS: jest.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
  opfsAvailable: jest.fn().mockResolvedValue(true),
  saveToOPFS: jest.fn().mockResolvedValue(undefined),
  listOPFSFiles: jest.fn().mockResolvedValue(['file1.db', 'file2.db']),
}));

describe('useSqlDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDbRun.mockReset();
    mockDbExec.mockReset();
    mockDbExport.mockReset().mockReturnValue(new Uint8Array([1, 2, 3]));
    mockDbClose.mockReset();

    const mockSQL = {
      Database: jest.fn().mockReturnValue(createMockDb()),
    };
    (window as any).initSqlJs = jest.fn().mockResolvedValue(mockSQL);
  });

  afterEach(() => {
    delete (window as any).initSqlJs;
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useSqlDatabase());
    expect(result.current.dbInstance).toBeNull();
    expect(result.current.dbFileName).toBeNull();
    expect(result.current.tables).toEqual([]);
    expect(result.current.activeTable).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.status).toBe('Ready · No database loaded');
  });

  it('lists OPFS files on mount', () => {
    renderHook(() => useSqlDatabase());
    const { listOPFSFiles } = require('../../utils/opfs');
    expect(listOPFSFiles).toHaveBeenCalled();
  });

  it('openDb loads a database', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([
        { columns: ['name'], values: [['users'], ['orders']] },
      ])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[5]] }])
      .mockReturnValueOnce([
        { columns: ['id', 'name'], values: [[1, 'Alice']] },
      ]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    expect(result.current.dbFileName).toBe('test.db');
    expect(result.current.tables).toHaveLength(2);
    expect(result.current.activeTable).toBe('users');
    expect(result.current.loading).toBe(false);
  });

  it('selectTable queries and updates active table', async () => {
    const { result } = renderHook(() => useSqlDatabase());

    act(() => {
      result.current.setQueryResult({ columns: ['id', 'name'], rows: [] });
    });

    const dbInstance = {
      exec: mockDbExec,
      export: mockDbExport,
      close: mockDbClose,
      run: mockDbRun,
    };
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockReturnValueOnce([
      { columns: ['id', 'name'], values: [[1, 'Alice']] },
    ]);

    act(() => {
      result.current.selectTable('users');
    });

    expect(result.current.activeTable).toBe('users');
  });

  it('createNewDb creates demo database', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[6]] }])
      .mockReturnValueOnce([
        { columns: ['id', 'name'], values: [[1, 'Alice']] },
      ]);

    await act(async () => {
      await result.current.createNewDb();
    });

    expect(result.current.dbFileName).toBe('demo_database.db');
    expect(result.current.tables).toHaveLength(3);
    expect(result.current.activeTable).toBe('customers');
    expect(result.current.status).toBe('Created demo database · 3 tables');
  });

  it('handleExport triggers download only when dbInstance exists', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    URL.createObjectURL = jest.fn().mockReturnValue('blob:url');
    URL.revokeObjectURL = jest.fn();

    act(() => {
      result.current.handleExport();
    });

    expect(result.current.status).not.toContain('Exported');

    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce([
        { columns: ['id', 'name'], values: [[1, 'Alice']] },
      ]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    act(() => {
      result.current.handleExport();
    });

    expect(mockDbExport).toHaveBeenCalled();
    expect(result.current.status).toContain('Exported');
  });

  it('handleSave saves to OPFS', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce([
        { columns: ['id', 'name'], values: [[1, 'Alice']] },
      ]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    await act(async () => {
      await result.current.handleSave();
    });

    const { saveToOPFS } = require('../../utils/opfs');
    expect(saveToOPFS).toHaveBeenCalledWith('test.db', expect.any(Uint8Array));
    expect(result.current.status).toContain('Saved to OPFS');
  });

  it('handleLoadOpfs loads from OPFS', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce([
        { columns: ['id', 'name'], values: [[1, 'Alice']] },
      ]);

    await act(async () => {
      await result.current.handleLoadOpfs('test.db');
    });

    expect(result.current.dbFileName).toBe('test.db');
  });
});
