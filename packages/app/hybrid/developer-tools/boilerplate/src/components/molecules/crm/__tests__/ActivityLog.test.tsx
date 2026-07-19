import { render, screen } from '@testing-library/react';
import { ActivityLog } from '../ActivityLog';

const activities = [
  {
    id: '1',
    type: 'Call',
    description: 'Called the customer',
    timestamp: '2h ago',
    actor: 'Jane',
  },
  {
    id: '2',
    type: 'Email',
    description: 'Sent a proposal',
    timestamp: '1d ago',
    actor: 'John',
  },
];

describe('ActivityLog', () => {
  it('renders activities with type, actor and timestamp', () => {
    render(<ActivityLog activities={activities} />);
    expect(screen.getByText('Called the customer')).toBeInTheDocument();
    expect(screen.getByText('Jane · 2h ago')).toBeInTheDocument();
    expect(screen.getByText('Sent a proposal')).toBeInTheDocument();
  });

  it('shows an empty state when there are no activities', () => {
    render(<ActivityLog activities={[]} />);
    expect(screen.getByText('No activity yet')).toBeInTheDocument();
  });
});
