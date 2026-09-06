import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

describe('Header', () => {
  it('renders the app name', () => {
    render(<Header />);
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Downloads').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Version').length).toBeGreaterThanOrEqual(1);
  });

  it('links to correct routes', () => {
    render(<Header />);
    const aboutLinks = screen.getAllByText('About');
    aboutLinks.forEach((link) =>
      expect(link.closest('a')).toHaveAttribute('href', '/about')
    );
    const downloadsLinks = screen.getAllByText('Downloads');
    downloadsLinks.forEach((link) =>
      expect(link.closest('a')).toHaveAttribute('href', '/downloads')
    );
    const versionLinks = screen.getAllByText('Version');
    versionLinks.forEach((link) =>
      expect(link.closest('a')).toHaveAttribute('href', '/version')
    );
  });

  it('links home from the logo', () => {
    render(<Header />);
    expect(screen.getByText('Calendar').closest('a')).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders theme toggle button', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: /toggle theme/i })
    ).toBeInTheDocument();
  });

  it('sets default data-theme to light', () => {
    render(<Header />);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'calendar-light'
    );
  });

  it('toggles theme on click', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'calendar-dark'
    );
  });

  it('toggles back to light theme', () => {
    render(<Header />);
    const toggle = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'calendar-light'
    );
  });

  it('persists theme to localStorage', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(localStorage.getItem('calendar-theme')).toBe('calendar-dark');
  });
});
