jest.mock('next/navigation', () => ({
  usePathname: () => '/about/',
}));

import { render, screen, fireEvent } from '@testing-library/react';
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
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('Version')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(<Header />);
    expect(screen.getByText('☀️')).toBeInTheDocument();
  });

  it('toggles theme on button click', () => {
    render(<Header />);
    const btn = screen.getByText('☀️');
    fireEvent.click(btn);
    expect(screen.getByText('🧛')).toBeInTheDocument();
  });

  it('toggles back to original theme', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('☀️'));
    fireEvent.click(screen.getByText('🧛'));
    expect(screen.getByText('☀️')).toBeInTheDocument();
  });

  it('persists theme to localStorage', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('☀️'));
    expect(localStorage.getItem('nikoli-theme')).toBe('nikoli-light');
  });

  it('sets data-theme attribute on html', () => {
    render(<Header />);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'nikoli-dark'
    );
  });

  it('reads saved theme from localStorage', () => {
    localStorage.setItem('nikoli-theme', 'nikoli-light');
    render(<Header />);
    expect(screen.getByText('🧛')).toBeInTheDocument();
  });

  it('highlights active nav link', () => {
    render(<Header />);
    const aboutLink = screen.getByText('About');
    expect(aboutLink.closest('a')).toHaveClass('btn-active');
  });
});
