import AuctionPage from '@/app/(games)/auction-theory/auction/page';
import { render, screen } from '@testing-library/react';

describe('AuctionPage', () => {
  it('renders the auction simulator', () => {
    render(<AuctionPage />);
    expect(
      screen.getByRole('heading', { name: /Auction Simulator/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Choose an auction format:')).toBeInTheDocument();
  });
});
