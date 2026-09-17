import { act, renderHook } from '@testing-library/react';
import { STAKE } from '../utils';
import { useKeno } from '../useKeno';

jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils');
  return { ...actual, drawNumbers: jest.fn(() => actual.drawNumbers()) };
});

const { drawNumbers: mockedDraw } = jest.requireMock('../utils') as {
  drawNumbers: jest.Mock;
};

describe('useKeno', () => {
  it('toggles spots up to five and back', () => {
    const { result } = renderHook(() => useKeno());
    act(() => result.current.toggle(7));
    act(() => result.current.toggle(13));
    expect(result.current.selected).toEqual([7, 13]);
    act(() => result.current.toggle(7));
    expect(result.current.selected).toEqual([13]);
    for (const number_ of [1, 2, 3, 4, 5])
      act(() => result.current.toggle(number_));
    expect(result.current.selected).toHaveLength(5);
    act(() => result.current.toggle(99));
    expect(result.current.selected).toHaveLength(5);
  });

  it('quick-picks five and clears', () => {
    const { result } = renderHook(() => useKeno());
    act(() => result.current.autoPick());
    expect(result.current.selected).toHaveLength(5);
    act(() => result.current.clear());
    expect(result.current.selected).toEqual([]);
  });

  it('plays a round and pays according to catches', () => {
    mockedDraw.mockReturnValue(
      Array.from({ length: 20 }, (_, index) => index * 4 + 1)
    );
    const { result } = renderHook(() => useKeno());
    act(() => result.current.toggle(1));
    expect(result.current.canPlay).toBe(true);
    act(() => result.current.play());
    // number 1 is among the mocked draw (1,5,9,...) → one catch pays 30
    expect(result.current.draw!.catches).toBe(1);
    expect(result.current.credits).toBe(200 - STAKE + 30);
  });

  it('blocks play without a bet or credits', () => {
    const { result } = renderHook(() => useKeno());
    expect(result.current.canPlay).toBe(false);
    act(() => result.current.play());
    expect(result.current.draw).toBeNull();
  });
});
