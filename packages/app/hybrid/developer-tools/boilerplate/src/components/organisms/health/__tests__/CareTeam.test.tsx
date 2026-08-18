import { render, screen } from '@testing-library/react';
import { CareTeam } from '../CareTeam';

const members = [
  {
    id: '1',
    name: 'Jane Doe',
    role: 'Primary care physician',
    specialty: 'Family medicine',
  },
  { id: '2', name: 'Bob Lee', role: 'Nurse' },
];

describe('CareTeam', () => {
  it('renders each member with role and specialty', () => {
    render(<CareTeam members={members} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Primary care physician')).toBeInTheDocument();
    expect(screen.getByText('Family medicine')).toBeInTheDocument();
  });

  it('renders initials in the avatar', () => {
    render(<CareTeam members={members} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByText('BL')).toBeInTheDocument();
  });

  it('shows an empty state when there are no members', () => {
    render(<CareTeam members={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No care team members.'
    );
  });
});
