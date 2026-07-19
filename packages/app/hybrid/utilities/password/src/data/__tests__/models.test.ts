import {
  MOCK_ITEMS,
  generatePassword,
  generatePin,
  generateMemorablePassword,
  MEMORABLE_WORDS,
  checkStrength,
} from '@/data/models';

describe('MOCK_ITEMS', () => {
  it('contains seeded demo vault items', () => {
    expect(MOCK_ITEMS.length).toBeGreaterThan(0);
  });

  it('includes at least one item of every type', () => {
    const types = new Set(MOCK_ITEMS.map((i) => i.type));
    expect(types).toEqual(
      new Set(['login', 'card', 'identity', 'note', 'ssh'])
    );
  });

  it('every item has required fields', () => {
    for (const item of MOCK_ITEMS) {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(typeof item.favorite).toBe('boolean');
      expect(Array.isArray(item.tags)).toBe(true);
      expect(item.createdAt).toBeLessThanOrEqual(Date.now());
      expect(item.updatedAt).toBeLessThanOrEqual(Date.now());
    }
  });
});

describe('generatePassword', () => {
  const all = { upper: true, lower: true, numbers: true, symbols: true };

  it('generates a password of the requested length', () => {
    const pw = generatePassword(20, all);
    expect(pw).toHaveLength(20);
  });

  it('only uses symbols when that is the only option', () => {
    const pw = generatePassword(12, {
      upper: false,
      lower: false,
      numbers: false,
      symbols: true,
    });
    expect(pw).toMatch(/^[!@#$%^&*()_+-=]+$/);
  });

  it('falls back to lowercase when no options are enabled', () => {
    const pw = generatePassword(10, {
      upper: false,
      lower: false,
      numbers: false,
      symbols: false,
    });
    expect(pw).toMatch(/^[a-z]+$/);
  });
});

describe('generatePin', () => {
  it('generates a numeric PIN of the requested length', () => {
    const pin = generatePin(6);
    expect(pin).toMatch(/^\d{6}$/);
  });

  it('supports short PINs', () => {
    expect(generatePin(4)).toMatch(/^\d{4}$/);
  });
});

describe('generateMemorablePassword', () => {
  it('joins random words with dashes', () => {
    const phrase = generateMemorablePassword(4);
    const words = phrase.split('-');
    expect(words).toHaveLength(4);
    for (const w of words) expect(MEMORABLE_WORDS).toContain(w);
  });

  it('clamps the word count to a sane range', () => {
    expect(generateMemorablePassword(2).split('-')).toHaveLength(3);
    expect(generateMemorablePassword(25).split('-')).toHaveLength(10);
  });
});

describe('checkStrength', () => {
  it('scores empty password as Very Weak', () => {
    expect(checkStrength('')).toEqual({ score: 0, label: 'Very Weak' });
  });

  it('scores short lowercase password as Weak', () => {
    expect(checkStrength('password')).toEqual({ score: 1, label: 'Weak' });
  });

  it('scores long lowercase password as Fair', () => {
    expect(checkStrength('abcdefghijkl')).toEqual({ score: 2, label: 'Fair' });
  });

  it('scores mixed password as Strong', () => {
    expect(checkStrength('Abcdefgh1!')).toEqual({ score: 4, label: 'Strong' });
  });

  it('scores shorter mixed password as Good', () => {
    expect(checkStrength('ABCDEFG1')).toEqual({ score: 3, label: 'Good' });
  });

  it('scores fully complex long password as Very Strong', () => {
    expect(checkStrength('Abcdefghijk1!')).toEqual({
      score: 5,
      label: 'Very Strong',
    });
  });
});
