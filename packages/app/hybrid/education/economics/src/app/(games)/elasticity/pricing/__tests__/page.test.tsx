import PricingPage from '@/app/(games)/elasticity/pricing/page';
import { render, screen } from '@testing-library/react';

describe('PricingPage', () => {
  it('renders the Revenue Explorer game', () => {
    render(<PricingPage />);
    expect(
      screen.getByRole('heading', { name: /Revenue Explorer/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/Elasticity of demand/)).toBeInTheDocument();
  });
});
