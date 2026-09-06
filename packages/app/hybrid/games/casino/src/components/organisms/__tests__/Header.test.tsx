import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('links back to the home page', () => {
    render(<Header />);
    expect(screen.getByText('Casino').closest('a')).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders about links', () => {
    render(<Header />);
    const aboutLinks = screen.getAllByText('About');
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
    aboutLinks.forEach((link) =>
      expect(link.closest('a')).toHaveAttribute('href', '/about')
    );
  });

  it('renders downloads links', () => {
    render(<Header />);
    const downloadsLinks = screen.getAllByText('Downloads');
    expect(downloadsLinks.length).toBeGreaterThanOrEqual(1);
    downloadsLinks.forEach((link) =>
      expect(link.closest('a')).toHaveAttribute('href', '/downloads')
    );
  });

  it('renders version links', () => {
    render(<Header />);
    const versionLinks = screen.getAllByText('Version');
    expect(versionLinks.length).toBeGreaterThanOrEqual(1);
    versionLinks.forEach((link) =>
      expect(link.closest('a')).toHaveAttribute('href', '/version')
    );
  });

  it('applies and persists the default light theme', () => {
    render(<Header />);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'casino-light'
    );
    expect(localStorage.getItem('casino-theme')).toBe('casino-light');
  });

  it('toggles between dark and light themes', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'casino-dark'
    );
    expect(localStorage.getItem('casino-theme')).toBe('casino-dark');
    await user.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'casino-light'
    );
  });

  it('restores a saved theme on mount', () => {
    localStorage.setItem('casino-theme', 'casino-dark');
    render(<Header />);
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    expect(localStorage.getItem('casino-theme')).toBe('casino-dark');
  });
});
