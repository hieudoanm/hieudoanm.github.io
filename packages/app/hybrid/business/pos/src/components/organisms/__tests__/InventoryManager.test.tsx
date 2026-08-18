import { render, screen, fireEvent } from '@testing-library/react';
import { Item, InventoryAdjustment } from '@/types/pos';
import { InventoryManager } from '../InventoryManager';

const ITEMS: Item[] = [
  {
    id: '1',
    name: 'Coffee',
    price: 3.5,
    category: 'Drinks',
    stock: 100,
    lowStockThreshold: 10,
  },
  {
    id: '2',
    name: 'Tea',
    price: 2.5,
    category: 'Drinks',
    stock: 3,
    lowStockThreshold: 10,
  },
];

const ADJUSTMENTS: InventoryAdjustment[] = [
  {
    id: 'a1',
    itemId: '1',
    previousStock: 80,
    newStock: 100,
    reason: 'Restocked',
    createdAt: '2026-08-18T10:00:00.000Z',
  },
];

const renderComponent = (
  props: Partial<React.ComponentProps<typeof InventoryManager>> = {}
) => {
  const defaultProps = {
    items: ITEMS,
    adjustments: [] as InventoryAdjustment[],
    onUpdateStock: jest.fn(),
    onBack: jest.fn(),
    ...props,
  };
  return { ...render(<InventoryManager {...defaultProps} />), ...defaultProps };
};

describe('InventoryManager', () => {
  it('renders header with item count', () => {
    renderComponent();
    expect(screen.getByText('Inventory')).toBeInTheDocument();
    expect(screen.getByText('All (2)')).toBeInTheDocument();
  });

  it('highlights low stock rows with bg-warning/10', () => {
    renderComponent();
    const teaRow = screen.getByText('Tea').closest('tr');
    expect(teaRow?.className).toContain('bg-warning/10');
    const coffeeRow = screen.getByText('Coffee').closest('tr');
    expect(coffeeRow?.className).not.toContain('bg-warning/10');
  });

  it('shows low stock badge when items below threshold', () => {
    renderComponent();
    expect(screen.getByText(/1 low/)).toBeInTheDocument();
  });

  it('filters to show only low stock items', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Low Stock/));
    expect(screen.getByText('Tea')).toBeInTheDocument();
    expect(screen.queryByText('Coffee')).not.toBeInTheDocument();
  });

  it('opens edit mode and saves stock adjustment', () => {
    const { onUpdateStock } = renderComponent();
    const editButtons = screen
      .getAllByRole('button')
      .filter(
        (b) =>
          b.querySelector('svg') && b.className.includes('btn-ghost btn-xs')
      );
    fireEvent.click(editButtons[0]);
    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: '50' },
    });
    fireEvent.change(screen.getByPlaceholderText('Reason'), {
      target: { value: 'Restocked' },
    });
    fireEvent.click(screen.getByText('Save'));
    expect(onUpdateStock).toHaveBeenCalledWith('1', 50, 'Restocked');
  });

  it('calls onBack when back button clicked', () => {
    const { onBack } = renderComponent();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('shows recent adjustments when provided', () => {
    renderComponent({ adjustments: ADJUSTMENTS });
    expect(screen.getByText('Recent Adjustments')).toBeInTheDocument();
    expect(screen.getByText(/Restocked/)).toBeInTheDocument();
  });
});
