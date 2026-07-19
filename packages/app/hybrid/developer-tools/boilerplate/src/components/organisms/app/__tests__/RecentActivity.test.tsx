import { fireEvent, render, screen } from '@testing-library/react';
import { RecentActivity } from '../RecentActivity';

const activities = [
  {
    id: 'a1',
    title: 'Deployed v2.1',
    description: 'Production',
    time: '2h ago',
  },
  { id: 'a2', title: 'Comment added', time: '1d ago' },
];

describe('RecentActivity', () => {
  it('renders activities with details', () => {
    render(<RecentActivity activities={activities} />);
    expect(screen.getByText('Deployed v2.1')).toBeInTheDocument();
    expect(screen.getByText('Production')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });

  it('shows the empty text when there is no activity', () => {
    render(<RecentActivity activities={[]} emptyText="Nothing yet." />);
    expect(screen.getByText('Nothing yet.')).toBeInTheDocument();
  });

  it('fires onViewAll', () => {
    const onViewAll = jest.fn();
    render(<RecentActivity activities={activities} onViewAll={onViewAll} />);
    fireEvent.click(screen.getByTestId('activity-view-all'));
    expect(onViewAll).toHaveBeenCalled();
  });
});
