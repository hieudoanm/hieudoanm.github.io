import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders the app title', () => {
    render(<Header />);
    expect(screen.getByText('8-Bit')).toBeInTheDocument();
  });

  it('renders a link to home', () => {
    render(<Header />);
    const link = screen.getByText('8-Bit').closest('a');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders about links', () => {
    render(<Header />);
    expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1);
  });

  it('renders downloads links', () => {
    render(<Header />);
    expect(screen.getAllByText('Downloads').length).toBeGreaterThanOrEqual(1);
  });

  it('renders version links', () => {
    render(<Header />);
    expect(screen.getAllByText('Version').length).toBeGreaterThanOrEqual(1);
  });

  it('applies and persists the default light theme', () => {
    render(<Header />);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      '8-bit-light'
    );
    expect(localStorage.getItem('8-bit-theme')).toBe('8-bit-light');
  });

  it('toggles between themes', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByTestId('theme-toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      '8-bit-dark'
    );
    expect(localStorage.getItem('8-bit-theme')).toBe('8-bit-dark');
  });
});
