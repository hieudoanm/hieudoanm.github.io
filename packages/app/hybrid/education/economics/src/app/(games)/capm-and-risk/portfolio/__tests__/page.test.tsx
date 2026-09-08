import PortfolioPage from '@/app/(games)/capm-and-risk/portfolio/page';
import { render, screen } from '@testing-library/react';

describe('PortfolioPage', () => {
  it('renders the portfolio lab', () => {
    render(<PortfolioPage />);
    expect(
      screen.getByRole('heading', { name: /Portfolio Lab/ })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Bend the two-asset portfolio/)
    ).toBeInTheDocument();
  });
});
