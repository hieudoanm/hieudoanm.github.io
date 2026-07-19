import { render, screen } from '@testing-library/react';
import { TravelAlerts } from '../TravelAlerts';

const alerts = [
  {
    id: 'a1',
    type: 'warning' as const,
    title: 'Severe weather',
    description: 'Heavy storms expected',
    date: 'Aug 09',
  },
  {
    id: 'a2',
    type: 'info' as const,
    title: 'Road works',
    description: 'Downtown bypass closed',
  },
];

describe('TravelAlerts', () => {
  it('renders alert titles and descriptions', () => {
    render(<TravelAlerts alerts={alerts} />);
    expect(screen.getByText('Severe weather')).toBeInTheDocument();
    expect(screen.getByText('Heavy storms expected')).toBeInTheDocument();
    expect(screen.getByText('Road works')).toBeInTheDocument();
  });

  it('renders the alert type badges', () => {
    render(<TravelAlerts alerts={alerts} />);
    expect(screen.getByText('warning')).toBeInTheDocument();
    expect(screen.getByText('info')).toBeInTheDocument();
  });

  it('shows a positive state when there are no alerts', () => {
    render(<TravelAlerts alerts={[]} />);
    expect(
      screen.getByText('No active alerts for this region.')
    ).toBeInTheDocument();
  });
});
