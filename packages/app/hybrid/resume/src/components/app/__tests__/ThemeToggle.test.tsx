import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('starts in light mode', () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole('button', { name: 'Switch to dark mode' })
    ).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe('paper');
  });

  it('toggles to dark mode and updates the document theme', () => {
    render(<ThemeToggle />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to dark mode' })
    );
    expect(
      screen.getByRole('button', { name: 'Switch to light mode' })
    ).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe('night');
  });
});
