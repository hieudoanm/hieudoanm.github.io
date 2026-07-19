import { calculateInflation } from '../utils/calculate';

describe('calculateInflation', () => {
  it('returns null when startYear >= endYear', () => {
    const data = { '2020': 2.5, '2021': 3.0 };
    expect(calculateInflation(data, 2021, 2020, 1000)).toBeNull();
    expect(calculateInflation(data, 2020, 2020, 1000)).toBeNull();
  });

  it('returns null when any data point is null', () => {
    const data = { '2020': 2.5, '2021': null, '2022': 3.0 };
    expect(calculateInflation(data, 2020, 2022, 1000)).toBeNull();
  });

  it('returns null when any data point is undefined', () => {
    const data: Record<string, number | null> = { '2020': 2.5, '2022': 3.0 };
    expect(calculateInflation(data, 2020, 2022, 1000)).toBeNull();
  });

  it('returns deflation when average rate is negative', () => {
    const data = { '2020': -2.0, '2021': -3.0, '2022': -1.0 };
    const result = calculateInflation(data, 2020, 2022, 1000);
    expect(result).toEqual({
      adjustedAmount: 950.6,
      cumulativeRate: -5,
      averageRate: -2.5,
      health: 'deflation',
    });
  });

  it('returns low inflation when average rate < 3', () => {
    const data = { '2020': 1.0, '2021': 2.0, '2022': 1.5 };
    const result = calculateInflation(data, 2020, 2022, 1000);
    expect(result).not.toBeNull();
    expect(result!.health).toBe('low');
    expect(result!.adjustedAmount).toBeGreaterThan(1000);
  });

  it('returns moderate inflation when average rate < 6', () => {
    const data = { '2020': 4.0, '2021': 5.0, '2022': 3.0 };
    const result = calculateInflation(data, 2020, 2022, 1000);
    expect(result).not.toBeNull();
    expect(result!.health).toBe('moderate');
  });

  it('returns high inflation when average rate >= 6', () => {
    const data = { '2020': 8.0, '2021': 7.0, '2022': 9.0 };
    const result = calculateInflation(data, 2020, 2022, 1000);
    expect(result).not.toBeNull();
    expect(result!.health).toBe('high');
  });

  it('correctly calculates compound inflation over one year', () => {
    const data = { '2020': 10.0, '2021': 20.0 };
    const result = calculateInflation(data, 2020, 2021, 1000);
    expect(result).toEqual({
      adjustedAmount: 1100,
      cumulativeRate: 10,
      averageRate: 10,
      health: 'high',
    });
  });

  it('correctly calculates compound inflation over two years', () => {
    const data = { '2020': 10.0, '2021': 20.0, '2022': 30.0 };
    const result = calculateInflation(data, 2020, 2022, 1000);
    expect(result).toEqual({
      adjustedAmount: 1320,
      cumulativeRate: 30,
      averageRate: 15,
      health: 'high',
    });
  });

  it('rounds values to 2 decimal places', () => {
    const data = { '2020': 3.33333, '2021': 1.11111 };
    const result = calculateInflation(data, 2020, 2021, 1000);
    expect(result!.adjustedAmount).toBe(1033.33);
    expect(result!.cumulativeRate).toBe(3.33);
    expect(result!.averageRate).toBe(3.33);
  });

  it('handles zero inflation', () => {
    const data = { '2020': 0, '2021': 0 };
    const result = calculateInflation(data, 2020, 2021, 500);
    expect(result!.adjustedAmount).toBe(500);
    expect(result!.cumulativeRate).toBe(0);
    expect(result!.averageRate).toBe(0);
    expect(result!.health).toBe('low');
  });

  it('handles large amounts', () => {
    const data = { '2020': 5.0, '2021': 5.0 };
    const result = calculateInflation(data, 2020, 2021, 1_000_000_000);
    expect(result!.adjustedAmount).toBe(1050000000);
    expect(result!.cumulativeRate).toBe(5);
    expect(result!.averageRate).toBe(5);
    expect(result!.health).toBe('moderate');
  });

  it('processes only years from startYear up to endYear - 1', () => {
    const data = { '2019': 100, '2020': 10, '2021': 10 };
    const result = calculateInflation(data, 2020, 2021, 1000);
    expect(result!.adjustedAmount).toBe(1100);
    expect(result!.cumulativeRate).toBe(10);
  });
});
