import { render, fireEvent, screen, act } from '@testing-library/react';
import { SheetsModal } from '../SheetsModal';

jest.mock('../SheetsModal/hooks/useSqlDatabase', () => ({
  useSqlDatabase: jest.fn(),
}));

jest.mock('@hieudoanm.github.io/components/atoms/FullScreen', () => ({
  FullScreen: ({ children, onClose, title }: any) => (
    <div>
      <div>{title}</div>
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  ),
}));

let mockSetShowExport: jest.Mock;

jest.mock('../SheetsModal/components/ExportModal', () => ({
  ExportModal: ({ onClose: closeExport }: any) => {
    return (
      <div data-testid="export-modal">
        Export Modal
        <button onClick={closeExport}>Close Export</button>
      </div>
    );
  },
}));

jest.mock('../SheetsModal/components/EmptyState', () => ({
  EmptyState: ({ onOpen, onNewDb }: any) => (
    <div data-testid="empty-state">
      <span>No database loaded</span>
      <button onClick={onOpen} data-testid="empty-open">
        Open file
      </button>
      <button onClick={onNewDb} data-testid="empty-newdb">
        Try demo DB
      </button>
    </div>
  ),
}));

jest.mock('../SheetsModal/components/DataView', () => ({
  DataView: ({
    onSearch,
    onSort,
    onExport,
    onPrevPage,
    onNextPage,
    search,
    sortCol,
    sortDir,
    page,
    totalPages,
    activeTable,
  }: any) => (
    <div data-testid="data-view">
      <span data-testid="dataview-table">{activeTable}</span>
      <span data-testid="dataview-search">{search}</span>
      <span data-testid="dataview-page">{page}</span>
      <span data-testid="dataview-totalpages">{totalPages}</span>
      <span data-testid="dataview-sortcol">{sortCol}</span>
      <span data-testid="dataview-sortdir">{sortDir}</span>
      <input
        data-testid="search-input"
        value={search}
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

jest.mock('../SheetsModal/components/Sidebar', () => ({
  Sidebar: ({ tables, activeTable, onSelectTable }: any) => (
    <div data-testid="sidebar">
      <span>Tables: {tables.length}</span>
      <span>Active: {activeTable}</span>
      {tables.map((t: any) => (
        <button key={t.name} onClick={() => onSelectTable(t.name)}>
          {t.name}
        </button>
      ))}
    </div>
  ),
}));

jest.mock('../SheetsModal/components/Topbar', () => ({
  Topbar: ({
    loading,
    dbFileName,
    opfsFiles,
    dbInstance,
    onOpen,
    onNewDb,
    onLoadOpfs,
    onSave,
    onExport,
  }: any) => (
    <div data-testid="topbar">
      <span>Topbar</span>
      <span>loading: {String(loading)}</span>
      <span>dbFileName: {dbFileName || 'null'}</span>
      <span>opfsFiles: {opfsFiles.length}</span>
      <span>dbInstance: {String(dbInstance)}</span>
      <button onClick={onOpen}>Open</button>
      <button onClick={onNewDb} data-testid="topbar-newdb">
        New DB
      </button>
      <button onClick={onSave}>Save</button>
      <button onClick={onExport}>Export</button>
    </div>
  ),
}));

const { useSqlDatabase } = jest.requireMock(
  '../SheetsModal/hooks/useSqlDatabase'
);

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
  handleSave: jest.fn(),
  handleLoadOpfs: jest.fn(),
  handleExport: jest.fn(),
};

const dbLoadedState = {
  ...defaultDbState,
  dbInstance: { exec: jest.fn(), export: jest.fn(), close: jest.fn() },
  dbFileName: 'test.db',
  tables: [
    { name: 'users', rowCount: 10 },
    { name: 'orders', rowCount: 5 },
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
  openDb: jest.fn(),
  createNewDb: jest.fn(),
  selectTable: jest.fn(),
  handleSave: jest.fn(),
  handleLoadOpfs: jest.fn(),
  handleExport: jest.fn(),
};

describe('SheetsModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSqlDatabase.mockReturnValue(defaultDbState);
  });

  it('renders modal title', () => {
    render(<SheetsModal onClose={onClose} />);
    expect(screen.getAllByText('Sheets')[0]).toBeInTheDocument();
  });

  it('shows empty state when no db', () => {
    render(<SheetsModal onClose={onClose} />);
    expect(
      screen.getAllByText('No database loaded').length
    ).toBeGreaterThanOrEqual(1);
  });

  it('calls createNewDb from empty state', () => {
    render(<SheetsModal onClose={onClose} />);
    fireEvent.click(screen.getByTestId('empty-newdb'));
    expect(defaultDbState.createNewDb).toHaveBeenCalled();
  });

  it('shows data view when db is loaded', () => {
    useSqlDatabase.mockReturnValue(dbLoadedState);
    render(<SheetsModal onClose={onClose} />);
    expect(screen.getByTestId('data-view')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('shows status text in footer', () => {
    useSqlDatabase.mockReturnValue(dbLoadedState);
    render(<SheetsModal onClose={onClose} />);
    expect(
      screen.getByText('"users" · 2 rows · 2 columns')
    ).toBeInTheDocument();
  });

  it('shows SQLite WASM text in footer', () => {
    render(<SheetsModal onClose={onClose} />);
    expect(screen.getByText('SQLite WASM · OPFS')).toBeInTheDocument();
  });

  it('handles drag over events', () => {
    render(<SheetsModal onClose={onClose} />);
    const container = document.querySelector('[class*="overflow-hidden"]')!;
    fireEvent.dragOver(container);
  });

  it('shows export modal when showExport is true', () => {
    useSqlDatabase.mockReturnValue({
      ...dbLoadedState,
      queryResult: { columns: ['id', 'name'], rows: [[1, 'Alice']] },
    });
    render(<SheetsModal onClose={onClose} />);
    fireEvent.click(screen.getByTestId('btn-export'));
    expect(screen.getByTestId('export-modal')).toBeInTheDocument();
  });

  it('closes export modal', () => {
    useSqlDatabase.mockReturnValue({
      ...dbLoadedState,
      queryResult: { columns: ['id', 'name'], rows: [[1, 'Alice']] },
    });
    render(<SheetsModal onClose={onClose} />);
    fireEvent.click(screen.getByTestId('btn-export'));
    expect(screen.getByTestId('export-modal')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close Export'));
    expect(screen.queryByTestId('export-modal')).not.toBeInTheDocument();
  });

  it('shows sorting column and direction in DataView', () => {
    useSqlDatabase.mockReturnValue(dbLoadedState);
    render(<SheetsModal onClose={onClose} />);
    fireEvent.click(screen.getByTestId('btn-sort'));
    expect(screen.getByTestId('dataview-sortcol').textContent).toBe('1');
    expect(screen.getByTestId('dataview-sortdir').textContent).toBe('1');
    fireEvent.click(screen.getByTestId('btn-sort'));
    expect(screen.getByTestId('dataview-sortdir').textContent).toBe('-1');
  });

  it('resets page to 0 on search', () => {
    useSqlDatabase.mockReturnValue({ ...dbLoadedState });
    render(<SheetsModal onClose={onClose} />);
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(screen.getByTestId('dataview-page').textContent).toBe('0');
  });
});
