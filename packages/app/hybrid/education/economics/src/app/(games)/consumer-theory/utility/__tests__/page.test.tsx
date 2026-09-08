import BudgetLineLabPage from '@/app/(games)/consumer-theory/utility/page';
import { render, screen } from '@testing-library/react';

describe('BudgetLineLabPage', () => {
  it('renders the budget line lab', () => {
    render(<BudgetLineLabPage />);
    expect(
      screen.getByRole('heading', { name: /Budget Line Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('income')).toBeInTheDocument();
  });
});
