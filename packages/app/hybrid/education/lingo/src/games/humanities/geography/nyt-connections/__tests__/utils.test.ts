import { PUZZLES } from '../puzzles';
import type { Puzzle } from '../types';
import {
  createTiles,
  MAX_MISTAKES,
  seededShuffle,
  submitSelection,
  validatePuzzle,
} from '../utils';

const puzzle = PUZZLES[0];

describe('seededShuffle', () => {
  it('is deterministic for the same seed', () => {
    expect(seededShuffle([1, 2, 3, 4, 5], 42)).toEqual(
      seededShuffle([1, 2, 3, 4, 5], 42)
    );
  });

  it('preserves all elements', () => {
    const shuffled = seededShuffle(['a', 'b', 'c', 'd'], 7);
    expect([...shuffled].sort()).toEqual(['a', 'b', 'c', 'd']);
  });

  it('handles empty arrays and negative seeds', () => {
    expect(seededShuffle([], -3)).toEqual([]);
    expect(seededShuffle([1], -3)).toHaveLength(1);
  });
});

describe('createTiles', () => {
  it('returns a permutation of every member exactly once', () => {
    const tiles = createTiles(puzzle, 42);
    expect(tiles).toHaveLength(16);
    const sortedInput = puzzle.groups.flatMap((group) => group.members).sort();
    expect(tiles.map((tile) => tile.country).sort()).toEqual(sortedInput);
  });

  it('is deterministic for the same seed', () => {
    expect(createTiles(puzzle, 42)).toEqual(createTiles(puzzle, 42));
  });
});

describe('submitSelection', () => {
  const firstGroup = puzzle.groups[0].members;

  it('asks for four tiles when fewer are selected', () => {
    const outcome = submitSelection(
      puzzle,
      [],
      firstGroup.slice(0, 2),
      MAX_MISTAKES
    );
    expect(outcome.message).toBe('Select four countries');
    expect(outcome.status).toBe('playing');
    expect(outcome.mistakesLeft).toBe(MAX_MISTAKES);
    expect(outcome.selected).toHaveLength(2);
  });

  it('charges a mistake for a wrong guess without any hint', () => {
    const wrong = [
      ...firstGroup.slice(0, 2),
      ...puzzle.groups[1].members.slice(0, 2),
    ];
    const outcome = submitSelection(puzzle, [], wrong, MAX_MISTAKES);
    expect(outcome.mistakesLeft).toBe(MAX_MISTAKES - 1);
    expect(outcome.message).toBe('Not quite.');
    expect(outcome.selected).toEqual([]);
  });

  it('hints "One away..." when three members line up', () => {
    const almost = [...firstGroup.slice(0, 3), 'Japan'];
    const outcome = submitSelection(puzzle, [], almost, MAX_MISTAKES);
    expect(outcome.message).toBe('One away...');
  });

  it('solves a correct group and clears the selection', () => {
    const outcome = submitSelection(puzzle, [], [...firstGroup], MAX_MISTAKES);
    expect(outcome.status).toBe('playing');
    expect(outcome.solved).toHaveLength(1);
    expect(outcome.solved[0].label).toBe(puzzle.groups[0].label);
    expect(outcome.solved[0].color).toBeTruthy();
    expect(outcome.selected).toEqual([]);
    expect(outcome.mistakesLeft).toBe(MAX_MISTAKES);
  });

  it('wins when the last remaining group is solved', () => {
    const [a, b, c] = puzzle.groups;
    const afterThree = submitSelection(
      puzzle,
      [a.label, b.label, c.label],
      [...puzzle.groups[3].members],
      MAX_MISTAKES
    );
    expect(afterThree.status).toBe('won');
    expect(afterThree.solved[0].label).toBe(puzzle.groups[3].label);
  });

  it('loses when mistakes run out', () => {
    const wrong = [
      ...firstGroup.slice(0, 2),
      ...puzzle.groups[1].members.slice(0, 2),
    ];
    const outcome = submitSelection(puzzle, [], wrong, 1);
    expect(outcome.status).toBe('lost');
    expect(outcome.mistakesLeft).toBe(0);
    expect(outcome.message).toContain('No mistakes left');
  });
});

describe('validatePuzzle', () => {
  it('accepts every published puzzle', () => {
    for (const candidate of PUZZLES) {
      expect(validatePuzzle(candidate)).toEqual([]);
    }
  });

  it('rejects a puzzle with the wrong number of groups', () => {
    const bad: Puzzle = { id: -1, groups: [] };
    expect(validatePuzzle(bad)).toContain('expected 4 groups');
  });
});
