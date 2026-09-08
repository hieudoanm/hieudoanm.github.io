import { FC } from 'react';
import { fiscalVerdict } from './game';
import type { FiscalVerdict } from './game';
import type { RoundResult } from './types';

export const formatNum = (n: number): string =>
  Math.abs(n - Math.round(n)) < 0.05 ? String(Math.round(n)) : n.toFixed(1);

interface ChoosePanelProps {
  gap: number;
  mpc: number;
  g: string;
  tau: string;
  onGChange: (value: string) => void;
  onTauChange: (value: string) => void;
  onSubmit: () => void;
  canSubmit: boolean;
  spendingK: number;
  taxK: number;
  previewY: string | null;
  previewResidual: string | null;
}

export const ChoosePanel: FC<ChoosePanelProps> = ({
  gap,
  mpc,
  g,
  tau,
  onGChange,
  onTauChange,
  onSubmit,
  canSubmit,
  spendingK,
  taxK,
  previewY,
  previewResidual,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <p className="text-sm">
      Close a recessionary gap of <strong className="text-error">{gap}</strong>{' '}
      by choosing government spending <strong>G</strong> and a tax cut{' '}
      <strong>τ</strong> (MPC = {mpc}).
    </p>
    <div className="flex flex-wrap items-end gap-2">
      <label className="form-control w-32">
        <span className="label-text">Spending G</span>
        <input
          type="number"
          min={0}
          max={250}
          value={g}
          onChange={(e) => onGChange(e.target.value)}
          data-testid="spending-input"
          className="input input-bordered input-sm"
        />
      </label>
      <label className="form-control w-32">
        <span className="label-text">Tax cut τ</span>
        <input
          type="number"
          min={0}
          max={250}
          value={tau}
          onChange={(e) => onTauChange(e.target.value)}
          data-testid="taxcut-input"
          className="input input-bordered input-sm"
        />
      </label>
      <button
        type="button"
        onClick={onSubmit}
        disabled={!canSubmit}
        data-testid="submit-fiscal"
        className="btn btn-primary btn-sm">
        Enact Stimulus
      </button>
    </div>
    {previewY !== null && previewResidual !== null && (
      <p className="text-base-content/60 text-xs" data-testid="preview-y">
        Projected ΔY = {previewY} · residual = {previewResidual}
      </p>
    )}
    <p className="text-base-content/60 text-xs">
      Multipliers: k_G = {formatNum(spendingK)}, tax-cut multiplier ={' '}
      {formatNum(taxK)}. Dollar for dollar, G is stronger than a tax cut.
    </p>
  </div>
);

const VERDICT_TEXT: Record<
  FiscalVerdict,
  { emoji: string; title: string; note: string }
> = {
  closed: {
    emoji: '🎯',
    title: 'Gap closed',
    note: 'Demand lands right on target — no inflation, no leftover slack.',
  },
  overshoot: {
    emoji: '⚠️',
    title: 'Overshoot',
    note: 'Too much stimulus risks inflation as demand outruns the economy’s capacity.',
  },
  under: {
    emoji: '😴',
    title: 'Under-delivery',
    note: 'Not enough demand — the economy keeps operating below capacity.',
  },
};

export const RevealPanel: FC<{
  result: RoundResult;
  isLast: boolean;
  onNext: () => void;
}> = ({ result, isLast, onNext }) => {
  const verdict = fiscalVerdict(result.gapResidual);
  const meta = VERDICT_TEXT[verdict];
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="text-3xl">{meta.emoji}</div>
      <div className="text-lg">{meta.title}</div>
      <div className="flex flex-col gap-1 text-center text-sm">
        <span>
          Spending G = <strong>{result.g}</strong> · Tax cut τ ={' '}
          <strong>{result.tau}</strong>
        </span>
        <p data-testid="reveal-dy">
          ΔY = <strong>{formatNum(result.closingY)}</strong> versus a gap of{' '}
          <strong>{result.gap}</strong>
        </p>
        <p data-testid="reveal-residual">
          Residual: <strong>{formatNum(result.gapResidual)}</strong>
        </p>
        <p data-testid="reveal-score">
          Score: <strong>{formatNum(result.score)}</strong>
        </p>
        <p data-testid="reveal-cost">
          Fiscal cost (G + τ): <strong>{result.cost}</strong>
        </p>
      </div>
      <p className="text-base-content/60 max-w-sm text-center text-xs">
        {meta.note}
      </p>
      <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
        {isLast ? 'See Final Summary' : 'Next Round'}
      </button>
    </div>
  );
};

export const ResultsTable: FC<{
  results: RoundResult[];
  totalScore: number;
  onReset: () => void;
}> = ({ results, totalScore, onReset }) => {
  const totalCost = results.reduce((sum, r) => sum + r.cost, 0);
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="text-4xl">📊</div>
      <div className="text-lg">Fiscal summary</div>
      <p className="text-sm">
        Final score:{' '}
        <strong className="text-primary">{formatNum(totalScore)}</strong> ·
        Total fiscal cost: <strong>{totalCost}</strong>
      </p>
      <div className="overflow-x-auto">
        <table
          className="table-sm table w-full text-sm"
          data-testid="results-table">
          <thead>
            <tr>
              <th>Round</th>
              <th>Gap</th>
              <th>MPC</th>
              <th>G</th>
              <th>τ</th>
              <th>ΔY</th>
              <th>Residual</th>
              <th>Cost</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.round}>
                <td>{r.round}</td>
                <td>{r.gap}</td>
                <td>{r.mpc}</td>
                <td>{r.g}</td>
                <td>{r.tau}</td>
                <td>{formatNum(r.closingY)}</td>
                <td>{formatNum(r.gapResidual)}</td>
                <td>{r.cost}</td>
                <td>{formatNum(r.score)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-base-content/60 max-w-md text-center text-xs">
        A positive residual means overshooting and inflation risk; a negative
        one means under-delivering and persistent slack. The best minister
        closes each gap at the lowest fiscal cost.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="btn btn-primary btn-sm">
        Play Again
      </button>
    </div>
  );
};
