import { fireEvent, render, screen, within } from '@testing-library/react';
import { DividendIncomeTemplate } from '../DividendIncomeTemplate';

describe('DividendIncomeTemplate', () => {
  it('renders dividend stats and the payout table', () => {
    render(<DividendIncomeTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Dividend Income' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 stocks')).toBeInTheDocument();
    expect(screen.getByText('$874.10')).toBeInTheDocument();
    expect(screen.getByText('2.7%')).toBeInTheDocument();
    expect(screen.getByText('20 / year')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('row')).toHaveLength(6);
    expect(within(table).getByText('SCHD')).toBeInTheDocument();
    expect(within(table).getByText('$186.25')).toBeInTheDocument();
  });

  it('toggles dividend reinvestment', () => {
    render(<DividendIncomeTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Reinvest dividends' }));
    expect(
      screen.getByRole('button', { name: 'Reinvesting on' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Dividends will be automatically reinvested.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reinvesting on' }));
    expect(
      screen.getByRole('button', { name: 'Reinvest dividends' })
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Dividends will be automatically reinvested.')
    ).not.toBeInTheDocument();
  });
});
