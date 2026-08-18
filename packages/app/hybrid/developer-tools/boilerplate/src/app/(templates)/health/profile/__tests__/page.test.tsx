import { render, screen } from '@testing-library/react';
import ProfilePage from '@/app/(templates)/health/profile/page';

describe('ProfilePage', () => {
  it('renders the profile page', () => {
    render(<ProfilePage />);
    expect(
      screen.getByRole('heading', { name: 'Health Profile' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 health metrics')).toBeInTheDocument();
  });
});
