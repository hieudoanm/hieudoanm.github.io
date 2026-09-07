import SavingsPage from '@/app/(games)/time-inconsistency/savings/page';
import { render, screen } from '@testing-library/react';

describe('SavingsPage', () => {
  it('renders the commitment device game', () => {
    render(<SavingsPage />);
    expect(
      screen.getByRole('heading', { name: /Commitment Device/ })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Choose your savings strategy/)
    ).toBeInTheDocument();
  });
});
