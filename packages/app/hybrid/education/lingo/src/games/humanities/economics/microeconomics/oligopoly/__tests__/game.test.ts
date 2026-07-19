import { bestReply, demand, price, profit } from '../game';

describe('demand', () => {
  it('is the intercept minus the total output', () => {
    expect(demand(30, 30)).toBe(40);
    expect(demand(0, 0)).toBe(100);
    expect(demand(50, 60)).toBe(-10);
  });
});

describe('price', () => {
  it('floors the demand at zero', () => {
    expect(price(30, 30)).toBe(40);
    expect(price(0, 0)).toBe(100);
    expect(price(60, 60)).toBe(0);
  });
});

describe('bestReply', () => {
  it('returns the Cournot best response to qA', () => {
    expect(bestReply(0)).toBe(40);
    expect(bestReply(30)).toBe(30);
    expect(bestReply(40)).toBe(25);
  });

  it('clamps the reply within the feasible quantity range', () => {
    expect(bestReply(160)).toBe(0);
    expect(bestReply(-20)).toBe(40);
    expect(bestReply(1000)).toBe(0);
  });
});

describe('profit', () => {
  it('is the margin times the quantity', () => {
    expect(profit(30, 40)).toBe(900);
    expect(profit(40, 0)).toBe(-400);
    expect(profit(0, 100)).toBe(0);
  });
});
