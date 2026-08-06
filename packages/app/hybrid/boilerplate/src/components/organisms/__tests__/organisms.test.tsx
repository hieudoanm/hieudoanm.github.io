import { render, screen } from '@testing-library/react';
import { FiHome, FiUser } from 'react-icons/fi';
import { Header } from '../Header';
import { Navbar } from '../Navbar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('Header', () => {
  it('renders title and subtitle', () => {
    render(<Header title="Dashboard" subtitle="Overview" />);
    expect(
      screen.getByRole('heading', { name: 'Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('renders back link when backHref is provided', () => {
    render(<Header title="Dashboard" backHref="/" />);
    expect(screen.getByRole('link', { name: '' })).toHaveAttribute('href', '/');
  });

  it('renders badges and action', () => {
    render(
      <Header
        title="Dashboard"
        badges={<span>Beta</span>}
        action={<button>New</button>}
      />
    );
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });
});

describe('Navbar', () => {
  const items = [
    { label: 'Home', href: '/', icon: <FiHome /> },
    { label: 'Profile', href: '/profile', icon: <FiUser /> },
  ];

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/profile');
  });

  it('renders items with icons and labels', () => {
    render(<Navbar items={items} />);
    expect(screen.getByRole('link', { name: /Home/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Profile/ })).toBeInTheDocument();
    expect(document.querySelectorAll('svg').length).toBeGreaterThan(0);
  });

  it('marks active item based on pathname', () => {
    render(<Navbar items={items} />);
    expect(screen.getByRole('link', { name: /Profile/ })).toHaveClass(
      'btn-primary'
    );
    expect(screen.getByRole('link', { name: /Home/ })).not.toHaveClass(
      'btn-primary'
    );
  });

  it('marks home active only on root path', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Navbar items={items} />);
    expect(screen.getByRole('link', { name: /Home/ })).toHaveClass(
      'btn-primary'
    );
  });

  it('uses top position class', () => {
    render(<Navbar items={items} position="top" />);
    expect(document.querySelector('nav')).toHaveClass('top-0');
  });
});
