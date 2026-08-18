import { render, screen } from '@testing-library/react';
import BudgetsPage from '@/app/(templates)/finance/budgets/page';

describe('BudgetsPage', () => {
  it('renders the BudgetsPage', () => {
    render(<BudgetsPage />);
    expect(screen.getByText('$26,000')).toBeInTheDocument();
  });
});
