'use client';

import { FC, useCallback, useReducer } from 'react';
import { ScenarioPanel, ScoreBadge } from './components';
import { FRAMER_CATEGORIES, SCENARIOS } from './constants';
import { DonePanel, FramerPanel } from './framer';
import { createInitialState, gameReducer } from './reducer';
import type { ChoiceId } from './types';

export const MentalAccountingGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const { phase, index, answers, revealed, allocations } = state;
  const scenario = SCENARIOS[index];

  const pickChoice = useCallback(
    (choice: ChoiceId) => dispatch({ type: 'PICK_CHOICE', choice }),
    []
  );
  const next = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
  const allocate = useCallback((amounts: number[]) => {
    const record = Object.fromEntries(
      FRAMER_CATEGORIES.map((category, i) => [category.id, amounts[i] ?? 0])
    );
    dispatch({ type: 'ALLOCATE', allocations: record });
  }, []);

  const header =
    phase === 'scenario'
      ? `Scenario ${index + 1} / ${SCENARIOS.length}`
      : phase === 'framer'
        ? 'Framer Round'
        : 'Results';

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>{header}</span>
        {phase !== 'done' && <ScoreBadge answers={answers} />}
      </div>

      {phase === 'scenario' && scenario && (
        <ScenarioPanel
          scenario={scenario}
          revealed={revealed}
          chosen={answers[index] ?? null}
          isLast={index === SCENARIOS.length - 1}
          onPick={pickChoice}
          onNext={next}
        />
      )}

      {phase === 'framer' && <FramerPanel onAllocate={allocate} />}

      {phase === 'done' && (
        <DonePanel
          answers={answers}
          allocations={allocations}
          onReset={reset}
        />
      )}
    </div>
  );
};
MentalAccountingGame.displayName = 'MentalAccountingGame';
