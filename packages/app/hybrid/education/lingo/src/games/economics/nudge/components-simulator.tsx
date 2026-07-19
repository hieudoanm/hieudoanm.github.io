import type { FC } from 'react';
import { ATTITUDES, EMPLOYEE_COUNT, SIM_TARGET } from './constants';
import type { SimulatorOutcome } from './types';

export const SimulatorIntro: FC = () => (
  <div className="card border-base-content/10 border p-4">
    <h2 className="text-primary text-lg font-bold">Auto-enroll Simulator</h2>
    <p className="text-base-content/70 mt-1 text-sm">
      A firm has {EMPLOYEE_COUNT} employees. Three attitudes — those who always
      save, those who always procrastinate, and active choosers. Set a default
      contribution and see how many end up saving.
    </p>
    <div className="mt-3 flex flex-col gap-1 text-sm" data-testid="employees">
      <span>
        Employees: <strong>{EMPLOYEE_COUNT}</strong>
      </span>
      <span>
        Always save:{' '}
        <strong>{Math.round(EMPLOYEE_COUNT * ATTITUDES.saver)}</strong>
      </span>
      <span>
        Always procrastinate:{' '}
        <strong>{Math.round(EMPLOYEE_COUNT * ATTITUDES.procrastinator)}</strong>
      </span>
      <span>
        Active choosers:{' '}
        <strong>{Math.round(EMPLOYEE_COUNT * ATTITUDES.active)}</strong>
      </span>
    </div>
  </div>
);

export const SimulatorInput: FC<{
  defaultRate: number;
  onDefaultRate: (value: number) => void;
  onCheck: () => void;
}> = ({ defaultRate, onDefaultRate, onCheck }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <div className="flex items-center justify-between text-sm">
      <span>
        Target: <strong data-testid="target">{SIM_TARGET}%</strong> of employees
        saving
      </span>
    </div>
    <label className="flex flex-col gap-1 text-sm">
      <span>
        Auto-enroll default ({defaultRate}% contribution){' '}
        <span className="text-base-content/60">
          — any positive default enrolls the procrastinators
        </span>
      </span>
      <input
        type="range"
        min={0}
        max={10}
        value={defaultRate}
        onChange={(e) => onDefaultRate(Number(e.target.value))}
        data-testid="sim-default"
        className="range range-primary range-sm w-full"
      />
    </label>
    <button
      type="button"
      onClick={onCheck}
      data-testid="check"
      className="btn btn-primary btn-sm self-end">
      Check savers
    </button>
  </div>
);

export const SimulatorResult: FC<{
  outcome: SimulatorOutcome;
  onRetry: () => void;
  onFinish: () => void;
}> = ({ outcome, onRetry, onFinish }) => (
  <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-4 text-center">
    <div className="text-3xl">{outcome.hitTarget ? '🎯' : '📉'}</div>
    <div className="text-lg">
      Savers: <strong data-testid="savers">{outcome.savers}</strong> /{' '}
      {outcome.employees}
    </div>
    <div className="text-sm" data-testid="hit-status">
      Target {outcome.target} — {outcome.hitTarget ? 'hit' : 'missed'}
    </div>
    <p className="alert alert-info max-w-lg py-2 text-left text-sm">
      Any positive default auto-enrolls the 50 procrastinators who would never
      sign up on their own — raising savers from 42 to 92.
    </p>
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onRetry}
        data-testid="sim-retry"
        className="btn btn-outline btn-sm">
        Try Again
      </button>
      <button
        type="button"
        onClick={onFinish}
        data-testid="finish"
        className="btn btn-primary btn-sm">
        See Final Report
      </button>
    </div>
  </div>
);
