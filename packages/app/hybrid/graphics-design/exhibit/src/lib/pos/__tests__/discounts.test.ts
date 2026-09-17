import {
  calculateDiscountAmount,
  findActiveGiftCard,
  findRedeemableDiscount,
  getNextUnusedPaymentMethod,
  isDiscountRedeemable,
} from '@/lib/pos';
import type { Discount, GiftCard } from '@/types/pos';

const NOW = new Date('2026-08-18T10:00:00.000Z');

const baseDiscount: Discount = {
  id: 'd1',
  code: 'SAVE10',
  type: 'percentage',
  value: 10,
  usedCount: 0,
  active: true,
};

const giftCard: GiftCard = {
  id: 'gc1',
  code: 'GC001',
  balance: 50,
  initialBalance: 50,
  createdAt: NOW.toISOString(),
  active: true,
};

describe('isDiscountRedeemable', () => {
  it('accepts an active discount with no limits', () => {
    expect(isDiscountRedeemable(baseDiscount, 100, NOW)).toBe(true);
  });

  it('rejects an inactive discount', () => {
    expect(
      isDiscountRedeemable({ ...baseDiscount, active: false }, 100, NOW)
    ).toBe(false);
  });

  it('rejects a discount that exhausted its max uses', () => {
    expect(
      isDiscountRedeemable(
        { ...baseDiscount, maxUses: 2, usedCount: 2 },
        100,
        NOW
      )
    ).toBe(false);
  });

  it('rejects an expired discount', () => {
    expect(
      isDiscountRedeemable(
        { ...baseDiscount, expiresAt: '2026-01-01T00:00:00.000Z' },
        100,
        NOW
      )
    ).toBe(false);
  });

  it('rejects a discount below its minimum purchase', () => {
    expect(
      isDiscountRedeemable({ ...baseDiscount, minPurchase: 50 }, 10, NOW)
    ).toBe(false);
  });
});

describe('findRedeemableDiscount', () => {
  it('matches a code case-insensitively', () => {
    expect(findRedeemableDiscount('save10', [baseDiscount], 100)?.id).toBe(
      'd1'
    );
  });

  it('returns null when no code matches', () => {
    expect(findRedeemableDiscount('NOPE', [baseDiscount], 100)).toBeNull();
  });

  it('returns null when the matched discount is not redeemable', () => {
    const expired = { ...baseDiscount, expiresAt: '2026-01-01T00:00:00.000Z' };
    expect(findRedeemableDiscount('SAVE10', [expired], 100)).toBeNull();
  });
});

describe('calculateDiscountAmount', () => {
  it('returns 0 when no discount is applied', () => {
    expect(calculateDiscountAmount(null, 100)).toBe(0);
  });

  it('takes a percentage of the total', () => {
    expect(calculateDiscountAmount(baseDiscount, 150)).toBe(15);
  });

  it('caps a fixed discount at the total', () => {
    const fixed: Discount = {
      ...baseDiscount,
      type: 'fixed',
      value: 500,
    };
    expect(calculateDiscountAmount(fixed, 100)).toBe(100);
  });
});

describe('findActiveGiftCard', () => {
  it('matches an active card case-insensitively', () => {
    expect(findActiveGiftCard('gc001', [giftCard])?.id).toBe('gc1');
  });

  it('returns null for a card with no balance left', () => {
    expect(
      findActiveGiftCard('GC001', [{ ...giftCard, balance: 0 }])
    ).toBeNull();
  });

  it('returns null for an inactive card', () => {
    expect(
      findActiveGiftCard('GC001', [{ ...giftCard, active: false }])
    ).toBeNull();
  });
});

describe('getNextUnusedPaymentMethod', () => {
  it('returns cash when no splits exist', () => {
    expect(getNextUnusedPaymentMethod([])).toBe('cash');
  });

  it('returns the first method not already used', () => {
    expect(getNextUnusedPaymentMethod([{ method: 'cash', amount: 0 }])).toBe(
      'card'
    );
  });

  it('returns null once every method is used', () => {
    expect(
      getNextUnusedPaymentMethod([
        { method: 'cash', amount: 0 },
        { method: 'card', amount: 0 },
        { method: 'gift_card', amount: 0 },
      ])
    ).toBeNull();
  });
});
