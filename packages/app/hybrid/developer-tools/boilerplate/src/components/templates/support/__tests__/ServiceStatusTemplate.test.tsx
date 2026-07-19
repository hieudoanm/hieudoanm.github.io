import { fireEvent, render, screen, within } from '@testing-library/react';
import { ServiceStatusTemplate } from '../ServiceStatusTemplate';

describe('ServiceStatusTemplate', () => {
  it('renders services with status badges and the summary', () => {
    render(<ServiceStatusTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Service Status' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 of 5 services operational')).toBeInTheDocument();
    expect(screen.getByText('API')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Operational')).toHaveLength(3);
    expect(within(table).getAllByText('Degraded')).toHaveLength(1);
    expect(within(table).getAllByText('Outage')).toHaveLength(1);
  });

  it('filters services by status', () => {
    render(<ServiceStatusTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Degraded' }));
    expect(screen.getByText('Payments')).toBeInTheDocument();
    expect(screen.queryByText('API')).not.toBeInTheDocument();
    expect(screen.getByText('3 of 5 services operational')).toBeInTheDocument();
  });

  it('shows outage services', () => {
    render(<ServiceStatusTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Outage' }));
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Email delivery')).not.toBeInTheDocument();
  });
});
