import MarginalUtilityLabPage from '@/app/(games)/marginal-utility/lab/page';
import { render, screen } from '@testing-library/react';

describe('MarginalUtilityLabPage', () => {
  it('renders the marginal utility lab', () => {
    render(<MarginalUtilityLabPage />);
    expect(
      screen.getByRole('heading', { name: /Marginal Utility Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('income')).toBeInTheDocument();
    expect(screen.getByTestId('buy-apple')).toBeInTheDocument();
  });
});
