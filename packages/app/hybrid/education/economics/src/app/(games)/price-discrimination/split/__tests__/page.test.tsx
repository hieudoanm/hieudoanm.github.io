import SplitPricingPage from '@/app/(games)/price-discrimination/split/page';
import { render, screen } from '@testing-library/react';

describe('SplitPricingPage', () => {
  it('renders the segment pricing lab', () => {
    render(<SplitPricingPage />);
    expect(
      screen.getByRole('heading', { name: /Segment Pricing Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/Round 1 \/ 4/)).toBeInTheDocument();
  });
});
