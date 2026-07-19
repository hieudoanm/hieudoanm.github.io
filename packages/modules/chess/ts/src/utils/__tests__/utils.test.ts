import {
  getRank,
  getFile,
  toSquare,
  isSquareValid,
  toSquareName,
  toSquareFromName,
  toOppositeColor,
  getSquareColor,
  FILES,
} from '../utils';

describe('getRank', () => {
  it('returns 0 for a1', () => {
    expect(getRank(0)).toBe(0);
  });
  it('returns 7 for a8', () => {
    expect(getRank(56)).toBe(7);
  });
  it('returns 3 for d4', () => {
    expect(getRank(toSquare(3, 3))).toBe(3);
  });
});

describe('getFile', () => {
  it('returns 0 for a1', () => {
    expect(getFile(0)).toBe(0);
  });
  it('returns 7 for h1', () => {
    expect(getFile(7)).toBe(7);
  });
  it('returns 3 for d4', () => {
    expect(getFile(toSquare(3, 3))).toBe(3);
  });
});

describe('toSquare', () => {
  it('computes a1 as 0', () => {
    expect(toSquare(0, 0)).toBe(0);
  });
  it('computes h8 as 63', () => {
    expect(toSquare(7, 7)).toBe(63);
  });
  it('computes e4 as 28', () => {
    expect(toSquare(3, 4)).toBe(28);
  });
});

describe('isSquareValid', () => {
  it('returns true for 0', () => {
    expect(isSquareValid(0)).toBe(true);
  });
  it('returns true for 63', () => {
    expect(isSquareValid(63)).toBe(true);
  });
  it('returns false for -1', () => {
    expect(isSquareValid(-1)).toBe(false);
  });
  it('returns false for 64', () => {
    expect(isSquareValid(64)).toBe(false);
  });
});

describe('toSquareName', () => {
  it('returns a1 for 0', () => {
    expect(toSquareName(0)).toBe('a1');
  });
  it('returns h8 for 63', () => {
    expect(toSquareName(63)).toBe('h8');
  });
  it('returns e4 for 28', () => {
    expect(toSquareName(28)).toBe('e4');
  });
  it('returns a8 for 56', () => {
    expect(toSquareName(56)).toBe('a8');
  });
  it('returns h1 for 7', () => {
    expect(toSquareName(7)).toBe('h1');
  });
});

describe('toSquareFromName', () => {
  it('parses a1', () => {
    expect(toSquareFromName('a1')).toBe(0);
  });
  it('parses h8', () => {
    expect(toSquareFromName('h8')).toBe(63);
  });
  it('parses e4', () => {
    expect(toSquareFromName('e4')).toBe(28);
  });
  it('returns null for invalid file', () => {
    expect(toSquareFromName('z1')).toBeNull();
  });
  it('returns null for invalid rank', () => {
    expect(toSquareFromName('a9')).toBeNull();
  });
  it('returns null for short string', () => {
    expect(toSquareFromName('a')).toBeNull();
  });
  it('is inverse of toSquareName', () => {
    for (let sq = 0; sq < 64; sq++) {
      expect(toSquareFromName(toSquareName(sq))).toBe(sq);
    }
  });
});

describe('toOppositeColor', () => {
  it('returns b for w', () => {
    expect(toOppositeColor('w')).toBe('b');
  });
  it('returns w for b', () => {
    expect(toOppositeColor('b')).toBe('w');
  });
});

describe('getSquareColor', () => {
  it('a1 is dark', () => {
    expect(getSquareColor(0)).toBe('dark');
  });
  it('h8 is dark', () => {
    expect(getSquareColor(63)).toBe('dark');
  });
  it('e4 is light', () => {
    expect(getSquareColor(28)).toBe('light');
  });
  it('d4 is dark', () => {
    expect(getSquareColor(27)).toBe('dark');
  });
});

describe('FILES', () => {
  it('is abcdefgh', () => {
    expect(FILES).toBe('abcdefgh');
  });
});
