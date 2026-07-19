import { act, renderHook } from '@testing-library/react';

import { useDbPageActions } from '@/hooks/useDbPageActions';
import { useDbPageLayout } from '@/hooks/useDbPageLayout';
import { useDbPageQuery } from '@/hooks/useDbPageQuery';

jest.mock('@/lib/db', () => ({
  db: {
    history: {
      getAll: jest.fn().mockResolvedValue([]),
      put: jest.fn().mockResolvedValue(undefined),
    },
  },
}));

jest.mock('@/utils/format', () => ({
  copyToClipboard: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@/utils/sqlExport', () => ({
  convertToJSON: jest.fn(() => '{}'),
  convertToSQL: jest.fn(() => 'INSERT'),
}));

jest.mock('@/utils/sqlDump', () => ({
  downloadText: jest.fn(),
}));

const { db } = jest.requireMock('@/lib/db');
const { copyToClipboard } = jest.requireMock('@/utils/format');
const { convertToJSON, convertToSQL } = jest.requireMock('@/utils/sqlExport');
const { downloadText } = jest.requireMock('@/utils/sqlDump');

type St = Record<string, any>;

const makeState = (overrides: St = {}): St => {
  const state: St = {
    designerOpen: false,
    setDesignerOpen: jest.fn(),
    designingTable: null,
    setDesigningTable: jest.fn(),
    design: null,
    setDesign: jest.fn(),
    showExport: false,
    setShowExport: jest.fn(),
    showImport: false,
    setShowImport: jest.fn(),
    showViz: false,
    setShowViz: jest.fn(),
    tabs: [] as { id: string }[],
    activeTabId: null,
    history: [] as unknown[],
    panel: null,
    setPanel: jest.fn(),
    bookmarkOpen: false,
    bmName: '',
    bmFolder: '',
    bmNewFolder: '',
    extraFolders: [] as string[],
    sidebarWidth: 224,
    expandedTables: {},
    isDragging: false,
    sql: 'SELECT 1',
    setSql: jest.fn(),
  };
  state.setTabs = (u: unknown) => {
    state.tabs =
      typeof u === 'function'
        ? (u as (p: unknown[]) => unknown[])(state.tabs as never)
        : u;
  };
  state.setActiveTabId = (v: unknown) => {
    state.activeTabId = v;
  };
  state.setHistory = (u: unknown) => {
    state.history =
      typeof u === 'function'
        ? (u as (p: unknown[]) => unknown[])(state.history as never)
        : u;
  };
  state.setBookmarkOpen = (v: unknown) => {
    state.bookmarkOpen = v;
  };
  state.setBmName = (v: unknown) => {
    state.bmName = v;
  };
  state.setBmFolder = (v: unknown) => {
    state.bmFolder = v;
  };
  state.setBmNewFolder = (v: unknown) => {
    state.bmNewFolder = v;
  };
  state.setExtraFolders = (u: unknown) => {
    state.extraFolders =
      typeof u === 'function'
        ? (u as (p: string[]) => string[])(state.extraFolders as never)
        : u;
  };
  state.setSidebarWidth = (v: unknown) => {
    state.sidebarWidth = v;
  };
  state.setExpandedTables = (u: unknown) => {
    state.expandedTables =
      typeof u === 'function'
        ? (u as (p: St) => St)(state.expandedTables as never)
        : u;
  };
  state.setIsDragging = (v: unknown) => {
    state.isDragging = v;
  };
  Object.assign(state, overrides);
  return state;
};

const baseActionsArgs = (overrides: St = {}) => ({
  state: makeState() as never,
  activeTable: 'users',
  queryResult: {
    columns: ['id', 'name'],
    rows: [
      [1, 'Alice'],
      [2, 'Bob'],
    ],
  },
  tables: [],
  dbInstance: null,
  dbFileName: 'app.db',
  addToast: jest.fn(),
  updateCell: jest.fn(() => true),
  deleteRow: jest.fn(() => true),
  addRow: jest.fn(() => true),
  getTableDesign: jest.fn(() => null),
  createTableFromDesign: jest.fn(() => true),
  alterTableFromDesign: jest.fn(() => true),
  dumpSql: jest.fn(() => 'dump'),
  ...overrides,
});

