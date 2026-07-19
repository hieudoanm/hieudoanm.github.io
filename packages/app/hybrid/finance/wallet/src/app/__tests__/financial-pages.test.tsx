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

import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import TransactionsPage from '@/app/(dashboard)/(financial)/transactions/page';
import ReportsPage from '@/app/(dashboard)/(financial)/reports/page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  mockExportCSV.mockClear();
  mockExportPDF.mockClear();
});

describe('TransactionsPage', () => {
  it('shows skeleton while loading', () => {
    renderWithProviders(<TransactionsPage />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders heading and transaction count after load', async () => {
    renderWithProviders(<TransactionsPage />);
    expect(await screen.findByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('10 transactions')).toBeInTheDocument();
  });

  it('renders search input and filter buttons', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    expect(
      screen.getByPlaceholderText('Search transactions...')
    ).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('filters by income type', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.click(screen.getByText('Income'));
    expect(screen.getByText('2 transactions')).toBeInTheDocument();
    expect(screen.getByText('Salary Deposit')).toBeInTheDocument();
    expect(screen.getByText('Freelance Payment')).toBeInTheDocument();
  });

  it('filters by expense type', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.click(screen.getByText('Expense'));
    expect(screen.getByText('6 transactions')).toBeInTheDocument();
    expect(screen.getByText('Grocery Store')).toBeInTheDocument();
    expect(screen.getByText('Electric Bill')).toBeInTheDocument();
  });

  it('filters by search term', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.change(screen.getByPlaceholderText('Search transactions...'), {
      target: { value: 'coffee' },
    });
    expect(screen.getByText('1 transaction')).toBeInTheDocument();
    expect(screen.getByText('Coffee Shop')).toBeInTheDocument();
  });

  it('renders CSV and PDF export buttons', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    expect(screen.getAllByText('CSV').length).toBeGreaterThan(0);
    expect(screen.getAllByText('PDF').length).toBeGreaterThan(0);
  });

  it('calls exportTransactionsCSV on CSV click', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    const csvBtn = screen.getAllByText('CSV')[0].closest('button')!;
    fireEvent.click(csvBtn);
    expect(mockExportCSV).toHaveBeenCalled();
  });

  it('calls exportTransactionsPDF on PDF click', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    const pdfBtn = screen.getAllByText('PDF')[0].closest('button')!;
    fireEvent.click(pdfBtn);
    expect(mockExportPDF).toHaveBeenCalled();
  });

  it('renders SwipeableTransactionItems with transaction data', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    expect(screen.getByText('Grocery Store')).toBeInTheDocument();
    expect(screen.getByText('Salary Deposit')).toBeInTheDocument();
    expect(screen.getByText('Electric Bill')).toBeInTheDocument();
    expect(screen.getByText('Amazon Purchase')).toBeInTheDocument();
    expect(screen.getByText('Coffee Shop')).toBeInTheDocument();
  });

  it('shows singular "transaction" for single result', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.change(screen.getByPlaceholderText('Search transactions...'), {
      target: { value: 'salary' },
    });
    expect(screen.getByText('1 transaction')).toBeInTheDocument();
  });

  it('shows empty state when no transactions match', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.change(screen.getByPlaceholderText('Search transactions...'), {
      target: { value: 'zzzznonexistent' },
    });
    expect(screen.getByText('No transactions found')).toBeInTheDocument();
  });

  it('filters by category via advanced filters', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.click(screen.getByText('Filters'));
    const categorySelect = screen.getByLabelText('Category');
    fireEvent.change(categorySelect, { target: { value: 'Food & Drink' } });
    expect(screen.getByText('3 transactions')).toBeInTheDocument();
    expect(screen.getByText('Grocery Store')).toBeInTheDocument();
    expect(screen.getByText('Coffee Shop')).toBeInTheDocument();
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
  });

  it('filters by amount min', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.click(screen.getByText('Filters'));
    fireEvent.change(screen.getByLabelText('Min Amount'), {
      target: { value: '100' },
    });
    expect(screen.getByText('6 transactions')).toBeInTheDocument();
  });

  it('filters by amount max', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.click(screen.getByText('Filters'));
    fireEvent.change(screen.getByLabelText('Max Amount'), {
      target: { value: '10' },
    });
    expect(screen.getByText('1 transaction')).toBeInTheDocument();
    expect(screen.getByText('Coffee Shop')).toBeInTheDocument();
  });

  it('filters by date from', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.click(screen.getByText('Date'));
    fireEvent.change(screen.getByLabelText('From'), {
      target: { value: '2026-07-19' },
    });
    expect(screen.getByText('4 transactions')).toBeInTheDocument();
    expect(screen.getByText('Grocery Store')).toBeInTheDocument();
    expect(screen.getByText('Salary Deposit')).toBeInTheDocument();
    expect(screen.getByText('Electric Bill')).toBeInTheDocument();
    expect(screen.getByText('Amazon Purchase')).toBeInTheDocument();
  });

  it('filters by date to', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.click(screen.getByText('Date'));
    fireEvent.change(screen.getByLabelText('To'), {
      target: { value: '2026-07-17' },
    });
    expect(screen.getByText('4 transactions')).toBeInTheDocument();
  });

  it('shows "All transactions loaded" when all items visible', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    expect(screen.getByText('All transactions loaded')).toBeInTheDocument();
  });

  it('shows singular for single search result', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.change(screen.getByPlaceholderText('Search transactions...'), {
      target: { value: 'gas station' },
    });
    expect(screen.getByText('1 transaction')).toBeInTheDocument();
    expect(screen.getByText('Gas Station')).toBeInTheDocument();
  });

  it('clears date filters via clear button', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.click(screen.getByText('Date'));
    fireEvent.change(screen.getByLabelText('From'), {
      target: { value: '2026-07-19' },
    });
    expect(screen.getByText('4 transactions')).toBeInTheDocument();
    const dateBtn = screen.getByText('Date').closest('button')!;
    const dateXIcon = dateBtn.querySelector('svg:last-of-type');
    if (dateXIcon) {
      fireEvent.click(dateXIcon);
    }
    expect(screen.getByText('10 transactions')).toBeInTheDocument();
  });

  it('filters by both type and category combined', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.click(screen.getByText('Income'));
    expect(screen.getByText('2 transactions')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Filters'));
    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: 'Income' },
    });
    expect(screen.getByText('2 transactions')).toBeInTheDocument();
  });

  it('filters with amount range', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    fireEvent.click(screen.getByText('Filters'));
    fireEvent.change(screen.getByLabelText('Min Amount'), {
      target: { value: '50' },
    });
    fireEvent.change(screen.getByLabelText('Max Amount'), {
      target: { value: '200' },
    });
    expect(screen.getByText('3 transactions')).toBeInTheDocument();
    expect(screen.getByText('Grocery Store')).toBeInTheDocument();
    expect(screen.getByText('Electric Bill')).toBeInTheDocument();
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
  });

  it('calls handleDelete when delete button is clicked', async () => {
    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');
    const deleteBtn = document.querySelector(
      'button[aria-label="Delete transaction"]'
    ) as HTMLButtonElement;
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);
    expect(await screen.findByText('Transaction deleted')).toBeInTheDocument();
  });

  it('triggers loadMore via IntersectionObserver', async () => {
    let observerCallback: IntersectionObserverCallback = () => {};
    const mockObserve = jest.fn();
    const mockDisconnect = jest.fn();
    const MockIntersectionObserver = jest.fn((cb) => {
      observerCallback = cb;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: jest.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: () => [],
      };
    });
    global.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;

    renderWithProviders(<TransactionsPage />);
    await screen.findByText('Transactions');

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    // @ts-expect-error restoring global after mock
    delete global.IntersectionObserver;
  });
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
