import type { FC } from 'react';
import {
  PRICE_INDEX_MAX,
  PRICE_INDEX_MIN,
  TOLERANCE,
  TOTAL_ROUNDS,
} from './constants';
import { computeDeflator, computeGdp, computeRealGdp } from './game';
import type { Components, RoundResult } from './types';

interface SliderRowProps {
  testId: string;
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const SliderRow: FC<SliderRowProps> = ({
  testId,
  label,
  min,
  max,
  value,
  onChange,
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between text-sm">
      <span>{label}</span>
      <span className="badge badge-outline">{value}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={1}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      data-testid={testId}
      className="range range-primary range-sm"
    />
  </div>
);

interface StatCellProps {
  testId: string;
  label: string;
  value: number;
}

const StatCell: FC<StatCellProps> = ({ testId, label, value }) => (
  <div className="card border-base-content/10 border p-3 text-center">
    <div className="text-base-content/60 text-xs">{label}</div>
    <div className="text-lg font-bold" data-testid={testId}>
      {value}
    </div>
  </div>
);

interface OutputPanelProps {
  components: Components;
  priceIndex: number;
}

const OutputPanel: FC<OutputPanelProps> = ({ components, priceIndex }) => {
  const nominal = computeGdp(components);
  const real = computeRealGdp(nominal, priceIndex);
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <StatCell testId="gdp-output" label="C + I + G + NX" value={nominal} />
      <StatCell testId="nominal" label="Nominal GDP" value={nominal} />
      <StatCell testId="real" label="Real GDP" value={real} />
      <StatCell
        testId="deflator"
        label="GDP deflator"
        value={computeDeflator(nominal, real)}
      />
    </div>
  );
};

interface ExplorePanelProps {
  onStart: () => void;
}

const ExplorePanel: FC<ExplorePanelProps> = ({ onStart }) => (
  <div className="card border-base-content/10 border p-4">
    <h2 className="text-lg font-bold">Practice mode</h2>
    <p className="text-base-content/60 mt-1 text-sm">
      Drag the sliders to build an economy. GDP = C + I + G + NX updates live,
      and the price index converts nominal GDP into real GDP.
    </p>
    <button
      type="button"
      onClick={onStart}
      className="btn btn-primary btn-sm mt-3">
      Start Quiz ({TOTAL_ROUNDS} rounds)
    </button>
  </div>
);

interface RoundPanelProps {
  round: number;
  target: number;
  actual: number;
  lastChecked: RoundResult | null;
  onCheck: () => void;
}

const RoundPanel: FC<RoundPanelProps> = ({
  round,
  target,
  actual,
  lastChecked,
  onCheck,
}) => {
  const difference = actual - target;
  return (
    <div className="card border-base-content/10 border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">
          Round {round} of {TOTAL_ROUNDS}
        </h2>
        <span>
          Target GDP: <strong>{target}</strong>
        </span>
      </div>
      <p className="text-base-content/60 mt-1 text-sm">
        Your GDP is <strong>{actual}</strong> —{' '}
        {difference >= 0
          ? `${difference} above target`
          : `${Math.abs(difference)} below target`}
        . Keep it within {TOLERANCE}.
      </p>
      {lastChecked && (
        <div
          className={`alert alert-sm mt-2 ${lastChecked.solved ? 'alert-success' : 'alert-error'}`}>
          {lastChecked.solved
            ? `Round ${lastChecked.round} solved! Actual ${lastChecked.actual} hit target ${lastChecked.target}.`
            : `Round ${lastChecked.round} missed — actual ${lastChecked.actual}, target was ${lastChecked.target}.`}
        </div>
      )}
      <button
        type="button"
        onClick={onCheck}
        data-testid="check"
        className="btn btn-primary btn-sm mt-3">
        Check Answer
      </button>
    </div>
  );
};

interface SummaryPanelProps {
  results: RoundResult[];
  solved: number;
  onReset: () => void;
}

const SummaryPanel: FC<SummaryPanelProps> = ({ results, solved, onReset }) => (
  <div
    data-testid="summary"
    className="card border-base-content/10 flex flex-col items-center gap-3 border p-4">
    <div className="text-4xl">📊</div>
    <h2 className="text-lg font-bold">Quiz summary</h2>
    <p>
      Solved {solved} of {results.length} rounds
    </p>
    <div className="w-full max-w-sm">
      {results.map((result) => (
        <div
          key={result.round}
          className="border-base-content/10 flex items-center justify-between border-b py-1 text-sm">
          <span>
            Round {result.round} — target {result.target}
          </span>
          <span className={result.solved ? 'text-success' : 'text-error'}>
            {result.solved ? 'Solved' : 'Missed'} ({result.actual})
          </span>
        </div>
      ))}
    </div>
    <button
      type="button"
      onClick={onReset}
      data-testid="reset"
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);

export { ExplorePanel, OutputPanel, RoundPanel, SliderRow, SummaryPanel };
