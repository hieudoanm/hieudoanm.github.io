import { ENDOWMENT } from '../constants';
import { average, fairGive, generousGive, keep, selfishGive } from '../game';

describe('keep', () => {
  it('keeps the endowment minus the give amount', () => {
    expect(keep(0)).toBe(ENDOWMENT);
    expect(keep(30)).toBe(70);
    expect(keep(100)).toBe(0);
  });

  it('uses a custom endowment when provided', () => {
    expect(keep(20, 50)).toBe(30);
  });
});

describe('AI giving behaviors', () => {
  it('Selfish Sam always gives nothing', () => {
    expect(selfishGive()).toBe(0);
  });

  it('Fair Fanta always gives half the endowment', () => {
    expect(fairGive()).toBe(50);
  });

  it('Generous Gita always gives eighty', () => {
    expect(generousGive()).toBe(80);
  });
});

describe('average', () => {
  it('returns zero for an empty list', () => {
    expect(average([])).toBe(0);
  });

  it('returns the mean of the values', () => {
    expect(average([10, 20, 30])).toBe(20);
  });

  it('matches the AI benchmark line', () => {
    expect(average([selfishGive(), fairGive(), generousGive()])).toBeCloseTo(
      130 / 3
    );
  });
});
