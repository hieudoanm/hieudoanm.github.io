import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock('react-icons/fi', () => ({
  FiDownload: () => null,
}));

describe('HomePage', () => {
  it('renders the chess heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Chess')).toBeInTheDocument();
  });

  it('renders tool links', () => {
    render(<HomePage />);
    expect(screen.getByText('Chess Board')).toBeInTheDocument();
    expect(screen.getByText('Chess Clock')).toBeInTheDocument();
    expect(screen.getByText('Chess Elo')).toBeInTheDocument();
  });

  it('links to downloads', () => {
    render(<HomePage />);
    expect(screen.getByText('Downloads')).toHaveAttribute('href', '/downloads');
  });
});
