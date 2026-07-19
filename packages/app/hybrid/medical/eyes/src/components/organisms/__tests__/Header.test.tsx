import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '@/components/organisms/Header';

describe('Header', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.theme = 'eyes-dark';
  });

  it('renders the title', () => {
    render(<Header title="Eyes" />);
    expect(screen.getByRole('heading', { name: 'Eyes' })).toBeInTheDocument();
  });

  it('renders about, downloads and version links', () => {
    render(<Header title="Eyes" />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about'
    );
    expect(screen.getByRole('link', { name: 'Downloads' })).toHaveAttribute(
      'href',
      '/downloads'
    );
    expect(screen.getByRole('link', { name: 'Version' })).toHaveAttribute(
      'href',
      '/version'
    );
  });

  it('links back home', () => {
    render(<Header title="Eyes" />);
    expect(document.querySelector('a[href="/"]')).toBeInTheDocument();
  });

  it('toggles from dark to light theme', () => {
    render(<Header title="Eyes" />);
    const toggle = screen.getByRole('button', {
      name: /switch to light theme/i,
    });
    fireEvent.click(toggle);
    expect(document.documentElement.dataset.theme).toBe('eyes-light');
    expect(window.localStorage.getItem('eyes-theme')).toBe('eyes-light');
    expect(
      screen.getByRole('button', { name: /switch to dark theme/i })
    ).toBeInTheDocument();
  });

  it('toggles back to dark theme from light', () => {
    window.localStorage.setItem('eyes-theme', 'eyes-light');
    render(<Header title="Eyes" />);
    fireEvent.click(
      screen.getByRole('button', { name: /switch to dark theme/i })
    );
    expect(document.documentElement.dataset.theme).toBe('eyes-dark');
    expect(window.localStorage.getItem('eyes-theme')).toBe('eyes-dark');
  });
});
