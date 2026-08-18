import { render, screen, fireEvent } from '@testing-library/react';
import { Discount } from '@/types/pos';
import { DiscountManager } from '../DiscountManager';

const DISCOUNTS: Discount[] = [
  {
    id: 'd1',
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    usedCount: 0,
    active: true,
  },
  {
    id: 'd2',
    code: 'OFF5',
    type: 'fixed',
    value: 5,
    usedCount: 0,
    minPurchase: 20,
    maxUses: 5,
    active: true,
  },
];

const renderComponent = (
  props: Partial<React.ComponentProps<typeof DiscountManager>> = {}
) => {
  const defaultProps = {
    discounts: DISCOUNTS,
    onAdd: jest.fn(),
    onRemove: jest.fn(),
    onBack: jest.fn(),
    ...props,
  };
  return { ...render(<DiscountManager {...defaultProps} />), ...defaultProps };
};

describe('DiscountManager', () => {
  it('renders empty state when no discounts', () => {
    renderComponent({ discounts: [] });
    expect(screen.getByText('No discounts configured')).toBeInTheDocument();
  });

  it('renders existing discounts with details', () => {
    renderComponent();
    expect(screen.getByText('SAVE10')).toBeInTheDocument();
    expect(screen.getByText('OFF5')).toBeInTheDocument();
    expect(screen.getByText(/10% off/)).toBeInTheDocument();
    expect(screen.getByText(/\$5 off/)).toBeInTheDocument();
  });

  it('adds new discount with code and value', () => {
    const { onAdd } = renderComponent({ discounts: [] });
    fireEvent.change(screen.getByPlaceholderText('Code'), {
      target: { value: 'NEWCODE' },
    });
    fireEvent.change(screen.getByPlaceholderText('Value'), {
      target: { value: '15' },
    });
    fireEvent.click(screen.getByText('Add'));
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'NEWCODE', value: 15 })
    );
  });

  it('removes discount when trash button clicked', () => {
    const { onRemove } = renderComponent();
    const trashButtons = screen
      .getAllByRole('button')
      .filter((b) => b.querySelector('svg'));
    fireEvent.click(trashButtons[trashButtons.length - 1]);
    expect(onRemove).toHaveBeenCalledWith('d2');
  });

  it('calls onBack when back button clicked', () => {
    const { onBack } = renderComponent();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
