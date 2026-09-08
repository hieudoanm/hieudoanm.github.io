import { FC, useCallback, useReducer, useState } from 'react';
import { TOTAL_ROUNDS } from './constants';
import { PredictPanel, RevealPanel, SummaryPanel } from './components';
import { createInitialState, gameReducer, historyFor } from './reducer';
import type { ExpansionCategory } from './types';

export const BusinessCyclesGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [prediction, setPrediction] = useState('');
  const [category, setCategory] = useState<ExpansionCategory | null>(null);
  const { phase, round, results, totalScore } = state;

  const rows = historyFor(phase === 'done' ? TOTAL_ROUNDS : round - 1);
  const last = results[results.length - 1];
  const isLast = round >= TOTAL_ROUNDS;

  const handlePrediction = useCallback((value: string) => {
    setPrediction(value);
  }, []);

  const handleCategory = useCallback((value: ExpansionCategory) => {
    setCategory(value);
    setPrediction('');
  }, []);

  const submit = useCallback(() => {
    const parsed = prediction.trim() === '' ? null : Number(prediction);
    const numeric = parsed !== null && Number.isFinite(parsed) ? parsed : null;
    if (numeric === null && category === null) return;
    dispatch({
      type: 'SUBMIT_PREDICTION',
      prediction: numeric,
      category,
    });
    setPrediction('');
    setCategory(null);
  }, [prediction, category]);

  const next = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setPrediction('');
    setCategory(null);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Business Cycle Lab <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Total score: <strong>{totalScore.toFixed(1)}</strong>
        </span>
      </div>

      {phase === 'predict' && (
        <PredictPanel
          round={round}
          rows={rows}
          prediction={prediction}
          category={category}
          onPredictionChange={handlePrediction}
          onCategorySelect={handleCategory}
          onSubmit={submit}
        />
      )}

      {phase === 'reveal' && last && (
        <RevealPanel
          result={last}
          totalScore={totalScore}
          isLast={isLast}
          onNext={next}
        />
      )}

      {phase === 'done' && (
        <SummaryPanel rows={rows} totalScore={totalScore} onReset={reset} />
      )}
    </div>
  );
};

BusinessCyclesGame.displayName = 'BusinessCyclesGame';
