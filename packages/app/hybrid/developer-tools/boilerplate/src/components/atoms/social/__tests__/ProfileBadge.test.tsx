import { render, screen } from '@testing-library/react';
import { ProfileBadge } from '../ProfileBadge';

describe('ProfileBadge', () => {
  it('renders the profile name', () => {
    render(<ProfileBadge name="Jane Doe" />);
    expect(screen.getByTestId('profile-badge')).toHaveTextContent('Jane Doe');
  });

  it('renders initial fallback avatar', () => {
    render(<ProfileBadge name="Jane Doe" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders verified icon when verified', () => {
    render(<ProfileBadge name="Jane Doe" verified />);
    expect(screen.getByLabelText('Verified')).toBeInTheDocument();
  });

  it('renders role when provided', () => {
    render(<ProfileBadge name="Jane Doe" role="Editor" />);
    expect(screen.getByTestId('profile-badge')).toHaveTextContent('Editor');
  });
});
