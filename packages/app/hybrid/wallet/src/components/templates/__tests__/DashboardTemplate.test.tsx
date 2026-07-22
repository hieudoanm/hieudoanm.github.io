import { render, screen } from '@testing-library/react';
import DashboardTemplate from '../DashboardTemplate';

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
  it('renders children', () => {
    render(
      <DashboardTemplate>
        <div>Page content</div>
      </DashboardTemplate>
    );
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders sidebar with navigation', () => {
    render(
      <DashboardTemplate>
        <div>Content</div>
      </DashboardTemplate>
    );
    expect(screen.getAllByText('Wallet').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
