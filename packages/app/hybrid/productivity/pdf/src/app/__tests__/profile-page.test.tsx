import { render, screen } from '@testing-library/react';
import Profile from '@/app/profile/page';
import type { PDFDocument } from '@/types';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

jest.mock('react-icons/fi', () => ({
  FiArrowLeft: () => <span data-testid="arrow-left" />,
  FiUser: () => <span data-testid="user" />,
  FiFile: () => <span data-testid="file" />,
  FiSettings: () => <span data-testid="settings" />,
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

const { useData } = jest.requireMock('@/providers/DataProvider');

const mockDoc = (id: string, pageCount: number) =>
  ({
    id,
    title: `Doc ${id}`,
    pageCount,
  }) as PDFDocument;

describe('Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useData.mockReturnValue({
      documents: [mockDoc('d1', 4), mockDoc('d2', 6)],
    });
  });

  it('renders user information', () => {
    render(<Profile />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Demo User')).toBeInTheDocument();
    expect(screen.getByText('demo@example.com')).toBeInTheDocument();
  });

  it('shows document count and total pages', () => {
    render(<Profile />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Documents')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Total Pages')).toBeInTheDocument();
  });
});
