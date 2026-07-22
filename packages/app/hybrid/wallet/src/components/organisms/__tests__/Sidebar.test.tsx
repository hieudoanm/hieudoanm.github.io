import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { DataProvider } from '@/providers/DataProvider';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

function renderSidebar() {
  return render(
    <DataProvider>
      <Sidebar />
    </DataProvider>
  );
}

describe('Sidebar', () => {
  beforeEach(() => localStorage.clear());

  it('renders the app name', () => {
    renderSidebar();
    expect(screen.getByText('Wallet')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    renderSidebar();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Accounts')).toBeInTheDocument();
    expect(screen.getByText('Transfer')).toBeInTheDocument();
  });

  it('renders user info from DataProvider', () => {
    renderSidebar();
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
  });
});
