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
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
};

export const MythVsFact: FC = () => {
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
    (g: Claim) => {
      if (phase !== 'playing') return;
      dispatch({ type: 'GUESS', guess: g });
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
      if (e.key === 'r') {
        reset();
        return;
      }
      if (e.key === 'm') handleGuess('myth');
      if (e.key === 'f') handleGuess('fact');
      if (e.key === 'Enter' && phase === 'reveal') next();
    },
    [handleGuess, next, phase, reset]
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
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-1 flex-col gap-4 p-6 outline-none">
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
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-primary text-xs font-semibold tracking-wider uppercase">
              {category}
            </div>
            <p className="mt-4 max-w-lg text-center text-xl font-medium">
              &ldquo;{item.myth}&rdquo;
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => handleGuess('myth')}
              className="btn btn-outline btn-lg px-10">
              Myth
            </button>
            <button
              onClick={() => handleGuess('fact')}
              className="btn btn-primary btn-lg px-10">
              Fact
            </button>
          </div>
          <p className="text-base-content/40 text-xs">
            Press M for Myth or F for Fact
          </p>
        </div>
      )}

      {phase === 'reveal' && item && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div
            className={`text-xl font-bold ${correct ? 'text-success' : 'text-error'}`}>
            {correct ? 'Correct!' : 'Wrong!'}
          </div>
          <div className="bg-base-200 w-full max-w-lg rounded-xl border p-5">
            <div className="text-primary text-xs font-semibold tracking-wider uppercase">
              The truth
            </div>
            <p className="mt-3">{item.fact}</p>
            <div className="text-base-content/50 mt-3 text-xs">
              Answer: <strong>{correctGuess(item)}</strong> &middot; Streak{' '}
              {streak}
            </div>
          </div>
          <button onClick={next} className="btn btn-primary btn-sm">
            {round >= total - 1 ? 'See Results' : 'Next'}
          </button>
          <p className="text-base-content/40 text-xs">
            Press Enter to continue
          </p>
        </div>
      )}

      {phase === 'done' && (
        <div className="flex flex-1 flex-col items-center gap-4 py-4">
          <div className="text-5xl">
            {formatAccuracy(score, total) === '100%'
              ? '\uD83C\uDFC6'
              : score >= Math.ceil(total / 2)
                ? '\u2714'
                : '\u2718'}
          </div>
          <div className="text-lg font-bold">
            {score} / {total} correct
          </div>
          <div className="text-base-content/60 text-sm">
            {formatAccuracy(score, total)} accuracy &middot; best streak{' '}
            {bestStreak}
          </div>
          {categoryTally.length > 0 && (
            <div className="bg-base-200 w-full max-w-lg rounded-xl border p-4 text-sm">
              {categoryTally.map((t) => (
                <div
                  key={t.category}
                  className="border-base-300 flex items-center justify-between border-b py-2 last:border-0">
                  <span className="text-base-content/60">{t.category}</span>
                  <span className="font-medium">
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

      <p className="text-base-content/40 text-center text-xs">
        M myth &middot; F fact &middot; R reset
      </p>
    </div>
  );
};
MythVsFact.displayName = 'MythVsFact';
