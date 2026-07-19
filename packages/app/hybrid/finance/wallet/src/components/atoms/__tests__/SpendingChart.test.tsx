import { render, screen } from '@testing-library/react';
import SpendingChart from '../SpendingChart';
import type { Transaction, BudgetCategory } from '@/types';

jest.mock('recharts', () => {
  const React = require('react');
  const wrap = (name: string) => {
    const C = ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) =>
      React.createElement(
        'div',
        { 'data-testid': `recharts-${name}`, ...props },
        children
      );
    C.displayName = name;
    return C;
  };
  const Stub = ({ children }: React.PropsWithChildren) =>
    React.createElement('div', null, children);
  return {
    ResponsiveContainer: wrap('ResponsiveContainer'),
    PieChart: wrap('PieChart'),
    Pie: wrap('Pie'),
    Cell: wrap('Cell'),
    LineChart: wrap('LineChart'),
    Line: wrap('Line'),
    BarChart: wrap('BarChart'),
    Bar: wrap('Bar'),
    XAxis: wrap('XAxis'),
    YAxis: wrap('YAxis'),
    CartesianGrid: wrap('CartesianGrid'),
    Tooltip: wrap('Tooltip'),
    Legend: wrap('Legend'),
  };
});

const makeTx = (overrides: Partial<Transaction>): Transaction => ({
  id: '1',
  accountId: 'a1',
  title: 'Test',
  category: 'Food & Drink',
  amount: -50,
  currency: 'USD',
  date: '2026-08-01T10:00:00',
  type: 'expense',
  ...overrides,
});

const makeBudgetCategory = (
  overrides: Partial<BudgetCategory>
): BudgetCategory => ({
  id: '1',
  name: 'Food & Drink',
  spent: 200,
  limit: 500,
  color: '#1a93e0',
  ...overrides,
});

