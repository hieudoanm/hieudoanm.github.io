import { arabicToRoman, romanToArabic } from '../roman';

describe('arabicToRoman', () => {
  it('converts 1 to I', () => {
    expect(arabicToRoman(1)).toBe('I');
  });

  it('converts 4 to IV', () => {
    expect(arabicToRoman(4)).toBe('IV');
  });

  it('converts 9 to IX', () => {
    expect(arabicToRoman(9)).toBe('IX');
  });

  it('converts 58 to LVIII', () => {
    expect(arabicToRoman(58)).toBe('LVIII');
  });

  it('converts 1994 to MCMXCIV', () => {
    expect(arabicToRoman(1994)).toBe('MCMXCIV');
  });

  it('converts 2024 to MMXXIV', () => {
    expect(arabicToRoman(2024)).toBe('MMXXIV');
  });

  it('converts 0 to empty string', () => {
    expect(arabicToRoman(0)).toBe('');
  });
});

describe('romanToArabic', () => {
  it('converts I to 1', () => {
    expect(romanToArabic('I')).toBe('1');
  });

  it('converts IV to 4', () => {
    expect(romanToArabic('IV')).toBe('4');
  });

  it('converts IX to 9', () => {
    expect(romanToArabic('IX')).toBe('9');
  });

  it('converts LVIII to 58', () => {
    expect(romanToArabic('LVIII')).toBe('58');
  });

  it('converts MCMXCIV to 1994', () => {
    expect(romanToArabic('MCMXCIV')).toBe('1994');
  });

  it('converts MMXXIV to 2024', () => {
    expect(romanToArabic('MMXXIV')).toBe('2024');
  });
});

describe('roundtrip arabicToRoman -> romanToArabic', () => {
  const testCases = [1, 4, 9, 58, 1994, 2024, 3999];
  testCases.forEach((num) => {
    it(`roundtrips ${num}`, () => {
      expect(romanToArabic(arabicToRoman(num))).toBe(num.toString());
    });
  });
});
