import * as number from '..';

describe('number package exports', () => {
  it('exports all expected functions', () => {
    expect(number.base).toBeDefined();
    expect(number.addZero).toBeDefined();
    expect(number.range).toBeDefined();
    expect(number.formatCurrency).toBeDefined();
    expect(number.arabic2roman).toBeDefined();
    expect(number.roman2arabic).toBeDefined();
  });
});
