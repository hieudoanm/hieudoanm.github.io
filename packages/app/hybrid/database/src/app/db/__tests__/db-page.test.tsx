import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import DBPage from '@/app/db/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
  useSearchParams: () => new URLSearchParams(''),
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

const mockAddToast = jest.fn();
jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ addToast: mockAddToast }),
}));

jest.mock('@/hooks/useSqlDatabase', () => ({
  useSqlDatabase: jest.fn(),
}));

jest.mock('@/utils/format', () => ({
  copyToClipboard: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@/components/molecules/SheetsToolbar', () => ({
  SheetsToolbar: ({ onOpen, onNewDb, onSave, onExport }: any) => (
    <div data-testid="toolbar">
      <button data-testid="tb-open" onClick={onOpen}>
        Open
      </button>
      <button data-testid="tb-newdb" onClick={onNewDb}>
        New DB
      </button>
      <button data-testid="tb-save" onClick={onSave}>
        Save
      </button>
      <button data-testid="tb-export" onClick={onExport}>
        Export
      </button>
    </div>
  ),
}));

jest.mock('@/components/molecules/SheetsSidebar', () => ({
  SheetsSidebar: ({ tables, activeTable, onSelectTable }: any) => (
    <div data-testid="sidebar">
      <span data-testid="sidebar-active">{activeTable}</span>
      <span>Tables: {tables.length}</span>
      {tables.map((t: any) => (
        <button
          key={t.name}
          data-testid={`table-${t.name}`}
          onClick={() => onSelectTable(t.name)}>
          {t.name}
        </button>
      ))}
    </div>
  ),
}));

jest.mock('@/components/molecules/DataView', () => ({
  DataView: ({
    activeTable,
    onSearch,
    onSort,
    onExport,
    onPrevPage,
    onNextPage,
    page,
    sortCol,
    sortDir,
    totalPages,
  }: any) => (
    <div data-testid="data-view">
      <span data-testid="dv-table">{activeTable}</span>
      <span data-testid="dv-page">{page}</span>
      <span data-testid="dv-sortcol">{sortCol}</span>
      <span data-testid="dv-sortdir">{sortDir}</span>
      <span data-testid="dv-totalpages">{totalPages}</span>
      <input
        data-testid="search-input"
        onChange={(e: any) => onSearch(e.target.value)}
      />
      <button data-testid="btn-sort" onClick={() => onSort(1)}>
        Sort
      </button>
      <button data-testid="btn-export" onClick={onExport}>
        Export
      </button>
      <button data-testid="btn-prev" onClick={onPrevPage}>
        Prev
      </button>
      <button data-testid="btn-next" onClick={onNextPage}>
        Next
      </button>
    </div>
  ),
}));

jest.mock('@/components/molecules/EmptyState', () => ({
  EmptyState: ({ onOpen, onNewDb }: any) => (
    <div data-testid="empty-state">
      <span>No database loaded</span>
      <button data-testid="empty-open" onClick={onOpen}>
        Open file
      </button>
      <button data-testid="empty-newdb" onClick={onNewDb}>
        Try demo DB
      </button>
    </div>
  ),
}));

jest.mock('@/components/molecules/ExportModal', () => ({
  ExportModal: ({ onClose }: any) => (
    <div data-testid="export-modal">
      Export Modal
      <button data-testid="close-export" onClick={onClose}>
        Close Export
      </button>
    </div>
  ),
}));

const { useSqlDatabase } = jest.requireMock('@/hooks/useSqlDatabase');
const { useData } = jest.requireMock('@/providers/DataProvider');
const { copyToClipboard } = jest.requireMock('@/utils/format');

const defaultDbState = {
  dbInstance: null,
  dbFileName: null,
  tables: [],
  activeTable: null,
  queryResult: { columns: [], rows: [] },
  loading: false,
  loadingMsg: '',
  status: 'No database loaded',
  opfsFiles: [],
  openDb: jest.fn(),
  createNewDb: jest.fn(),
  selectTable: jest.fn(),
  runQuery: jest.fn(),
  setActiveTable: jest.fn(),
  setQueryResult: jest.fn(),
  handleSave: jest.fn(),
  handleLoadOpfs: jest.fn(),
  handleExport: jest.fn(),
};

const dbLoadedState = {
  ...defaultDbState,
  dbInstance: { exec: jest.fn(), export: jest.fn(), close: jest.fn() },
  dbFileName: 'test.db',
  tables: [
    { name: 'users', rowCount: 10, columns: [] },
    { name: 'orders', rowCount: 5, columns: [] },
  ],
  activeTable: 'users',
  queryResult: {
    columns: ['id', 'name'],
    rows: [
      [1, 'Alice'],
      [2, 'Bob'],
    ],
  },
  status: '"users" · 2 rows · 2 columns',
};

