import { render, screen, fireEvent, within } from '@testing-library/react';
import HomePage from '@/app/page';
import type { DatabaseConnection } from '@/types';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    onClick,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
  }) => (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  ),
}));

jest.mock('react-icons/fi', () => ({
  FiPlus: () => <span data-testid="ico-plus" />,
  FiDatabase: () => <span data-testid="ico-database" />,
  FiTrash2: () => <span data-testid="ico-trash" />,
  FiSearch: () => <span data-testid="ico-search" />,
  FiEdit2: () => <span data-testid="ico-edit" />,
  FiBookOpen: () => <span data-testid="ico-book" />,
  FiDownload: () => <span data-testid="ico-download" />,
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

const { useData } = jest.requireMock('@/providers/DataProvider');

const conn: DatabaseConnection = {
  id: 'db-1',
  name: 'Production DB',
  filePath: '/data/production.db',
  size: 15728640,
  readOnly: true,
  lastConnected: Date.now() - 3600000,
  createdAt: Date.now(),
};

const conn2: DatabaseConnection = {
  ...conn,
  id: 'db-2',
  name: 'Dev DB',
  filePath: '/data/dev.db',
  readOnly: false,
};

describe('HomePage', () => {
  const mockCreate = jest.fn().mockResolvedValue(undefined);
  const mockUpdate = jest.fn().mockResolvedValue(undefined);
  const mockDelete = jest.fn().mockResolvedValue(undefined);
  const mockSetCurrent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useData.mockReturnValue({
      connections: [conn, conn2],
      createConnection: mockCreate,
      updateConnection: mockUpdate,
      deleteConnection: mockDelete,
      setCurrentConnection: mockSetCurrent,
      isLoading: false,
    });
  });

  it('renders the header', () => {
    render(<HomePage />);
    expect(screen.getByText('Database Manager')).toBeInTheDocument();
  });

  it('links to the Schema Library', () => {
    render(<HomePage />);
    const link = screen.getByRole('link', { name: /Schema Library/ });
    expect(link).toHaveAttribute('href', '/posts');
  });

  it('shows skeletons while loading', () => {
    useData.mockReturnValue({
      connections: [],
      createConnection: mockCreate,
      deleteConnection: mockDelete,
      setCurrentConnection: mockSetCurrent,
      isLoading: true,
    });
    const { container } = render(<HomePage />);
    expect(container.querySelector('.skeleton')).toBeInTheDocument();
  });

  it('renders connections and read-only badge', () => {
    render(<HomePage />);
    expect(screen.getByText('Production DB')).toBeInTheDocument();
    expect(screen.getByText('Dev DB')).toBeInTheDocument();
    expect(screen.getByText('Read Only')).toBeInTheDocument();
  });

  it('links to the db page and sets current connection', () => {
    render(<HomePage />);
    const link = screen.getByRole('link', { name: /Production DB/ });
    expect(link).toHaveAttribute('href', '/db?id=db-1');
    fireEvent.click(link);
    expect(mockSetCurrent).toHaveBeenCalledWith(conn);
  });

  it('filters connections by search', () => {
    render(<HomePage />);
    fireEvent.change(screen.getByPlaceholderText('Search connections...'), {
      target: { value: 'Dev' },
    });
    expect(screen.getByText('Dev DB')).toBeInTheDocument();
    expect(screen.queryByText('Production DB')).not.toBeInTheDocument();
  });

  it('shows empty state when no connections match', () => {
    render(<HomePage />);
    fireEvent.change(screen.getByPlaceholderText('Search connections...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No connections found')).toBeInTheDocument();
  });

  it('deletes a connection', () => {
    render(<HomePage />);
    const card = screen.getByRole('link', { name: /Production DB/ });
    fireEvent.click(
      within(card).getByRole('button', { name: 'Delete connection' })
    );
    expect(mockDelete).toHaveBeenCalledWith('db-1');
  });

  it('edits a connection from the modal', () => {
    render(<HomePage />);
    const card = screen.getByRole('link', { name: /Production DB/ });
    fireEvent.click(
      within(card).getByRole('button', { name: 'Edit connection' })
    );
    expect(screen.getAllByText('Edit Connection')).toHaveLength(1);
    const nameInput = screen.getByPlaceholderText('Connection name');
    expect(nameInput).toHaveValue('Production DB');
    fireEvent.change(nameInput, { target: { value: 'Prod DB v2' } });
    fireEvent.click(screen.getByText('Save'));
    expect(mockUpdate).toHaveBeenCalledWith('db-1', {
      name: 'Prod DB v2',
      filePath: '/data/production.db',
      readOnly: true,
    });
  });

  it('creates a connection from the modal', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: /New Connection/ }));
    expect(screen.getAllByText('New Connection')).toHaveLength(2);
    fireEvent.change(screen.getByPlaceholderText('Connection name'), {
      target: { value: '  Staging  ' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('File path (e.g., /data/mydb.db)'),
      {
        target: { value: '/data/staging.db' },
      }
    );
    fireEvent.click(screen.getAllByText('Read Only')[1]);
    fireEvent.click(screen.getByText('Create'));
    expect(mockCreate).toHaveBeenCalledWith(
      'Staging',
      '/data/staging.db',
      true
    );
  });

  it('does not create a connection when fields are empty', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: /New Connection/ }));
    fireEvent.click(screen.getByText('Create'));
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('cancels the modal', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: /New Connection/ }));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getAllByText('New Connection')).toHaveLength(1);
  });
});
