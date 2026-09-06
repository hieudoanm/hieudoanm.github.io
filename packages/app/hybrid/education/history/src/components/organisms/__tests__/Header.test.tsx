import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  it('renders the brand link pointing to home', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'History' })).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders navigation links to info pages', () => {
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

  it('renders a theme toggle button', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: 'Toggle theme' })
    ).toBeInTheDocument();
  });
});
