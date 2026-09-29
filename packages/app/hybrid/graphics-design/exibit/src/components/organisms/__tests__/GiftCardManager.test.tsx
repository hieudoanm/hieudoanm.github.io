import { render, screen, fireEvent } from '@testing-library/react';
import { GiftCard } from '@/types/pos';
import { GiftCardManager } from '../GiftCardManager';

const GIFT_CARDS: GiftCard[] = [
  {
    id: 'gc1',
    code: 'GC001',
    balance: 50,
    initialBalance: 100,
    createdAt: '2026-08-01T00:00:00.000Z',
    active: true,
  },
  {
    id: 'gc2',
    code: 'GC002',
    balance: 25,
    initialBalance: 25,
    createdAt: '2026-08-10T00:00:00.000Z',
    active: true,
  },
];

const renderComponent = (
  props: Partial<React.ComponentProps<typeof GiftCardManager>> = {}
) => {
  const defaultProps = {
    giftCards: GIFT_CARDS,
    onAdd: jest.fn(),
    onRemove: jest.fn(),
    onBack: jest.fn(),
    ...props,
  };
  return { ...render(<GiftCardManager {...defaultProps} />), ...defaultProps };
};

describe('GiftCardManager', () => {
  it('renders empty state when no gift cards', () => {
    renderComponent({ giftCards: [] });
    expect(screen.getByText('No gift cards')).toBeInTheDocument();
  });

  it('renders existing gift cards with balances', () => {
    renderComponent();
    expect(screen.getByText('GC001')).toBeInTheDocument();
    expect(screen.getByText('GC002')).toBeInTheDocument();
    expect(screen.getByText('Balance: $50.00 / $100.00')).toBeInTheDocument();
    expect(screen.getByText('Balance: $25.00 / $25.00')).toBeInTheDocument();
  });

  it('creates new gift card', () => {
    const { onAdd } = renderComponent({ giftCards: [] });
    fireEvent.change(screen.getByPlaceholderText('Code'), {
      target: { value: 'GC003' },
    });
    fireEvent.change(screen.getByPlaceholderText('Balance'), {
      target: { value: '75' },
    });
    fireEvent.click(screen.getByText('Create'));
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'GC003', balance: 75 })
    );
  });

  it('removes gift card when trash button clicked', () => {
    const { onRemove } = renderComponent();
    const trashButtons = screen
      .getAllByRole('button')
      .filter((b) => b.querySelector('svg'));
    fireEvent.click(trashButtons[trashButtons.length - 1]);
    expect(onRemove).toHaveBeenCalledWith('gc2');
  });

  it('calls onBack when back button clicked', () => {
    const { onBack } = renderComponent();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
