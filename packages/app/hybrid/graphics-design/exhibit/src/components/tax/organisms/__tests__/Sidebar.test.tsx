import { render, screen } from '@testing-library/react';
import { Sidebar } from '../Sidebar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/tax'),
}));

jest.mock('next/link', () => {
  return ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
});

describe('Sidebar', () => {
  it('renders the business brand', () => {
    render(<Sidebar />);
    expect(screen.getByText('🏢 Business')).toBeTruthy();
  });

  it('renders navigation groups', () => {
    render(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeTruthy();
    expect(screen.getByText('Submissions')).toBeTruthy();
    expect(screen.getByText('Audits')).toBeTruthy();
  });

  it('highlights active route', () => {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/tax/audit');
    render(<Sidebar />);
    const links = screen.getAllByRole('link');
    const auditLink = links.find((l) => l.textContent?.includes('Audits'));
    expect(auditLink?.className).toContain('text-primary');
  });
});
