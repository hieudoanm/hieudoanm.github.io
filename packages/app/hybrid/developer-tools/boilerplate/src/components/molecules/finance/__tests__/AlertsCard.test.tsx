import { render, screen } from '@testing-library/react';
import { AlertsCard } from '../AlertsCard';

const alerts = [
  { id: '1', message: 'Bill due tomorrow', type: 'warning' as const },
  { id: '2', message: 'Deposit received', type: 'success' as const },
];

describe('AlertsCard', () => {
  it('renders alert messages', () => {
    render(<AlertsCard alerts={alerts} />);
    expect(screen.getByText('Bill due tomorrow')).toBeInTheDocument();
    expect(screen.getByText('Deposit received')).toBeInTheDocument();
  });

  it('applies variant class for alert type', () => {
    render(<AlertsCard alerts={alerts} />);
    expect(screen.getAllByTestId('alert-item')[0]).toHaveClass('alert-warning');
    expect(screen.getAllByTestId('alert-item')[1]).toHaveClass('alert-success');
  });

  it('defaults to info variant', () => {
    render(<AlertsCard alerts={[{ id: '1', message: 'Reminder' }]} />);
    expect(screen.getByTestId('alert-item')).toHaveClass('alert-info');
  });

  it('renders empty state', () => {
    render(<AlertsCard alerts={[]} />);
    expect(screen.getByText('All caught up')).toBeInTheDocument();
  });
});
