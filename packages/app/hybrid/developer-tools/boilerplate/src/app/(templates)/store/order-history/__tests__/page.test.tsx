import { render, screen } from '@testing-library/react';
import OrderHistoryPage from '@/app/(templates)/store/order-history/page';

describe('OrderHistoryPage', () => {
  it('renders order history', () => {
    render(<OrderHistoryPage />);
    expect(screen.getAllByText('Order history').length).toBeGreaterThan(0);
  });
});
