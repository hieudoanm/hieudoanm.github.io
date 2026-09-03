import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
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

  it('renders MEMORY GAMES link', () => {
    render(<Header />);
    expect(screen.getByText('MEMORY GAMES')).toHaveAttribute('href', '/');
  });

  it('renders ABOUT link', () => {
    render(<Header />);
    expect(screen.getByText('ABOUT')).toHaveAttribute('href', '/about');
  });

  it('renders DOWNLOADS link', () => {
    render(<Header />);
    expect(screen.getByText('DOWNLOADS')).toHaveAttribute('href', '/downloads');
  });

  it('renders VERSION link', () => {
    render(<Header />);
    expect(screen.getByText('VERSION')).toHaveAttribute('href', '/version');
  });

  it('applies and persists the default theme', () => {
    render(<Header />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('nothing');
    expect(localStorage.getItem('memory-theme')).toBe('nothing');
  });

  it('toggles between themes', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'bumblebee'
    );
    expect(localStorage.getItem('memory-theme')).toBe('bumblebee');
  });

  it('has displayName', () => {
    expect(Header.displayName).toBe('Header');
  });
});
