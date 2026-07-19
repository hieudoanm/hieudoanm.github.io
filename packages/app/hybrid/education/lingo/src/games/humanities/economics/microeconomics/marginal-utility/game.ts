import { APPLES_MU, COOKIES_MU } from './constants';
import type {
  Bundle,
  ChallengeResult,
  ChallengeScenario,
  Good,
  LabResult,
} from './types';

export interface LabResultParams {
  round: number;
  pa: number;
  pc: number;
  income: number;
  apples: number;
  cookies: number;
}

const sumPrefix = (values: number[], count: number): number =>
  values.slice(0, count).reduce((sum, value) => sum + value, 0);

export const totalUtility = (apples: number, cookies: number): number =>
  sumPrefix(APPLES_MU, apples) + sumPrefix(COOKIES_MU, cookies);

export const nextUtility = (good: Good, count: number): number =>
  (good === 'apple' ? APPLES_MU[count] : COOKIES_MU[count]) ?? 0;

export const lastMU = (
  apples: number,
  cookies: number
): { apple: number; cookie: number } => ({
  apple: apples > 0 ? (APPLES_MU[apples - 1] ?? 0) : 0,
  cookie: cookies > 0 ? (COOKIES_MU[cookies - 1] ?? 0) : 0,
});

export const budgetUsed = (
  apples: number,
  cookies: number,
  pa: number,
  pc: number
): number => apples * pa + cookies * pc;

export const withinBudget = (
  apples: number,
  cookies: number,
  pa: number,
  pc: number,
  income: number
): boolean => budgetUsed(apples, cookies, pa, pc) <= income;

export const canConsume = (good: Good, count: number): boolean =>
  count < (good === 'apple' ? APPLES_MU.length : COOKIES_MU.length);

export const affordableNext = (
  good: Good,
  apples: number,
  cookies: number,
  pa: number,
  pc: number,
  income: number
): boolean => {
  if (good === 'apple') {
    return (
      canConsume(good, apples) &&
      withinBudget(apples + 1, cookies, pa, pc, income)
    );
  }
  return (
    canConsume(good, cookies) &&
    withinBudget(apples, cookies + 1, pa, pc, income)
  );
};

export const optimalBundle = (
  pa: number,
  pc: number,
  income: number
): Bundle => {
  let apples = 0;
  let cookies = 0;
  let spent = 0;
  for (;;) {
    const canApple = canConsume('apple', apples) && spent + pa <= income;
    const canCookie = canConsume('cookie', cookies) && spent + pc <= income;
    if (!canApple && !canCookie) break;
    if (canApple && canCookie) {
      const appleScore = APPLES_MU[apples] / pa;
      const cookieScore = COOKIES_MU[cookies] / pc;
      if (appleScore >= cookieScore) {
        spent += pa;
        apples += 1;
      } else {
        spent += pc;
        cookies += 1;
      }
    } else if (canApple) {
      spent += pa;
      apples += 1;
    } else {
      spent += pc;
      cookies += 1;
    }
  }
  return { apples, cookies };
};

export const score = (achieved: number, optimal: number): number => {
  if (optimal <= 0) return achieved <= 0 ? 100 : 0;
  const ratio = Math.max(0, Math.min(1, achieved / optimal));
  return Math.round(ratio * 100);
};

export const achievedRatio = (
  apples: number,
  cookies: number,
  pa: number,
  pc: number,
  income: number
): number => {
  const optimal = optimalBundle(pa, pc, income);
  const optimalUtility = totalUtility(optimal.apples, optimal.cookies);
  return score(totalUtility(apples, cookies), optimalUtility);
};

export const isOptimal = (
  apples: number,
  cookies: number,
  pa: number,
  pc: number,
  income: number
): boolean => {
  const optimal = optimalBundle(pa, pc, income);
  return optimal.apples === apples && optimal.cookies === cookies;
};

export const labResult = (params: LabResultParams): LabResult => {
  const optimal = optimalBundle(params.pa, params.pc, params.income);
  const achievedUtility = totalUtility(params.apples, params.cookies);
  const optimalUtility = totalUtility(optimal.apples, optimal.cookies);
  return {
    round: params.round,
    pa: params.pa,
    pc: params.pc,
    income: params.income,
    apples: params.apples,
    cookies: params.cookies,
    optimal,
    achievedUtility,
    optimalUtility,
    score: score(achievedUtility, optimalUtility),
  };
};

export const challengeResult = (
  scenario: ChallengeScenario,
  round: number,
  selected: number
): ChallengeResult => {
  const optimal = optimalBundle(scenario.pa, scenario.pc, scenario.income);
  const optimalIndex = scenario.options.findIndex(
    (option) =>
      option.apples === optimal.apples && option.cookies === optimal.cookies
  );
  const chosen = scenario.options[selected];
  const correct = selected === optimalIndex;
  return {
    round,
    pa: scenario.pa,
    pc: scenario.pc,
    income: scenario.income,
    selected,
    optimalIndex,
    chosen,
    optimal,
    correct,
    utilityRatio: score(
      totalUtility(chosen.apples, chosen.cookies),
      totalUtility(optimal.apples, optimal.cookies)
    ),
  };
};
