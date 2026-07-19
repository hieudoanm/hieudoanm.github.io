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

  it('renders a theme toggle button', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: 'Toggle theme' })
    ).toBeInTheDocument();
  });
});
