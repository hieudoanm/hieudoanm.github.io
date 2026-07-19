import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('next/navigation', () => ({
  usePathname: () => '/about/',
}));

describe('Header', () => {
  it('renders brand linking home', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Foody' })).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders links to info pages', () => {
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

  it('renders the theme toggle', () => {
    render(<Header />);
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
  });

  it('highlights the active route link', () => {
    render(<Header />);
    const about = screen.getByRole('link', { name: 'About' });
    expect(about.className).toContain('text-primary');
  });
});
