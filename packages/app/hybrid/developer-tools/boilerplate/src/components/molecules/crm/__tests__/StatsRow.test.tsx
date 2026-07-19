import { render, screen } from '@testing-library/react';
import { StatsRow } from '../StatsRow';

const stats = [
  { label: 'Revenue', value: '$120k', change: '+12%', trend: 'up' as const },
  { label: 'Leads', value: '340', change: '-3%', trend: 'down' as const },
  { label: 'Win rate', value: '28%' },
];

describe('StatsRow', () => {
  it('renders each stat label and value', () => {
    render(<StatsRow stats={stats} />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$120k')).toBeInTheDocument();
    expect(screen.getByText('Leads')).toBeInTheDocument();
    expect(screen.getByText('340')).toBeInTheDocument();
  });

  it('applies the trend variant class', () => {
    render(<StatsRow stats={stats} />);
    expect(screen.getByText('+12%')).toHaveClass('text-success');
    expect(screen.getByText('-3%')).toHaveClass('text-error');
  });

  it('renders stats without change', () => {
    render(<StatsRow stats={stats} />);
    expect(screen.getByText('Win rate')).toBeInTheDocument();
    expect(screen.getByText('28%')).toBeInTheDocument();
  });
});
