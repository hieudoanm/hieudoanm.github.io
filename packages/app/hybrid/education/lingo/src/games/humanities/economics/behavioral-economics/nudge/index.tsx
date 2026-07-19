'use client';

import { FC, useCallback, useReducer, useState } from 'react';
import { DonePanel } from './components-report';
import {
  SimulatorInput,
  SimulatorIntro,
  SimulatorResult,
} from './components-simulator';
import { RevealPanel, RoundCard } from './components';
import { DOMAINS, TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import type { Design } from './types';

export const NudgeGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [design, setDesign] = useState<Design>('opt-in');
  const [inertia, setInertia] = useState(50);
  const [defaultRate, setDefaultRate] = useState(3);
  const { phase, roundIndex, report, reports, targetHits, simulator } = state;

  const checkDesign = useCallback(
    () => dispatch({ type: 'CHECK_DESIGN', design, inertia }),
    [design, inertia]
  );
  const nextRound = useCallback(() => {
    dispatch({ type: 'NEXT_ROUND' });
    setDesign('opt-in');
    setInertia(50);
  }, []);
  const checkSim = useCallback(
    () => dispatch({ type: 'CHECK_SIM', defaultRate }),
    [defaultRate]
  );
  const retrySim = useCallback(() => dispatch({ type: 'RESET_SIM' }), []);
  const finish = useCallback(() => dispatch({ type: 'FINISH' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setDesign('opt-in');
    setInertia(50);
    setDefaultRate(3);
  }, []);

  const domain = DOMAINS[roundIndex];
  const round = Math.min(roundIndex + 1, TOTAL_ROUNDS);

  return (
    <div className="flex flex-col gap-4">
      {phase === 'design' && domain && (
        <RoundCard
          round={round}
          total={TOTAL_ROUNDS}
          domain={domain}
          design={design}
          onDesign={setDesign}
          inertia={inertia}
          onInertia={setInertia}
          hits={targetHits}
          onCheck={checkDesign}
        />
      )}

      {phase === 'reveal' && report && (
        <RevealPanel
          report={report}
          isLast={roundIndex >= TOTAL_ROUNDS - 1}
          onNext={nextRound}
        />
      )}

      {phase === 'simulator' && (
        <div className="flex flex-col gap-3">
          <SimulatorIntro />
          {simulator ? (
            <SimulatorResult
              outcome={simulator}
              onRetry={retrySim}
              onFinish={finish}
            />
          ) : (
            <SimulatorInput
              defaultRate={defaultRate}
              onDefaultRate={setDefaultRate}
              onCheck={checkSim}
            />
          )}
        </div>
      )}

      {phase === 'done' && (
        <DonePanel
          reports={reports}
          simulator={simulator}
          hits={targetHits}
          onReset={reset}
        />
      )}
    </div>
  );
};

NudgeGame.displayName = 'NudgeGame';
