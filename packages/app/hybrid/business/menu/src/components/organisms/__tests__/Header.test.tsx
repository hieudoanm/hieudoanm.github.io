import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

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

  it('renders the Menu brand linking home', () => {
    render(<Header />);
    const brand = screen.getByRole('link', { name: /menu/i });
    expect(brand).toBeInTheDocument();
    expect(brand.getAttribute('href')).toBe('/');
  });

  it('renders About, Downloads, and Version links', () => {
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

  it('renders a theme toggle and persists the theme', () => {
    render(<Header />);
    const toggle = screen.getByTestId('theme-toggle');
    expect(toggle).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(document.documentElement).toHaveAttribute(
      'data-theme',
      'menu-light'
    );
    expect(localStorage.getItem('menu-theme')).toBe('menu-light');
  });
});
