import type { FC } from 'react';
import {
  INFLATION_TARGET,
  MAX_TRADEOFF_STEPS,
  RATE_STEP,
  RSTAR,
  TOTAL_ROUNDS,
  TRADEOFF_TOLERANCE,
} from './constants';
import { verdictFor } from './game';
import type { RoundResult, Scenario, TradeoffState } from './types';

const formatGap = (gap: number): string => (gap > 0 ? `+${gap}%` : `${gap}%`);

interface HeaderProps {
  round: number;
  total: number;
  score: number;
  showStats: boolean;
  onReset: () => void;
}

export const Header: FC<HeaderProps> = ({
  round,
  total,
  score,
  showStats,
  onReset,
}) => (
  <div className="text-base-content/80 flex flex-wrap items-center justify-between gap-2 text-sm">
    <span>🏦 Monetary Policy Lab</span>
    {showStats && (
      <span className="flex items-center gap-3">
        <span>
          Round {round}/{total}
        </span>
        <span>
          Score: <strong data-testid="score">{score}</strong>
        </span>
        <button
          type="button"
          onClick={onReset}
          data-testid="reset"
          className="btn btn-ghost btn-sm">
          Reset
        </button>
      </span>
    )}
  </div>
);

interface SettingPanelProps {
  scenario: Scenario;
  round: number;
  total: number;
  rate: string;
  onRate: (value: string) => void;
  onCheck: () => void;
}

export const SettingPanel: FC<SettingPanelProps> = ({
  scenario,
  round,
  total,
  rate,
  onRate,
  onCheck,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-5 text-sm">
    <div className="flex items-center gap-2 text-lg font-semibold">
      <span className="text-2xl">{scenario.emoji}</span>
      <span data-testid="scenario">
        Round {round}/{total}: {scenario.name}
      </span>
    </div>
    <div className="flex flex-wrap gap-6">
      <span>
        Inflation:{' '}
        <strong data-testid="inflation">{scenario.inflation}%</strong>
      </span>
      <span>
        Output gap:{' '}
        <strong data-testid="output-gap">
          {formatGap(scenario.outputGap)}
        </strong>
      </span>
      <span>
        Natural rate: <strong>{scenario.naturalRate}%</strong>
      </span>
    </div>
    <p className="text-base-content/60 text-xs">
      Taylor rule: i = r* + π + ½(π − π*) + ½·gap, with target π* ={' '}
      {INFLATION_TARGET}% and output gap measured vs potential.
    </p>
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="number"
        min={0}
        max={30}
        step={RATE_STEP}
        value={rate}
        onChange={(e) => onRate(e.target.value)}
        data-testid="policy-rate"
        className="input input-sm input-bordered w-28"
        placeholder="Rate %"
      />
      <button
        type="button"
        onClick={onCheck}
        data-testid="check"
        className="btn btn-primary btn-sm">
        Set Rate
      </button>
    </div>
  </div>
);

interface RevealPanelProps {
  result: RoundResult;
  lastRound: boolean;
  onNext: () => void;
}

export const RevealPanel: FC<RevealPanelProps> = ({
  result,
  lastRound,
  onNext,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-5 text-sm">
    <div className="text-lg font-semibold" data-testid="scenario">
      {result.scenario.emoji} Outcome — {result.scenario.name}
    </div>
    <div className="flex flex-wrap gap-6">
      <span>
        Scenario inflation:{' '}
        <strong data-testid="inflation">{result.scenario.inflation}%</strong>
      </span>
      <span>
        Scenario output gap:{' '}
        <strong data-testid="output-gap">
          {formatGap(result.scenario.outputGap)}
        </strong>
      </span>
      <span>
        Your rate:{' '}
        <strong data-testid="policy-rate">{result.chosenRate}%</strong>
      </span>
    </div>
    <p className="bg-base-200/50 rounded px-3 py-2">
      Taylor-implied rate:{' '}
      <strong data-testid="taylor-rate">{result.taylorRate}%</strong> —
      deviation: <strong data-testid="deviation">{result.deviation}%</strong>
    </p>
    <p className="text-base-content/60 text-xs">
      With lags, the economy responds next period — inflation drifts toward{' '}
      <strong>{result.inflationNext}%</strong>, output gap toward{' '}
      <strong>{formatGap(result.outputGapNext)}</strong>.
    </p>
    <button
      type="button"
      onClick={onNext}
      data-testid="next"
      className="btn btn-primary btn-sm self-start">
      {lastRound ? 'Enter Tradeoff Phase' : 'Next Round'}
    </button>
  </div>
);

interface TradeoffPanelProps {
  state: TradeoffState;
  onAdjust: (delta: number) => void;
  onFinish: () => void;
}

export const TradeoffPanel: FC<TradeoffPanelProps> = ({
  state,
  onAdjust,
  onFinish,
}) => {
  const onTarget =
    Math.abs(state.inflation - INFLATION_TARGET) <= TRADEOFF_TOLERANCE &&
    Math.abs(state.outputGap) <= TRADEOFF_TOLERANCE;
  return (
    <div className="card border-base-content/10 flex flex-col gap-3 border p-5 text-sm">
      <div className="text-lg font-semibold" data-testid="scenario">
        ⚖️ Tradeoff stage
      </div>
      <p className="text-base-content/60 text-xs">
        Move the policy rate to pull inflation toward {INFLATION_TARGET}% and
        the output gap toward 0%. Rates act with a lag.
      </p>
      <div className="flex flex-wrap gap-6">
        <span>
          Inflation: <strong data-testid="inflation">{state.inflation}%</strong>
        </span>
        <span>
          Output gap:{' '}
          <strong data-testid="output-gap">{formatGap(state.outputGap)}</strong>
        </span>
        <span>
          Policy rate: <strong data-testid="policy-rate">{state.rate}%</strong>
        </span>
        <span>
          Neutral rate: <strong>{RSTAR}%</strong>
        </span>
      </div>
      <span className="text-base-content/60 text-xs">
        Adjustments used: {state.stepsUsed} / {MAX_TRADEOFF_STEPS}
      </span>
      {onTarget && (
        <span className="badge badge-success">
          Within tolerance — targets met!
        </span>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          data-testid="rate-down"
          onClick={() => onAdjust(-RATE_STEP)}
          className="btn btn-sm">
          −{RATE_STEP}
        </button>
        <button
          type="button"
          data-testid="rate-up"
          onClick={() => onAdjust(RATE_STEP)}
          className="btn btn-sm">
          +{RATE_STEP}
        </button>
        <button
          type="button"
          onClick={onFinish}
          data-testid="next"
          className="btn btn-primary btn-sm">
          Conclude & Score
        </button>
      </div>
    </div>
  );
};

interface ResultsPanelProps {
  score: number;
  onReset: () => void;
}

export const ResultsPanel: FC<ResultsPanelProps> = ({ score, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4 text-sm">
    <div className="text-4xl">🏦</div>
    <div className="text-lg font-semibold">Policy Report</div>
    <div>
      Total deviation score: <strong data-testid="score">{score}</strong>
    </div>
    <p className="text-base-content/80 max-w-md text-center">
      {verdictFor(score, TOTAL_ROUNDS + 1)}
    </p>
    <button
      type="button"
      onClick={onReset}
      data-testid="reset"
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
