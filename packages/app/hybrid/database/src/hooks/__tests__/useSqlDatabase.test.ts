import { renderHook, act } from '@testing-library/react';

import { useSqlDatabase } from '@/hooks/useSqlDatabase';

jest.mock('sql.js', () => jest.fn());

jest.mock('@/utils/opfs', () => ({
  loadFromOPFS: jest.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
  opfsAvailable: jest.fn().mockResolvedValue(true),
  saveToOPFS: jest.fn().mockResolvedValue(undefined),
  listOPFSFiles: jest.fn().mockResolvedValue(['file1.db', 'file2.db']),
}));

const PRAGMA_RESULT = {
  columns: ['cid', 'name', 'type', 'notnull', 'dflt_value', 'pk'],
  values: [],
};

const mockInitSqlJs = require('sql.js') as jest.Mock;

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

describe('useSqlDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDbRun.mockReset();
    mockDbExec.mockReset();
    mockDbExport.mockReset().mockReturnValue(new Uint8Array([1, 2, 3]));
    mockDbClose.mockReset();
    mockInitSqlJs.mockReset().mockResolvedValue({
      Database: jest.fn().mockReturnValue(createMockDb()),
    });
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
    const { listOPFSFiles } = require('@/utils/opfs');
    expect(listOPFSFiles).toHaveBeenCalled();
  });

  it('openDb loads a database', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([
        { columns: ['name'], values: [['users'], ['orders']] },
      ])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[5]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
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

    mockDbExec
      .mockReturnValueOnce([
        { columns: ['name'], values: [['users'], ['orders']] },
      ])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[5]] }])
      .mockReturnValueOnce(PRAGMA_RESULT);

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

  it('selectTable is a no-op without a loaded database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    act(() => {
      result.current.selectTable('users');
    });
    expect(mockDbExec).not.toHaveBeenCalled();
  });

  it('selectTableWithInstance handles an empty table result', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    expect(result.current.queryResult).toEqual({ columns: [], rows: [] });
    expect(result.current.status).toContain('0 columns');
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
      .mockReturnValueOnce([
        { columns: ['name'], values: [['users'], ['orders']] },
      ])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[5]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
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
      .mockReturnValueOnce([
        { columns: ['name'], values: [['users'], ['orders']] },
      ])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[5]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([
        { columns: ['id', 'name'], values: [[1, 'Alice']] },
      ]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    await act(async () => {
      await result.current.handleSave();
    });

    const { saveToOPFS } = require('@/utils/opfs');
    expect(saveToOPFS).toHaveBeenCalledWith('test.db', expect.any(Uint8Array));
    expect(result.current.status).toContain('Saved to OPFS');
  });

  it('handleLoadOpfs loads from OPFS', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([
        { columns: ['id', 'name'], values: [[1, 'Alice']] },
      ]);

    await act(async () => {
      await result.current.handleLoadOpfs('test.db');
    });

    expect(result.current.dbFileName).toBe('test.db');
  });

  it('runQuery returns early without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    act(() => {
      result.current.runQuery('SELECT 1');
    });
    expect(result.current.status).toBe('Ready · No database loaded');
  });

  it('runQuery updates the result and status', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([
        { columns: ['id', 'name'], values: [[1, 'Alice']] },
      ]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockReturnValueOnce([{ columns: ['count'], values: [[3]] }]);
    act(() => {
      result.current.runQuery('SELECT count(*) FROM t');
    });

    expect(result.current.queryResult.columns).toEqual(['count']);
    expect(result.current.queryResult.rows).toEqual([[3]]);
    expect(result.current.activeTable).toBeNull();
    expect(result.current.status).toContain('Query · 1 rows · 1 columns');
  });

  it('runQuery handles an empty result', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([
        { columns: ['id', 'name'], values: [[1, 'Alice']] },
      ]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockReturnValueOnce([]);
    act(() => {
      result.current.runQuery('SELECT * FROM missing');
    });

    expect(result.current.queryResult.columns).toEqual([]);
    expect(result.current.queryResult.rows).toEqual([]);
  });

  it('runQuery surfaces query errors', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([
        { columns: ['id', 'name'], values: [[1, 'Alice']] },
      ]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockImplementationOnce(() => {
      throw new Error('syntax error');
    });
    act(() => {
      result.current.runQuery('SELECT bad sql');
    });

    expect(result.current.queryResult.columns).toEqual([]);
    expect(result.current.status).toBe('Query error: syntax error');
  });

  it('enumerateTables handles tables without PRAGMA columns', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce([])
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    expect(result.current.tables).toEqual([
      { name: 'users', rowCount: 10, columns: [] },
    ]);
  });

  it('enumerateTables falls back when COUNT fails', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockImplementationOnce(() => {
        throw new Error('readonly');
      })
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    expect(result.current.tables).toEqual([
      { name: 'users', rowCount: 0, columns: [] },
    ]);
  });

  it('enumerateTables maps column metadata', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce([
        {
          columns: ['cid', 'name', 'type', 'notnull', 'dflt_value', 'pk'],
          values: [
            [0, 'id', 'INTEGER', 1, null, 1],
            [1, 'name', 'TEXT', 0, null, 0],
            [2, 'meta', null, 0, null, 0],
          ],
        },
      ])
      .mockReturnValueOnce([
        { columns: ['id', 'name'], values: [[1, 'Alice']] },
      ]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    expect(result.current.tables[0].columns).toEqual([
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
      { name: 'name', type: 'TEXT', nullable: true, primaryKey: false },
      { name: 'meta', type: '', nullable: true, primaryKey: false },
    ]);
  });

  it('openDb handles a database with no tables', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec.mockReturnValueOnce([]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'empty.db');
    });

    expect(result.current.activeTable).toBeNull();
    expect(result.current.queryResult).toEqual({ columns: [], rows: [] });
    expect(result.current.status).toContain('Opened "empty.db"');
  });

  it('openDb logs when closing a previous database fails', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'first.db');
    });

    mockDbClose.mockImplementationOnce(() => {
      throw new Error('already closed');
    });
    mockDbExec.mockReturnValueOnce([]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'second.db');
    });

    expect(errorSpy).toHaveBeenCalledWith(
      '[useSqlDatabase] Error closing existing DB:',
      expect.any(Error)
    );
    errorSpy.mockRestore();
  });

  it('openDb surfaces init failures', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockInitSqlJs.mockRejectedValueOnce(new Error('wasm failed'));

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'bad.db');
    });

    expect(result.current.status).toBe('Error: wasm failed');
  });

  it('openDb surfaces non-Error init failures', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockInitSqlJs.mockRejectedValueOnce('wasm exploded');

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'bad.db');
    });

    expect(result.current.status).toBe('Error: wasm exploded');
  });

  it('selectTable surfaces query errors in the status', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockImplementationOnce(() => {
      throw new Error('no such table');
    });
    act(() => {
      result.current.selectTable('missing');
    });

    expect(result.current.status).toBe('Query error: no such table');
  });

  it('selectTable surfaces non-Error query failures', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockImplementationOnce(() => {
      throw 'boom';
    });
    act(() => {
      result.current.selectTable('missing');
    });

    expect(result.current.status).toBe('Query error: boom');
  });

  it('createNewDb logs when closing a previous database fails', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'first.db');
    });

    mockDbClose.mockImplementationOnce(() => {
      throw new Error('already closed');
    });
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

    expect(errorSpy).toHaveBeenCalledWith(
      '[useSqlDatabase] Error closing existing DB:',
      expect.any(Error)
    );
    errorSpy.mockRestore();
  });

  it('createNewDb surfaces init failures', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockInitSqlJs.mockRejectedValueOnce(new Error('wasm failed'));

    await act(async () => {
      await result.current.createNewDb();
    });

    expect(result.current.status).toBe('Error: wasm failed');
  });

  it('createNewDb surfaces non-Error init failures', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockInitSqlJs.mockRejectedValueOnce('wasm exploded');

    await act(async () => {
      await result.current.createNewDb();
    });

    expect(result.current.status).toBe('Error: wasm exploded');
  });

  it('handleSave returns early without a database', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    await act(async () => {
      await result.current.handleSave();
    });
    expect(result.current.status).toBe('Ready · No database loaded');
  });

  it('handleSave alerts when OPFS is unavailable', async () => {
    const alertSpy = jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { opfsAvailable } = require('@/utils/opfs');
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    opfsAvailable.mockResolvedValueOnce(false);
    await act(async () => {
      await result.current.handleSave();
    });

    expect(alertSpy).toHaveBeenCalledWith(
      'OPFS is not available. Use Chrome or Edge.'
    );
    alertSpy.mockRestore();
  });

  it('handleSave surfaces OPFS write errors', async () => {
    const { saveToOPFS } = require('@/utils/opfs');
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    saveToOPFS.mockRejectedValueOnce(new Error('quota exceeded'));
    await act(async () => {
      await result.current.handleSave();
    });

    expect(result.current.status).toBe('OPFS save error: quota exceeded');
  });

  it('handleSave surfaces non-Error OPFS write failures', async () => {
    const { saveToOPFS } = require('@/utils/opfs');
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    saveToOPFS.mockRejectedValueOnce('disk full');
    await act(async () => {
      await result.current.handleSave();
    });

    expect(result.current.status).toBe('OPFS save error: disk full');
  });

  it('handleLoadOpfs does nothing when the file is missing', async () => {
    const { loadFromOPFS } = require('@/utils/opfs');
    const { result } = renderHook(() => useSqlDatabase());
    loadFromOPFS.mockResolvedValueOnce(null);

    await act(async () => {
      await result.current.handleLoadOpfs('missing.db');
    });

    expect(result.current.dbFileName).toBeNull();
  });
});
