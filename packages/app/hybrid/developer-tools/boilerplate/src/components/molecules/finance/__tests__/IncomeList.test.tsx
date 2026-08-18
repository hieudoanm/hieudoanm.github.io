import { render, screen } from '@testing-library/react';
import { IncomeList } from '../IncomeList';

const incomes = [
  { id: '1', source: 'Salary', amount: 2500, date: 'Aug 1' },
  { id: '2', source: 'Freelance', amount: 400.5, date: 'Aug 5' },
];

describe('IncomeList', () => {
  it('renders income sources and amounts', () => {
    render(<IncomeList incomes={incomes} />);
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('+$2,500.00')).toBeInTheDocument();
    expect(screen.getByText('Freelance')).toBeInTheDocument();
    expect(screen.getByText('+$400.50')).toBeInTheDocument();
  });

  it('shows income dates', () => {
    render(<IncomeList incomes={incomes} />);
    expect(screen.getByText('Aug 5')).toBeInTheDocument();
  });

  it('limits the number of rendered items', () => {
    render(<IncomeList incomes={incomes} limit={1} />);
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.queryByText('Freelance')).not.toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<IncomeList incomes={[]} />);
    expect(screen.getByText('No income recorded')).toBeInTheDocument();
  });
});
