import { render, screen } from '@testing-library/react';
import { BottomNav } from '../BottomNav';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/personal'),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('BottomNav', () => {
  it('renders personal items by default', () => {
    render(<BottomNav />);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Calculate')).toBeTruthy();
    expect(screen.getByText('Business')).toBeTruthy();
    expect(screen.getByText('Profile')).toBeTruthy();
  });

  it('renders business items', () => {
    render(<BottomNav variant="business" />);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Submit')).toBeTruthy();
    expect(screen.getByText('Audit')).toBeTruthy();
    expect(screen.getByText('Personal')).toBeTruthy();
    expect(screen.getByText('Profile')).toBeTruthy();
  });
});
