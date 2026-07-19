import { act, renderHook } from '@testing-library/react';
import { useContinentsSort } from '../useContinentsSort';
import { SORT_COUNT } from '../utils';

const playThrough = (result: {
  current: ReturnType<typeof useContinentsSort>;
}): void => {
  for (let placed = 0; placed < SORT_COUNT; placed += 1) {
    const card = result.current.unplaced[0];
    act(() => {
      result.current.startDrag(card.name);
    });
    const region = card.correctRegion === 'Africa' ? 'Europe' : 'Africa';
    if (placed % 2 === 0) {
      act(() => {
        result.current.drop(card.correctRegion);
      });
    } else {
      act(() => {
        result.current.drop(region as never);
      });
    }
  }
};

describe('useContinentsSort', () => {
  it('starts with a fresh deal', () => {
    const { result } = renderHook(() => useContinentsSort());
    expect(result.current.cards).toHaveLength(SORT_COUNT);
    expect(result.current.unplaced).toHaveLength(SORT_COUNT);
    expect(result.current.placedCount).toBe(0);
    expect(result.current.gameOver).toBe(false);
    expect(result.current.score).toBe(0);
    expect(result.current.mistakes).toBe(0);
  });

  it('scores correct drops and counts mistakes on wrong ones', () => {
    const { result } = renderHook(() => useContinentsSort());
    const card = result.current.unplaced[0];
    act(() => {
      result.current.startDrag(card.name);
    });
    expect(result.current.dragging).toBe(card.name);
    act(() => {
      result.current.drop(card.correctRegion);
    });
    expect(result.current.score).toBe(1);
    expect(result.current.placedCount).toBe(1);

    const second = result.current.unplaced[0];
    act(() => {
      result.current.startDrag(second.name);
    });
    const wrongRegion = second.correctRegion === 'Africa' ? 'Europe' : 'Africa';
    act(() => {
      result.current.drop(wrongRegion as never);
    });
    expect(result.current.mistakes).toBe(1);
    expect(result.current.message?.correct).toBe(false);
    expect(result.current.message?.text).toContain(second.name);
  });

  it('ends the game once every card is placed and resets cleanly', () => {
    const { result } = renderHook(() => useContinentsSort());
    playThrough(result);
    expect(result.current.unplaced).toHaveLength(0);
    expect(result.current.placedCount).toBe(SORT_COUNT);
    expect(result.current.gameOver).toBe(true);
    act(() => {
      result.current.reset();
    });
    expect(result.current.unplaced).toHaveLength(SORT_COUNT);
    expect(result.current.gameOver).toBe(false);
    expect(result.current.score).toBe(0);
    expect(result.current.mistakes).toBe(0);
  });

  it('ignores drops without a dragged card', () => {
    const { result } = renderHook(() => useContinentsSort());
    act(() => {
      result.current.drop('Africa');
    });
    expect(result.current.placedCount).toBe(0);
  });

  it('endDrag clears the current selection', () => {
    const { result } = renderHook(() => useContinentsSort());
    act(() => {
      result.current.startDrag(result.current.unplaced[0].name);
    });
    act(() => {
      result.current.endDrag();
    });
    expect(result.current.dragging).toBeNull();
  });
});
