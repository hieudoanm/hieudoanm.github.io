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
    expect(screen.getByText('Tic-Tac-Toe').closest('a')).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('applies and persists the default dracula theme', () => {
    render(<Header />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dracula');
    expect(localStorage.getItem('tic-tac-toe-theme')).toBe('dracula');
  });

  it('toggles between dark and light themes', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'bumblebee'
    );
    expect(localStorage.getItem('tic-tac-toe-theme')).toBe('bumblebee');
    await user.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dracula');
  });

  it('restores a saved theme on mount', () => {
    localStorage.setItem('tic-tac-toe-theme', 'bumblebee');
    render(<Header />);
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    expect(localStorage.getItem('tic-tac-toe-theme')).toBe('bumblebee');
  });
});
