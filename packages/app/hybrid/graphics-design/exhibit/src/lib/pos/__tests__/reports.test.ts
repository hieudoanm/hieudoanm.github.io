import {
  buildSalesReport,
  filterCompletedInPeriod,
  filterTransactionsBySearch,
  getPeriodStart,
} from '@/lib/pos';
import type { Transaction } from '@/types/pos';

const NOW = new Date('2026-08-18T12:00:00.000Z');

const makeTransaction = (
  overrides: Partial<Transaction> = {}
): Transaction => ({
  id: 'tx-1',
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
  payments: [{ method: 'cash', amount: 11 }],
  status: 'completed',
  createdAt: NOW.toISOString(),
  ...overrides,
});

describe('getPeriodStart', () => {
  it('starts the daily period at midnight', () => {
    expect(getPeriodStart('daily', NOW).getHours()).toBe(0);
  });

  it('looks back seven days for weekly', () => {
    const start = getPeriodStart('weekly', NOW);
    expect(NOW.getTime() - start.getTime()).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it('looks back one month for monthly', () => {
    const start = getPeriodStart('monthly', NOW);
    expect(start.getMonth()).toBe(NOW.getMonth() - 1);
  });
});

describe('filterCompletedInPeriod', () => {
  it('keeps completed transactions inside the period', () => {
    expect(
      filterCompletedInPeriod([makeTransaction()], 'daily', NOW)
    ).toHaveLength(1);
  });

  it('drops voided transactions', () => {
    const voided = makeTransaction({ status: 'voided' });
    expect(filterCompletedInPeriod([voided], 'daily', NOW)).toHaveLength(0);
  });

  it('drops transactions older than the period', () => {
    const old = makeTransaction({ createdAt: '2020-01-01T00:00:00.000Z' });
    expect(filterCompletedInPeriod([old], 'daily', NOW)).toHaveLength(0);
  });
});

describe('filterTransactionsBySearch', () => {
  const tea = makeTransaction({
    id: 'tx-2',
    items: [
      {
        item: {
          id: 'i2',
          name: 'Tea',
          price: 2.5,
          category: 'Drinks',
          stock: 50,
          lowStockThreshold: 10,
        },
        quantity: 1,
        discount: 0,
      },
    ],
  });

  it('returns everything for an empty query', () => {
    const all = [makeTransaction(), tea];
    expect(filterTransactionsBySearch(all, '')).toHaveLength(2);
  });

  it('matches on transaction id', () => {
    const all = [makeTransaction(), tea];
    expect(filterTransactionsBySearch(all, 'tx-2')).toEqual([tea]);
  });

  it('matches on item name case-insensitively', () => {
    const all = [makeTransaction(), tea];
    expect(filterTransactionsBySearch(all, 'tea')).toEqual([tea]);
  });
});

describe('buildSalesReport', () => {
  const report = buildSalesReport([
    makeTransaction(),
    makeTransaction({
      id: 'tx-2',
      items: [
        {
          item: {
            id: 'i2',
            name: 'Muffin',
            price: 3,
            category: 'Food',
            stock: 50,
            lowStockThreshold: 5,
          },
          quantity: 1,
          discount: 0,
        },
      ],
      subtotal: 3,
      tax: 0.3,
      total: 3.3,
      payments: [{ method: 'card', amount: 3.3 }],
    }),
  ]);

  it('counts transactions and sums sales and tax', () => {
    expect(report.count).toBe(2);
    expect(report.totalSales).toBeCloseTo(14.3, 5);
    expect(report.totalTax).toBeCloseTo(1.3, 5);
  });

  it('breaks revenue down by payment method', () => {
    expect(report.byPayment).toEqual({ cash: 11, card: 3.3, gift_card: 0 });
  });

  it('breaks revenue down by category', () => {
    expect(report.byCategory).toEqual({ Drinks: 10, Food: 3 });
  });

  it('ranks top items by revenue', () => {
    expect(report.topItems[0]).toMatchObject({ name: 'Coffee', quantity: 2 });
  });

  it('returns zeroed totals for no transactions', () => {
    expect(buildSalesReport([])).toMatchObject({
      count: 0,
      totalSales: 0,
      totalTax: 0,
      topItems: [],
    });
  });
});
