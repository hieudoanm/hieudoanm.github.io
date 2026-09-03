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

  it('renders the Wallet brand linking home', () => {
    render(<Header />);
    const brand = screen.getByRole('link', { name: /wallet/i });
    expect(brand).toBeInTheDocument();
    expect(brand.getAttribute('href')).toBe('/');
  });

  it('renders About, Downloads, and Version links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
    expect(screen.getByRole('link', { name: 'Downloads' })).toHaveAttribute(
      'href',
      '/downloads',
    );
    expect(screen.getByRole('link', { name: 'Version' })).toHaveAttribute(
      'href',
      '/version',
    );
  });

  it('renders a theme toggle and toggles the theme', () => {
    render(<Header />);
    const toggle = screen.getByTestId('theme-toggle');
    expect(toggle).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(document.documentElement).toHaveAttribute('data-theme', 'wallet-light');
    expect(localStorage.getItem('wallet-theme')).toBe('wallet-light');
  });
});
