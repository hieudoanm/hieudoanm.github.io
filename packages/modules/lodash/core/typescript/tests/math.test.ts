import {
  add,
  ceil,
  divide,
  floor,
  max,
  maxBy,
  mean,
  min,
  minBy,
  multiply,
  round,
  subtract,
  sum,
  sumBy,
} from '../src/math.js';

describe('add', () => {
  it('should add', () => {
    expect(add(6, 4)).toBe(10);
  });
});

describe('ceil', () => {
  it('should ceil', () => {
    expect(ceil(4.006)).toBe(5);
    expect(ceil(6.004, 2)).toBe(6.01);
    expect(ceil(6040, -2)).toBe(6100);
  });
});

describe('divide', () => {
  it('should divide', () => {
    expect(divide(6, 4)).toBe(1.5);
  });
});

describe('floor', () => {
  it('should floor', () => {
    expect(floor(4.006)).toBe(4);
    expect(floor(6.004, 2)).toBe(6);
  });
});

describe('max', () => {
  it('should find max', () => {
    expect(max([4, 2, 8, 6])).toBe(8);
    expect(max([])).toBeUndefined();
  });
});

describe('maxBy', () => {
  it('should find max by iteratee', () => {
    expect(maxBy([{ n: 1 }, { n: 2 }], (o) => o.n)).toEqual({ n: 2 });
  });
});

describe('mean', () => {
  it('should compute mean', () => {
    expect(mean([4, 2, 8, 6])).toBe(5);
    expect(mean([])).toBeNaN();
  });
});

describe('min', () => {
  it('should find min', () => {
    expect(min([4, 2, 8, 6])).toBe(2);
    expect(min([])).toBeUndefined();
  });
});

describe('minBy', () => {
  it('should find min by iteratee', () => {
    expect(minBy([{ n: 1 }, { n: 2 }], (o) => o.n)).toEqual({ n: 1 });
  });
});

describe('multiply', () => {
  it('should multiply', () => {
    expect(multiply(6, 4)).toBe(24);
  });
});

describe('round', () => {
  it('should round', () => {
    expect(round(4.006)).toBe(4);
    expect(round(4.006, 2)).toBe(4.01);
  });
});

describe('subtract', () => {
  it('should subtract', () => {
    expect(subtract(6, 4)).toBe(2);
  });
});

describe('sum', () => {
  it('should sum', () => {
    expect(sum([4, 2, 8, 6])).toBe(20);
  });
});

describe('sumBy', () => {
  it('should sum by iteratee', () => {
    expect(sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (o) => o.n)).toBe(
      20
    );
  });
});
