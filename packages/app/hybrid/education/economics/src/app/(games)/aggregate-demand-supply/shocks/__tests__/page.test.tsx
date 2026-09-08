import AggregateDemandShocksPage from '@/app/(games)/aggregate-demand-supply/shocks/page';
import { render, screen } from '@testing-library/react';

describe('AggregateDemandShocksPage', () => {
  it('renders the AD-AS shocks lab', () => {
    render(<AggregateDemandShocksPage />);
    expect(
      screen.getByRole('heading', { name: /AD-AS Shocks Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Short-run output gap')).toBeInTheDocument();
    expect(screen.getByText('Price level vs last round')).toBeInTheDocument();
  });
});
