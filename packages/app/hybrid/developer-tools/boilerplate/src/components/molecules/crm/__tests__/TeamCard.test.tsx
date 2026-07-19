import { render, screen } from '@testing-library/react';
import { TeamCard } from '../TeamCard';

const members = [
  { name: 'Jane Doe', role: 'Account Executive', email: 'jane@example.com' },
  { name: 'John Roe', role: 'Sales Rep', email: 'john@example.com' },
];

describe('TeamCard', () => {
  it('renders the team name and member initials', () => {
    render(<TeamCard name="North Team" members={members} />);
    expect(screen.getByText('North Team')).toBeInTheDocument();
    expect(screen.getAllByText('J')).toHaveLength(2);
    expect(screen.getByText('John Roe')).toBeInTheDocument();
  });

  it('renders the quota badge when provided', () => {
    render(
      <TeamCard name="North Team" members={members} totalQuota={500000} />
    );
    expect(screen.getByText('$500,000')).toBeInTheDocument();
  });

  it('omits the quota badge when not provided', () => {
    render(<TeamCard name="North Team" members={members} />);
    expect(screen.queryByText('$500,000')).not.toBeInTheDocument();
  });
});