describe('useDbPageActions', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns state-backed values', () => {
    const { result } = renderHook(() =>
      useDbPageActions(baseActionsArgs() as never)
    );
    expect(result.current.designerOpen).toBe(false);
    expect(result.current.showExport).toBe(false);
    expect(result.current.showViz).toBe(false);
    expect(result.current.designingTable).toBe(null);
  });

  it('adds a row and shows a toast', () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(baseActionsArgs({ addToast }) as never)
    );
    act(() => result.current.handleAddRow());
    expect(addToast).toHaveBeenCalledWith('Row added', 'success');
  });

  it('does nothing when addRow fails or no table is active', () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(
        baseActionsArgs({ addToast, addRow: jest.fn(() => false) }) as never
      )
    );
    act(() => result.current.handleAddRow());
    expect(addToast).not.toHaveBeenCalled();

    const noTable = renderHook(() =>
      useDbPageActions(
        baseActionsArgs({ addToast, activeTable: null }) as never
      )
    );
    act(() => noTable.result.current.handleAddRow());
    expect(addToast).not.toHaveBeenCalled();
  });

  it('updates a cell and toasts on success', () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(
        baseActionsArgs({ addToast, updateCell: jest.fn(() => true) }) as never
      )
    );
    act(() => result.current.handleUpdateCell(0, 1, 'x'));
    expect(addToast).toHaveBeenCalledWith('Updated name', 'success');
  });

  it('does not toast when the cell update fails', () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(
        baseActionsArgs({ addToast, updateCell: jest.fn(() => false) }) as never
      )
    );
    act(() => result.current.handleUpdateCell(0, 0, 'x'));
    expect(addToast).not.toHaveBeenCalled();
  });

  it('skips the update when no table is active', () => {
    const updateCell = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(
        baseActionsArgs({ updateCell, activeTable: null }) as never
      )
    );
    act(() => result.current.handleUpdateCell(0, 0, 'x'));
    expect(updateCell).not.toHaveBeenCalled();
  });

  it('deletes a row after confirm', () => {
    const addToast = jest.fn();
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    const { result } = renderHook(() =>
      useDbPageActions(baseActionsArgs({ addToast }) as never)
    );
    act(() => result.current.handleDeleteRow(0));
    expect(addToast).toHaveBeenCalledWith('Row deleted', 'success');
  });

  it('cancels row deletion when confirm is dismissed', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    const deleteRow = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(baseActionsArgs({ deleteRow }) as never)
    );
    act(() => result.current.handleDeleteRow(0));
    expect(deleteRow).not.toHaveBeenCalled();
  });

  it('does not toast when the row deletion fails', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(
        baseActionsArgs({ addToast, deleteRow: jest.fn(() => false) }) as never
      )
    );
    act(() => result.current.handleDeleteRow(0));
    expect(addToast).not.toHaveBeenCalled();
  });

  it('copies a query result row when no table is active', async () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(
        baseActionsArgs({ addToast, activeTable: null }) as never
      )
    );
    await act(() => result.current.handleCopyRow(0, 'json'));
    expect(convertToJSON).toHaveBeenCalledWith(['id', 'name'], [[1, 'Alice']]);
    expect(addToast).toHaveBeenCalledWith('Copied JSON', 'success');
  });

  it('skips deletion without an active table', () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(
        baseActionsArgs({ addToast, activeTable: null }) as never
      )
    );
    act(() => result.current.handleDeleteRow(0));
    expect(addToast).not.toHaveBeenCalled();
  });

  it('copies a row as SQL and as JSON', async () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(baseActionsArgs({ addToast }) as never)
    );
    await act(() => result.current.handleCopyRow(0, 'sql'));
    expect(convertToSQL).toHaveBeenCalled();
    expect(addToast).toHaveBeenCalledWith('Copied SQL INSERT', 'success');
    await act(() => result.current.handleCopyRow(0, 'json'));
    expect(convertToJSON).toHaveBeenCalled();
    expect(addToast).toHaveBeenCalledWith('Copied JSON', 'success');
    expect(copyToClipboard).toHaveBeenCalledTimes(2);
  });

  it('does nothing when copying a missing row', async () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(baseActionsArgs({ addToast }) as never)
    );
    await act(() => result.current.handleCopyRow(99, 'json'));
    expect(copyToClipboard).not.toHaveBeenCalled();
  });

  it('opens a new table designer', () => {
    const args = baseActionsArgs() as never;
    const { result } = renderHook(() => useDbPageActions(args));
    act(() => result.current.openNewTable());
    expect((args as St).state.setDesigningTable).toHaveBeenCalledWith(null);
    expect((args as St).state.setDesign).toHaveBeenCalledWith(null);
    expect((args as St).state.setDesignerOpen).toHaveBeenCalledWith(true);
  });

  it('opens the table designer for the active table', () => {
    const args = baseActionsArgs({
      getTableDesign: jest.fn(() => ({ name: 'users' })),
    }) as never;
    const { result } = renderHook(() => useDbPageActions(args));
    act(() => result.current.openEditTable());
    expect((args as St).state.setDesigningTable).toHaveBeenCalledWith('users');
    expect((args as St).state.setDesign).toHaveBeenCalledWith({
      name: 'users',
    });
    expect((args as St).state.setDesignerOpen).toHaveBeenCalledWith(true);
  });

  it('does nothing when editing with no active table', () => {
    const args = baseActionsArgs({ activeTable: null }) as never;
    const { result } = renderHook(() => useDbPageActions(args));
    act(() => result.current.openEditTable());
    expect((args as St).state.setDesignerOpen).not.toHaveBeenCalled();
  });

  it('creates a table from a design and toasts', () => {
    const addToast = jest.fn();
    const createTableFromDesign = jest.fn(() => true);
    const { result } = renderHook(() =>
      useDbPageActions(
        baseActionsArgs({ addToast, createTableFromDesign }) as never
      )
    );
    act(() => result.current.handleSaveDesign('orders', []));
    expect(createTableFromDesign).toHaveBeenCalledWith('orders', []);
    expect(addToast).toHaveBeenCalledWith('Created "orders"', 'success');
  });

  it('alters a table when editing an existing design', () => {
    const addToast = jest.fn();
    const alterTableFromDesign = jest.fn(() => true);
    const args = baseActionsArgs({
      addToast,
      alterTableFromDesign,
      state: makeState({
        designingTable: 'users',
        design: { name: 'users', columns: [{ name: 'id' }] },
      }),
    });
    const { result } = renderHook(() => useDbPageActions(args as never));
    act(() => result.current.handleSaveDesign('users', []));
    expect(alterTableFromDesign).toHaveBeenCalledWith(
      'users',
      [{ name: 'id' }],
      []
    );
    expect(addToast).toHaveBeenCalledWith('Updated "users"', 'success');
  });

  it('does not toast when the design save fails', () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(
        baseActionsArgs({
          addToast,
          createTableFromDesign: jest.fn(() => false),
        }) as never
      )
    );
    act(() => result.current.handleSaveDesign('orders', []));
    expect(addToast).not.toHaveBeenCalled();
  });

  it('uses an empty column list when editing without a saved design', () => {
    const addToast = jest.fn();
    const alterTableFromDesign = jest.fn(() => true);
    const args = baseActionsArgs({
      addToast,
      alterTableFromDesign,
      state: makeState({ designingTable: 'users' }),
    });
    const { result } = renderHook(() => useDbPageActions(args as never));
    act(() => result.current.handleSaveDesign('users', []));
    expect(alterTableFromDesign).toHaveBeenCalledWith('users', [], []);
  });

  it('exports SQL and downloads the dump', () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(baseActionsArgs({ addToast }) as never)
    );
    act(() => result.current.handleExportSql());
    expect(downloadText).toHaveBeenCalledWith('app.sql', 'dump');
    expect(addToast).toHaveBeenCalledWith('SQL dump exported', 'success');
  });

  it('does nothing when the dump returns null', () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(
        baseActionsArgs({ addToast, dumpSql: jest.fn(() => null) }) as never
      )
    );
    act(() => result.current.handleExportSql());
    expect(downloadText).not.toHaveBeenCalled();
  });

  it('falls back to a generic filename when the db name is unknown', () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageActions(baseActionsArgs({ addToast, dbFileName: null }) as never)
    );
    act(() => result.current.handleExportSql());
    expect(downloadText).toHaveBeenCalledWith('database.sql', 'dump');
  });

  it('opens the import dialog', () => {
    const args = baseActionsArgs() as never;
    const { result } = renderHook(() => useDbPageActions(args));
    act(() => result.current.openImport());
    expect((args as St).state.setShowImport).toHaveBeenCalledWith(true);
  });
});

