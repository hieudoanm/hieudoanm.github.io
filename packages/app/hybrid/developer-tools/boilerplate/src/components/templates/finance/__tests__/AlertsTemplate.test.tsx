import { fireEvent, render, screen } from '@testing-library/react';
import { AlertsTemplate } from '../AlertsTemplate';

describe('AlertsTemplate', () => {
  it('renders price alerts with status badges', () => {
    render(<AlertsTemplate />);
    expect(screen.getByRole('heading', { name: 'Alerts' })).toBeInTheDocument();
    expect(screen.getByText('4 alerts')).toBeInTheDocument();
    expect(screen.getByText('AAPL above $250')).toBeInTheDocument();
    expect(screen.getAllByText('Active')).toHaveLength(3);
    expect(screen.getAllByText('Triggered')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Pause' })).toHaveLength(3);
  });

  it('pauses and resumes an alert and toggles the new alert button', () => {
    render(<AlertsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Pause' })[0]);
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getAllByText('Paused')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Resume' }));
    expect(screen.getAllByText('Active')).toHaveLength(3);
    fireEvent.click(screen.getByRole('button', { name: 'New alert' }));
    expect(
      screen.getByRole('button', { name: 'Alert created' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Alert created' }));
    expect(
      screen.getByRole('button', { name: 'New alert' })
    ).toBeInTheDocument();
  });
});
