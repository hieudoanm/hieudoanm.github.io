import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders the Clock brand linking home', () => {
    render(<Header />);
    const brand = screen.getByText('Clock').closest('a');
    expect(brand).toHaveAttribute('href', '/');
  });

  it('renders nav links', () => {
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

  it('renders the theme toggle', () => {
    render(<Header />);
    expect(screen.getByTestId('theme-toggle')).toHaveAttribute(
      'aria-label',
      'Toggle theme'
    );
  });

  it('defaults to the light theme', () => {
    render(<Header />);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'clock-light'
    );
    expect(localStorage.getItem('clock-theme')).toBe('clock-light');
  });

  it('toggles to dark theme on click', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'clock-dark'
    );
    expect(localStorage.getItem('clock-theme')).toBe('clock-dark');
  });

  it('toggles back to light from dark', async () => {
    const user = userEvent.setup();
    localStorage.setItem('clock-theme', 'clock-dark');
    render(<Header />);
    await user.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'clock-light'
    );
    expect(localStorage.getItem('clock-theme')).toBe('clock-light');
  });
});