describe('useDbPageQuery', () => {
  const makeQueryArgs = (overrides: St = {}) => {
    const state = makeState();
    return {
      state: state as never,
      dbInstance: {} as never,
      runQuery: jest.fn(() => ({
        ok: true,
        elapsedMs: 5,
        result: { columns: ['a'], rows: [[1]] },
      })),
      explainQuery: jest.fn(() => ({ columns: ['addr'], rows: [['x']] })),
      connectionId: 'c1',
      bookmarks: [
        { id: 'b1', name: 'B1', sql: 'SELECT 1', folder: 'f' },
        { id: 'b2', name: 'B2', sql: 'SELECT 2', folder: '' },
      ],
      addBookmark: jest.fn().mockResolvedValue(undefined),
      addToast: jest.fn(),
      ...overrides,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (db.history.getAll as jest.Mock).mockResolvedValue([
      { timestamp: 1 },
      { timestamp: 2 },
    ]);
  });

  it('loads and sorts history on mount', async () => {
    const args = makeQueryArgs() as never;
    const { result } = renderHook(() => useDbPageQuery(args));
    await act(async () => {
      await Promise.resolve();
    });
    expect(db.history.getAll).toHaveBeenCalled();
    expect((args as St).state.history).toEqual([
      { timestamp: 2 },
      { timestamp: 1 },
    ]);
    expect(result.current.activeTab).toBe(null);
    expect(result.current.folders).toEqual(['f']);
    expect(result.current.groupedBookmarks).toHaveLength(2);
  });

  it('ignores history load failures', async () => {
    const args = makeQueryArgs() as never;
    (db.history.getAll as jest.Mock).mockRejectedValueOnce(new Error('db'));
    renderHook(() => useDbPageQuery(args));
    await act(async () => {
      await Promise.resolve();
    });
    expect((args as St).state.history).toEqual([]);
  });

  it('groups bookmarks that share a folder and defaults missing folders', () => {
    const args = makeQueryArgs({
      bookmarks: [
        { id: 'b1', name: 'A', sql: 'SELECT 1', folder: 'f' },
        { id: 'b2', name: 'B', sql: 'SELECT 2', folder: 'f' },
        { id: 'b3', name: 'C', sql: 'SELECT 3' },
      ],
    }) as never;
    const { result } = renderHook(() => useDbPageQuery(args));
    expect(result.current.groupedBookmarks).toEqual([
      [
        'f',
        [
          { id: 'b1', name: 'A', sql: 'SELECT 1', folder: 'f' },
          { id: 'b2', name: 'B', sql: 'SELECT 2', folder: 'f' },
        ],
      ],
      ['', [{ id: 'b3', name: 'C', sql: 'SELECT 3' }]],
    ]);
  });

  it('executes a query and opens a result tab', async () => {
    const args = makeQueryArgs() as never;
    const { result, rerender } = renderHook(() => useDbPageQuery(args));
    act(() => result.current.handleExecute('SELECT 2'));
    rerender(args);
    expect(result.current.tabs).toHaveLength(1);
    expect(result.current.tabs[0].sql).toBe('SELECT 2');
    await act(async () => {
      await Promise.resolve();
    });
    expect(db.history.put).toHaveBeenCalled();
  });

  it('keeps executing when the history write fails', async () => {
    const args = makeQueryArgs() as never;
    const { result, rerender } = renderHook(() => useDbPageQuery(args));
    (db.history.put as jest.Mock).mockRejectedValueOnce(new Error('quota'));
    act(() => result.current.handleExecute('SELECT 2'));
    rerender(args);
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.tabs).toHaveLength(1);
    expect(db.history.put).toHaveBeenCalled();
  });

  it('uses the editor sql when no argument is passed', () => {
    const args = makeQueryArgs() as never;
    const { result, rerender } = renderHook(() => useDbPageQuery(args));
    act(() => result.current.handleExecute());
    rerender(args);
    expect(result.current.tabs).toHaveLength(1);
  });

  it('does nothing for empty or whitespace sql', () => {
    const { result } = renderHook(() =>
      useDbPageQuery(makeQueryArgs() as never)
    );
    act(() => result.current.handleExecute('   '));
    expect(result.current.tabs).toHaveLength(0);
  });

  it('shows an info toast when no database is loaded', () => {
    const addToast = jest.fn();
    const { result } = renderHook(() =>
      useDbPageQuery(makeQueryArgs({ dbInstance: null, addToast }) as never)
    );
    act(() => result.current.handleExecute('SELECT 1'));
    expect(addToast).toHaveBeenCalledWith(
      'Open or create a database first',
      'info'
    );
  });

  it('does not add a tab when the query fails', () => {
    const { result } = renderHook(() =>
      useDbPageQuery(
        makeQueryArgs({
          runQuery: jest.fn(() => ({
            ok: false,
            elapsedMs: 0,
            result: { columns: [], rows: [] },
          })),
        }) as never
      )
    );
    act(() => result.current.handleExecute('SELECT 1'));
    expect(result.current.tabs).toHaveLength(0);
  });

  it('explains a query and opens an explain tab', () => {
    const args = makeQueryArgs() as never;
    const { result, rerender } = renderHook(() => useDbPageQuery(args));
    act(() => result.current.handleExplain());
    rerender(args);
    expect(result.current.tabs).toHaveLength(1);
    expect(result.current.tabs[0].explain).toBe(true);
  });

  it('skips explain when there is no sql or database', () => {
    const noSqlArgs = makeQueryArgs({
      state: makeState({ sql: '' }),
    }) as never;
    const noSql = renderHook(() => useDbPageQuery(noSqlArgs));
    act(() => noSql.result.current.handleExplain());
    expect(noSql.result.current.tabs).toHaveLength(0);

    const noDb = renderHook(() =>
      useDbPageQuery(makeQueryArgs({ dbInstance: null }) as never)
    );
    act(() => noDb.result.current.handleExplain());
    expect(noDb.result.current.tabs).toHaveLength(0);
  });

  it('skips explain when the planner returns no result', () => {
    const { result } = renderHook(() =>
      useDbPageQuery(
        makeQueryArgs({ explainQuery: jest.fn(() => null) }) as never
      )
    );
    act(() => result.current.handleExplain());
    expect(result.current.tabs).toHaveLength(0);
  });

  it('closes a non-active tab and leaves the active tab', () => {
    const args = makeQueryArgs() as never;
    const { result, rerender } = renderHook(() => useDbPageQuery(args));
    act(() => result.current.handleExecute('SELECT 1'));
    rerender(args);
    act(() => result.current.handleExecute('SELECT 2'));
    rerender(args);
    act(() => result.current.setActiveTabId(result.current.tabs[0].id));
    rerender(args);
    const first = result.current.tabs[0].id;
    const second = result.current.tabs[1].id;
    act(() => result.current.closeTab(second));
    rerender(args);
    expect(result.current.tabs).toHaveLength(1);
    expect(result.current.activeTabId).toBe(first);
  });

  it('closes the active tab and falls back to a neighbor', () => {
    const args = makeQueryArgs() as never;
    const { result, rerender } = renderHook(() => useDbPageQuery(args));
    act(() => result.current.handleExecute('SELECT 1'));
    rerender(args);
    act(() => result.current.handleExecute('SELECT 2'));
    rerender(args);
    act(() => result.current.handleExecute('SELECT 3'));
    rerender(args);
    act(() => result.current.setActiveTabId(result.current.tabs[1].id));
    rerender(args);
    const [first, , third] = result.current.tabs.map((t) => t.id);
    act(() => result.current.closeTab(result.current.tabs[1].id));
    rerender(args);
    expect(result.current.activeTabId).toBe(third);
    act(() => result.current.closeTab(third));
    rerender(args);
    expect(result.current.activeTabId).toBe(first);
    act(() => result.current.closeTab(first));
    rerender(args);
    expect(result.current.activeTabId).toBe(null);
  });

  it('opens the bookmark dialog with the first sql line', () => {
    const args = makeQueryArgs() as never;
    const { result } = renderHook(() => useDbPageQuery(args));
    act(() => result.current.openBookmarkDialog());
    expect((args as St).state.bmName).toBe('SELECT 1');
    expect((args as St).state.bmNewFolder).toBe('');
    expect((args as St).state.bookmarkOpen).toBe(true);
  });

  it('saves a bookmark into a new folder', async () => {
    const args = makeQueryArgs() as never;
    const { result, rerender } = renderHook(() => useDbPageQuery(args));
    act(() => {
      result.current.setBmName('My Q');
      result.current.setBmNewFolder('work');
    });
    rerender(args);
    await act(() => result.current.handleSaveBookmark());
    expect((args as St).addBookmark).toHaveBeenCalledWith(
      'My Q',
      'SELECT 1',
      'work'
    );
    expect((args as St).state.extraFolders).toContain('work');
    expect((args as St).state.bookmarkOpen).toBe(false);
    expect((args as St).addToast).toHaveBeenCalledWith('Bookmarked', 'success');
  });

  it('saves a bookmark into an existing folder or no folder', async () => {
    const args = makeQueryArgs() as never;
    const { result, rerender } = renderHook(() => useDbPageQuery(args));
    act(() => {
      result.current.setBmName('   ');
      result.current.setBmFolder('f');
    });
    rerender(args);
    await act(() => result.current.handleSaveBookmark());
    expect((args as St).addBookmark).toHaveBeenCalledWith(
      'Bookmark',
      'SELECT 1',
      'f'
    );

    act(() => {
      result.current.setBmFolder('');
      result.current.setBmNewFolder('   ');
    });
    rerender(args);
    await act(() => result.current.handleSaveBookmark());
    expect((args as St).addBookmark).toHaveBeenCalledWith(
      'Bookmark',
      'SELECT 1',
      undefined
    );
  });
});

