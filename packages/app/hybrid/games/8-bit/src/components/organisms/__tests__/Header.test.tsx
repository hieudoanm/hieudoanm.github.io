import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

beforeEach(() => {
  localStorage.clear();
});

describe('Header', () => {
  it('renders the app title', () => {
    render(<Header />);
    expect(screen.getByText('8-Bit Games')).toBeInTheDocument();
  });

  it('renders a link to home', () => {
    render(<Header />);
    const link = screen.getByText('8-Bit Games').closest('a');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders theme toggle button', () => {
    render(<Header />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('defaults to dracula theme', () => {
    render(<Header />);
    expect(screen.getByText('\u2600\uFE0F')).toBeInTheDocument();
  });

  it('toggles theme on button click', () => {
    render(<Header />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(screen.getByText('\uD83E\uDDDB')).toBeInTheDocument();
  });

  it('toggles back to dracula', () => {
    render(<Header />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.getByText('\u2600\uFE0F')).toBeInTheDocument();
  });

  it('persists theme to localStorage', () => {
    render(<Header />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(localStorage.getItem('8bit-theme')).toBe('bumblebee');
  });

  it('reads saved theme from localStorage', () => {
    localStorage.setItem('8bit-theme', 'bumblebee');
    render(<Header />);
    expect(screen.getByText('\uD83E\uDDDB')).toBeInTheDocument();
  });
});
