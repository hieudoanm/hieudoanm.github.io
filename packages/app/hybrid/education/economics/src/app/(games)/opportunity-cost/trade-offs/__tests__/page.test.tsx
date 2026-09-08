import TradeOffsPage from '@/app/(games)/opportunity-cost/trade-offs/page';
import { render, screen } from '@testing-library/react';

describe('TradeOffsPage', () => {
  it('renders the trade-off builder', () => {
    render(<TradeOffsPage />);
    expect(
      screen.getByRole('heading', { name: /Trade-Off Builder/ })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Explore how opportunity cost works/)
    ).toBeInTheDocument();
  });
});
