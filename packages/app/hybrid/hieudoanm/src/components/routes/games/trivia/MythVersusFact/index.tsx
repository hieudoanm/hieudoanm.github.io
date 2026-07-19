import { FC, useCallback, useEffect, useReducer, useRef } from 'react';

import { CATEGORIES, ITEMS, ROUNDS } from './constants';
import { Claim, MythFactItem, Phase, RoundResult } from './types';
import {
  buildDeck,
  correctGuess,
  formatAccuracy,
  isCorrectGuess,
} from './utils/game';

interface GameState {
  phase: Phase;
  deck: MythFactItem[];
  round: number;
  guess: Claim | null;
  correct: boolean;
  score: number;
  streak: number;
  bestStreak: number;
  results: RoundResult[];
}

type GameAction =
  { type: 'GUESS'; guess: Claim } | { type: 'NEXT' } | { type: 'RESET' };

const createInitialState = (): GameState => ({
  phase: 'playing',
  deck: buildDeck(ITEMS, ROUNDS),
  round: 0,
  guess: null,
  correct: false,
  score: 0,
  streak: 0,
  bestStreak: 0,
  results: [],
});

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'GUESS': {
      const item = state.deck[state.round];
      if (!item || state.guess !== null) return state;
      const correct = isCorrectGuess(item, action.guess);
      const streak = correct ? state.streak + 1 : 0;
      return {
        ...state,
        phase: 'reveal',
        guess: action.guess,
        correct,
        score: correct ? state.score + 1 : state.score,
        streak,
        bestStreak: Math.max(state.bestStreak, streak),
        results: [...state.results, { item, guess: action.guess, correct }],
      };
    }
    case 'NEXT': {
      if (state.round >= state.deck.length - 1) {
        return { ...state, phase: 'done' };
      }
      return {
        ...state,
        phase: 'playing',
        round: state.round + 1,
        guess: null,
        correct: false,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};

export const MythVersusFact: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const { phase, deck, round, guess, correct, score, streak, bestStreak } =
    state;
  const item = deck[round];
  const total = deck.length;

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleGuess = useCallback(
    (guess: Claim) => {
      if (phase !== 'playing') return;
      dispatch({ type: 'GUESS', guess });
    },
    [phase]
  );

  const next = useCallback(() => {
    if (phase !== 'reveal') return;
    dispatch({ type: 'NEXT' });
  }, [phase]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    containerRef.current?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'r') {
        reset();
        return;
      }
      if (e.key === 'm') handleGuess('myth');
      if (e.key === 'f') handleGuess('fact');
      if (e.key === 'Enter' && phase === 'reveal') next();
    },
    [onClose, handleGuess, next, phase, reset]
  );

  const category = item?.category ?? '';
  const activeCategories = new Set(state.results.map((r) => r.item.category));
  const categoryTally = CATEGORIES.map((c) => ({
    category: c,
    total: state.results.filter((r) => r.item.category === c).length,
    correct: state.results.filter((r) => r.item.category === c && r.correct)
      .length,
  })).filter((t) => activeCategories.has(t.category));

  return (
    <div className="h-full w-full p-4 md:p-8">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex h-full w-full flex-col gap-3 outline-none">
        <div className="flex items-center justify-between text-sm">
          <span>
            Round <strong>{phase === 'done' ? total : round + 1}</strong> /{' '}
            {total}
          </span>
          <div className="flex gap-3">
            <span>
              Score: <strong>{score}</strong>
            </span>
            <span className="opacity-60">
              Streak: <strong>{bestStreak}</strong>
            </span>
          </div>
        </div>

        {phase === 'playing' && item && (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-1 flex-col gap-4 py-4">
              <div className="text-center">
                <div className="text-[11px] tracking-widest uppercase opacity-40">
                  {category}
                </div>
                <p className="mx-auto mt-3 max-w-md text-center text-xl">
                  “{item.myth}”
                </p>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleGuess('myth')}
                  className="btn btn-outline btn-lg px-8">
                  Myth
                </button>
                <button
                  onClick={() => handleGuess('fact')}
                  className="btn btn-primary btn-lg px-8">
                  Fact
                </button>
              </div>
              <p className="text-center text-xs opacity-40">M myth · F fact</p>
            </div>
          </div>
        )}

        {phase === 'reveal' && item && (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-3 py-4">
              <div
                className={`text-xl ${correct ? 'text-success' : 'text-error'}`}>
                {correct ? 'Correct' : 'Wrong'}
              </div>
              <div className="border-base-300 w-full max-w-md rounded-lg border p-4">
                <div className="text-[11px] tracking-widest uppercase opacity-40">
                  The truth
                </div>
                <p className="mt-2">{item.fact}</p>
                <div className="mt-3 text-xs opacity-60">
                  Answer: <strong>{correctGuess(item)}</strong> · Streak{' '}
                  {streak}
                </div>
              </div>
              <button onClick={next} className="btn btn-primary btn-sm">
                {round >= total - 1 ? 'See Results' : 'Next'}
              </button>
              <p className="text-xs opacity-40">Enter to continue</p>
            </div>
          </div>
        )}

        {phase === 'done' && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="text-4xl">
              {formatAccuracy(score, total) === '100%'
                ? '🏆'
                : score >= Math.ceil(total / 2)
                  ? '✓'
                  : '×'}
            </div>
            <div className="text-lg">
              {score} / {total} correct
            </div>
            <div className="text-sm opacity-60">
              {formatAccuracy(score, total)} accuracy · best streak {bestStreak}
            </div>
            {categoryTally.length > 0 && (
              <div className="border-base-300 w-full max-w-md rounded-lg border p-3 text-sm">
                {categoryTally.map((t) => (
                  <div
                    key={t.category}
                    className="border-base-200 flex items-center justify-between border-b py-1 last:border-0">
                    <span className="opacity-60">{t.category}</span>
                    <span>
                      {t.correct}/{t.total}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <button onClick={reset} className="btn btn-primary btn-sm">
              Play Again
            </button>
          </div>
        )}

        <p className="text-center text-xs opacity-40">
          M myth · F fact · R reset · Esc close
        </p>
      </div>
    </div>
  );
};
MythVersusFact.displayName = 'MythVersusFact';
