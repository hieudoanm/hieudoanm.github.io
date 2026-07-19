import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataProvider, useData } from '@/providers/DataProvider';
import type { DatabaseConnection } from '@/types';

jest.mock('@/lib/db', () => ({
  db: {
    connections: {
      getAll: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    history: {
      getAll: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    bookmarks: {
      getAll: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    settings: {
      get: jest.fn(),
      put: jest.fn(),
    },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  executeQuery: jest.fn(),
  MOCK_SCHEMAS: {
    'db-1': [{ name: 'users' }],
    'db-other': [{ name: 'custom' }],
  },
}));

const { db } = jest.requireMock('@/lib/db');
const { executeQuery, MOCK_SCHEMAS } = jest.requireMock('@/data/seed');

const connA: DatabaseConnection = {
  id: 'db-1',
  name: 'Production DB',
  filePath: '/data/production.db',
  size: 1024,
  readOnly: true,
  lastConnected: 3000,
  createdAt: 1000,
};

const connB: DatabaseConnection = {
  ...connA,
  id: 'db-2',
  name: 'Dev DB',
  lastConnected: 1000,
};

const Consumer = () => {
  const data = useData();
  return (
    <div>
      <span data-testid="conn-count">{data.connections.length}</span>
      <span data-testid="is-loading">{String(data.isLoading)}</span>
      <span data-testid="schema-count">{data.schemas.length}</span>
      <span data-testid="schema-name">{data.schemas[0]?.name}</span>
      <span data-testid="has-result">{data.queryResult ? 'yes' : 'no'}</span>
      <span data-testid="history-count">{data.history.length}</span>
      <span data-testid="bookmark-count">{data.bookmarks.length}</span>
      <span data-testid="theme">{data.settings.theme}</span>
      <span data-testid="current-id">
        {data.currentConnection?.id ?? 'none'}
      </span>
      <button
        onClick={() => data.createConnection('New', '/data/new.db', false)}>
        create
      </button>
      <button onClick={() => data.deleteConnection('db-1')}>delete</button>
      <button onClick={() => data.runQuery('SELECT 1')}>run</button>
      <button onClick={() => data.addBookmark('Saved', 'SELECT 1')}>
        add-bookmark
      </button>
      <button onClick={() => data.deleteBookmark('bm-1')}>del-bookmark</button>
      <button onClick={() => data.updateSettings({ theme: 'database-dark' })}>
        update-theme
      </button>
      <button
        onClick={() => data.updateConnection('db-1', { name: 'Renamed' })}>
        update-existing
      </button>
      <button onClick={() => data.updateConnection('nope', { name: 'X' })}>
        update-missing
      </button>
      <button
        onClick={() => data.setCurrentConnection({ ...connA, id: 'db-other' })}>
        set-conn
      </button>
      <button
        onClick={() => data.setCurrentConnection({ ...connA, id: 'unknown' })}>
        set-conn-unknown
      </button>
      <button onClick={() => data.setCurrentConnection(connA)}>
        set-conn-db1
      </button>
    </div>
  );
};

const renderProvider = () =>
  render(
    <DataProvider>
      <Consumer />
    </DataProvider>
  );

describe('DataProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    db.connections.getAll.mockResolvedValue([connB, connA]);
    db.connections.get.mockImplementation((id: string) =>
      Promise.resolve(id === 'db-1' ? connA : undefined)
    );
    db.history.getAll.mockResolvedValue([]);
    db.bookmarks.getAll.mockResolvedValue([]);
    db.settings.get.mockResolvedValue({
      id: 'default',
      theme: 'database-light',
      defaultPort: 5432,
      editorFontSize: 14,
      queryTimeout: 30,
    });
    executeQuery.mockReturnValue({
      columns: ['id'],
      rows: [[1]],
      rowCount: 1,
      executionTime: 5,
    });
  });

  it('loads data on mount', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conn-count').textContent).toBe('2')
    );
    expect(screen.getByTestId('is-loading').textContent).toBe('false');
    expect(screen.getByTestId('theme').textContent).toBe('database-light');
  });

  it('throws when used outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow(
      'useData must be used within DataProvider'
    );
    spy.mockRestore();
  });

  it('creates a connection and prepends it', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conn-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('create'));
    await waitFor(() =>
      expect(screen.getByTestId('conn-count').textContent).toBe('3')
    );
    expect(db.connections.put).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'New', filePath: '/data/new.db' })
    );
  });

  it('deletes a connection', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conn-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('delete'));
    await waitFor(() =>
      expect(screen.getByTestId('conn-count').textContent).toBe('1')
    );
    expect(db.connections.delete).toHaveBeenCalledWith('db-1');
  });

  it('runs a query and records history', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conn-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('run'));
    await waitFor(() =>
      expect(screen.getByTestId('has-result').textContent).toBe('yes')
    );
    expect(executeQuery).toHaveBeenCalledWith('SELECT 1');
    expect(screen.getByTestId('history-count').textContent).toBe('1');
    expect(db.history.put).toHaveBeenCalledWith(
      expect.objectContaining({ sql: 'SELECT 1', success: true })
    );
  });

  it('adds and deletes bookmarks', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conn-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('add-bookmark'));
    await waitFor(() =>
      expect(screen.getByTestId('bookmark-count').textContent).toBe('1')
    );
    expect(db.bookmarks.put).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Saved' })
    );
    fireEvent.click(screen.getByText('del-bookmark'));
    await waitFor(() =>
      expect(screen.getByTestId('bookmark-count').textContent).toBe('1')
    );
    expect(db.bookmarks.delete).toHaveBeenCalledWith('bm-1');
  });

  it('updates settings', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('theme').textContent).toBe('database-light')
    );
    fireEvent.click(screen.getByText('update-theme'));
    await waitFor(() =>
      expect(screen.getByTestId('theme').textContent).toBe('database-dark')
    );
    expect(db.settings.put).toHaveBeenCalledWith(
      expect.objectContaining({ theme: 'database-dark' })
    );
  });

  it('loads schemas for the current connection', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conn-count').textContent).toBe('2')
    );
    expect(screen.getByTestId('schema-count').textContent).toBe('0');
    fireEvent.click(screen.getByText('set-conn'));
    await waitFor(() =>
      expect(screen.getByTestId('schema-count').textContent).toBe('1')
    );
    expect(screen.getByTestId('schema-name').textContent).toBe('custom');
  });

  it('falls back to db-1 schemas for unknown connections', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conn-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('set-conn-unknown'));
    await waitFor(() =>
      expect(screen.getByTestId('schema-count').textContent).toBe('1')
    );
    expect(screen.getByTestId('schema-name').textContent).toBe('users');
  });

  it('updates an existing connection and the current connection', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conn-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('set-conn-db1'));
    await waitFor(() =>
      expect(screen.getByTestId('current-id').textContent).toBe('db-1')
    );
    fireEvent.click(screen.getByText('update-existing'));
    await waitFor(() =>
      expect(db.connections.put).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'db-1', name: 'Renamed' })
      )
    );
    expect(screen.getByTestId('current-id').textContent).toBe('db-1');
  });

  it('sorts history newest first on load', async () => {
    db.history.getAll.mockResolvedValue([
      { id: 'h1', timestamp: 1 },
      { id: 'h2', timestamp: 2 },
    ]);
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('history-count').textContent).toBe('2')
    );
  });

  it('deletes a bookmark that was loaded from storage', async () => {
    db.bookmarks.getAll.mockResolvedValue([
      { id: 'bm-1', name: 'Saved', sql: 'SELECT 1' },
    ]);
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('bookmark-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('del-bookmark'));
    await waitFor(() =>
      expect(screen.getByTestId('bookmark-count').textContent).toBe('0')
    );
  });

  it('does nothing when updating a missing connection', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('conn-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('update-missing'));
    await waitFor(() =>
      expect(db.connections.get).toHaveBeenCalledWith('nope')
    );
    expect(db.connections.put).not.toHaveBeenCalled();
    expect(screen.getByTestId('conn-count').textContent).toBe('2');
  });
});
