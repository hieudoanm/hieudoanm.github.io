import { render, screen, fireEvent } from '@testing-library/react';
import CardsPage from '../page';

const mockShowToast = jest.fn();
const mockUpdateCard = jest.fn().mockResolvedValue(undefined);

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

const mockUseData = jest.fn();
jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockUseData(),
}));

jest.mock('@/components/atoms', () => ({
  CardItem: ({
    card,
    selected,
    onSelect,
  }: {
    card: { id: string; name: string };
    selected: boolean;
    onSelect: (id: string) => void;
  }) => (
    <div
      data-testid="card-item"
      data-selected={selected}
      onClick={() => onSelect(card.id)}>
      {card.name}
    </div>
  ),
  CardDetail: ({
    card,
    onToggleFreeze,
  }: {
    card: { id: string; name: string };
    onToggleFreeze: () => void;
  }) => (
    <div data-testid="card-detail">
      <button onClick={onToggleFreeze}>Toggle Freeze</button>
    </div>
  ),
  TransactionItem: ({
    transaction,
  }: {
    transaction: { id: string; title: string };
  }) => <div data-testid="transaction-item">{transaction.title}</div>,
}));

jest.mock('@/components/atoms/Skeleton', () => ({
  __esModule: true,
  default: ({ className }: { className?: string }) => (
    <div className={className} data-testid="skeleton" />
  ),
  SkeletonCard: ({ className }: { className?: string }) => (
    <div data-testid="skeleton-card" className={className} />
  ),
  SkeletonText: ({ className }: { className?: string }) => (
    <div data-testid="skeleton-text" className={className} />
  ),
}));

jest.mock('@/components/templates', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-template">{children}</div>
  ),
}));

jest.mock('react-icons/fi', () => ({ FiPlus: () => <span>+</span> }));

describe('CardsPage', () => {
  const mockCards = [
    {
      id: 'c1',
      name: 'Visa Gold',
      number: '4111',
      expiry: '12/26',
      type: 'visa',
      color: '#1a1a2e',
      frozen: false,
      cardholderName: 'John',
      spendingLimit: 10000,
      spentThisMonth: 3000,
      currency: 'USD',
    },
    {
      id: 'c2',
      name: 'Master Black',
      number: '5555',
      expiry: '08/27',
      type: 'mastercard',
      color: '#16213e',
      frozen: true,
      cardholderName: 'John',
      spendingLimit: 5000,
      spentThisMonth: 1200,
      currency: 'USD',
    },
  ];

  const mockTransactions = [
    {
      id: 't1',
      accountId: 'a1',
      title: 'Coffee',
      category: 'food',
      amount: 5,
      currency: 'USD',
      date: '2026-08-17',
      type: 'expense' as const,
    },
    {
      id: 't2',
      accountId: 'a1',
      title: 'Salary',
      category: 'income',
      amount: 5000,
      currency: 'USD',
      date: '2026-08-01',
      type: 'income' as const,
    },
    {
      id: 't3',
      accountId: 'a1',
      title: 'Groceries',
      category: 'food',
      amount: 50,
      currency: 'USD',
      date: '2026-08-16',
      type: 'expense' as const,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseData.mockReturnValue({
      cards: mockCards,
      transactions: mockTransactions,
      updateCard: mockUpdateCard,
      loading: false,
    });
  });

  it('shows skeleton when loading', () => {
    mockUseData.mockReturnValue({
      cards: [],
      transactions: [],
      updateCard: mockUpdateCard,
      loading: true,
    });
    const { container } = render(<CardsPage />);
    expect(screen.getAllByTestId('skeleton-card').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('skeleton-text').length).toBeGreaterThan(0);
  });

  it('renders stats with multiple cards', () => {
    render(<CardsPage />);
    expect(screen.getByText('Total Cards')).toBeInTheDocument();
    expect(screen.getByText('Total Spent')).toBeInTheDocument();
    expect(screen.getByText('Total Limit')).toBeInTheDocument();
    expect(screen.getByText('Remaining')).toBeInTheDocument();
  });

  it('shows active and frozen counts', () => {
    render(<CardsPage />);
    expect(screen.getByText('1 active, 1 frozen')).toBeInTheDocument();
  });

  it('renders all cards in the list', () => {
    render(<CardsPage />);
    const cardItems = screen.getAllByTestId('card-item');
    expect(cardItems).toHaveLength(2);
    expect(screen.getByText('Visa Gold')).toBeInTheDocument();
    expect(screen.getByText('Master Black')).toBeInTheDocument();
  });

  it('selects a different card', () => {
    render(<CardsPage />);
    const secondCard = screen.getAllByTestId('card-item')[1];
    fireEvent.click(secondCard);
    expect(secondCard).toHaveAttribute('data-selected', 'true');
  });

  it('shows card detail when activeCard exists', () => {
    render(<CardsPage />);
    expect(screen.getByTestId('card-detail')).toBeInTheDocument();
  });

  it('does not show card detail when no cards exist', () => {
    mockUseData.mockReturnValue({
      cards: [],
      transactions: [],
      updateCard: mockUpdateCard,
      loading: false,
    });
    render(<CardsPage />);
    expect(screen.queryByTestId('card-detail')).not.toBeInTheDocument();
  });

  it('shows no recent transactions message when none match', () => {
    mockUseData.mockReturnValue({
      cards: [mockCards[0]],
      transactions: [{ ...mockTransactions[1] }],
      updateCard: mockUpdateCard,
      loading: false,
    });
    render(<CardsPage />);
    expect(screen.getByText('No recent transactions')).toBeInTheDocument();
  });

  it('renders transaction items when expense transactions exist', () => {
    render(<CardsPage />);
    const txnItems = screen.getAllByTestId('transaction-item');
    expect(txnItems.length).toBeGreaterThan(0);
  });

  it('calls updateCard and showToast on toggle freeze', async () => {
    render(<CardsPage />);
    const freezeBtn = screen.getByText('Toggle Freeze');
    await fireEvent.click(freezeBtn);
    expect(mockUpdateCard).toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledWith(
      expect.stringContaining('frozen'),
      'success'
    );
  });

  it('shows unfrozen toast when card was frozen', async () => {
    mockUseData.mockReturnValue({
      cards: [{ ...mockCards[1] }],
      transactions: mockTransactions,
      updateCard: mockUpdateCard,
      loading: false,
    });
    render(<CardsPage />);
    await fireEvent.click(screen.getByText('Toggle Freeze'));
    expect(mockShowToast).toHaveBeenCalledWith(
      expect.stringContaining('unfrozen'),
      'success'
    );
  });
});
