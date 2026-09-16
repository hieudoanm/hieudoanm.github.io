import { act, renderHook } from '@testing-library/react';
import { PUZZLES } from '../puzzles';
import { useConnections } from '../useConnections';
import { MAX_MISTAKES } from '../utils';

const FIXED_DATE = '2026-08-22';

describe('useConnections', () => {
  it('initialises with sixteen tiles and no solved groups', () => {
    const { result } = renderHook(() => useConnections(FIXED_DATE));
    expect(result.current.tiles).toHaveLength(16);
    expect(result.current.solved).toHaveLength(0);
    expect(result.current.selected).toEqual([]);
    expect(result.current.mistakesLeft).toBe(MAX_MISTAKES);
    expect(result.current.status).toBe('playing');
  });

  it('toggles tiles on and off and caps selection at four', () => {
    const { result } = renderHook(() => useConnections(FIXED_DATE));
    const countries = result.current.tiles.map((tile) => tile.country);
    for (const country of countries.slice(0, 4)) {
      act(() => {
        result.current.toggle(country);
      });
    }
    expect(result.current.selected).toHaveLength(4);
    act(() => {
      result.current.toggle(countries[5]);
    });
    expect(result.current.selected).toHaveLength(4);
    act(() => {
      result.current.toggle(countries[0]);
    });
    expect(result.current.selected).toHaveLength(3);
  });

  it('clears selection with deselectAll', () => {
    const { result } = renderHook(() => useConnections(FIXED_DATE));
    act(() => {
      result.current.toggle(result.current.tiles[0].country);
    });
    expect(result.current.selected).toHaveLength(1);
    act(() => {
      result.current.deselectAll();
    });
    expect(result.current.selected).toEqual([]);
  });

  it('solves a correct group and removes those tiles', () => {
    const { result } = renderHook(() => useConnections(FIXED_DATE));
    const puzzle = PUZZLES.find(
      (candidate) => candidate.id === result.current.puzzleId
    );
    if (!puzzle) throw new Error('puzzle not found');
    expect(puzzle).toBeDefined();
    for (const member of puzzle.groups[0]!.members) {
      act(() => {
        result.current.toggle(member);
      });
    }
    expect(result.current.selected).toHaveLength(4);
    act(() => {
      result.current.submit();
    });
    expect(result.current.solved.map((group) => group.label)).toContain(
      puzzle.groups[0]!.label
    );
    expect(result.current.tiles).toHaveLength(12);
    expect(result.current.selected).toEqual([]);
    expect(result.current.status).toBe('playing');
  });

  it('keeps playing after a wrong guess but costs a mistake', () => {
    const { result } = renderHook(() => useConnections(FIXED_DATE));
    const puzzle = PUZZLES.find(
      (candidate) => candidate.id === result.current.puzzleId
    );
    if (!puzzle) throw new Error('puzzle not found');
    const wrong = [
      ...puzzle.groups[0]!.members.slice(0, 2),
      ...puzzle.groups[1]!.members.slice(0, 2),
    ];
    for (const country of wrong) {
      act(() => {
        result.current.toggle(country);
      });
    }
    act(() => {
      result.current.submit();
    });
    expect(result.current.mistakesLeft).toBe(MAX_MISTAKES - 1);
    expect(result.current.status).toBe('playing');
    expect(result.current.message).toBeTruthy();
  });

  it('reveals every group and clears the board on defeat', () => {
    const { result } = renderHook(() => useConnections(FIXED_DATE));
    const puzzle = PUZZLES.find(
      (candidate) => candidate.id === result.current.puzzleId
    );
    if (!puzzle) throw new Error('puzzle not found');
    const wrong = [
      ...puzzle.groups[0]!.members.slice(0, 2),
      ...puzzle.groups[1]!.members.slice(0, 2),
    ];
    for (let attempt = 0; attempt < MAX_MISTAKES; attempt += 1) {
      for (const country of wrong) {
        act(() => {
          result.current.toggle(country);
        });
      }
      act(() => {
        result.current.submit();
      });
    }
    expect(result.current.status).toBe('lost');
    expect(result.current.solved).toHaveLength(4);
    expect(result.current.tiles).toHaveLength(0);
  });

  it('shuffles without losing or duplicating tiles', () => {
    const { result } = renderHook(() => useConnections(FIXED_DATE));
    const before = result.current.tiles.map((tile) => tile.country).sort();
    act(() => {
      result.current.shuffle();
    });
    const after = result.current.tiles.map((tile) => tile.country).sort();
    expect(after).toEqual(before);
  });

  it('moves to the next puzzle fully reset', () => {
    const { result } = renderHook(() => useConnections(FIXED_DATE));
    act(() => {
      result.current.toggle(result.current.tiles[0].country);
    });
    act(() => {
      result.current.submit(); // wrong guess
    });
    act(() => {
      result.current.nextPuzzle();
    });
    expect(result.current.solved).toHaveLength(0);
    expect(result.current.selected).toEqual([]);
    expect(result.current.mistakesLeft).toBe(MAX_MISTAKES);
    expect(result.current.status).toBe('playing');
    expect(result.current.tiles).toHaveLength(16);
  });

  it('ignores input after the game ends', () => {
    const { result } = renderHook(() => useConnections(FIXED_DATE));
    const puzzle = PUZZLES.find(
      (candidate) => candidate.id === result.current.puzzleId
    );
    if (!puzzle) throw new Error('puzzle not found');
    const wrong = [
      ...puzzle.groups[0]!.members.slice(0, 2),
      ...puzzle.groups[1]!.members.slice(0, 2),
    ];
    for (let attempt = 0; attempt < MAX_MISTAKES; attempt += 1) {
      for (const country of wrong) {
        act(() => {
          result.current.toggle(country);
        });
      }
      act(() => {
        result.current.submit();
      });
    }
    expect(result.current.status).toBe('lost');
    act(() => {
      result.current.toggle('Chile');
    });
    act(() => {
      result.current.submit();
    });
    expect(result.current.selected).toEqual([]);
  });
});
