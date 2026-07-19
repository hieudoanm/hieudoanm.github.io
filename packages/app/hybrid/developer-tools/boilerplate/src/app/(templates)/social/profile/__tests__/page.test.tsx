import { render, screen } from '@testing-library/react';
import ProfilePage from '@/app/(templates)/social/profile/page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/profile',
}));

describe('ProfilePage', () => {
  it('renders profile settings', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Account settings')).toBeInTheDocument();
    expect(screen.getByText('Change password')).toBeInTheDocument();
  });
});