describe('SpendingChart', () => {
  describe('type: category', () => {
    it('renders the pie chart with known category colors', () => {
      const cats = [
        makeBudgetCategory({ id: '1', name: 'Food & Drink', spent: 200 }),
        makeBudgetCategory({ id: '2', name: 'Transport', spent: 100 }),
      ];
      render(
        <SpendingChart
          transactions={[]}
          budgetCategories={cats}
          type="category"
        />
      );
      expect(screen.getByText('Spending by Category')).toBeInTheDocument();
      expect(screen.getByText('Food & Drink')).toBeInTheDocument();
      expect(screen.getByText('Transport')).toBeInTheDocument();
    });

    it('renders unknown category with fallback color', () => {
      const cats = [
        makeBudgetCategory({ id: '1', name: 'Miscellaneous', spent: 50 }),
      ];
      render(
        <SpendingChart
          transactions={[]}
          budgetCategories={cats}
          type="category"
        />
      );
      expect(screen.getByText('Miscellaneous')).toBeInTheDocument();
      const swatch = screen
        .getByText('Miscellaneous')
        .closest('div')!
        .querySelector('div');
      expect(swatch).toHaveStyle({ backgroundColor: '#94a3b8' });
    });

    it('computes and displays percentage for each category', () => {
      const cats = [
        makeBudgetCategory({ id: '1', name: 'Food & Drink', spent: 75 }),
        makeBudgetCategory({ id: '2', name: 'Transport', spent: 25 }),
      ];
      render(
        <SpendingChart
          transactions={[]}
          budgetCategories={cats}
          type="category"
        />
      );
      expect(screen.getByText('(75%)')).toBeInTheDocument();
      expect(screen.getByText('(25%)')).toBeInTheDocument();
    });

    it('renders pie chart and cells', () => {
      const cats = [
        makeBudgetCategory({ id: '1', name: 'Food & Drink', spent: 100 }),
      ];
      const { container } = render(
        <SpendingChart
          transactions={[]}
          budgetCategories={cats}
          type="category"
        />
      );
      expect(
        container.querySelector('[data-testid="recharts-PieChart"]')
      ).toBeInTheDocument();
      expect(
        container.querySelector('[data-testid="recharts-Pie"]')
      ).toBeInTheDocument();
    });
  });

  describe('type: timeline', () => {
    it('groups income and expense transactions by day', () => {
      const txs = [
        makeTx({
          id: '1',
          date: '2026-08-01T09:00:00',
          type: 'income',
          amount: 1000,
        }),
        makeTx({
          id: '2',
          date: '2026-08-01T12:00:00',
          type: 'expense',
          amount: -200,
        }),
        makeTx({
          id: '3',
          date: '2026-08-02T10:00:00',
          type: 'expense',
          amount: -50,
        }),
      ];
      render(
        <SpendingChart
          transactions={txs}
          budgetCategories={[]}
          type="timeline"
        />
      );
      expect(screen.getByText('Spending Over Time')).toBeInTheDocument();
    });

    it('renders line chart elements', () => {
      const txs = [makeTx({ id: '1', type: 'income', amount: 500 })];
      const { container } = render(
        <SpendingChart
          transactions={txs}
          budgetCategories={[]}
          type="timeline"
        />
      );
      expect(
        container.querySelector('[data-testid="recharts-LineChart"]')
      ).toBeInTheDocument();
    });

    it('ignores transfer type transactions', () => {
      const txs = [
        makeTx({
          id: '1',
          date: '2026-08-01T09:00:00',
          type: 'transfer',
          amount: 100,
        }),
      ];
      render(
        <SpendingChart
          transactions={txs}
          budgetCategories={[]}
          type="timeline"
        />
      );
      expect(screen.getByText('Spending Over Time')).toBeInTheDocument();
    });

    it('sorts dates in ascending order', () => {
      const txs = [
        makeTx({
          id: '1',
          date: '2026-08-03T10:00:00',
          type: 'income',
          amount: 100,
        }),
        makeTx({
          id: '2',
          date: '2026-08-01T10:00:00',
          type: 'income',
          amount: 200,
        }),
        makeTx({
          id: '3',
          date: '2026-08-02T10:00:00',
          type: 'expense',
          amount: -50,
        }),
      ];
      render(
        <SpendingChart
          transactions={txs}
          budgetCategories={[]}
          type="timeline"
        />
      );
      expect(screen.getByText('Spending Over Time')).toBeInTheDocument();
    });
  });

  describe('type: comparison', () => {
    it('renders bar chart with income vs expense', () => {
      const txs = [
        makeTx({ id: '1', type: 'income', amount: 5000 }),
        makeTx({ id: '2', type: 'expense', amount: -3000 }),
      ];
      render(
        <SpendingChart
          transactions={txs}
          budgetCategories={[]}
          type="comparison"
        />
      );
      expect(screen.getByText('Income vs Expense')).toBeInTheDocument();
    });

    it('renders bar chart elements', () => {
      const txs = [makeTx({ id: '1', type: 'income', amount: 100 })];
      const { container } = render(
        <SpendingChart
          transactions={txs}
          budgetCategories={[]}
          type="comparison"
        />
      );
      expect(
        container.querySelector('[data-testid="recharts-BarChart"]')
      ).toBeInTheDocument();
    });

    it('handles only income transactions', () => {
      const txs = [makeTx({ id: '1', type: 'income', amount: 1000 })];
      render(
        <SpendingChart
          transactions={txs}
          budgetCategories={[]}
          type="comparison"
        />
      );
      expect(screen.getByText('Income vs Expense')).toBeInTheDocument();
    });

    it('handles only expense transactions', () => {
      const txs = [makeTx({ id: '1', type: 'expense', amount: -500 })];
      render(
        <SpendingChart
          transactions={txs}
          budgetCategories={[]}
          type="comparison"
        />
      );
      expect(screen.getByText('Income vs Expense')).toBeInTheDocument();
    });

    it('handles empty transactions', () => {
      render(
        <SpendingChart
          transactions={[]}
          budgetCategories={[]}
          type="comparison"
        />
      );
      expect(screen.getByText('Income vs Expense')).toBeInTheDocument();
    });
  });

  describe('unknown type', () => {
    it('returns null for unrecognized type', () => {
      const { container } = render(
        <SpendingChart
          transactions={[]}
          budgetCategories={[]}
          type={'unknown' as 'category'}
        />
      );
      expect(container.firstChild).toBeNull();
    });
  });
});
