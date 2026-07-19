import { fireEvent, render, screen } from '@testing-library/react';
import { MortgageCalculatorTemplate } from '../MortgageCalculatorTemplate';

describe('MortgageCalculatorTemplate', () => {
  it('renders the calculator form', () => {
    render(<MortgageCalculatorTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Mortgage Calculator' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Estimate your monthly payment.')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Home price')).toBeInTheDocument();
    expect(screen.getByLabelText('Down payment')).toBeInTheDocument();
    expect(screen.getByLabelText('Interest rate')).toBeInTheDocument();
    expect(screen.getByLabelText('Loan term (years)')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Calculate' })
    ).toBeInTheDocument();
    expect(screen.queryByText('$3,212/mo')).not.toBeInTheDocument();
  });

  it('shows the monthly payment after calculating', () => {
    render(<MortgageCalculatorTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Calculate' }));
    expect(screen.getByText('$3,212/mo')).toBeInTheDocument();
    expect(screen.getByText('$600,000')).toBeInTheDocument();
    expect(screen.getByText('360')).toBeInTheDocument();
    expect(screen.getByText('360 payments over 30 years')).toBeInTheDocument();
    expect(screen.getByText('$750,000')).toBeInTheDocument();
    expect(screen.getByText('$150,000')).toBeInTheDocument();
  });
});
