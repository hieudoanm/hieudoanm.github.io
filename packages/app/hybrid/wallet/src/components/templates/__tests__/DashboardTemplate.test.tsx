import { render, screen } from '@testing-library/react';
import DashboardTemplate from '../DashboardTemplate';
import { DataProvider } from '@/providers/DataProvider';

jest.mock('next/link', () => {
  return ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('DashboardTemplate', () => {
  beforeEach(() => localStorage.clear());

  it('renders children', () => {
    render(
      <DataProvider>
        <DashboardTemplate>
          <div>Page content</div>
        </DashboardTemplate>
      </DataProvider>
    );
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders sidebar with navigation', () => {
    render(
      <DataProvider>
        <DashboardTemplate>
          <div>Content</div>
        </DashboardTemplate>
      </DataProvider>
    );
    expect(screen.getAllByText('Wallet').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
