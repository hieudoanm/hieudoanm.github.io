import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '../ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.setAttribute('data-theme', 'nothing');
  });

  it('renders a toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByTitle('Toggle theme')).toBeInTheDocument();
  });

  it('toggles theme on click', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const btn = screen.getByTitle('Toggle theme');
    await user.click(btn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('luxury');
  });

  it('toggles back on second click', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const btn = screen.getByTitle('Toggle theme');
    await user.click(btn);
    await user.click(btn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('nothing');
  });
});
