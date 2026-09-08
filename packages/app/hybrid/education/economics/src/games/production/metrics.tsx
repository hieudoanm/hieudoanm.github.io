import { FC } from 'react';
import type { CostRow } from './types';

const fmt = (n: number, digits: number): string =>
  (Number.isFinite(n) ? n : 0).toFixed(digits);

const Metric: FC<{ label: string; value: string; testid: string }> = ({
  label,
  value,
  testid,
}) => (
  <div className="card border-base-content/10 border p-3 text-center">
    <div className="text-base-content/60 text-xs">{label}</div>
    <div className="text-2xl font-bold" data-testid={testid}>
      {value}
    </div>
  </div>
);

export const MetricsCards: FC<{
  row: CostRow;
  price: number;
  profitMaxQ: number;
}> = ({ row, price, profitMaxQ }) => (
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
    <Metric label="Output (Q)" value={String(row.Q)} testid="output" />
    <Metric
      label="Marginal Product"
      value={fmt(row.MP, 1)}
      testid="marginal-product"
    />
    <Metric
      label="Average Product"
      value={fmt(row.AP, 1)}
      testid="average-product"
    />
    <Metric
      label="Marginal Cost"
      value={fmt(row.MC, 2)}
      testid="marginal-cost"
    />
    <Metric
      label="Avg Total Cost"
      value={fmt(row.ATC, 2)}
      testid="average-total-cost"
    />
    <Metric
      label="Avg Variable Cost"
      value={fmt(row.AVC, 2)}
      testid="average-variable-cost"
    />
    <Metric
      label={`Profit-Max Q @P=${price.toFixed(1)}`}
      value={String(profitMaxQ)}
      testid="profit-max-q"
    />
  </div>
);

export const CostTable: FC<{ rows: CostRow[] }> = ({ rows }) => (
  <div className="overflow-x-auto">
    <table className="table-xs table w-full text-right">
      <thead>
        <tr>
          <th>L</th>
          <th>Q</th>
          <th>MP</th>
          <th>AP</th>
          <th>TVC</th>
          <th>TFC</th>
          <th>TC</th>
          <th>MC</th>
          <th>ATC</th>
          <th>AVC</th>
          <th>AFC</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.L}>
            <td>{r.L}</td>
            <td>{r.Q}</td>
            <td>{fmt(r.MP, 1)}</td>
            <td>{fmt(r.AP, 2)}</td>
            <td>{fmt(r.TVC, 2)}</td>
            <td>{fmt(r.TFC, 2)}</td>
            <td>{fmt(r.TC, 2)}</td>
            <td>{fmt(r.MC, 2)}</td>
            <td>{fmt(r.ATC, 2)}</td>
            <td>{fmt(r.AVC, 2)}</td>
            <td>{fmt(r.AFC, 2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
