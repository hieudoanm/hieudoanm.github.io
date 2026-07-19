import { render, screen } from '@testing-library/react';
import { Sidebar } from '../Sidebar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/personal'),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Sidebar', () => {
  it('renders personal variant by default', () => {
    render(<Sidebar />);
    expect(screen.getByText('Personal')).toBeTruthy();
  });

  it('renders business variant', () => {
    render(<Sidebar variant="business" />);
    expect(screen.getByText('Business')).toBeTruthy();
  });

  it('renders navigation groups', () => {
    render(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeTruthy();
    expect(screen.getByText('Calculator')).toBeTruthy();
  });

  it('renders nav groups for business', () => {
    render(<Sidebar variant="business" />);
    expect(screen.getByText('Submissions')).toBeTruthy();
    expect(screen.getByText('Audits')).toBeTruthy();
  });

  it('highlights active route', () => {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/personal/calculator');
    render(<Sidebar />);
    const links = screen.getAllByRole('link');
    const calcLink = links.find((l) => l.textContent?.includes('Calculator'));
    expect(calcLink).toBeTruthy();
  });
});
