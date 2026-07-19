import { render, screen } from '@testing-library/react';
import { Header } from '@/components/organisms/Header';

const mockPathname = jest.fn(() => '/');
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

describe('Header', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/');
  });

  it('renders the brand linking to /', () => {
    render(<Header />);
    const brand = screen.getByRole('link', { name: 'Tourney' });
    expect(brand).toBeInTheDocument();
    expect(brand).toHaveAttribute('href', '/');
  });

  it('renders the nav links', () => {
    render(<Header />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('Version')).toBeInTheDocument();
  });

  it('renders the theme toggle', () => {
    render(<Header />);
    expect(screen.getByTitle('Toggle theme')).toBeInTheDocument();
  });

  it('highlights the active nav link based on pathname', () => {
    mockPathname.mockReturnValue('/about');
    render(<Header />);
    const aboutLink = screen.getByText('About');
    expect(aboutLink.className).toContain('text-primary');
  });

  it('does not highlight inactive nav links', () => {
    mockPathname.mockReturnValue('/about');
    render(<Header />);
    const downloadsLink = screen.getByText('Downloads');
    expect(downloadsLink.className).toContain('text-base-content/50');
  });
});
