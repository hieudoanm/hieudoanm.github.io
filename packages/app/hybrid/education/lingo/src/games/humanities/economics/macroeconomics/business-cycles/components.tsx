import { FC } from 'react';
import { GROWTH } from './constants';
import type {
  ExpansionCategory,
  HistoryRow,
  PhaseLabel,
  RoundResult,
} from './types';

export const PHASE_META: Record<
  PhaseLabel,
  { label: string; emoji: string; className: string }
> = {
  expansion: { label: 'Expansion', emoji: '▲', className: 'text-success' },
  peak: { label: 'Peak', emoji: '⛰️', className: 'text-warning' },
  trough: { label: 'Trough', emoji: '🌱', className: 'text-info' },
  recession: { label: 'Recession', emoji: '▼', className: 'text-error' },
};

export const PhaseCallout: FC<{ phase: PhaseLabel }> = ({ phase }) => (
  <span
    data-testid="phase-callout"
    className={`badge badge-outline ${PHASE_META[phase].className}`}>
    {PHASE_META[phase].emoji} {PHASE_META[phase].label}
  </span>
);

const barClass = (value: number): string =>
  value < 0 ? 'bg-error' : 'bg-success';

export const HistoryChart: FC<{ rows: HistoryRow[] }> = ({ rows }) => (
  <div data-testid="history-chart" className="flex flex-col gap-1 text-sm">
    {rows.map((row) => (
      <div
        key={row.round}
        className="border-base-200 flex items-center gap-2 border-b py-1 last:border-0">
        <span className="text-base-content/50 w-10">Yr {row.round}</span>
        <span
          className={`${barClass(row.actual)} h-3 rounded`}
          style={{ width: `${Math.abs(row.actual) * 8}%` }}
        />
        <span className="w-10">{row.actual.toFixed(1)}%</span>
        <PhaseCallout phase={row.phase} />
        {row.peak && <span className="text-warning text-xs">peak</span>}
        {row.trough && <span className="text-info text-xs">trough</span>}
      </div>
    ))}
  </div>
);

export const PredictPanel: FC<{
  round: number;
  rows: HistoryRow[];
  prediction: string;
  category: ExpansionCategory | null;
  onPredictionChange: (value: string) => void;
  onCategorySelect: (value: ExpansionCategory) => void;
  onSubmit: () => void;
}> = ({
  round,
  rows,
  prediction,
  category,
  onPredictionChange,
  onCategorySelect,
  onSubmit,
}) => (
  <div className="flex flex-col gap-4">
    <div className="border-base-content/10 flex items-center justify-between border-b pb-2 text-sm">
      <span>
        Year <strong>{round}</strong> growth forecast
      </span>
      <span className="text-base-content/60">{rows.length} years observed</span>
    </div>
    {rows.length > 0 && (
      <div className="card border-base-content/10 border p-3">
        <HistoryChart rows={rows} />
      </div>
    )}
    <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
      <label className="text-sm">
        Predict next year&rsquo;s real GDP growth (%):
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          data-testid="growth-input"
          type="number"
          min={0}
          max={10}
          step={0.1}
          value={prediction}
          onChange={(e) => onPredictionChange(e.target.value)}
          className="input input-bordered input-sm w-28"
          placeholder="0.0–10.0"
        />
        <button
          type="button"
          data-testid="submit-prediction"
          onClick={onSubmit}
          className="btn btn-primary btn-sm">
          Submit Forecast
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-base-content/60">or call the phase:</span>
        {(['expansion', 'recession'] as const).map((option) => (
          <button
            key={option}
            type="button"
            data-testid={`category-${option}`}
            onClick={() => onCategorySelect(option)}
            className={`btn btn-sm ${
              category === option ? 'btn-primary' : 'btn-outline'
            }`}>
            {option === 'expansion' ? '▲ Expansion' : '▼ Recession'}
          </button>
        ))}
      </div>
    </div>
    <button
      type="button"
      onClick={onSubmit}
      data-testid="submit-prediction"
      className="btn btn-primary btn-sm">
      Submit Forecast
    </button>
  </div>
);

export const RevealPanel: FC<{
  result: RoundResult;
  totalScore: number;
  isLast: boolean;
  onNext: () => void;
}> = ({ result, totalScore, isLast, onNext }) => (
  <div
    data-testid="reveal-panel"
    className="card border-base-content/10 flex flex-col items-center gap-3 border p-6">
    <div className="text-4xl">{PHASE_META[result.phase].emoji}</div>
    <div className="text-2xl font-bold">
      <span className={result.actual < 0 ? 'text-error' : 'text-success'}>
        {result.actual.toFixed(1)}%
      </span>
    </div>
    <PhaseCallout phase={result.phase} />
    <div className="text-base-content/60 flex flex-col items-center text-sm">
      <span>
        Your forecast:{' '}
        <strong>
          {result.predicted !== null
            ? `${result.predicted.toFixed(1)}%`
            : (result.category ?? '—')}
        </strong>
      </span>
      <span data-testid="round-score">
        Round score:{' '}
        <strong>
          {result.predicted !== null ? result.score.toFixed(1) : '—'}
        </strong>
      </span>
      <span>
        Total score: <strong>{totalScore.toFixed(1)}</strong>
      </span>
    </div>
    <button
      type="button"
      onClick={onNext}
      data-testid="next-round"
      className="btn btn-primary btn-sm">
      {isLast ? 'See Full Cycle' : 'Next Year'}
    </button>
  </div>
);

export const SummaryPanel: FC<{
  rows: HistoryRow[];
  totalScore: number;
  onReset: () => void;
}> = ({ rows, totalScore, onReset }) => {
  const peak = GROWTH.indexOf(Math.max(...GROWTH));
  const trough = GROWTH.indexOf(Math.min(...GROWTH));
  return (
    <div data-testid="summary-panel" className="flex flex-col gap-4">
      <div className="card border-base-content/10 border p-4">
        <HistoryChart rows={rows} />
      </div>
      <div className="card border-base-content/10 flex flex-col gap-1 p-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-warning text-lg">⛰️</span>
          <span>
            Peak in year <strong>{peak + 1}</strong> at{' '}
            <strong>{GROWTH[peak].toFixed(1)}%</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-info text-lg">🌱</span>
          <span>
            Trough in year <strong>{trough + 1}</strong> at{' '}
            <strong>{GROWTH[trough].toFixed(1)}%</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-success text-lg">📈</span>
          <span>
            Recovery begins once growth turns positive again after the trough.
          </span>
        </div>
      </div>
      <div className="card border-base-content/10 flex flex-col gap-2 p-4 text-sm">
        <p className="font-semibold">The lesson</p>
        <p>
          Cycles fluctuate around a rising long-run trend. Expansions outlast
          contractions on average, and unemployment lags output — it keeps
          falling even after growth slows (Okun&rsquo;s law).
        </p>
        <span>
          Total score: <strong>{totalScore.toFixed(1)}</strong> / 35
        </span>
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
};
