import { CHOICES, COUNTERED_BY, LAPSE_MS, MIN_REACTION_MS } from './constants';
import { Choice, Summary, Trial, EMPTY_SUMMARY } from './types';

export const counterFor = (bot: Choice): Choice => COUNTERED_BY[bot];

export const isCorrect = (human: Choice, bot: Choice): boolean =>
  human === counterFor(bot);

export const randomChoice = (): Choice =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)];

export const createTrial = (
  index: number,
  bot: Choice,
  human: Choice,
  shownAt: number,
  respondedAt: number
): Trial => {
  const reactionMs = Math.max(0, Math.round(respondedAt - shownAt));
  const anticipatory = reactionMs < MIN_REACTION_MS;

  return {
    index,
    bot,
    human,
    reactionMs,
    correct: !anticipatory && isCorrect(human, bot),
    anticipatory,
    lapse: reactionMs > LAPSE_MS,
  };
};

const round = (value: number): number => Math.round(value);

export const mean = (values: number[]): number =>
  values.length === 0
    ? 0
    : round(values.reduce((total, value) => total + value, 0) / values.length);

export const median = (values: number[]): number => {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  return sorted.length % 2 === 0
    ? round((sorted[middle - 1] + sorted[middle]) / 2)
    : sorted[middle];
};

export const driftOf = (trials: Trial[]): number => {
  if (trials.length < 2) return 0;

  const half = Math.floor(trials.length / 2);
  const early = mean(trials.slice(0, half).map((trial) => trial.reactionMs));
  const late = mean(trials.slice(half).map((trial) => trial.reactionMs));

  return late - early;
};

export const summarize = (trials: Trial[]): Summary => {
  if (trials.length === 0) return { ...EMPTY_SUMMARY };

  const times = trials.map((trial) => trial.reactionMs);
  const correct = trials.filter((trial) => trial.correct).length;

  return {
    trials: trials.length,
    correct,
    accuracy: correct / trials.length,
    meanMs: mean(times),
    medianMs: median(times),
    bestMs: Math.min(...times),
    lapses: trials.filter((trial) => trial.lapse).length,
    anticipatories: trials.filter((trial) => trial.anticipatory).length,
    driftMs: driftOf(trials),
  };
};

export const formatMs = (ms: number): string =>
  ms >= 1000 ? `${(ms / 1000).toFixed(2)}s` : `${ms}ms`;

export const formatPercent = (ratio: number): string =>
  `${Math.round(ratio * 100)}%`;

export const paceReading = (meanMs: number): string => {
  if (meanMs === 0) return '';
  if (meanMs < 450) return 'That is a fast processing speed.';
  if (meanMs < 800) return 'That is a typical reaction speed.';

  return 'That is slow — attention was probably drifting.';
};

export const accuracyReading = (accuracy: number): string => {
  if (accuracy >= 0.95)
    return 'Almost no errors: you paid for speed with nothing.';
  if (accuracy >= 0.8) return 'A good balance of speed and accuracy.';

  return 'Rushing cost you accuracy — the classic speed-accuracy trade.';
};

export const reading = (summary: Summary): string => {
  if (summary.trials === 0) return 'Press start to run the trials.';

  const parts = [
    paceReading(summary.meanMs),
    accuracyReading(summary.accuracy),
  ];

  if (summary.anticipatories === 0) {
    parts.push('Responses were clean, so the reading is yours.');
  } else if (summary.anticipatories > 0) {
    parts.push(
      `${summary.anticipatories} response(s) landed before the move was even visible — treat those as void.`
    );
  }

  if (summary.lapses > 0) {
    parts.push(
      `${summary.lapses} lapse(s) over ${formatMs(LAPSE_MS)}: attention dropped out mid-block.`
    );
  }

  if (summary.trials >= 6) {
    parts.push(
      summary.driftMs > 60
        ? `You slowed by ${formatMs(summary.driftMs)} in the second half — sustained attention decays.`
        : 'Your speed held across the block, so vigilance did not decay much.'
    );
  }

  return parts.filter(Boolean).join(' ');
};

export const canRespond = (phase: string): boolean => phase === 'awaiting';
