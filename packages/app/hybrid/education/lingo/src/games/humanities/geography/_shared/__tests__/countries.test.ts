import { COUNTRIES, isCountry, normalizeCountry } from '../countries';

describe('COUNTRIES', () => {
  it('contains a large dataset', () => {
    expect(COUNTRIES.length).toBeGreaterThanOrEqual(150);
  });

  it('has no duplicates or empty names', () => {
    const unique = new Set(COUNTRIES);
    expect(unique.size).toBe(COUNTRIES.length);
    for (const name of COUNTRIES) expect(name.trim().length).toBeGreaterThan(0);
  });

  it('starts with a capital letter', () => {
    for (const name of COUNTRIES) {
      expect(name[0]).toMatch(/[A-Z]/);
    }
  });
});

describe('isCountry', () => {
  it.each(['Chile', 'CHILE', '  chile '])('accepts %s', (name) => {
    expect(isCountry(name)).toBe(true);
  });

  it.each(['Notacountry', 'Chilex', '', '   '])('rejects %s', (name) => {
    expect(isCountry(name)).toBe(false);
  });
});

describe('normalizeCountry', () => {
  it('trims and uppercases', () => {
    expect(normalizeCountry('  Chile ')).toBe('CHILE');
  });
});
