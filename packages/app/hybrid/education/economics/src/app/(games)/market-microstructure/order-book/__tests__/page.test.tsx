import OrderBookPage from '@/app/(games)/market-microstructure/order-book/page';
import { render, screen } from '@testing-library/react';

describe('OrderBookPage', () => {
  it('renders the order book game', () => {
    render(<OrderBookPage />);
    expect(
      screen.getByRole('heading', { name: /Order Book/ })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) => element?.textContent === 'Round 1 / 10'
      )
    ).toBeInTheDocument();
  });
});
