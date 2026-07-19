import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '../ThemeToggle';

const mockToggleTheme = jest.fn();

jest.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'colors-dark',
    toggleTheme: mockToggleTheme,
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockToggleTheme.mockClear();
  });

  it('renders the toggle button', () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole('button', { name: 'Toggle theme' })
    ).toBeInTheDocument();
  });

  it('calls toggleTheme when clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
