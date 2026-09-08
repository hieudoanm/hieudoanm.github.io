import { APPLES_MU, COOKIES_MU, SCENARIOS } from '../constants';
import {
  achievedRatio,
  affordableNext,
  budgetUsed,
  canConsume,
  isOptimal,
  lastMU,
  nextUtility,
  optimalBundle,
  score,
  totalUtility,
  withinBudget,
} from '../game';

describe('totalUtility', () => {
  it('sums the marginal utilities of each consumed unit', () => {
    expect(totalUtility(0, 0)).toBe(0);
    expect(totalUtility(1, 1)).toBe(35);
    expect(totalUtility(2, 2)).toBe(57);
    expect(totalUtility(3, 4)).toBe(77);
  });

  it('ignores counts beyond the marginal utility tables', () => {
    expect(totalUtility(10, 10)).toBe(totalUtility(6, 6));
  });
});

describe('nextUtility', () => {
  it('reads the marginal utility of the next unit per good', () => {
    expect(nextUtility('apple', 0)).toBe(APPLES_MU[0]);
    expect(nextUtility('cookie', 2)).toBe(COOKIES_MU[2]);
    expect(nextUtility('apple', 6)).toBe(0);
  });
});

describe('lastMU', () => {
  it('returns the marginal utility of the last consumed unit', () => {
    expect(lastMU(0, 3)).toEqual({ apple: 0, cookie: COOKIES_MU[2] });
    expect(lastMU(2, 4)).toEqual({
      apple: APPLES_MU[1],
      cookie: COOKIES_MU[3],
    });
  });
});

describe('budgetUsed / withinBudget', () => {
  it('computes total spend and checks the budget', () => {
    expect(budgetUsed(3, 4, 2, 1)).toBe(10);
    expect(withinBudget(3, 4, 2, 1, 10)).toBe(true);
    expect(withinBudget(4, 4, 2, 1, 10)).toBe(false);
  });
});

describe('canConsume / affordableNext', () => {
  it('allows the next unit while it is positive, in range and on budget', () => {
    expect(canConsume('apple', 5)).toBe(true);
    expect(canConsume('apple', 6)).toBe(false);
    expect(affordableNext('apple', 4, 0, 2, 1, 10)).toBe(true);
    expect(affordableNext('apple', 5, 0, 2, 1, 10)).toBe(false);
    expect(affordableNext('cookie', 0, 6, 2, 1, 10)).toBe(false);
  });
});

describe('optimalBundle', () => {
  it.each([
    [2, 1, 10, 3, 4],
    [3, 2, 12, 2, 3],
    [1, 4, 8, 4, 1],
    [2, 3, 9, 3, 1],
    [4, 1, 8, 1, 4],
    [5, 4, 3, 0, 0],
  ])(
    'returns the utility-maximizing bundle for pa=%i, pc=%i, M=%i',
    (pa, pc, income, apples, cookies) => {
      expect(optimalBundle(pa, pc, income)).toEqual({ apples, cookies });
    }
  );

  it('exhausts the budget whenever any cheaper positive unit remains', () => {
    const outcome = optimalBundle(2, 1, 10);
    expect(budgetUsed(outcome.apples, outcome.cookies, 2, 1)).toBe(10);
  });
});

describe('score / achievedRatio', () => {
  it('scales achieved utility against the optimal utility', () => {
    expect(score(77, 77)).toBe(100);
    expect(score(70, 77)).toBe(91);
    expect(score(0, 0)).toBe(100);
    expect(score(5, 0)).toBe(0);
  });

  it('reports 100 when the chosen bundle is optimal', () => {
    expect(achievedRatio(3, 4, 2, 1, 10)).toBe(100);
    expect(achievedRatio(2, 4, 2, 1, 10)).toBe(91);
  });

  it('detects the optimal allocation', () => {
    expect(isOptimal(3, 4, 2, 1, 10)).toBe(true);
    expect(isOptimal(2, 4, 2, 1, 10)).toBe(false);
  });
});

describe('challenge scenarios', () => {
  it('each scenario lists its computed optimum within budget', () => {
    for (const scenario of SCENARIOS) {
      const optimal = optimalBundle(scenario.pa, scenario.pc, scenario.income);
      const included = scenario.options.some(
        (option) =>
          option.apples === optimal.apples && option.cookies === optimal.cookies
      );
      expect(included).toBe(true);
      for (const option of scenario.options) {
        expect(
          withinBudget(
            option.apples,
            option.cookies,
            scenario.pa,
            scenario.pc,
            scenario.income
          )
        ).toBe(true);
        expect(option.apples).toBeLessThanOrEqual(APPLES_MU.length);
        expect(option.cookies).toBeLessThanOrEqual(COOKIES_MU.length);
      }
    }
  });
});
