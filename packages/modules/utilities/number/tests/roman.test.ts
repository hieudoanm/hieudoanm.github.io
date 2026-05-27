import { arabic2roman, roman2arabic } from '../src/roman';

describe('arabic2roman', () => {
  it('converts 1 to I', () => {
    expect(arabic2roman(1)).toBe('I');
  });

  it('converts 4 to IV', () => {
    expect(arabic2roman(4)).toBe('IV');
  });

  it('converts 9 to IX', () => {
    expect(arabic2roman(9)).toBe('IX');
  });

  it('converts 58 to LVIII', () => {
    expect(arabic2roman(58)).toBe('LVIII');
  });

  it('converts 1994 to MCMXCIV', () => {
    expect(arabic2roman(1994)).toBe('MCMXCIV');
  });

  it('converts 2024 to MMXXIV', () => {
    expect(arabic2roman(2024)).toBe('MMXXIV');
  });

  it('converts 0 to empty string', () => {
    expect(arabic2roman(0)).toBe('');
  });
});

describe('roman2arabic', () => {
  it('converts I to 1', () => {
    expect(roman2arabic('I')).toBe('1');
  });

  it('converts IV to 4', () => {
    expect(roman2arabic('IV')).toBe('4');
  });

  it('converts IX to 9', () => {
    expect(roman2arabic('IX')).toBe('9');
  });

  it('converts LVIII to 58', () => {
    expect(roman2arabic('LVIII')).toBe('58');
  });

  it('converts MCMXCIV to 1994', () => {
    expect(roman2arabic('MCMXCIV')).toBe('1994');
  });

  it('converts MMXXIV to 2024', () => {
    expect(roman2arabic('MMXXIV')).toBe('2024');
  });
});

describe('roundtrip arabic2roman -> roman2arabic', () => {
  const testCases = [1, 4, 9, 58, 1994, 2024, 3999];
  testCases.forEach((num) => {
    it(`roundtrips ${num}`, () => {
      expect(roman2arabic(arabic2roman(num))).toBe(num.toString());
    });
  });
});
