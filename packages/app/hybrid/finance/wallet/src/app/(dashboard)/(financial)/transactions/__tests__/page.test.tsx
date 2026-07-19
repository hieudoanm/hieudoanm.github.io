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
import TransactionsPage from '../page';

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
