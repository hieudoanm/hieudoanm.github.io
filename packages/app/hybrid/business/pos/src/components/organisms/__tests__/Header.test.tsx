import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Header', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  it('renders the app title', () => {
    render(<Header />);
    expect(screen.getByText('POS')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(
      screen.getAllByRole('link', { name: 'About' }).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByRole('link', { name: 'Downloads' }).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByRole('link', { name: 'Version' }).length
    ).toBeGreaterThanOrEqual(1);
  });

  it('links title to home', () => {
    render(<Header />);
    expect(screen.getByText('POS').closest('a')).toHaveAttribute('href', '/');
  });

  it('toggles the theme and persists it', () => {
    render(<Header />);
    const toggle = screen.getByTestId('theme-toggle');
    fireEvent.click(toggle);
    expect(document.documentElement).toHaveAttribute('data-theme', 'pos-dark');
    expect(localStorage.getItem('pos-theme')).toBe('pos-dark');
  });
});
