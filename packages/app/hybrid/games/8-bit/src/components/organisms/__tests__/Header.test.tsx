import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders the app title', () => {
    render(<Header />);
    expect(screen.getByText('8-BIT GAMES')).toBeInTheDocument();
  });

  it('renders a link to home', () => {
    render(<Header />);
    const link = screen.getByText('8-BIT GAMES').closest('a');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders about link', () => {
    render(<Header />);
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
  });

  it('renders downloads link', () => {
    render(<Header />);
    expect(screen.getByText('DOWNLOADS')).toBeInTheDocument();
  });

  it('renders version link', () => {
    render(<Header />);
    expect(screen.getByText('VERSION')).toBeInTheDocument();
  });

  it('applies and persists the default theme', () => {
    render(<Header />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('8-bit-dark');
    expect(localStorage.getItem('8-bit-theme')).toBe('8-bit-dark');
  });

  it('toggles between themes', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      '8-bit-light'
    );
    expect(localStorage.getItem('8-bit-theme')).toBe('8-bit-light');
  });
});
