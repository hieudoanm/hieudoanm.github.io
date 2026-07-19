import { render, screen } from '@testing-library/react';
import { PayrollSummary } from '../PayrollSummary';

describe('PayrollSummary', () => {
  it('renders period and monetary figures', () => {
    render(
      <PayrollSummary
        period="Aug 2026"
        gross={8000}
        net={6200}
        deductions={300}
        bonus={500}
        taxes={2000}
      />
    );
    expect(screen.getByText('Aug 2026')).toBeInTheDocument();
    expect(screen.getByText('$8,000')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
    expect(screen.getByText('-$2,000')).toBeInTheDocument();
    expect(screen.getByText('-$300')).toBeInTheDocument();
    expect(screen.getByText('$6,200')).toBeInTheDocument();
  });

  it('respects the currency prop', () => {
    render(
      <PayrollSummary period="Aug 2026" gross={1000} net={800} currency="EUR" />
    );
    expect(screen.getByText('€1,000')).toBeInTheDocument();
    expect(screen.getByText('€800')).toBeInTheDocument();
  });

  it('defaults bonus, taxes, and deductions to zero', () => {
    render(<PayrollSummary period="Aug 2026" gross={1000} net={1000} />);
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('accepts a custom className', () => {
    render(
      <PayrollSummary
        period="Aug 2026"
        gross={1000}
        net={800}
        className="shadow-xl"
      />
    );
    expect(screen.getByTestId('payroll-summary')).toHaveClass('shadow-xl');
  });
});