describe('DB page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSqlDatabase.mockReturnValue(defaultDbState);
    useData.mockReturnValue({
      connections: [],
      currentConnection: null,
      setCurrentConnection: jest.fn(),
      addBookmark: jest.fn(),
      isLoading: false,
    });
  });

  it('renders page title', () => {
    render(<DBPage />);
    expect(screen.getByText('Database')).toBeInTheDocument();
  });

  it('shows empty state when no db', () => {
    render(<DBPage />);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(
      screen.getAllByText('No database loaded').length
    ).toBeGreaterThanOrEqual(1);
  });

  it('calls createNewDb from empty state', () => {
    render(<DBPage />);
    fireEvent.click(screen.getByTestId('empty-newdb'));
    expect(defaultDbState.createNewDb).toHaveBeenCalled();
  });

  it('opens a file from the file input', async () => {
    const openDb = jest.fn();
    useSqlDatabase.mockReturnValue({ ...defaultDbState, openDb });
    render(<DBPage />);
    const input = document.querySelector('input[type="file"]')!;
    fireEvent.change(input, {
      target: { files: [new File([new Uint8Array([1, 2, 3])], 'sample.db')] },
    });
    await waitFor(() => expect(openDb).toHaveBeenCalledTimes(1));
    expect(openDb.mock.calls[0][0]).toBeInstanceOf(Uint8Array);
    expect(openDb.mock.calls[0][1]).toBe('sample.db');
  });

  it('shows data view when db is loaded', () => {
    useSqlDatabase.mockReturnValue(dbLoadedState);
    render(<DBPage />);
    expect(screen.getByTestId('data-view')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('shows status text in footer', () => {
    useSqlDatabase.mockReturnValue(dbLoadedState);
    render(<DBPage />);
    expect(
      screen.getByText('"users" · 2 rows · 2 columns')
    ).toBeInTheDocument();
  });

  it('shows SQLite WASM text in footer', () => {
    render(<DBPage />);
    expect(screen.getByText('SQLite WASM · OPFS')).toBeInTheDocument();
  });

  it('handles drag over events', () => {
    render(<DBPage />);
    const container = document.querySelector('[class*="overflow-hidden"]')!;
    fireEvent.dragOver(container);
  });

  it('shows export modal when export requested', () => {
    useSqlDatabase.mockReturnValue(dbLoadedState);
    render(<DBPage />);
    fireEvent.click(screen.getByTestId('btn-export'));
    expect(screen.getByTestId('export-modal')).toBeInTheDocument();
  });

  it('closes export modal', () => {
    useSqlDatabase.mockReturnValue(dbLoadedState);
    render(<DBPage />);
    fireEvent.click(screen.getByTestId('btn-export'));
    expect(screen.getByTestId('export-modal')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('close-export'));
    expect(screen.queryByTestId('export-modal')).not.toBeInTheDocument();
  });

  it('shows sorting column and direction in DataView', () => {
    useSqlDatabase.mockReturnValue(dbLoadedState);
    render(<DBPage />);
    fireEvent.click(screen.getByTestId('btn-sort'));
    expect(screen.getByTestId('dv-sortcol').textContent).toBe('1');
    expect(screen.getByTestId('dv-sortdir').textContent).toBe('1');
    fireEvent.click(screen.getByTestId('btn-sort'));
    expect(screen.getByTestId('dv-sortdir').textContent).toBe('-1');
  });

  it('resets page to 0 on search', () => {
    useSqlDatabase.mockReturnValue({ ...dbLoadedState });
    render(<DBPage />);
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(screen.getByTestId('dv-page').textContent).toBe('0');
  });

  it('selects a table from the sidebar', () => {
    useSqlDatabase.mockReturnValue(dbLoadedState);
    render(<DBPage />);
    fireEvent.click(screen.getByTestId('table-orders'));
    expect(dbLoadedState.selectTable).toHaveBeenCalledWith('orders');
  });

  it('calls runQuery when Execute clicked with db loaded', () => {
    useSqlDatabase.mockReturnValue(dbLoadedState);
    render(<DBPage />);
    const textarea = screen.getByPlaceholderText('Enter SQL query...');
    fireEvent.change(textarea, { target: { value: 'SELECT 1' } });
    fireEvent.click(screen.getByRole('button', { name: 'Execute' }));
    expect(dbLoadedState.runQuery).toHaveBeenCalledWith('SELECT 1');
  });

  it('shows toast when executing without db', () => {
    render(<DBPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Execute' }));
    expect(mockAddToast).toHaveBeenCalledWith(
      'Open or create a database first',
      'info'
    );
  });

  it('copies result to clipboard', async () => {
    useSqlDatabase.mockReturnValue(dbLoadedState);
    render(<DBPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy result' }));
    expect(copyToClipboard).toHaveBeenCalledWith(
      JSON.stringify(dbLoadedState.queryResult.rows, null, 2)
    );
  });

  it('bookmarks the query', () => {
    const addBookmark = jest.fn();
    useData.mockReturnValue({
      connections: [],
      currentConnection: null,
      setCurrentConnection: jest.fn(),
      addBookmark,
      isLoading: false,
    });
    useSqlDatabase.mockReturnValue(dbLoadedState);
    render(<DBPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Bookmark query' }));
    expect(addBookmark).toHaveBeenCalled();
  });
});
