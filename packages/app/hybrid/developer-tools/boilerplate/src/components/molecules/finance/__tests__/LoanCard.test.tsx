import { render, screen } from '@testing-library/react';
import { LoanCard } from '../LoanCard';

describe('LoanCard', () => {
  it('renders lender and balance', () => {
    render(
      <LoanCard lender="Bank" principal={10000} balance={7500} rate={6.5} />
    );
    expect(screen.getByText('Bank')).toBeInTheDocument();
    expect(screen.getByTestId('loan-balance')).toHaveTextContent('$7,500');
  });

  it('shows percentage repaid', () => {
    render(
      <LoanCard lender="Bank" principal={10000} balance={7500} rate={6.5} />
    );
    expect(screen.getByText('25% repaid')).toBeInTheDocument();
  });

  it('renders rate', () => {
    render(
      <LoanCard lender="Bank" principal={10000} balance={7500} rate={6.5} />
    );
    expect(screen.getByText('6.5%')).toBeInTheDocument();
  });

  it('renders term and next payment when provided', () => {
    render(
      <LoanCard
        lender="Bank"
        principal={10000}
        balance={7500}
        rate={6.5}
        term="36 months"
        nextPayment="Aug 20"
      />
    );
    expect(screen.getByText('36 months')).toBeInTheDocument();
    expect(screen.getByText('Aug 20')).toBeInTheDocument();
  });
});
