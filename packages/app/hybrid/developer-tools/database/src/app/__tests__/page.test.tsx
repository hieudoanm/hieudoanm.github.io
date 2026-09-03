import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: () => ({
    connections: [],
    createConnection: jest.fn(),
    updateConnection: jest.fn(),
    deleteConnection: jest.fn(),
    setCurrentConnection: jest.fn(),
    isLoading: false,
  }),
}));

jest.mock('@/lib/examples', () => ({
  listExamples: jest.fn(() => Promise.resolve([])),
}));

jest.mock('@/utils/format', () => ({
  formatRelativeTime: jest.fn(() => 'just now'),
  formatFileSize: jest.fn(() => '0 B'),
}));

jest.mock('@/components/molecules/ConnectionModal', () => ({
  ConnectionModal: () => <div data-testid="modal">Modal</div>,
}));

jest.mock('react-icons/fi', () => ({
  FiPlus: () => null,
  FiDatabase: () => null,
  FiTrash2: () => null,
  FiEdit2: () => null,
  FiSearch: () => null,
  FiBookOpen: () => null,
  FiDownload: () => null,
}));

describe('HomePage', () => {
  it('renders the database manager heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Database Manager')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(<HomePage />);
    expect(screen.getByPlaceholderText('Search connections...')).toBeInTheDocument();
  });

  it('renders new connection button', () => {
    render(<HomePage />);
    expect(screen.getByText('New Connection')).toBeInTheDocument();
  });

  it('shows no connections message when list is empty', () => {
    render(<HomePage />);
    expect(screen.getByText('No connections found')).toBeInTheDocument();
  });
});
