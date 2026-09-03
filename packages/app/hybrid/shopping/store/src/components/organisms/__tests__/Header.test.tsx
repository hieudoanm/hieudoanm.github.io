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
    document.documentElement.setAttribute('data-theme', 'nothing');
  });

  it('renders Store link', () => {
    render(<Header />);
    expect(screen.getByText('Store')).toBeTruthy();
  });

  it('renders About link', () => {
    render(<Header />);
    expect(screen.getByText('About')).toBeTruthy();
  });

  it('renders Version link', () => {
    render(<Header />);
    expect(screen.getByText('Version')).toBeTruthy();
  });

  it('renders Downloads link', () => {
    render(<Header />);
    expect(screen.getByText('Downloads')).toBeTruthy();
    expect(screen.getByText('Downloads')).toHaveAttribute('href', '/downloads/');
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
    expect(document.documentElement.getAttribute('data-theme')).toBe('winter');
  });

  it('toggles back to nothing theme', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByTestId('theme-toggle');
    await user.click(toggle);
    await user.click(toggle);
    expect(document.documentElement.getAttribute('data-theme')).toBe('nothing');
  });

  it('highlights active route', () => {
    const mockUsePathname = jest.requireMock('next/navigation');
    mockUsePathname.usePathname = () => '/about/';
    render(<Header />);
    const aboutLink = screen.getByText('About');
    expect(aboutLink.className).toContain('btn-active');
  });
});
