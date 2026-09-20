import { calculatePaymentTotals, sumPaymentSplits } from '@/lib/pos';
import type { PaymentSplit } from '@/types/pos';

describe('sumPaymentSplits', () => {
  it('adds every split amount', () => {
    const splits: PaymentSplit[] = [
      { method: 'cash', amount: 10 },
      { method: 'card', amount: 5.5 },
    ];
    expect(sumPaymentSplits(splits)).toBe(15.5);
  });

  it('returns 0 for no splits', () => {
    expect(sumPaymentSplits([])).toBe(0);
  });
});

describe('calculatePaymentTotals', () => {
  it('reports the outstanding balance when underpaid', () => {
    const totals = calculatePaymentTotals(
      [{ method: 'cash', amount: 40 }],
      100
    );
    expect(totals).toMatchObject({
      totalPaid: 40,
      remaining: 60,
      change: 0,
      isSettled: false,
    });
  });

  it('reports change and settles when overpaid', () => {
    const totals = calculatePaymentTotals(
      [{ method: 'cash', amount: 120 }],
      100
    );
    expect(totals).toMatchObject({
      totalPaid: 120,
      remaining: 0,
      change: 20,
      isSettled: true,
    });
  });

  it('settles within one cent of the total', () => {
    const totals = calculatePaymentTotals(
      [{ method: 'card', amount: 99.995 }],
      100
    );
    expect(totals.isSettled).toBe(true);
  });

  it('is not settled when nothing has been paid', () => {
    expect(
      calculatePaymentTotals([{ method: 'cash', amount: 0 }], 10).isSettled
    ).toBe(false);
  });
});
