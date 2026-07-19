import type { FC } from 'react';
import { formatSigned, Stat } from '../components';
import { ScatterChart } from './estimate';
import type {
  CoefficientChoice,
  DataPoint,
  FittedLine,
  ResultKind,
} from '../types';

export const ResultPanel: FC<{
  kind: ResultKind;
  targetUnemployment: number;
  unemployment: number;
  deviation: number;
  score: number;
  onTarget: boolean;
  dataset: DataPoint[];
  line: FittedLine | null;
  correctCoef: CoefficientChoice | null;
  chosenCoef: CoefficientChoice | null;
  onReset: () => void;
  onSteer: () => void;
  onEstimate: () => void;
}> = ({
  kind,
  targetUnemployment,
  unemployment,
  deviation,
  score,
  onTarget,
  dataset,
  line,
  correctCoef,
  chosenCoef,
  onReset,
  onSteer,
  onEstimate,
}) => {
  const isSteer = kind === 'steer';
  return (
    <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-4 text-center">
      <div className="text-3xl">{onTarget ? '🎯' : '📊'}</div>
      <p className="text-lg">
        {isSteer ? 'Year complete' : 'Coefficient revealed'}
      </p>
      {isSteer ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <Stat
              label="Target u*"
              value={`${targetUnemployment.toFixed(1)}%`}
              testid="target-unemployment"
            />
            <Stat
              label="Unemployment"
              value={`${unemployment.toFixed(1)}%`}
              testid="unemployment"
            />
          </div>
          <span className="text-sm">
            Deviation: <strong>{formatSigned(deviation)}</strong>
            {onTarget && <span className="text-success ml-2">— on target</span>}
          </span>
          <p className="text-base-content/60 max-w-md text-sm">
            Growth above potential pulls unemployment down; growth below
            potential pushes it up. Your two-year path ends with a{' '}
            {formatSigned(deviation)} miss.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <ScatterChart dataset={dataset} line={line} />
          <span className="flex flex-col gap-1 text-sm">
            <span data-testid="best-fit">
              Best fit: Δu = {line?.slope.toFixed(2)}·g + (
              {line?.intercept.toFixed(2)})
            </span>
            <span>
              You chose <strong>c = {chosenCoef?.toFixed(1)}</strong> — the data
              fit is closest to <strong>c = {correctCoef?.toFixed(1)}</strong>.
            </span>
          </span>
        </div>
      )}
      <span data-testid="score" className="text-sm">
        Score: <strong>{score} / 100</strong>
      </span>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          data-testid="reset"
          onClick={onReset}
          className="btn btn-primary btn-sm">
          Reset
        </button>
        <button
          type="button"
          data-testid="start-steer"
          onClick={onSteer}
          className="btn btn-outline btn-sm">
          {isSteer ? 'Play Again' : 'Run a Scenario'}
        </button>
        <button
          type="button"
          data-testid="start-estimate"
          onClick={onEstimate}
          className="btn btn-outline btn-sm">
          {isSteer ? 'Estimate the Coefficient' : 'New Data'}
        </button>
      </div>
    </div>
  );
};
