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

  it('renders about link', () => {
    render(<Header />);
    expect(screen.getByText('ABOUT')).toHaveAttribute('href', '/about');
  });

  it('renders downloads link', () => {
    render(<Header />);
    expect(screen.getByText('DOWNLOADS')).toHaveAttribute('href', '/downloads');
  });

  it('renders version link', () => {
    render(<Header />);
    expect(screen.getByText('VERSION')).toHaveAttribute('href', '/version');
  });

  it('applies and persists the default dracula theme', () => {
    render(<Header />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('casino-dark');
    expect(localStorage.getItem('casino-theme')).toBe('casino-dark');
  });

  it('toggles between dark and light themes', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'casino-light'
    );
    expect(localStorage.getItem('casino-theme')).toBe('casino-light');
    await user.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('casino-dark');
  });

  it('restores a saved theme on mount', () => {
    localStorage.setItem('casino-theme', 'casino-light');
    render(<Header />);
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    expect(localStorage.getItem('casino-theme')).toBe('casino-light');
  });
});
