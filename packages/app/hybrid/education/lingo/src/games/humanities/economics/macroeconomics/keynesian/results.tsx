import type { FC } from 'react';
import { MAX_SCORE, TOTAL_ROUNDS } from './constants';
import { formatMpc, formatNum } from './primitives';
import type { RoundResult } from './types';

export const ResultsTable: FC<{
  results: RoundResult[];
  totalScore: number;
  onReset: () => void;
}> = ({ results, totalScore, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-lg">Challenge complete</div>
    <p className="text-sm">
      Final score:{' '}
      <strong className="text-primary">{formatNum(totalScore)}</strong> /{' '}
      {TOTAL_ROUNDS * MAX_SCORE}
    </p>
    <div className="overflow-x-auto">
      <table
        data-testid="results-table"
        className="table-sm table w-full text-sm">
        <thead>
          <tr>
            <th>Round</th>
            <th>Target</th>
            <th>Gap</th>
            <th>MPC</th>
            <th>Required ΔG</th>
            <th>Your ΔG</th>
            <th>New Y*</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.round}>
              <td>{r.round}</td>
              <td>{r.target}</td>
              <td>{formatNum(r.gap)}</td>
              <td>{formatMpc(r.mpc)}</td>
              <td>{formatNum(r.requiredDeltaG)}</td>
              <td>{formatNum(r.chosenDeltaG)}</td>
              <td>{formatNum(r.newEquilibrium)}</td>
              <td>{formatNum(r.score)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-base-content/60 max-w-md text-center text-xs">
      Spending raises demand by the multiplier, 1/(1 − MPC). Because ΔG closes
      the gap directly, the required stimulus is gap × (1 − MPC).
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
