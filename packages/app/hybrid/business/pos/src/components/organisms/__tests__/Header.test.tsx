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
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about'
    );
    expect(screen.getByRole('link', { name: 'Downloads' })).toHaveAttribute(
      'href',
      '/downloads'
    );
    expect(screen.getByRole('link', { name: 'Version' })).toHaveAttribute(
      'href',
      '/version'
    );
  });

  it('links title to home', () => {
    render(<Header />);
    expect(screen.getByText('POS').closest('a')).toHaveAttribute('href', '/');
  });

  it('toggles the theme and persists it', () => {
    render(<Header />);
    const toggle = screen.getByTestId('theme-toggle');
    fireEvent.click(toggle);
    expect(document.documentElement).toHaveAttribute('data-theme', 'pos-light');
    expect(localStorage.getItem('pos-theme')).toBe('pos-light');
  });
});
