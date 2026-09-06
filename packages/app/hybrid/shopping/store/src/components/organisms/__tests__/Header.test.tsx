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
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return { __esModule: true, default: MockLink };
});

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders Store link', () => {
    render(<Header />);
    expect(screen.getByText('Store')).toBeTruthy();
  });

  it('renders About link', () => {
    render(<Header />);
    expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1);
  });

  it('renders Version link', () => {
    render(<Header />);
    expect(screen.getAllByText('Version').length).toBeGreaterThanOrEqual(1);
  });

  it('renders Downloads link', () => {
    render(<Header />);
    expect(
      screen.getAllByRole('link', { name: 'Downloads' }).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByRole('link', { name: 'Downloads' })[0]
    ).toHaveAttribute('href', '/downloads');
  });

  it('renders theme toggle button', () => {
    render(<Header />);
    expect(screen.getByTestId('theme-toggle')).toBeTruthy();
  });

  it('toggles theme on click', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByTestId('theme-toggle');
    await user.click(toggle);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'store-dark'
    );
  });

  it('toggles back to light theme', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByTestId('theme-toggle');
    await user.click(toggle);
    await user.click(toggle);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'store-light'
    );
  });

  it('renders navigation links in desktop and mobile dropdown', () => {
    render(<Header />);
    expect(screen.getAllByRole('link', { name: 'About' }).length).toBe(2);
    expect(screen.getAllByRole('link', { name: 'Downloads' }).length).toBe(2);
    expect(screen.getAllByRole('link', { name: 'Version' }).length).toBe(2);
  });
});
