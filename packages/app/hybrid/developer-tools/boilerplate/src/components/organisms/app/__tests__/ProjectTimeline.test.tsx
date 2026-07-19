import { render, screen } from '@testing-library/react';
import { ProjectTimeline } from '../ProjectTimeline';

const milestones = [
  { id: 'm1', title: 'Kickoff', date: 'Aug 1', status: 'done' as const },
  { id: 'm2', title: 'Beta', date: 'Aug 20', status: 'current' as const },
  { id: 'm3', title: 'Launch', date: 'Sep 5', status: 'upcoming' as const },
];

describe('ProjectTimeline', () => {
  it('renders milestone titles and dates', () => {
    render(<ProjectTimeline milestones={milestones} />);
    expect(screen.getByText('Kickoff')).toBeInTheDocument();
    expect(screen.getByText('Aug 20')).toBeInTheDocument();
    expect(screen.getByText('Launch')).toBeInTheDocument();
  });

  it('applies status badge classes', () => {
    render(<ProjectTimeline milestones={milestones} />);
    expect(screen.getByText('done')).toHaveClass('badge-success');
    expect(screen.getByText('current')).toHaveClass('badge-primary');
    expect(screen.getByText('upcoming')).toHaveClass('badge-ghost');
  });

  it('shows an empty state', () => {
    render(<ProjectTimeline milestones={[]} />);
    expect(screen.getByText('No milestones scheduled.')).toBeInTheDocument();
  });
});
