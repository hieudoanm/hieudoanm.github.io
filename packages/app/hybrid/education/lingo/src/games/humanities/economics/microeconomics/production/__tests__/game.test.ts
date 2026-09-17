import { QUIZ_QUESTIONS } from '../constants';
import {
  buildCostSchedule,
  checkQuizAnswer,
  findMinATC,
  getQuizQuestions,
  profitMaxQ,
  totalProduct,
} from '../game';

describe('totalProduct', () => {
  it('rounds a·L^b to an integer', () => {
    expect(totalProduct(0)).toBe(0);
    expect(totalProduct(1)).toBe(10);
    expect(totalProduct(20)).toBe(60);
  });
});

describe('buildCostSchedule', () => {
  const rows = buildCostSchedule(20, 10, 100);

  it('produces a row for every labor level', () => {
    expect(rows).toHaveLength(21);
    expect(rows[0]).toEqual({
      L: 0,
      Q: 0,
      MP: 0,
      AP: 0,
      TVC: 0,
      TFC: 100,
      TC: 100,
      MC: 0,
      ATC: 0,
      AVC: 0,
      AFC: 0,
    });
  });

  it('has declining marginal product from L=2 onward', () => {
    for (let l = 2; l < rows.length; l++) {
      expect(rows[l].MP).toBeLessThan(rows[l - 1].MP);
    }
  });

  it('has marginal cost crossing ATC at its minimum', () => {
    const min = findMinATC(rows);
    const atMin = rows.find((r) => r.L === min?.L);
    const before = rows.find((r) => r.L === (min?.L ?? 0) - 1);
    const after = rows.find((r) => r.L === (min?.L ?? 0) + 1);
    if (atMin && before && after) {
      expect(before.MC).toBeLessThan(atMin.ATC);
      expect(after.MC).toBeGreaterThan(atMin.ATC);
    }
  });
});

describe('findMinATC', () => {
  it('returns the row with the lowest ATC', () => {
    const rows = buildCostSchedule(20, 10, 100);
    const min = findMinATC(rows);
    expect(min?.L).toBe(15);
  });
});

describe('profitMaxQ', () => {
  it('returns the last output level with MC at or below price', () => {
    const rows = buildCostSchedule(20, 10, 100);
    expect(profitMaxQ(rows, 4)?.Q).toBe(37);
    expect(profitMaxQ(rows, 100)?.Q).toBe(60);
  });

  it('returns null when no output covers marginal cost', () => {
    const rows = buildCostSchedule(20, 10, 100);
    expect(profitMaxQ(rows, 0)).toBeNull();
  });
});

describe('quiz questions', () => {
  it('ships five fixed rounds', () => {
    expect(getQuizQuestions()).toHaveLength(5);
    expect(QUIZ_QUESTIONS.map((q) => q.id)).toEqual([1, 2, 3, 4, 5]);
  });

  it('validates each answer', () => {
    for (const q of QUIZ_QUESTIONS) {
      expect(checkQuizAnswer(q.id, q.correctIndex)).toBe(true);
      expect(
        checkQuizAnswer(q.id, (q.correctIndex + 1) % q.options.length)
      ).toBe(false);
    }
  });
});
