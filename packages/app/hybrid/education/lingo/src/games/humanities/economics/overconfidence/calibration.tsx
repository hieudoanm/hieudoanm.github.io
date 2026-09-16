import { FC } from 'react';
import type { Bucket } from './types';

const gapText = (b: Bucket): string => {
  if (b.total === 0) return '\u2014';
  if (b.gap > 0) return `Over by ${b.gap}%`;
  if (b.gap < 0) return `Under by ${-b.gap}%`;
  return 'Calibrated';
};

const gapClass = (b: Bucket): string => {
  if (b.total === 0) return 'text-base-content/40';
  if (b.gap > 0) return 'text-error';
  if (b.gap < 0) return 'text-success';
  return 'text-base-content/70';
};

export const AggregateTable: FC<{
  buckets: Bucket[];
  onNext: () => void;
}> = ({ buckets, onNext }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <h2 className="text-primary text-lg font-bold">Calibration Check</h2>
    <p className="text-base-content/60 text-sm">
      A well-calibrated predictor is right X% of the time when they claim X%.
      Gaps above zero mean overconfidence.
    </p>
    <div className="overflow-x-auto">
      <table className="table-sm table">
        <thead>
          <tr>
            <th>Confidence</th>
            <th>Answered</th>
            <th>Correct</th>
            <th>Actual</th>
            <th>Gap</th>
          </tr>
        </thead>
        <tbody>
          {buckets.map((b) => (
            <tr key={b.confidence}>
              <td>{b.confidence}%</td>
              <td data-testid="bucket">{b.total}</td>
              <td>{b.correct}</td>
              <td>{b.total ? `${b.accuracy}%` : '\u2014'}</td>
              <td data-testid="overconfidence-gap" className={gapClass(b)}>
                {gapText(b)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button
      type="button"
      data-testid="next"
      onClick={onNext}
      className="btn btn-primary btn-sm self-center">
      To the Market Floor
    </button>
  </div>
);
