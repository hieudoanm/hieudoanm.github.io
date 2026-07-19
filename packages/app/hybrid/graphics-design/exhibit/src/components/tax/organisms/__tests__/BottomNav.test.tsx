import { render, screen } from '@testing-library/react';
import { BottomNav } from '../BottomNav';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/tax'),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('BottomNav', () => {
  it('renders business items', () => {
    render(<BottomNav />);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Submit')).toBeTruthy();
    expect(screen.getByText('Audit')).toBeTruthy();
    expect(screen.getByText('Profile')).toBeTruthy();
  });

  it('has no personal item', () => {
    render(<BottomNav />);
    expect(screen.queryByText('Personal')).toBeNull();
  });
});
