import { render, screen } from '@testing-library/react';
import { MetricsDashboard } from '../MetricsDashboard';

describe('MetricsDashboard', () => {
  it('renders metrics with values and deltas', () => {
    render(
      <MetricsDashboard
        metrics={[
          {
            id: '1',
            label: 'Uptime',
            value: '99.9%',
            delta: '0.2%',
            trend: 'up',
          },
          { id: '2', label: 'Errors', value: '12', delta: '4', trend: 'down' },
        ]}
      />
    );
    expect(screen.getByText('Metrics')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('▲ 0.2%')).toBeInTheDocument();
  });

  it('applies an error badge for downward trends', () => {
    render(
      <MetricsDashboard
        metrics={[
          { id: '2', label: 'Errors', value: '12', delta: '4', trend: 'down' },
        ]}
      />
    );
    expect(screen.getByText('▼ 4')).toHaveClass('badge-error');
  });

  it('renders metrics without deltas', () => {
    render(
      <MetricsDashboard metrics={[{ id: '3', label: 'Users', value: '1k' }]} />
    );
    expect(screen.getByText('1k')).toBeInTheDocument();
  });
});
