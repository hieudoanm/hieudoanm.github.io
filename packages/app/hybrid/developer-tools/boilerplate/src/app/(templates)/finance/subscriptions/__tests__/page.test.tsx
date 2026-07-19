import { render, screen } from '@testing-library/react';
import SubscriptionsPage from '@/app/(templates)/finance/subscriptions/page';

describe('SubscriptionsPage', () => {
  it('renders the SubscriptionsPage', () => {
    render(<SubscriptionsPage />);
    expect(screen.getByText('3 active subscriptions')).toBeInTheDocument();
  });
});
