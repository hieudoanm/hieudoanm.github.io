import {
  buildReceiptText,
  buildSalesReportCsv,
  filterLowStockItems,
  getSalesReportFilename,
  isLowStock,
} from '@/lib/pos';
import type { Item, Transaction } from '@/types/pos';

const TRANSACTION: Transaction = {
  id: 'tx-receipt-test-123',
  items: [
    {
      item: {
        id: 'i1',
        name: 'Coffee',
        price: 5,
        category: 'Drinks',
        stock: 100,
        lowStockThreshold: 10,
      },
      quantity: 2,
      discount: 0,
    },
  ],
  subtotal: 10,
  tax: 1,
  total: 11,
  payments: [{ method: 'cash', amount: 15 }],
  status: 'completed',
  createdAt: '2026-08-18T10:00:00.000Z',
};

describe('buildReceiptText', () => {
  const text = buildReceiptText(TRANSACTION);

  it('includes the truncated transaction id', () => {
    expect(text).toContain('ID: tx-recei');
  });

  it('lists each line item with quantity and amount', () => {
    expect(text).toContain('Coffee x2  $10.00');
  });

  it('includes subtotal, tax and total', () => {
    expect(text).toContain('Subtotal: $10.00');
    expect(text).toContain('Tax: $1.00');
    expect(text).toContain('Total: $11.00');
  });

  it('uppercases payment methods', () => {
    expect(text).toContain('CASH: $15.00');
  });
});

describe('buildSalesReportCsv', () => {
  it('emits a header row followed by one row per transaction', () => {
    const lines = buildSalesReportCsv([TRANSACTION]);
    expect(lines.split('\n')).toHaveLength(2);
    expect(lines.split('\n')[0]).toBe(
      'Date,ID,Subtotal,Tax,Total,Payment,Status'
    );
  });

  it('joins multiple payment methods with a plus', () => {
    const split = {
      ...TRANSACTION,
      payments: [
        { method: 'cash' as const, amount: 6 },
        { method: 'card' as const, amount: 5 },
      ],
    };
    expect(buildSalesReportCsv([split])).toContain('cash+card');
  });
});

describe('getSalesReportFilename', () => {
  it('includes the period and date', () => {
    expect(getSalesReportFilename('weekly', '2026-08-18')).toBe(
      'sales-report-weekly-2026-08-18.csv'
    );
  });
});

describe('isLowStock', () => {
  const item = (stock: number, lowStockThreshold: number): Item => ({
    id: '1',
    name: 'Tea',
    price: 2.5,
    category: 'Drinks',
    stock,
    lowStockThreshold,
  });

  it('is low when stock is below the threshold', () => {
    expect(isLowStock(item(3, 10))).toBe(true);
  });

  it('is low when stock equals the threshold', () => {
    expect(isLowStock(item(10, 10))).toBe(true);
  });

  it('is not low above the threshold', () => {
    expect(isLowStock(item(11, 10))).toBe(false);
  });
});

describe('filterLowStockItems', () => {
  it('keeps only items at or below their threshold', () => {
    const base: Omit<Item, 'id' | 'name' | 'stock' | 'lowStockThreshold'> = {
      price: 2.5,
      category: 'Drinks',
    };
    const items: Item[] = [
      { ...base, id: '1', name: 'Tea', stock: 3, lowStockThreshold: 10 },
      { ...base, id: '2', name: 'Coffee', stock: 100, lowStockThreshold: 10 },
    ];
    expect(filterLowStockItems(items).map((i) => i.id)).toEqual(['1']);
  });
});
