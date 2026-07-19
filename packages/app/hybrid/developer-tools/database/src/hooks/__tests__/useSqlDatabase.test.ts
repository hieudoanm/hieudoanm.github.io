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
    expect(result.current.error).toBe('syntax error');
    expect(result.current.status).toContain('Query error');
  });

  it('runQuery surfaces non-Error query failures', async () => {
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
      throw 'crash';
    });
    act(() => {
      result.current.runQuery('SELECT bad sql');
    });

    expect(result.current.error).toBe('crash');
    expect(result.current.status).toContain('Query error');
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

  it('refreshTable re-enumerates tables and reselects the active table', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([
        { columns: ['id', 'name'], values: [[1, 'Alice']] },
      ]);

    act(() => {
      result.current.refreshTable();
    });

    expect(result.current.tables).toHaveLength(1);
    expect(result.current.queryResult.columns).toEqual(['id', 'name']);
  });

  it('refreshTable is a no-op without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    act(() => {
      result.current.refreshTable();
    });
    expect(mockDbExec).not.toHaveBeenCalled();
  });

  it('runStatements returns early without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    expect(result.current.runStatements('SELECT 1')).toEqual([]);
  });

  it('runStatements splits and executes multiple statements', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['count'], values: [[1]] }])
      .mockReturnValueOnce([{ columns: ['count'], values: [[2]] }]);

    let results: { columns: string[]; rows: unknown[][] }[] = [];
    act(() => {
      results = result.current.runStatements('SELECT 1; SELECT 2');
    });

    expect(results).toHaveLength(2);
    expect(result.current.status).toContain('Executed 2 statements');
  });

  it('runStatements ignores semicolons inside quotes', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['count'], values: [[1]] }])
      .mockReturnValueOnce([{ columns: ['count'], values: [[2]] }]);

    act(() => {
      result.current.runStatements("SELECT 'a;b'; SELECT 2");
    });

    expect(result.current.status).toContain('Executed 2 statements');
  });

  it('runStatements skips empty statements', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockReturnValueOnce([{ columns: ['count'], values: [[1]] }]);

    act(() => {
      result.current.runStatements('SELECT 1;;');
    });

    expect(result.current.status).toContain('Executed 1 statement');
  });

  it('runStatements surfaces query errors', async () => {
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
      throw new Error('boom');
    });

    act(() => {
      result.current.runStatements('SELECT bad');
    });

    expect(result.current.error).toBe('boom');
    expect(result.current.status).toBe('Query error');
  });

  it('runStatements collects empty results for statements without result sets', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockReturnValueOnce([]);

    let results: { columns: string[]; rows: unknown[][] }[] = [];
    act(() => {
      results = result.current.runStatements('INSERT INTO users VALUES (1)');
    });

    expect(results).toEqual([{ columns: [], rows: [] }]);
    expect(result.current.status).toContain('Executed 1 statement');
  });

  it('runStatements surfaces non-Error failures', async () => {
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
      throw 'fatal';
    });

    act(() => {
      result.current.runStatements('SELECT bad');
    });

    expect(result.current.error).toBe('fatal');
    expect(result.current.status).toBe('Query error');
  });

  it('explainQuery returns null without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    expect(result.current.explainQuery('SELECT 1')).toBeNull();
  });

  it('explainQuery returns a query plan', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockReturnValueOnce([
      { columns: ['id', 'parent', 'detail'], values: [[2, 0, 'SCAN users']] },
    ]);

    const res = result.current.explainQuery('SELECT 1');
    expect(res).not.toBeNull();
    expect(res!.rows).toEqual([[2, 0, 'SCAN users']]);
  });

  it('explainQuery handles an empty result', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockReturnValueOnce([]);

    const res = result.current.explainQuery('SELECT 1');
    expect(res).toEqual({ columns: [], rows: [] });
  });

  it('explainQuery surfaces errors', async () => {
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
      throw new Error('explain boom');
    });

    let res: { columns: string[]; rows: unknown[][] } | null = null;
    act(() => {
      res = result.current.explainQuery('SELECT bad');
    });
    expect(res).toBeNull();
    expect(result.current.status).toBe('Explain error');
  });

  it('explainQuery surfaces non-Error failures', async () => {
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
      throw 'plan crash';
    });

    let res: { columns: string[]; rows: unknown[][] } | null = null;
    act(() => {
      res = result.current.explainQuery('SELECT bad');
    });
    expect(res).toBeNull();
    expect(result.current.status).toBe('Explain error');
  });

  it('updateCell returns false without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    expect(result.current.updateCell('users', 'name', 0, 'Bob')).toBe(false);
  });

  it('updateCell updates a row by rowid and reselects', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['rowid'], values: [[1]] }])
      .mockReturnValueOnce([{ columns: ['id', 'name'], values: [[1, 'Bob']] }]);

    let ok = false;
    act(() => {
      ok = result.current.updateCell('users', 'name', 0, 'Bob');
    });

    expect(ok).toBe(true);
    expect(mockDbRun).toHaveBeenCalledWith(
      'UPDATE "users" SET "name" = ? WHERE rowid = ?',
      ['Bob', 1]
    );
    expect(result.current.queryResult.rows).toEqual([[1, 'Bob']]);
  });

  it('updateCell returns false when the rowid is missing', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockReturnValueOnce([{ columns: ['rowid'], values: [] }]);

    let ok = true;
    act(() => {
      ok = result.current.updateCell('users', 'name', 99, 'Bob');
    });

    expect(ok).toBe(false);
  });

  it('updateCell surfaces update errors', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockReturnValueOnce([{ columns: ['rowid'], values: [[1]] }]);
    mockDbRun.mockImplementationOnce(() => {
      throw new Error('constraint failed');
    });

    let ok = true;
    act(() => {
      ok = result.current.updateCell('users', 'name', 0, 'Bob');
    });

    expect(ok).toBe(false);
    expect(result.current.error).toBe('constraint failed');
    expect(result.current.status).toBe('Update failed');
  });

  it('deleteRow returns false without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    expect(result.current.deleteRow('users', 0)).toBe(false);
  });

  it('deleteRow removes a row and reselects', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['rowid'], values: [[1]] }])
      .mockReturnValueOnce([{ columns: ['id', 'name'], values: [] }]);

    let ok = false;
    act(() => {
      ok = result.current.deleteRow('users', 0);
    });

    expect(ok).toBe(true);
    expect(mockDbRun).toHaveBeenCalledWith(
      'DELETE FROM "users" WHERE rowid = ?',
      [1]
    );
    expect(result.current.queryResult.rows).toEqual([]);
  });

  it('deleteRow surfaces delete errors', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockReturnValueOnce([{ columns: ['rowid'], values: [[1]] }]);
    mockDbRun.mockImplementationOnce(() => {
      throw new Error('cannot delete');
    });

    let ok = true;
    act(() => {
      ok = result.current.deleteRow('users', 0);
    });

    expect(ok).toBe(false);
    expect(result.current.error).toBe('cannot delete');
    expect(result.current.status).toBe('Delete failed');
  });

  it('addRow returns false without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    expect(result.current.addRow('users')).toBe(false);
  });

  it('addRow inserts a row and reselects', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockReturnValueOnce([
      { columns: ['id', 'name'], values: [[2, null]] },
    ]);

    let ok = false;
    act(() => {
      ok = result.current.addRow('users');
    });

    expect(ok).toBe(true);
    expect(mockDbRun).toHaveBeenCalledWith(
      'INSERT INTO "users" DEFAULT VALUES'
    );
    expect(result.current.queryResult.rows).toEqual([[2, null]]);
  });

  it('addRow falls back when DEFAULT VALUES fails', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec.mockReturnValueOnce([
      { columns: ['id', 'name'], values: [[3, null]] },
    ]);

    mockDbRun
      .mockImplementationOnce(() => {
        throw new Error('no default');
      })
      .mockReturnValueOnce(undefined);

    let ok = false;
    act(() => {
      ok = result.current.addRow('users');
    });

    expect(ok).toBe(true);
    expect(mockDbRun).toHaveBeenNthCalledWith(
      2,
      'INSERT INTO "users" VALUES (NULL)'
    );
  });

  it('addRow surfaces insert errors when both paths fail', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbRun.mockImplementation(() => {
      throw new Error('table locked');
    });

    let ok = true;
    act(() => {
      ok = result.current.addRow('users');
    });

    expect(ok).toBe(false);
    expect(result.current.error).toBe('table locked');
    expect(result.current.status).toBe('Insert failed');
  });

  it('importRows returns zeros without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    const onProgress = jest.fn();
    expect(
      result.current.importRows('users', ['id'], [[1]], onProgress)
    ).toEqual({ inserted: 0, failed: 0 });
  });

  it('importRows inserts rows in a transaction', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[12]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([
        {
          columns: ['id', 'name'],
          values: [
            [1, 'A'],
            [2, 'B'],
          ],
        },
      ]);

    const onProgress = jest.fn();
    let resultObj: { inserted: number; failed: number } | undefined;
    act(() => {
      resultObj = result.current.importRows(
        'users',
        ['id', 'name'],
        [
          [1, 'A'],
          [2, 'B'],
        ],
        onProgress
      );
    });

    expect(resultObj).toEqual({ inserted: 2, failed: 0 });
    expect(mockDbRun).toHaveBeenNthCalledWith(1, 'BEGIN');
    expect(mockDbRun).toHaveBeenNthCalledWith(
      3,
      'INSERT INTO "users" ("id", "name") VALUES (?, ?)',
      [2, 'B']
    );
    expect(mockDbRun).toHaveBeenLastCalledWith('COMMIT');
    expect(onProgress).toHaveBeenLastCalledWith(2, 2);
    expect(result.current.status).toContain('Imported 2 rows');
  });

  it('importRows counts failed rows and rolls back on error', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    mockDbRun.mockImplementationOnce(() => undefined);
    mockDbRun.mockImplementationOnce(() => {
      throw new Error('bad value');
    });

    const onProgress = jest.fn();
    let resultObj: { inserted: number; failed: number } | undefined;
    act(() => {
      resultObj = result.current.importRows(
        'users',
        ['id'],
        [[1], ['x']],
        onProgress
      );
    });

    expect(resultObj).toEqual({ inserted: 1, failed: 1 });
    expect(result.current.status).toContain('1 failed');
  });

  it('importRows rolls back when the transaction fails', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    mockDbRun.mockImplementationOnce(() => {
      throw new Error('database is locked');
    });

    let resultObj: { inserted: number; failed: number } | undefined;
    act(() => {
      resultObj = result.current.importRows('users', ['id'], [[1]], jest.fn());
    });

    expect(resultObj).toEqual({ inserted: 0, failed: 0 });
    expect(mockDbRun).toHaveBeenLastCalledWith('ROLLBACK');
    expect(result.current.status).toContain('Imported 0 rows');
  });

  it('importRowsAsync returns zeros without a database', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    await expect(
      result.current.importRowsAsync('users', ['id'], [[1]], jest.fn())
    ).resolves.toEqual({ inserted: 0, failed: 0 });
  });

  it('importRowsAsync inserts rows in batches with progress', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[501]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    const rows = Array.from({ length: 501 }, (_, i) => [i]);
    const onProgress = jest.fn();
    let res: { inserted: number; failed: number } | undefined;
    await act(async () => {
      res = await result.current.importRowsAsync(
        'users',
        ['id'],
        rows,
        onProgress
      );
    });

    expect(res).toEqual({ inserted: 501, failed: 0 });
    expect(onProgress).toHaveBeenNthCalledWith(1, 500, 501);
    expect(onProgress).toHaveBeenLastCalledWith(501, 501);
    const commits = mockDbRun.mock.calls.filter((c) => c[0] === 'COMMIT');
    expect(commits).toHaveLength(2);
    expect(result.current.status).toContain('Imported 501 rows');
  });

  it('importRowsAsync rolls back and reports progress on a failed batch', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    mockDbRun.mockImplementationOnce(() => {
      throw new Error('database is locked');
    });

    const onProgress = jest.fn();
    let res: { inserted: number; failed: number } | undefined;
    await act(async () => {
      res = await result.current.importRowsAsync(
        'users',
        ['id'],
        [[1], [2]],
        onProgress
      );
    });

    expect(res).toEqual({ inserted: 0, failed: 0 });
    expect(mockDbRun).toHaveBeenLastCalledWith('ROLLBACK');
    expect(onProgress).toHaveBeenLastCalledWith(2, 2);
  });

  it('applySchemaChange returns false without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    expect(result.current.applySchemaChange(['DROP TABLE users'])).toBe(false);
  });

  it('applySchemaChange executes statements and refreshes tables', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([])
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    let ok = false;
    act(() => {
      ok = result.current.applySchemaChange(['CREATE INDEX idx ON users (id)']);
    });

    expect(ok).toBe(true);
    expect(mockDbExec).toHaveBeenCalledWith('CREATE INDEX idx ON users (id)');
    expect(result.current.status).toContain('Applied 1 schema change');
  });

  it('applySchemaChange surfaces failures', async () => {
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
      throw new Error('syntax error');
    });

    let ok = true;
    act(() => {
      ok = result.current.applySchemaChange(['CREATE INDEX idx ON users (']);
    });

    expect(ok).toBe(false);
    expect(result.current.status).toBe('Schema change failed');
  });

  it('createTableFromDesign builds and applies DDL', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([])
      .mockReturnValueOnce([
        { columns: ['name'], values: [['users'], ['logs']] },
      ])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[0]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    let ok = false;
    act(() => {
      ok = result.current.createTableFromDesign('logs', [
        {
          name: 'id',
          type: 'INTEGER',
          nullable: false,
          primaryKey: true,
          unique: false,
          defaultValue: '',
          fkTable: '',
          fkColumn: '',
        },
        {
          name: 'msg',
          type: 'TEXT',
          nullable: true,
          primaryKey: false,
          unique: false,
          defaultValue: '',
          fkTable: '',
          fkColumn: '',
        },
      ]);
    });

    expect(ok).toBe(true);
    expect(mockDbExec).toHaveBeenCalledWith(
      expect.stringContaining('CREATE TABLE "logs"')
    );
  });

  it('alterTableFromDesign builds and applies ALTER statements', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([])
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    const designColumn = (name: string) => ({
      name,
      type: 'TEXT',
      nullable: true,
      primaryKey: false,
      unique: false,
      defaultValue: '',
      fkTable: '',
      fkColumn: '',
    });

    let ok = false;
    act(() => {
      ok = result.current.alterTableFromDesign(
        'users',
        [designColumn('old_name')],
        [designColumn('new_name')]
      );
    });

    expect(ok).toBe(true);
    expect(mockDbExec).toHaveBeenCalledWith(
      'ALTER TABLE "users" RENAME COLUMN "old_name" TO "new_name";'
    );
    expect(result.current.status).toContain('Applied 1 schema change');
  });

  it('getTableDesign returns null without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    expect(result.current.getTableDesign('users')).toBeNull();
  });

  it('getTableDesign reads table metadata', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([
        {
          columns: ['cid', 'name', 'type', 'notnull', 'dflt_value', 'pk'],
          values: [[0, 'id', 'INTEGER', 1, null, 1]],
        },
      ])
      .mockReturnValueOnce([])
      .mockReturnValueOnce([]);

    const design = result.current.getTableDesign('users');
    expect(design).not.toBeNull();
    expect(design!.name).toBe('users');
    expect(design!.columns).toHaveLength(1);
    expect(design!.columns[0].name).toBe('id');
    expect(design!.columns[0].primaryKey).toBe(true);
  });

  it('getStats returns null without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    expect(result.current.getStats()).toBeNull();
  });

  it('getStats computes database statistics', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['page_size'], values: [[4096]] }])
      .mockReturnValueOnce([{ columns: ['page_count'], values: [[10]] }])
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[0]] }])
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[0]] }]);

    const stats = result.current.getStats();
    expect(stats).not.toBeNull();
    expect(stats!.pageSize).toBe(4096);
    expect(stats!.pageCount).toBe(10);
    expect(stats!.totalBytes).toBe(40960);
    expect(stats!.tableCount).toBe(1);
    expect(stats!.tables[0].name).toBe('users');
  });

  it('getIndexUsage returns an empty array without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    expect(result.current.getIndexUsage()).toEqual([]);
  });

  it('getIndexUsage lists non-primary indexes', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([
        {
          columns: ['seq', 'name', 'unique', 'origin', 'partial'],
          values: [[0, 'idx_users_name', 0, 'c', 0]],
        },
      ]);

    const usage = result.current.getIndexUsage();
    expect(usage).toHaveLength(1);
    expect(usage[0].name).toBe('idx_users_name');
    expect(usage[0].table).toBe('users');
  });

  it('getErModel returns null without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    expect(result.current.getErModel()).toBeNull();
  });

  it('getErModel builds a layout model', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([
        {
          columns: ['cid', 'name', 'type', 'notnull', 'dflt_value', 'pk'],
          values: [[0, 'id', 'INTEGER', 1, null, 1]],
        },
      ])
      .mockReturnValueOnce([])
      .mockReturnValueOnce([]);

    const model = result.current.getErModel();
    expect(model).not.toBeNull();
    expect(model!.tables).toHaveLength(1);
    expect(model!.tables[0].name).toBe('users');
    expect(model!.tables[0].x).toBeGreaterThanOrEqual(0);
  });

  it('dumpSql returns null without a database', () => {
    const { result } = renderHook(() => useSqlDatabase());
    expect(result.current.dumpSql()).toBeNull();
  });

  it('dumpSql dumps the database schema and data', async () => {
    const { result } = renderHook(() => useSqlDatabase());
    mockDbExec
      .mockReturnValueOnce([{ columns: ['name'], values: [['users']] }])
      .mockReturnValueOnce([{ columns: ['COUNT(*)'], values: [[10]] }])
      .mockReturnValueOnce(PRAGMA_RESULT)
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    await act(async () => {
      await result.current.openDb(new Uint8Array([1, 2, 3]), 'test.db');
    });

    mockDbExec
      .mockReturnValueOnce([
        {
          columns: ['type', 'name', 'sql'],
          values: [['table', 'users', 'CREATE TABLE users (id INTEGER)']],
        },
      ])
      .mockReturnValueOnce([{ columns: ['id'], values: [[1]] }]);

    const dump = result.current.dumpSql();
    expect(dump).not.toBeNull();
    expect(dump!).toContain('BEGIN TRANSACTION');
    expect(dump!).toContain('CREATE TABLE users (id INTEGER);');
    expect(dump!).toContain('COMMIT');
  });
});
