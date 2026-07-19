import { FC, useMemo, useReducer, useState } from 'react';
import { CHALLENGES, TOTAL_ROUNDS } from './constants';
import { liveStats } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { GameAction, GameState } from './reducer';
import { WeightsLab } from './components';
import { FrontierPlot, NAssetPanel } from './frontier';
import { ChallengePanel, ChallengeResultView, SummaryView } from './challenge';
import type { AssetId } from './types';

interface Handlers {
  setWeight: (asset: AssetId, value: number) => void;
  applyPreset: (preset: string) => void;
  setN: (value: number) => void;
  setChallengeWeight: (value: number) => void;
  check: () => void;
  next: () => void;
  reset: () => void;
  setRho: (value: number) => void;
}

const buildHandlers = (
  dispatch: (action: GameAction) => void,
  setRho: (value: number) => void
): Handlers => ({
  setWeight: (asset, value) => dispatch({ type: 'SET_WEIGHT', asset, value }),
  applyPreset: (preset) => dispatch({ type: 'APPLY_PRESET', preset }),
  setN: (value) => dispatch({ type: 'SET_N', value }),
  setChallengeWeight: (value) =>
    dispatch({ type: 'SET_CHALLENGE_WEIGHT', value }),
  check: () => dispatch({ type: 'SUBMIT_CHECK' }),
  next: () => dispatch({ type: 'NEXT' }),
  reset: () => dispatch({ type: 'RESET' }),
  setRho: (value) => setRho(value),
});

const GameHeader: FC<{ round: number; totalScore: number }> = ({
  round,
  totalScore,
}) => (
  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
    <span>
      Round <strong>{round}</strong> / {TOTAL_ROUNDS}
    </span>
    <span>
      Score: <strong>{totalScore.toFixed(2)}</strong>
    </span>
  </div>
);

const LabGrid: FC<{
  state: GameState;
  live: ReturnType<typeof liveStats>;
  rho: number;
  handlers: Handlers;
}> = ({ state, live, rho, handlers }) => (
  <div className="grid gap-4 lg:grid-cols-2">
    <WeightsLab
      weights={state.weights}
      live={live}
      onWeight={handlers.setWeight}
      onPreset={handlers.applyPreset}
    />
    <div className="flex flex-col gap-4">
      <FrontierPlot weights={state.weights} />
      <NAssetPanel
        n={state.nAssets}
        rho={rho}
        onN={handlers.setN}
        onRho={handlers.setRho}
      />
    </div>
  </div>
);

const ChoosePanel: FC<{ state: GameState; handlers: Handlers }> = ({
  state,
  handlers,
}) => {
  const config = CHALLENGES[state.round - 1];
  if (state.phase !== 'choose' || !config) return null;
  return (
    <ChallengePanel
      config={config}
      weight={state.challengeWeight}
      onWeight={handlers.setChallengeWeight}
      onCheck={handlers.check}
    />
  );
};

const RevealPanel: FC<{ state: GameState; handlers: Handlers }> = ({
  state,
  handlers,
}) => {
  if (state.phase !== 'reveal' || !state.result) return null;
  return (
    <ChallengeResultView
      result={state.result}
      round={state.round}
      onNext={handlers.next}
    />
  );
};

const DonePanel: FC<{ state: GameState; handlers: Handlers }> = ({
  state,
  handlers,
}) => {
  if (state.phase !== 'done') return null;
  return <SummaryView totalScore={state.totalScore} onReset={handlers.reset} />;
};

export const PortfolioGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [rho, setRho] = useState(0.5);
  const handlers = useMemo(() => buildHandlers(dispatch, setRho), []);
  const live = liveStats(state.weights);

  return (
    <div className="flex flex-col gap-4">
      <GameHeader round={state.round} totalScore={state.totalScore} />
      <LabGrid state={state} live={live} rho={rho} handlers={handlers} />
      <ChoosePanel state={state} handlers={handlers} />
      <RevealPanel state={state} handlers={handlers} />
      <DonePanel state={state} handlers={handlers} />
    </div>
  );
};

PortfolioGame.displayName = 'PortfolioGame';
