import { FC } from 'react';
import { MAX_PRICE, MIN_PRICE } from './constants';
import { elasticityClass } from './game';
import type { RoundState, Trial } from './types';

export const TrialTable: FC<{ trials: Trial[] }> = ({ trials }) => (
  <div className="overflow-x-auto">
    <table className="table-sm table w-full">
      <thead>
        <tr>
          <th>Price</th>
          <th>Quantity</th>
          <th>Revenue</th>
          <th>Guidance</th>
        </tr>
      </thead>
      <tbody>
        {trials.map((t) => (
          <tr key={t.price} data-testid={`trial-${t.price}`}>
            <td>{t.price}</td>
            <td>{t.quantity}</td>
            <td>{t.revenue}</td>
            <td className="text-base-content/70 text-xs">{t.guidance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const RoundBest: FC<{
  bestPrice: number;
  bestRevenue: number;
  epsilon: number;
}> = ({ bestPrice, bestRevenue, epsilon }) => (
  <div className="bg-primary/10 border-primary/30 rounded-lg border p-3 text-sm">
    <span className="text-primary font-bold">Round best:</span>{' '}
    <span data-testid="round-best">
      price {bestPrice} → revenue {bestRevenue}
    </span>{' '}
    <span className="text-base-content/60">
      (elasticity class: {elasticityClass(epsilon)}).
    </span>
  </div>
);

export const SummaryTable: FC<{ rounds: RoundState[] }> = ({ rounds }) => (
  <div className="overflow-x-auto">
    <table className="table-sm table w-full">
      <thead>
        <tr>
          <th>Round</th>
          <th>ε</th>
          <th>Class</th>
          <th>Best price tried</th>
          <th>Best revenue</th>
        </tr>
      </thead>
      <tbody>
        {rounds.map((r) => (
          <tr key={r.round} data-testid={`summary-${r.round}`}>
            <td>{r.round}</td>
            <td>{r.epsilon}</td>
            <td>{elasticityClass(r.epsilon)}</td>
            <td>{r.bestPrice}</td>
            <td>{r.bestRevenue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const PriceRangeHint: FC = () => (
  <p className="text-base-content/60 text-xs">
    Pick an integer price between {MIN_PRICE} and {MAX_PRICE}.
  </p>
);
