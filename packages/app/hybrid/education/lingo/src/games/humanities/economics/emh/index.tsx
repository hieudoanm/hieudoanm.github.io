import { useCallback, useReducer, useState, type FC } from 'react';
import { PositionChooser, RoundResultPanel, SummaryPanel } from './components';
import { RETURNS, TIPS, TOTAL_ROUNDS } from './constants';
import { buildSummary, createInitialState, gameReducer } from './reducer';
import type { Position } from './types';

const formatWealth = (n: number): string => `$${n.toFixed(2)}`;

export const EmhGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [position, setPosition] = useState<Position | null>(null);
  const { phase, round, wealth, results } = state;
  const summary = phase === 'done' ? buildSummary(results) : null;

  const choosePosition = useCallback((next: Position) => {
    dispatch({ type: 'SET_POSITION', position: next });
    setPosition(next);
  }, []);
  const next = useCallback(() => {
    dispatch({ type: 'NEXT' });
    setPosition(null);
  }, []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setPosition(null);
  }, []);

  return (
    <div className="flex flex-col gap-4" data-testid="emh-game">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Portfolio: <strong>{formatWealth(wealth)}</strong>
        </span>
      </div>

      {phase === 'play' && !position && (
        <PositionChooser
          round={round}
          wealth={wealth}
          tip={TIPS[round - 1]}
          onChoose={choosePosition}
        />
      )}

      {phase === 'play' && position && (
        <RoundResultPanel
          round={round}
          returnPct={RETURNS[round - 1]}
          tip={TIPS[round - 1]}
          position={position}
          wealth={wealth}
          onNext={next}
        />
      )}

      {phase === 'done' && summary && (
        <SummaryPanel summary={summary} results={results} onReset={reset} />
      )}
    </div>
  );
};
EmhGame.displayName = 'EmhGame';
