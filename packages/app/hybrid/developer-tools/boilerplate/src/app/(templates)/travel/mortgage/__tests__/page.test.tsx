import { render, screen } from '@testing-library/react';
import MortgagePage from '@/app/(templates)/travel/mortgage/page';

describe('MortgagePage', () => {
  it('renders the mortgage calculator page', () => {
    render(<MortgagePage />);
    expect(
      screen.getByRole('heading', { name: 'Mortgage Calculator' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Estimate your monthly payment.')
    ).toBeInTheDocument();
  });
});
