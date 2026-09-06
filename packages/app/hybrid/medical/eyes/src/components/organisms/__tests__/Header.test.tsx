import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '@/components/organisms/Header';

describe('Header', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders the Eyes brand linking home', () => {
    render(<Header />);
    const brand = screen.getByText('Eyes').closest('a');
    expect(brand).toHaveAttribute('href', '/');
  });

  it('renders about, downloads and version links', () => {
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

  it('links back home', () => {
    render(<Header />);
    expect(document.querySelector('a[href="/"]')).toBeInTheDocument();
  });

  it('defaults to the light theme', () => {
    render(<Header />);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'eyes-light'
    );
    expect(window.localStorage.getItem('eyes-theme')).toBe('eyes-light');
  });

  it('toggles from light to dark theme', () => {
    render(<Header />);
    fireEvent.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.dataset.theme).toBe('eyes-dark');
    expect(window.localStorage.getItem('eyes-theme')).toBe('eyes-dark');
  });

  it('toggles back to light theme from dark', () => {
    window.localStorage.setItem('eyes-theme', 'eyes-dark');
    render(<Header />);
    fireEvent.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.dataset.theme).toBe('eyes-light');
    expect(window.localStorage.getItem('eyes-theme')).toBe('eyes-light');
  });
});
