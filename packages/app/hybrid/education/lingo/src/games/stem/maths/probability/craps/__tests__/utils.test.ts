import { comeOutResult, playComeOut, playPoint, rollDice } from '../utils';

describe('craps utils', () => {
  it.each([
    [7, 'win'],
    [11, 'win'],
    [2, 'craps'],
    [3, 'craps'],
    [12, 'craps'],
    [4, 'point'],
    [10, 'point'],
  ])('comeOutResult(%i) === %s', (total, expected) => {
    expect(comeOutResult(total)).toBe(expected);
  });

  it('wins the come-out on a natural', () => {
    const outcome = playComeOut([3, 4]);
    expect(outcome).toMatchObject({ total: 7, phase: 'result', won: 20 });
  });

  it('sets the point on a box number', () => {
    const outcome = playComeOut([2, 2]);
    expect(outcome).toMatchObject({ total: 4, phase: 'point', won: 0 });
  });

  it('loses immediately on craps', () => {
    const outcome = playComeOut([1, 1]);
    expect(outcome).toMatchObject({ total: 2, phase: 'result', won: 0 });
  });

  it('makes the point to win', () => {
    const outcome = playPoint(6, [1, 5]);
    expect(outcome).toMatchObject({ total: 6, phase: 'result', won: 20 });
  });

  it('seven-out loses the point round', () => {
    const outcome = playPoint(9, [5, 2]);
    expect(outcome).toMatchObject({ total: 7, phase: 'result', won: 0 });
  });

  it('keeps rolling when neither point nor seven lands', () => {
    const outcome = playPoint(8, [2, 2]);
    expect(outcome.phase).toBe('point');
  });

  it('rolls two valid dice', () => {
    const [first, second] = rollDice();
    expect(first).toBeGreaterThanOrEqual(1);
    expect(first).toBeLessThanOrEqual(6);
    expect(second).toBeGreaterThanOrEqual(1);
    expect(second).toBeLessThanOrEqual(6);
  });
});
