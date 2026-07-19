import { ROUNDS } from './constants';
import type { AnchoringReport, RoundItem, RoundResult } from './types';

export const absError = (guess: number, answer: number): number =>
  Math.abs(guess - answer);

export const scoreRound = (guess: number, answer: number): number => {
  const ratio = absError(guess, answer) / answer;
  if (ratio <= 0.25) return 2;
  if (ratio <= 0.5) return 1;
  return 0;
};

export const scoreConjunction = (base: number, overlap: number): number =>
  base > 0 && overlap <= base ? 2 : 0;

const roundToTenth = (n: number): number => Math.round(n * 10) / 10;

export const anchorBiasReport = (
  results: RoundResult[],
  items: RoundItem[] = ROUNDS
): AnchoringReport => {
  const kindOf = (id: string): RoundItem['kind'] | undefined =>
    items.find((item) => item.id === id)?.kind;
  const anchored = results.filter((r) => kindOf(r.roundId) === 'anchored');
  const control = results.find((r) => kindOf(r.roundId) === 'control');
  const anchoredAvgError =
    anchored.length === 0
      ? 0
      : roundToTenth(
          anchored.reduce((sum, r) => sum + r.error, 0) / anchored.length
        );
  const controlError = control ? roundToTenth(control.error) : 0;
  const drifted = anchoredAvgError > controlError;
  return {
    anchoredAvgError,
    controlError,
    drifted,
    summary: drifted
      ? `Anchored rounds averaged ${anchoredAvgError} points of absolute error, versus ${controlError} for the unanchored control — the anchor pulled your guesses toward it.`
      : `Anchored rounds averaged ${anchoredAvgError} points of error, versus ${controlError} for the control — you resisted the anchor.`,
  };
};
