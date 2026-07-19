import { render, screen } from '@testing-library/react';
import FollowersPage from '@/app/(templates)/social/followers/page';

describe('FollowersPage', () => {
  it('renders the followers page', () => {
    render(<FollowersPage />);
    expect(
      screen.getByRole('heading', { name: 'Followers' })
    ).toBeInTheDocument();
  });
});
