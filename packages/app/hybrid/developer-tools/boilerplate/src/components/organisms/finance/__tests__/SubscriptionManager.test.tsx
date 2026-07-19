import { render, screen } from '@testing-library/react';
import { SubscriptionManager } from '../SubscriptionManager';

describe('SubscriptionManager', () => {
  const subscriptions = [
    {
      id: '1',
      name: 'Netflix',
      amount: 15.49,
      billing: 'month',
      status: 'active' as const,
    },
    {
      id: '2',
      name: 'Spotify',
      amount: 9.99,
      billing: 'month',
      status: 'active' as const,
    },
    {
      id: '3',
      name: 'Notion',
      amount: 8,
      billing: 'month',
      status: 'canceled' as const,
    },
  ];

  it('renders each subscription with amount and billing', () => {
    render(<SubscriptionManager subscriptions={subscriptions} />);
    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.queryByText(/renews/)).not.toBeInTheDocument();
  });

  it('computes the total for active subscriptions only', () => {
    render(<SubscriptionManager subscriptions={subscriptions} />);
    expect(screen.getByTestId('monthly-total')).toHaveTextContent('$25.48/mo');
  });

  it('renders the status badge for each subscription', () => {
    render(<SubscriptionManager subscriptions={subscriptions} />);
    expect(screen.getAllByText('active').length).toBeGreaterThan(0);
    expect(screen.getByText('canceled')).toBeInTheDocument();
  });

  it('shows an empty state when there are no subscriptions', () => {
    render(<SubscriptionManager subscriptions={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent('No subscriptions.');
  });
});
