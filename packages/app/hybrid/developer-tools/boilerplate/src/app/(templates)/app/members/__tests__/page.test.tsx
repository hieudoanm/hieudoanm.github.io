import { render, screen } from '@testing-library/react';
import MembersPage from '@/app/(templates)/app/members/page';

describe('MembersPage', () => {
  it('renders the MembersPage', () => {
    render(<MembersPage />);
    expect(screen.getByText('Team members')).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
  });
});
