import type { FC } from 'react';
import { COEFFICIENT_CHOICES } from '../constants';
import type { CoefficientChoice, DataPoint, FittedLine } from '../types';

export const DataTable: FC<{ dataset: DataPoint[] }> = ({ dataset }) => (
  <div className="overflow-x-auto">
    <table className="table-sm table">
      <thead>
        <tr>
          <th>Quarter</th>
          <th>Growth g (%)</th>
          <th>Δu (% pts)</th>
        </tr>
      </thead>
      <tbody>
        {dataset.map((point, index) => (
          <tr key={index} data-testid="quarter">
            <td>Q{index + 1}</td>
            <td>{point.growth.toFixed(1)}</td>
            <td>{point.du.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const ScatterChart: FC<{
  dataset: DataPoint[];
  line?: FittedLine | null;
}> = ({ dataset, line }) => {
  const height = 180;
  const width = 300;
  const pad = 24;
  const xMin = -1.5;
  const xMax = 5.5;
  const yMin = Math.min(...dataset.map((point) => point.du)) - 0.3;
  const yMax = Math.max(...dataset.map((point) => point.du)) + 0.3;
  const sx = (value: number): number =>
    pad + ((value - xMin) * (width - 2 * pad)) / (xMax - xMin);
  const sy = (value: number): number =>
    height - pad - ((value - yMin) * (height - 2 * pad)) / (yMax - yMin);
  const x0 = sx(xMin);
  const x1 = sx(xMax);
  const y0 = line ? sy(line.slope * xMin + line.intercept) : 0;
  const y1 = line ? sy(line.slope * xMax + line.intercept) : 0;
  return (
    <svg
      data-testid="scatter"
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full max-w-md">
      {line && (
        <line
          x1={x0}
          y1={y0}
          x2={x1}
          y2={y1}
          strokeWidth={2}
          className="text-warning"
          stroke="currentColor"
        />
      )}
      {dataset.map((point, index) => (
        <circle
          key={index}
          cx={sx(point.growth)}
          cy={sy(point.du)}
          r={3}
          className="fill-primary"
        />
      ))}
    </svg>
  );
};

export const EstimatePanel: FC<{
  dataset: DataPoint[];
  chosenCoef: CoefficientChoice | null;
  onChoose: (value: CoefficientChoice) => void;
  onEstimate: () => void;
}> = ({ dataset, chosenCoef, onChoose, onEstimate }) => (
  <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
    <p className="text-sm">
      Ten quarters of a mystery economy. Since Δu = −c·(g − g*), estimate
      Okun&rsquo;s coefficient c from the data.
    </p>
    <ScatterChart dataset={dataset} />
    <DataTable dataset={dataset} />
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold">
        Which coefficient fits best?
      </span>
      <div className="flex flex-wrap gap-2" data-testid="choose-coef">
        {COEFFICIENT_CHOICES.map((coef) => (
          <button
            key={coef}
            type="button"
            data-testid={`choose-coef-${coef}`}
            onClick={() => onChoose(coef)}
            className={`btn btn-sm ${chosenCoef === coef ? 'btn-primary' : ''}`}>
            {coef.toFixed(1)}
          </button>
        ))}
      </div>
    </div>
    <button
      type="button"
      data-testid="estimate"
      disabled={chosenCoef === null}
      onClick={onEstimate}
      className="btn btn-primary btn-sm self-center">
      Estimate c
    </button>
  </div>
);
