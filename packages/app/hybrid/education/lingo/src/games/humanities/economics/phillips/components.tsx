import { FC } from 'react';
import { NATURAL_RATE } from './constants';
import { POLICY_META } from './constants';
import type { Policy, RoundResult } from './types';

export const PolicySelector: FC<{
  policy: Policy | null;
  onSelect: (policy: Policy) => void;
}> = ({ policy, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {(['expansion', 'contraction', 'hold'] as const).map((p) => (
      <button
        key={p}
        type="button"
        data-testid="policy"
        onClick={() => onSelect(p)}
        className={`btn btn-sm ${policy === p ? 'btn-primary' : 'btn-outline'}`}>
        {POLICY_META[p].emoji} {POLICY_META[p].label}
      </button>
    ))}
  </div>
);

export const PhillipsChart: FC<{
  currentInflation: number;
  currentUnemployment: number;
  anchor: number;
}> = ({ currentInflation, currentUnemployment, anchor }) => {
  const w = 300;
  const h = 200;
  const pad = 30;
  const scaleX = (u: number) => pad + ((u - 2) / 8) * (w - 2 * pad);
  const scaleY = (pi: number) => h - pad - (pi / 10) * (h - 2 * pad);
  const nairuX = scaleX(NATURAL_RATE);
  const srpcStartU = 2;
  const srpcEndU = 10;
  const anchorFrac = anchor / 100;
  const srpcStartPi =
    3 - 0.5 * (srpcStartU - NATURAL_RATE) * (1 - anchorFrac) + 3 * anchorFrac;
  const srpcEndPi =
    3 - 0.5 * (srpcEndU - NATURAL_RATE) * (1 - anchorFrac) + 3 * anchorFrac;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full max-w-xs"
      data-testid="chart">
      <line
        x1={pad}
        y1={h - pad}
        x2={w - pad}
        y2={h - pad}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1={pad}
        y1={pad}
        x2={pad}
        y2={h - pad}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <text
        x={w / 2}
        y={h - 4}
        textAnchor="middle"
        className="fill-current text-xs opacity-60">
        Unemployment (u)
      </text>
      <text
        x={8}
        y={h / 2}
        textAnchor="middle"
        className="fill-current text-xs opacity-60"
        transform={`rotate(-90, 8, ${h / 2})`}>
        Inflation (π)
      </text>
      <line
        x1={nairuX}
        y1={pad}
        x2={nairuX}
        y2={h - pad}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 2"
        opacity="0.4"
      />
      <text
        x={nairuX + 4}
        y={pad + 12}
        className="fill-current text-xs opacity-50">
        NAIRU
      </text>
      <line
        x1={scaleX(srpcStartU)}
        y1={scaleY(srpcStartPi)}
        x2={scaleX(srpcEndU)}
        y2={scaleY(srpcEndPi)}
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />
      <text
        x={scaleX(srpcEndU) + 4}
        y={scaleY(srpcEndPi) - 4}
        className="fill-current text-xs opacity-50">
        SRPC
      </text>
      <circle
        cx={scaleX(currentUnemployment)}
        cy={scaleY(currentInflation)}
        r="5"
        className="fill-primary"
      />
    </svg>
  );
};

export const AnchorSlider: FC<{
  anchor: number;
  onChange: (anchor: number) => void;
}> = ({ anchor, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-base-content/60 text-xs">
      Expectation anchoring: <strong>{anchor}%</strong>
    </label>
    <input
      type="range"
      min={0}
      max={100}
      step={5}
      value={anchor}
      onChange={(e) => onChange(Number(e.target.value))}
      className="range range-sm range-primary"
    />
  </div>
);

export const RevealPanel: FC<{
  result: RoundResult;
  totalScore: number;
  isLast: boolean;
  onNext: () => void;
}> = ({ result, totalScore, isLast, onNext }) => (
  <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-6">
    <div className="text-4xl">📊</div>
    <div className="text-lg font-bold">Round {result.round} Result</div>
    <div className="text-base-content/60 flex flex-col items-center text-sm">
      <span>
        New inflation:{' '}
        <strong data-testid="new-inflation">
          {result.newInflation.toFixed(2)}%
        </strong>
      </span>
      <span>
        New unemployment:{' '}
        <strong data-testid="new-unemployment">
          {result.newUnemployment.toFixed(2)}%
        </strong>
      </span>
      <span>
        Long-run inflation:{' '}
        <strong data-testid="lr-inflation">
          {result.lrInflation.toFixed(2)}%
        </strong>
      </span>
      <span>
        Score: <strong>{totalScore.toFixed(1)}</strong> / {result.round * 10}
      </span>
    </div>
    <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
      {isLast ? 'See Results' : 'Next Round'}
    </button>
  </div>
);

export const SummaryPanel: FC<{
  history: RoundResult[];
  totalScore: number;
  sacrifice: number;
  onReset: () => void;
}> = ({ history, totalScore, sacrifice, onReset }) => (
  <div data-testid="summary-panel" className="flex flex-col gap-4">
    <div className="card border-base-content/10 flex flex-col gap-2 border p-4 text-sm">
      <p className="font-semibold">Phillips Curve Lab — Results</p>
      <p>
        Score:{' '}
        <strong data-testid="final-score">{totalScore.toFixed(1)}</strong> /{' '}
        {history.length * 10}
      </p>
      <p>
        Cumulative sacrifice ratio:{' '}
        <strong data-testid="final-sacrifice">{sacrifice.toFixed(2)}</strong>
      </p>
      <p className="text-base-content/60 text-xs">
        The short-run Phillips curve trades inflation for unemployment, but in
        the long run the economy returns to the natural rate with permanently
        higher inflation.
      </p>
    </div>
    <button
      type="button"
      onClick={onReset}
      data-testid="play-again"
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
