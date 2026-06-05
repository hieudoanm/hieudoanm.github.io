import {
  rankOf,
  fileOf,
  square,
  isValidSquare,
  squareName,
  parseSquare,
  oppositeColor,
  squareColor,
  FILES,
} from '../utils';

describe('rankOf', () => {
  it('returns 0 for a1', () => {
    expect(rankOf(0)).toBe(0);
  });
  it('returns 7 for a8', () => {
    expect(rankOf(56)).toBe(7);
  });
  it('returns 3 for d4', () => {
    expect(rankOf(square(3, 3))).toBe(3);
  });
});

describe('fileOf', () => {
  it('returns 0 for a1', () => {
    expect(fileOf(0)).toBe(0);
  });
  it('returns 7 for h1', () => {
    expect(fileOf(7)).toBe(7);
  });
  it('returns 3 for d4', () => {
    expect(fileOf(square(3, 3))).toBe(3);
  });
});

describe('square', () => {
  it('computes a1 as 0', () => {
    expect(square(0, 0)).toBe(0);
  });
  it('computes h8 as 63', () => {
    expect(square(7, 7)).toBe(63);
  });
  it('computes e4 as 28', () => {
    expect(square(3, 4)).toBe(28);
  });
});

describe('isValidSquare', () => {
  it('returns true for 0', () => {
    expect(isValidSquare(0)).toBe(true);
  });
  it('returns true for 63', () => {
    expect(isValidSquare(63)).toBe(true);
  });
  it('returns false for -1', () => {
    expect(isValidSquare(-1)).toBe(false);
  });
  it('returns false for 64', () => {
    expect(isValidSquare(64)).toBe(false);
  });
});

describe('squareName', () => {
  it('returns a1 for 0', () => {
    expect(squareName(0)).toBe('a1');
  });
  it('returns h8 for 63', () => {
    expect(squareName(63)).toBe('h8');
  });
  it('returns e4 for 28', () => {
    expect(squareName(28)).toBe('e4');
  });
  it('returns a8 for 56', () => {
    expect(squareName(56)).toBe('a8');
  });
  it('returns h1 for 7', () => {
    expect(squareName(7)).toBe('h1');
  });
});

describe('parseSquare', () => {
  it('parses a1', () => {
    expect(parseSquare('a1')).toBe(0);
  });
  it('parses h8', () => {
    expect(parseSquare('h8')).toBe(63);
  });
  it('parses e4', () => {
    expect(parseSquare('e4')).toBe(28);
  });
  it('returns null for invalid file', () => {
    expect(parseSquare('z1')).toBeNull();
  });
  it('returns null for invalid rank', () => {
    expect(parseSquare('a9')).toBeNull();
  });
  it('returns null for short string', () => {
    expect(parseSquare('a')).toBeNull();
  });
  it('is inverse of squareName', () => {
    for (let sq = 0; sq < 64; sq++) {
      expect(parseSquare(squareName(sq))).toBe(sq);
    }
  });
});

describe('oppositeColor', () => {
  it('returns b for w', () => {
    expect(oppositeColor('w')).toBe('b');
  });
  it('returns w for b', () => {
    expect(oppositeColor('b')).toBe('w');
  });
});

describe('squareColor', () => {
  it('a1 is dark', () => {
    expect(squareColor(0)).toBe('dark');
  });
  it('h8 is dark', () => {
    expect(squareColor(63)).toBe('dark');
  });
  it('e4 is light', () => {
    expect(squareColor(28)).toBe('light');
  });
  it('d4 is dark', () => {
    expect(squareColor(27)).toBe('dark');
  });
});

describe('FILES', () => {
  it('is abcdefgh', () => {
    expect(FILES).toBe('abcdefgh');
  });
});
