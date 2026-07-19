import { PROD_A, PROD_B, QUIZ_QUESTIONS } from './constants';
import type { CostRow, QuizQuestion } from './types';

export const totalProduct = (labor: number): number =>
  Math.round(PROD_A * Math.pow(labor, PROD_B));

const continuousProduct = (labor: number): number =>
  PROD_A * Math.pow(labor, PROD_B);

export const buildCostSchedule = (
  labor: number,
  wage: number,
  fc: number
): CostRow[] => {
  const rows: CostRow[] = [];
  for (let l = 0; l <= labor; l++) {
    const q = totalProduct(l);
    const qc = continuousProduct(l);
    const prevQc = l > 0 ? continuousProduct(l - 1) : 0;
    const tvc = wage * l;
    const tc = tvc + fc;
    const mp = l > 0 ? qc - prevQc : 0;
    const ap = l > 0 ? qc / l : 0;
    const mc = mp > 0 ? wage / mp : 0;
    const atc = qc > 0 ? tc / qc : 0;
    const avc = qc > 0 ? tvc / qc : 0;
    const afc = qc > 0 ? fc / qc : 0;
    rows.push({
      L: l,
      Q: q,
      MP: mp,
      AP: ap,
      TVC: tvc,
      TFC: fc,
      TC: tc,
      MC: mc,
      ATC: atc,
      AVC: avc,
      AFC: afc,
    });
  }
  return rows;
};

export const findMinATC = (rows: CostRow[]): CostRow | null => {
  const valid = rows.filter((r) => r.Q > 0);
  return valid.length > 0
    ? valid.reduce((min, r) => (r.ATC < min.ATC ? r : min), valid[0])
    : null;
};

export const profitMaxQ = (rows: CostRow[], price: number): CostRow | null => {
  const candidates = rows.filter((r) => r.Q > 0 && r.MC > 0 && r.MC <= price);
  return candidates.length > 0 ? candidates[candidates.length - 1] : null;
};

export const getQuizQuestions = (): QuizQuestion[] => QUIZ_QUESTIONS;

export const checkQuizAnswer = (
  questionId: number,
  selectedIndex: number
): boolean => {
  const q = QUIZ_QUESTIONS.find((item) => item.id === questionId);
  return q ? selectedIndex === q.correctIndex : false;
};
