import { fireEvent, render, screen, within } from '@testing-library/react';
import { SubscriptionsTemplate } from '../SubscriptionsTemplate';

describe('SubscriptionsTemplate', () => {
  it('renders subscriptions with amounts and status badges', () => {
    render(<SubscriptionsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Subscriptions' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 active subscriptions')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('$149')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Active')).toHaveLength(3);
    expect(within(table).getAllByText('Past due')).toHaveLength(2);
    expect(within(table).getAllByText('Cancelled')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Cancel' })).toHaveLength(3);
    expect(
      screen.getAllByRole('button', { name: 'Send reminder' })
    ).toHaveLength(2);
  });

  it('cancels an active subscription', () => {
    render(<SubscriptionsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Cancel' })[0]);
    expect(screen.getByText('2 active subscriptions')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Active')).toHaveLength(2);
    expect(within(table).getAllByText('Cancelled')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Cancel' })).toHaveLength(2);
  });

  it('sends a reminder to a past due subscription', () => {
    render(<SubscriptionsTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Send reminder' })[0]
    );
    expect(screen.getByText('4 active subscriptions')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Active')).toHaveLength(4);
    expect(within(table).getAllByText('Past due')).toHaveLength(1);
  });
});
