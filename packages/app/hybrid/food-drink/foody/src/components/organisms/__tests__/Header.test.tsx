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
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
  });

  it('renders navigation links in desktop and mobile dropdown', () => {
    render(<Header />);
    expect(screen.getAllByRole('link', { name: 'About' }).length).toBe(2);
    expect(screen.getAllByRole('link', { name: 'Downloads' }).length).toBe(2);
    expect(screen.getAllByRole('link', { name: 'Version' }).length).toBe(2);
  });
});
