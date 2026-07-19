import { render, screen } from '@testing-library/react';
import { TaxSummary } from '../TaxSummary';

describe('TaxSummary', () => {
  it('renders income, deductions, and tax figures', () => {
    render(
      <TaxSummary
        grossIncome={100000}
        deductions={20000}
        credits={1000}
        taxPaid={15000}
      />
    );
    expect(screen.getByText('$100,000')).toBeInTheDocument();
    expect(screen.getByText('$20,000')).toBeInTheDocument();
    expect(screen.getByText('$15,000')).toBeInTheDocument();
  });

  it('computes an estimated refund when tax paid exceeds the estimate', () => {
    render(
      <TaxSummary
        grossIncome={100000}
        deductions={20000}
        credits={1000}
        taxPaid={20000}
      />
    );
    expect(screen.getByTestId('result')).toHaveTextContent(
      'Estimated refund: $3,400'
    );
  });

  it('shows an amount due when estimated tax exceeds payments', () => {
    render(
      <TaxSummary
        grossIncome={100000}
        deductions={0}
        credits={0}
        taxPaid={10000}
      />
    );
    expect(screen.getByTestId('result')).toHaveTextContent(
      'Amount due: $12,000'
    );
  });
});
