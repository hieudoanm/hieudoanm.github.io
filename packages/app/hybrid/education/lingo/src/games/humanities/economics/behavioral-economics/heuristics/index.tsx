'use client';

import { FC, useCallback, useMemo, useReducer, useState } from 'react';
import {
  AnchorBanner,
  FeedbackPanel,
  GuessForm,
  RoundIntro,
  SummaryPanel,
} from './components';
import {
  BASE_LABEL,
  MAX_SCORE,
  OVERLAP_LABEL,
  ROUNDS,
  TOTAL_ROUNDS,
} from './constants';
import { anchorBiasReport } from './game';
import { createInitialState, gameReducer } from './reducer';

export const HeuristicsGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [value, setValue] = useState('');
  const { phase, roundIndex, guessA, result, results, totalPoints } = state;
  const item = ROUNDS[roundIndex];

  const submitGuess = useCallback(() => {
    const guess = Number(value);
    if (!Number.isFinite(guess) || guess < 0) return;
    dispatch({ type: 'SUBMIT_GUESS', guess });
    setValue('');
  }, [value]);

  const next = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const report = useMemo(
    () => (phase === 'done' ? anchorBiasReport(results) : null),
    [phase, results]
  );

  const secondPrompt = item !== undefined && guessA !== null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span data-testid="round-progress">
          Round <strong>{Math.min(roundIndex + 1, TOTAL_ROUNDS)}</strong> /{' '}
          {TOTAL_ROUNDS}
        </span>
        <span>
          Points: <strong data-testid="total-points">{totalPoints}</strong> /{' '}
          {MAX_SCORE}
        </span>
      </div>

      {phase === 'answer' && item && (
        <div className="flex flex-col gap-3" data-testid="answer-panel">
          <RoundIntro
            question={item.question}
            story={item.story}
            note={
              item.kind === 'representativeness' && guessA !== null
                ? `You estimated P(A) = ${guessA}%. Now estimate P(A and B) — it must not exceed P(A).`
                : undefined
            }
          />
          {item.anchorText && <AnchorBanner text={item.anchorText} />}
          <GuessForm
            value={value}
            onChange={setValue}
            onSubmit={submitGuess}
            label={
              item.kind !== 'representativeness'
                ? `Your guess (${item.unit})`
                : guessA === null
                  ? BASE_LABEL
                  : OVERLAP_LABEL
            }
            submitLabel={secondPrompt ? 'Submit Second Guess' : 'Submit Guess'}
          />
        </div>
      )}

      {phase === 'reveal' && item && result && (
        <FeedbackPanel
          item={item}
          result={result}
          isLast={roundIndex >= TOTAL_ROUNDS - 1}
          onNext={next}
        />
      )}

      {phase === 'done' && report && (
        <SummaryPanel
          results={results}
          report={report}
          totalPoints={totalPoints}
          onReset={reset}
        />
      )}
    </div>
  );
};

HeuristicsGame.displayName = 'HeuristicsGame';
