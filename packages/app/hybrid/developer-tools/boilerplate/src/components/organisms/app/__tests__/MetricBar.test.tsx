import { render, screen } from '@testing-library/react';
import { MetricBar } from '../MetricBar';

const metrics = [
  { label: 'Requests', value: '12k', progress: 75 },
  {
    label: 'Uptime',
    value: '99.9%',
    progress: 30,
    variant: 'success' as const,
  },
];

describe('MetricBar', () => {
  it('renders metric labels and values', () => {
    render(<MetricBar metrics={metrics} />);
    expect(screen.getByText('Requests')).toBeInTheDocument();
    expect(screen.getByText('12k')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
  });

  it('renders progress bars with values', () => {
    render(<MetricBar metrics={metrics} />);
    const bars = screen.getAllByRole('progressbar');
    expect(bars).toHaveLength(2);
    expect(bars[0]).toHaveAttribute('value', '75');
    expect(bars[1]).toHaveClass('progress-success');
  });

  it('renders without progress bars when not provided', () => {
    render(<MetricBar metrics={[{ label: 'Load', value: '0.8' }]} />);
    expect(screen.getByText('Load')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
