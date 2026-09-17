import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import type { Card } from '../types';
import { PokerOdds } from '../index';
import { usePokerOdds } from '../usePokerOdds';

describe('usePokerOdds', () => {
  it('is not ready without a full hand and flop', () => {
    const { result } = renderHook(() => usePokerOdds());
    expect(result.current.ready).toBe(false);
    expect(result.current.players).toBe(2);
  });

  it('becomes ready once hand and flop are set, then computes equity', () => {
    const { result } = renderHook(() => usePokerOdds());
    act(() => result.current.setCard('hand', 0, { rank: 14, suit: 's' }));
    act(() => result.current.setCard('hand', 1, { rank: 14, suit: 'h' }));
    act(() => result.current.setCard('board', 0, { rank: 7, suit: 'd' }));
    act(() => result.current.setCard('board', 1, { rank: 9, suit: 'c' }));
    act(() => result.current.setCard('board', 2, { rank: 2, suit: 's' }));
    expect(result.current.ready).toBe(true);
    act(() => result.current.setPlayers(3));
    expect(result.current.players).toBe(3);
    act(() => result.current.run());
    expect(result.current.results).not.toBeNull();
    const equity = result.current.results!.equity;
    expect(equity).toBeGreaterThan(0);
    expect(equity).toBeLessThanOrEqual(100);
  });

  it('clears results when a card changes', () => {
    const { result } = renderHook(() => usePokerOdds());
    act(() => result.current.setCard('hand', 0, { rank: 14, suit: 's' }));
    act(() => result.current.setCard('hand', 1, { rank: 14, suit: 'h' }));
    for (const [index, card] of (
      [
        { rank: 7, suit: 'd' },
        { rank: 9, suit: 'c' },
        { rank: 2, suit: 's' },
      ] as Card[]
    ).entries()) {
      act(() => result.current.setCard('board', index, card));
    }
    act(() => result.current.run());
    expect(result.current.results).not.toBeNull();
    act(() => result.current.setCard('board', 4, { rank: 5, suit: 'h' }));
    expect(result.current.results).toBeNull();
  });
});

describe('PokerOdds', () => {
  it('prompts for hand and flop and disables run', () => {
    render(<PokerOdds />);
    expect(screen.getByText(/Select your hand/)).toBeInTheDocument();
    expect(screen.getByTestId('poker-run')).toBeDisabled();
  });

  it('selects cards via dropdowns and calculates', () => {
    render(<PokerOdds />);
    const selects = [
      'poker-select-Your hand-0',
      'poker-select-Your hand-1',
      'poker-select-Board (flop required)-0',
      'poker-select-Board (flop required)-1',
      'poker-select-Board (flop required)-2',
    ];
    const values = ['14s', '13s', '12s', '11s', '10s'];
    selects.forEach((testId, index) => {
      fireEvent.change(screen.getByTestId(testId), {
        target: { value: values[index] },
      });
    });
    expect(screen.getByTestId('poker-run')).toBeEnabled();
    fireEvent.click(screen.getByTestId('poker-run'));
    expect(screen.getByTestId('poker-results')).toBeInTheDocument();
  });
});
