import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

describe('Header', () => {
  it('renders Nikoli logo', () => {
    render(<Header />);
    expect(screen.getByText('Nikoli')).toBeInTheDocument();
  });

  it('renders nav links', () => {
    render(<Header />);
    expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Downloads').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Version').length).toBeGreaterThanOrEqual(1);
  });

  it('renders theme toggle button', () => {
    render(<Header />);
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('toggles theme on button click', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'nikoli-dark'
    );
  });

  it('toggles back to original theme', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByTestId('theme-toggle');
    await user.click(toggle);
    await user.click(toggle);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'nikoli-light'
    );
  });

  it('persists theme to localStorage', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByTestId('theme-toggle'));
    expect(localStorage.getItem('nikoli-theme')).toBe('nikoli-dark');
  });

  it('sets data-theme attribute on html', () => {
    render(<Header />);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'nikoli-light'
    );
  });

  it('reads saved theme from localStorage', () => {
    localStorage.setItem('nikoli-theme', 'nikoli-dark');
    render(<Header />);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'nikoli-dark'
    );
  });
});
