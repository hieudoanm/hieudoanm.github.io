import type { FC } from 'react';
import type { GoodType, RoundResult } from './types';
import { UTILITIES } from './constants';

interface SliderProps {
  testid: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export const Slider: FC<SliderProps> = ({
  testid,
  label,
  min,
  max,
  step,
  value,
  disabled,
  onChange,
}) => (
  <label className="form-control">
    <div className="label">
      <span className="label-text">{label}</span>
      <span className="label-text" data-testid={`${testid}-value`}>
        {value}
      </span>
    </div>
    <input
      type="range"
      data-testid={testid}
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      className="range range-primary range-sm"
    />
  </label>
);

interface PresetPickerProps {
  value: GoodType;
  disabled?: boolean;
  onChange: (goodType: GoodType) => void;
}

export const PresetPicker: FC<PresetPickerProps> = ({
  value,
  disabled,
  onChange,
}) => (
  <label className="form-control w-full">
    <span className="label-text mb-1">Utility function</span>
    <select
      data-testid="preset"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as GoodType)}
      className="select select-bordered select-sm w-full">
      {UTILITIES.map((u) => (
        <option key={u.id} value={u.id}>
          {u.emoji} {u.label} — {u.formula}
        </option>
      ))}
    </select>
  </label>
);

interface UtilityReadoutProps {
  currentU: number;
  optU: number;
  mrs: number | null;
  priceRatio: number;
}

const fmt = (n: number): string =>
  Number.isInteger(n) ? String(n) : n.toFixed(2);

export const UtilityReadout: FC<UtilityReadoutProps> = ({
  currentU,
  optU,
  mrs,
  priceRatio,
}) => (
  <div className="stats stats-vertical sm:stats-horizontal w-full">
    <div className="stat">
      <div className="stat-title">Your utility</div>
      <div className="stat-value text-xl" data-testid="utility-value">
        {fmt(currentU)}
      </div>
    </div>
    <div className="stat">
      <div className="stat-title">Optimal utility</div>
      <div className="stat-value text-xl">{fmt(optU)}</div>
    </div>
    <div className="stat">
      <div className="stat-title">MRS vs price ratio</div>
      <div className="stat-value text-xl">
        {mrs === null ? '—' : fmt(mrs)}
        <span className="text-base-content/50 ml-1 text-sm">
          / {fmt(priceRatio)}
        </span>
      </div>
    </div>
  </div>
);

interface FeedbackProps {
  result: RoundResult;
  success: boolean;
  onTryAgain: () => void;
  onReset: () => void;
}

export const FeedbackPanel: FC<FeedbackProps> = ({
  result,
  success,
  onTryAgain,
  onReset,
}) => (
  <div
    data-testid="feedback"
    className={`card border p-4 ${success ? 'border-success' : 'border-base-content/10'}`}>
    <div className="flex flex-col gap-2 text-sm">
      <div
        className={`text-lg font-bold ${success ? 'text-success' : 'text-warning'}`}>
        {success ? '🎯 Optimal bundle reached!' : 'Not quite yet.'}
      </div>
      <p>
        Your bundle: (x = {Math.round(result.choiceX)}, y ={' '}
        {Math.round(result.choiceY)}), U = {result.choiceUtility.toFixed(2)}
      </p>
      <p>
        Optimal bundle: (x = {result.optX.toFixed(2)}, y ={' '}
        {result.optY.toFixed(2)}), U = {result.optUtility.toFixed(2)}
      </p>
      <p>
        Score: <strong>{result.score}</strong> / 100
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onTryAgain}
          className="btn btn-primary btn-sm">
          Try Again
        </button>
        <button
          type="button"
          onClick={onReset}
          className="btn btn-outline btn-sm">
          Reset
        </button>
      </div>
    </div>
  </div>
);

interface HistoryProps {
  attempts: RoundResult[];
}

export const HistoryPanel: FC<HistoryProps> = ({ attempts }) => (
  <div className="card border-base-content/10 border p-4">
    <h3 className="text-primary mb-2 text-sm font-bold">Attempts</h3>
    {attempts.length === 0 ? (
      <p className="text-base-content/60 text-xs">No attempts yet.</p>
    ) : (
      <ul className="flex flex-col gap-1 text-xs">
        {attempts.map((a) => (
          <li key={a.round} className="flex justify-between">
            <span>
              {a.round}. {a.goodType}
            </span>
            <span>
              U {a.choiceUtility.toFixed(2)} → score {a.score}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);
