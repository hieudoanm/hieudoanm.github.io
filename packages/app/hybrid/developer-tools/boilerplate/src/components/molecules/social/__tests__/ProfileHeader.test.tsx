import { render, screen } from '@testing-library/react';
import { ProfileHeader } from '../ProfileHeader';

describe('ProfileHeader', () => {
  it('renders name and handle', () => {
    render(<ProfileHeader name="John Doe" handle="johndoe" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
  });

  it('renders bio and follower counts', () => {
    render(
      <ProfileHeader
        name="John Doe"
        bio="Engineer"
        followers={120}
        following={30}
      />
    );
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('renders the verified badge when isVerified is true', () => {
    render(<ProfileHeader name="John Doe" isVerified />);
    expect(screen.getByLabelText('Verified')).toBeInTheDocument();
  });

  it('does not render the verified badge by default', () => {
    render(<ProfileHeader name="John Doe" />);
    expect(screen.queryByLabelText('Verified')).not.toBeInTheDocument();
  });
});
