import { render, screen } from '@testing-library/react';
import { TopItemsList } from '@/components/pos/molecules/TopItemsList';
import { StatBlock } from '@/components/pos/molecules/StatBlock';
import { AdjustmentList } from '@/components/pos/molecules/AdjustmentList';
import type { ItemSaleTotal } from '@/lib/pos';

const TOP_ITEMS: ItemSaleTotal[] = [
  { id: '1', name: 'Coffee', quantity: 2, total: 10 },
  { id: '2', name: 'Tea', quantity: 1, total: 2.5 },
];

describe('TopItemsList', () => {
  it('renders each item with its quantity and total', () => {
    render(<TopItemsList items={TOP_ITEMS} emptyMessage="No sales today" />);
    expect(screen.getByText('Coffee × 2')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });

  it('renders the empty message when there are no items', () => {
    render(<TopItemsList items={[]} emptyMessage="No sales today" />);
    expect(screen.getByText('No sales today')).toBeInTheDocument();
  });
});

describe('StatBlock', () => {
  it('renders the count, sales and tax', () => {
    render(
      <StatBlock
        title="Transactions"
        count={4}
        totalSales={100}
        totalTax={8.5}
      />
    );
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('$8.50')).toBeInTheDocument();
  });
});

describe('AdjustmentList', () => {
  const items = [
    {
      id: '1',
      name: 'Coffee',
      price: 3.5,
      category: 'Drinks',
      stock: 100,
      lowStockThreshold: 10,
    },
  ];

  const adjustments = [
    {
      id: 'a1',
      itemId: '1',
      previousStock: 80,
      newStock: 100,
      reason: 'Restocked',
      createdAt: '2026-08-18T10:00:00.000Z',
    },
  ];

  it('renders nothing when there are no adjustments', () => {
    const { container } = render(
      <AdjustmentList adjustments={[]} items={items} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the item name and the stock transition', () => {
    render(<AdjustmentList adjustments={adjustments} items={items} />);
    expect(screen.getByText('Recent Adjustments')).toBeInTheDocument();
    expect(screen.getByText(/80 → 100/)).toBeInTheDocument();
  });

  it('falls back to the item id when the item is unknown', () => {
    render(
      <AdjustmentList
        adjustments={[{ ...adjustments[0], itemId: 'missing' }]}
        items={items}
      />
    );
    expect(screen.getByText('missing')).toBeInTheDocument();
  });
});
