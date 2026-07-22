import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Sidebar', () => {
  it('renders the app name', () => {
    render(<Sidebar />);
    expect(screen.getByText('Wallet')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Accounts')).toBeInTheDocument();
    expect(screen.getByText('Transfer')).toBeInTheDocument();
  });

  it('renders user info', () => {
    render(<Sidebar />);
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
  });
});
