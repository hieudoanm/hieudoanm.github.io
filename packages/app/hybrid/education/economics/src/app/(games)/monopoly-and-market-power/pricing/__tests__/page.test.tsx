import MonopolyPricingPage from '@/app/(games)/monopoly-and-market-power/pricing/page';
import { render, screen } from '@testing-library/react';

describe('MonopolyPricingPage', () => {
  it('renders the monopoly pricing lab', () => {
    render(<MonopolyPricingPage />);
    expect(
      screen.getByRole('heading', { name: 'Monopoly Pricing Lab' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Back to Theory/ })
    ).toHaveAttribute('href', '/monopoly-and-market-power');
    expect(screen.getByTestId('monopoly-game')).toBeInTheDocument();
  });
});
