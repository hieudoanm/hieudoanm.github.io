import * as number from '..';

describe('number package exports', () => {
  it('exports all expected functions', () => {
    expect(number.convertBase).toBeDefined();
    expect(number.padZero).toBeDefined();
    expect(number.range).toBeDefined();
    expect(number.formatCurrency).toBeDefined();
    expect(number.arabicToRoman).toBeDefined();
    expect(number.romanToArabic).toBeDefined();
  });
});
