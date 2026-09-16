import { isCountry } from '../_shared/countries';
import type {
  GameStatus,
  Puzzle,
  PuzzleGroup,
  SolvedGroup,
  Tile,
} from './types';

export const MAX_MISTAKES = 4;

/** Deterministic Fisher-Yates driven by an integer seed. */
export const seededShuffle = <T>(items: T[], seed: number): T[] => {
  const result = [...items];
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  for (let index = result.length - 1; index > 0; index -= 1) {
    state = (state * 16807) % 2147483647;
    const swap = index === 0 ? 0 : state % (index + 1);
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
};

export const createTiles = (puzzle: Puzzle, seed: number): Tile[] => {
  const countries = puzzle.groups.flatMap((group) => [...group.members]);
  return seededShuffle(countries, seed).map((country) => ({ country }));
};

export const GROUP_COLORS = [
  'bg-warning text-warning-content',
  'bg-success text-success-content',
  'bg-info text-info-content',
  'bg-error text-error-content',
] as const;

export interface SubmitOutcome {
  /** Empty array clears the current selection. */
  selected: string[];
  solved: SolvedGroup[];
  mistakesLeft: number;
  message: string | null;
  status: GameStatus;
}

const largestOverlap = (selection: string[], groups: PuzzleGroup[]): number =>
  Math.max(
    ...groups.map(
      (group) =>
        group.members.filter((member) => selection.includes(member)).length
    ),
    0
  );

/** Pure core of a Connections guess. */
export const submitSelection = (
  puzzle: Puzzle,
  solvedLabels: string[],
  selection: string[],
  mistakesLeft: number
): SubmitOutcome => {
  if (selection.length !== 4) {
    return {
      selected: selection,
      solved: [],
      mistakesLeft,
      message: 'Select four countries',
      status: 'playing',
    };
  }
  const remainingGroups = puzzle.groups.filter(
    (group) => !solvedLabels.includes(group.label)
  );
  const match = remainingGroups.find((group) =>
    group.members.every((member) => selection.includes(member))
  );
  if (!match) {
    const nextMistakes = mistakesLeft - 1;
    if (nextMistakes <= 0) {
      return {
        selected: [],
        solved: [],
        mistakesLeft: 0,
        message: 'No mistakes left.',
        status: 'lost',
      };
    }
    const oneAway = largestOverlap(selection, remainingGroups) === 3;
    return {
      selected: [],
      solved: [],
      mistakesLeft: nextMistakes,
      message: oneAway ? 'One away...' : 'Not quite.',
      status: 'playing',
    };
  }
  const nextSolved: SolvedGroup = {
    ...match,
    color: GROUP_COLORS[solvedLabels.length % GROUP_COLORS.length],
  };
  return {
    selected: [],
    solved: [nextSolved],
    mistakesLeft,
    message: null,
    status:
      solvedLabels.length + 1 === puzzle.groups.length ? 'won' : 'playing',
  };
};

/** Validates every puzzle is a disjoint partition of real country names. */
export const validatePuzzle = (puzzle: Puzzle): string[] => {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const group of puzzle.groups) {
    if (group.members.length !== 4) {
      errors.push(`${group.label}: expected 4 members`);
    }
    for (const member of group.members) {
      if (seen.has(member)) errors.push(`duplicate country ${member}`);
      seen.add(member);
      if (!isCountry(member)) errors.push(`unknown country ${member}`);
    }
  }
  if (puzzle.groups.length !== 4) errors.push('expected 4 groups');
  return errors;
};
