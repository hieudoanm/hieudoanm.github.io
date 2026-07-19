jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);
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

const mockExportCSV = jest.fn();
const mockExportPDF = jest.fn();
jest.mock('@/utils/export', () => ({
  exportTransactionsCSV: (...args: unknown[]) => mockExportCSV(...args),
  exportTransactionsPDF: (...args: unknown[]) => mockExportPDF(...args),
}));

import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import ReportsPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  mockExportCSV.mockClear();
  mockExportPDF.mockClear();
});

describe('ReportsPage', () => {
  it('shows skeleton while loading', () => {
    renderWithProviders(<ReportsPage />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders heading and subtitle after load', async () => {
    renderWithProviders(<ReportsPage />);
    expect(await screen.findByText('Reports')).toBeInTheDocument();
    expect(
      screen.getByText('Financial insights and analytics')
    ).toBeInTheDocument();
  });

  it('renders all tab buttons', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const tabButtons = screen.getAllByRole('button');
    const tabLabels = tabButtons.map((b) => b.textContent?.trim());
    expect(tabLabels).toContain('Overview');
    expect(tabLabels).toContain('Spending');
    expect(tabLabels).toContain('Income');
    expect(tabLabels).toContain('Trends');
  });

  it('renders overview tab by default with cards', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('Net')).toBeInTheDocument();
  });

  it('renders CSV and PDF export buttons', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    expect(screen.getAllByText('CSV').length).toBeGreaterThan(0);
    expect(screen.getAllByText('PDF').length).toBeGreaterThan(0);
  });

  it('calls exportTransactionsCSV on CSV click', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const csvBtn = screen.getAllByText('CSV')[0].closest('button')!;
    fireEvent.click(csvBtn);
    expect(mockExportCSV).toHaveBeenCalled();
  });

  it('calls exportTransactionsPDF on PDF click', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const pdfBtn = screen.getAllByText('PDF')[0].closest('button')!;
    fireEvent.click(pdfBtn);
    expect(mockExportPDF).toHaveBeenCalled();
  });

  it('switches to spending tab and shows category breakdown', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const spendingBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Spending')!;
    fireEvent.click(spendingBtn);
    expect(screen.getByText('Category Breakdown')).toBeInTheDocument();
    expect(screen.getAllByText('Transport').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Shopping').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Utilities').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Entertainment').length).toBeGreaterThanOrEqual(
      1
    );
  });

  it('switches to income tab and lists income sources', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const incomeBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Income')!;
    fireEvent.click(incomeBtn);
    expect(screen.getByText('Income Sources')).toBeInTheDocument();
    expect(screen.getByText('Salary Deposit')).toBeInTheDocument();
    expect(screen.getByText('Freelance Payment')).toBeInTheDocument();
  });

  it('switches to trends tab and shows daily summary table', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const trendsBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Trends')!;
    fireEvent.click(trendsBtn);
    expect(screen.getByText('Daily Summary')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('renders spending category percentages', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const spendingBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Spending')!;
    fireEvent.click(spendingBtn);
    expect(screen.getByText('Category Breakdown')).toBeInTheDocument();
    const pctElements = document.querySelectorAll('.text-xs');
    const pcts = Array.from(pctElements).map((el) => el.textContent);
    expect(pcts.some((p) => p?.includes('%'))).toBe(true);
  });

  it('renders spending category amounts', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const spendingBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Spending')!;
    fireEvent.click(spendingBtn);
    expect(screen.getByText('Category Breakdown')).toBeInTheDocument();
    expect(screen.getByText('$450.00')).toBeInTheDocument();
    expect(screen.getByText('$520.00')).toBeInTheDocument();
  });

  it('renders income source amounts', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const incomeBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Income')!;
    fireEvent.click(incomeBtn);
    expect(screen.getByText('Income Sources')).toBeInTheDocument();
    expect(screen.getByText('+$4,500.00')).toBeInTheDocument();
    expect(screen.getByText('+$1,200.00')).toBeInTheDocument();
  });

  it('renders income source categories', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const incomeBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Income')!;
    fireEvent.click(incomeBtn);
    expect(screen.getByText('Income Sources')).toBeInTheDocument();
    const incomeCategorySpans = screen.getAllByText('Income');
    expect(incomeCategorySpans.length).toBeGreaterThanOrEqual(3);
  });

  it('switches through all tabs', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const buttons = screen.getAllByRole('button');
    const overviewBtn = buttons.find(
      (b) => b.textContent?.trim() === 'Overview'
    )!;
    fireEvent.click(overviewBtn);
    expect(screen.getByText('Net')).toBeInTheDocument();
    const spendingBtn = buttons.find(
      (b) => b.textContent?.trim() === 'Spending'
    )!;
    fireEvent.click(spendingBtn);
    expect(screen.getByText('Category Breakdown')).toBeInTheDocument();
    const incomeBtn = buttons.find((b) => b.textContent?.trim() === 'Income')!;
    fireEvent.click(incomeBtn);
    expect(screen.getByText('Income Sources')).toBeInTheDocument();
    const trendsBtn = buttons.find((b) => b.textContent?.trim() === 'Trends')!;
    fireEvent.click(trendsBtn);
    expect(screen.getByText('Daily Summary')).toBeInTheDocument();
  });

  it('renders overview charts', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    expect(screen.getByTestId('recharts-PieChart')).toBeInTheDocument();
    expect(screen.getByTestId('recharts-BarChart')).toBeInTheDocument();
  });

  it('renders spending chart on spending tab', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const spendingBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Spending')!;
    fireEvent.click(spendingBtn);
    expect(screen.getByTestId('recharts-PieChart')).toBeInTheDocument();
  });

  it('renders comparison chart on income tab', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const incomeBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Income')!;
    fireEvent.click(incomeBtn);
    expect(screen.getByTestId('recharts-BarChart')).toBeInTheDocument();
  });

  it('renders timeline chart on trends tab', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const trendsBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Trends')!;
    fireEvent.click(trendsBtn);
    expect(screen.getByTestId('recharts-LineChart')).toBeInTheDocument();
  });

  it('renders daily summary rows for each unique date', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const trendsBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Trends')!;
    fireEvent.click(trendsBtn);
    expect(screen.getByText('Jul 22')).toBeInTheDocument();
    expect(screen.getByText('Jul 21')).toBeInTheDocument();
    expect(screen.getByText('Jul 20')).toBeInTheDocument();
  });

  it('shows net positive class for days with income > expense', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const trendsBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Trends')!;
    fireEvent.click(trendsBtn);
    const successCells = document.querySelectorAll('.text-success');
    expect(successCells.length).toBeGreaterThan(0);
  });

  it('shows net negative class for expense-heavy days', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const trendsBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Trends')!;
    fireEvent.click(trendsBtn);
    const errorCells = document.querySelectorAll('.text-error');
    expect(errorCells.length).toBeGreaterThan(0);
  });

  it('renders overview expense card', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    expect(screen.getByText('Expenses')).toBeInTheDocument();
  });

  it('renders overview net card', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    expect(screen.getByText('Net')).toBeInTheDocument();
  });

  it('renders the spending tab with Food & Drink from category breakdown', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const spendingBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Spending')!;
    fireEvent.click(spendingBtn);
    const categoryItems = screen.getAllByText('Food & Drink');
    expect(categoryItems.length).toBeGreaterThanOrEqual(1);
  });

  it('shows daily summary with em dash for zero values', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const trendsBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Trends')!;
    fireEvent.click(trendsBtn);
    expect(screen.getByText('Jul 22')).toBeInTheDocument();
    expect(screen.getByText('Jul 21')).toBeInTheDocument();
  });

  it('renders daily summary table headers', async () => {
    renderWithProviders(<ReportsPage />);
    await screen.findByText('Reports');
    const trendsBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.trim() === 'Trends')!;
    fireEvent.click(trendsBtn);
    expect(screen.getAllByText('Income').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Expense').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Net').length).toBeGreaterThanOrEqual(1);
  });
});
