import { render, screen } from '@testing-library/react';
import PortfolioOverviewPage from '@/app/(templates)/finance/overview/page';

describe('PortfolioOverviewPage', () => {
  it('renders the PortfolioOverviewPage', () => {
    render(<PortfolioOverviewPage />);
    expect(
      screen.getByRole('heading', { name: 'Portfolio Overview' })
    ).toBeInTheDocument();
    expect(screen.getByText('$128,450')).toBeInTheDocument();
  });
});
