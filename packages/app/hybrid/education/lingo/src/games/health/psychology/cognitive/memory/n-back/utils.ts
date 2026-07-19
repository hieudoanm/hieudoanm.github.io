import { GRID_POSITIONS, LETTERS, STRONG_ACCURACY } from './constants';

export interface Stimulus {
  position: number;
  letter: string;
}

export interface Trial {
  stimulus: Stimulus;
  isTarget: boolean;
}

export type Response = 'match' | 'no-match';

const randomLetter = (): string =>
  LETTERS[Math.floor(Math.random() * LETTERS.length)];

const randomPosition = (): number =>
  GRID_POSITIONS[Math.floor(Math.random() * GRID_POSITIONS.length)];

const biasTowardRepeat = (previous: Stimulus, next: Stimulus): Stimulus => {
  const repeatPosition = Math.random() < 0.5;

  return {
    position: repeatPosition ? previous.position : next.position,
    letter:
      repeatPosition && Math.random() < 0.5 ? previous.letter : next.letter,
  };
};

const buildStimulus = (previous: Stimulus | null): Stimulus => {
  const stimulus: Stimulus = {
    position: randomPosition(),
    letter: randomLetter(),
  };

  if (previous === null) return stimulus;

  const biased =
    Math.random() < 0.3 ? biasTowardRepeat(previous, stimulus) : stimulus;

  if (biased.position !== previous.position) return biased;

  return {
    ...biased,
    letter: Math.random() < 0.5 ? previous.letter : biased.letter,
  };
};

export const generateTrials = (n: number, count: number): Trial[] => {
  const trials: Trial[] = [];

  for (let index = 0; index < count; index++) {
    const previous = index >= n ? trials[index - n].stimulus : null;
    const stimulus = buildStimulus(previous);
    const isTarget =
      previous !== null && stimulus.position === previous.position;

    trials.push({ stimulus, isTarget });
  }

  return trials;
};

export const countTargets = (trials: Trial[]): number =>
  trials.filter((trial) => trial.isTarget).length;

export const hitRate = (hits: number, falseAlarms: number): number =>
  hits + falseAlarms > 0 ? hits / (hits + falseAlarms) : 0;

export const isStrong = (accuracy: number): boolean =>
  accuracy > STRONG_ACCURACY;