describe('useDbPageLayout', () => {
  const makeLayoutArgs = (overrides: St = {}) => {
    const state = makeState();
    return {
      state: state as never,
      onFile: jest.fn(),
      ...overrides,
    };
  };

  it('toggles table expansion', () => {
    const args = makeLayoutArgs() as never;
    const { result } = renderHook(() => useDbPageLayout(args));
    act(() => result.current.toggleTable('users'));
    expect((args as St).state.expandedTables).toEqual({ users: true });
    act(() => result.current.toggleTable('users'));
    expect((args as St).state.expandedTables).toEqual({ users: false });
  });

  it('resizes the sidebar within bounds', () => {
    const args = makeLayoutArgs() as never;
    const { result } = renderHook(() => useDbPageLayout(args));
    act(() =>
      result.current.startResize({
        preventDefault: jest.fn(),
        clientX: 100,
      } as never)
    );
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 300 }));
    });
    expect((args as St).state.sidebarWidth).toBe(424);
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 50 }));
      document.dispatchEvent(new MouseEvent('mouseup'));
    });
    expect((args as St).state.sidebarWidth).toBe(174);
  });

  it('handles drag over, leave, and drop with and without a file', () => {
    const args = makeLayoutArgs() as never;
    const { result } = renderHook(() => useDbPageLayout(args));
    act(() =>
      result.current.handleDragOver({
        preventDefault: jest.fn(),
        dataTransfer: { files: [] },
      } as never)
    );
    expect((args as St).state.isDragging).toBe(true);

    act(() => result.current.handleDragLeave());
    expect((args as St).state.isDragging).toBe(false);

    const file = new File([new Uint8Array([1])], 'a.db');
    act(() =>
      result.current.handleDrop({
        preventDefault: jest.fn(),
        dataTransfer: { files: [file] },
      } as never)
    );
    expect((args as St).onFile).toHaveBeenCalledWith(file);

    act(() =>
      result.current.handleDrop({
        preventDefault: jest.fn(),
        dataTransfer: { files: [] },
      } as never)
    );
    expect((args as St).onFile).toHaveBeenCalledTimes(1);
  });
});
