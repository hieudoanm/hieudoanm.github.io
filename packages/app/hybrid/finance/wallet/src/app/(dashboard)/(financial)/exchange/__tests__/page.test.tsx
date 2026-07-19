import { render, screen, fireEvent } from '@testing-library/react';
import ExchangePage from '../page';

const mockShowToast = jest.fn();

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

const mockUseData = jest.fn();

jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockUseData(),
}));

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock('@/components/templates', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-template">{children}</div>
  ),
}));

jest.mock('@/components/molecules', () => ({
  CurrencyConverter: ({
    amount,
    from,
    to,
    rates,
    converted,
    rate,
    onAmountChange,
    onFromChange,
    onToChange,
    onSwap,
    onConvert,
  }: Record<string, unknown>) => (
    <div data-testid="currency-converter">
      <input
        data-testid="amount-input"
        value={amount as string}
        onChange={(e) =>
          (onAmountChange as (v: string) => void)(e.target.value)
        }
      />
      <select
        data-testid="from-select"
        value={from as string}
        onChange={(e) => (onFromChange as (v: string) => void)(e.target.value)}>
        {(rates as { code: string }[]).map((r) => (
          <option key={r.code} value={r.code}>
            {r.code}
          </option>
        ))}
      </select>
      <select
        data-testid="to-select"
        value={to as string}
        onChange={(e) => (onToChange as (v: string) => void)(e.target.value)}>
        {(rates as { code: string }[]).map((r) => (
          <option key={r.code} value={r.code}>
            {r.code}
          </option>
        ))}
      </select>
      <span data-testid="converted-value">{converted as number}</span>
      <span data-testid="rate-value">{rate as number}</span>
      <button data-testid="swap-btn" onClick={() => (onSwap as () => void)()}>
        Swap
      </button>
      <button
        data-testid="convert-btn"
        onClick={() => (onConvert as () => void)()}>
        Convert
      </button>
    </div>
  ),
}));

jest.mock('@/components/atoms/Skeleton', () => ({
  __esModule: true,
  default: ({ className }: { className?: string }) => (
    <div data-testid="skeleton" className={className} />
  ),
  SkeletonText: ({ className }: { className?: string }) => (
    <div data-testid="skeleton-text" className={className} />
  ),
  SkeletonCard: ({ className }: { className?: string }) => (
    <div data-testid="skeleton-card" className={className} />
  ),
}));

jest.mock('react-icons/fi', () => ({ FiRepeat: () => <span>R</span> }));

describe('ExchangePage', () => {
  const mockRates = [
    { code: 'USD', name: 'US Dollar', rate: 1, symbol: '$' },
    { code: 'EUR', name: 'Euro', rate: 0.92, symbol: '€' },
    { code: 'GBP', name: 'British Pound', rate: 0.79, symbol: '£' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseData.mockReturnValue({ currencyRates: mockRates, loading: false });
  });

  it('shows skeleton when loading', () => {
    mockUseData.mockReturnValue({ currencyRates: [], loading: true });
    render(<ExchangePage />);
    expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
    expect(screen.getAllByTestId('skeleton-text').length).toBeGreaterThan(0);
  });

  it('renders heading and converter', () => {
    render(<ExchangePage />);
    expect(screen.getByText('Exchange')).toBeInTheDocument();
    expect(screen.getByText('Convert between currencies')).toBeInTheDocument();
    expect(screen.getByTestId('currency-converter')).toBeInTheDocument();
  });

  it('renders rates link', () => {
    render(<ExchangePage />);
    const link = screen.getByRole('link', { name: /rates/i });
    expect(link).toHaveAttribute('href', '/rates');
  });

  it('calculates conversion with valid rates', () => {
    render(<ExchangePage />);
    expect(screen.getByTestId('converted-value').textContent).not.toBe('0');
    expect(screen.getByTestId('rate-value').textContent).not.toBe('0');
  });

  it('returns 0 when rates not found', () => {
    mockUseData.mockReturnValue({ currencyRates: [], loading: false });
    render(<ExchangePage />);
    expect(screen.getByTestId('converted-value').textContent).toBe('0');
    expect(screen.getByTestId('rate-value').textContent).toBe('0');
  });

  it('swaps from and to currencies', () => {
    render(<ExchangePage />);
    fireEvent.click(screen.getByTestId('swap-btn'));
    expect((screen.getByTestId('from-select') as HTMLSelectElement).value).toBe(
      'EUR'
    );
    expect((screen.getByTestId('to-select') as HTMLSelectElement).value).toBe(
      'USD'
    );
  });

  it('shows toast on convert', () => {
    render(<ExchangePage />);
    fireEvent.click(screen.getByTestId('convert-btn'));
    expect(mockShowToast).toHaveBeenCalledWith(
      expect.stringContaining('Converted'),
      'success'
    );
  });

  it('updates amount via converter', () => {
    render(<ExchangePage />);
    const input = screen.getByTestId('amount-input');
    fireEvent.change(input, { target: { value: '500' } });
    expect((input as HTMLInputElement).value).toBe('500');
  });

  it('updates from currency', () => {
    render(<ExchangePage />);
    fireEvent.change(screen.getByTestId('from-select'), {
      target: { value: 'GBP' },
    });
    expect((screen.getByTestId('from-select') as HTMLSelectElement).value).toBe(
      'GBP'
    );
  });

  it('updates to currency', () => {
    render(<ExchangePage />);
    fireEvent.change(screen.getByTestId('to-select'), {
      target: { value: 'GBP' },
    });
    expect((screen.getByTestId('to-select') as HTMLSelectElement).value).toBe(
      'GBP'
    );
  });
});
