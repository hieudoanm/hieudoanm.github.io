import { fireEvent, render, screen } from '@testing-library/react';
import { TeamRoster } from '../TeamRoster';

const members = [
  {
    id: 'm1',
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'Admin',
    status: 'active' as const,
  },
  {
    id: 'm2',
    name: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'Member',
    status: 'invited' as const,
  },
];

describe('TeamRoster', () => {
  it('renders members in the table', () => {
    render(<TeamRoster members={members} />);
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('ada@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders status badges', () => {
    render(<TeamRoster members={members} />);
    expect(screen.getByText('active')).toHaveClass('badge-success');
    expect(screen.getByText('invited')).toHaveClass('badge-warning');
  });

  it('shows an empty state', () => {
    render(<TeamRoster members={[]} />);
    expect(screen.getByText('No team members yet.')).toBeInTheDocument();
  });

  it('fires onInvite', () => {
    const onInvite = jest.fn();
    render(<TeamRoster members={members} onInvite={onInvite} />);
    fireEvent.click(screen.getByTestId('invite-member'));
    expect(onInvite).toHaveBeenCalled();
  });
});
