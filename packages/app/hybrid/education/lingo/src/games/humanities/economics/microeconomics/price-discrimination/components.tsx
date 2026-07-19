import { FC } from 'react';
import { SEGMENT_NAMES, TOTAL_ROUNDS } from './constants';
import { optimalDual, optimalSingle, roundFlipped } from './game';
import type { Mode } from './types';

export const formatProfit = (n: number): string =>
  `$${n.toLocaleString('en-US')}`;

export const RoundBadge: FC<{ round: number }> = ({ round }) => {
  const flipped = roundFlipped(round);
  return (
    <span>
      <strong>
        Round {round} / {TOTAL_ROUNDS}
      </strong>
      {flipped && (
        <span
          className="badge badge-warning badge-sm ml-2"
          data-testid="flipped-badge">
          Segments flipped
        </span>
      )}
    </span>
  );
};

export const DemandPanel: FC<{ round: number }> = ({ round }) => {
  const flipped = roundFlipped(round);
  const business = flipped ? '120 - 2p' : '100 - p';
  const leisure = flipped ? '100 - p' : '120 - 2p';
  return (
    <div
      className="card border-base-content/10 flex flex-col gap-1 border p-4 text-sm"
      data-testid="demand-panel">
      <span>
        {SEGMENT_NAMES.business} demand: <strong>q = {business}</strong>
      </span>
      <span>
        {SEGMENT_NAMES.leisure} demand: <strong>q = {leisure}</strong>
      </span>
      {flipped && (
        <p className="text-base-content/60 text-xs">
          Round 3 flips the segments — Business now has the elastic demand
          curve.
        </p>
      )}
    </div>
  );
};

export const BenchmarkPanel: FC<{ flipped: boolean }> = ({ flipped }) => {
  const single = optimalSingle(flipped);
  const dual = optimalDual(flipped);
  return (
    <div className="text-base-content/60 text-xs" data-testid="benchmark-panel">
      <p>
        One-price best: p = {single.price} → {formatProfit(single.profit)}
      </p>
      <p>
        Two-price best: p_b = {dual.priceB}, p_l = {dual.priceL} →{' '}
        {formatProfit(dual.profit)}
      </p>
    </div>
  );
};

export const ModePicker: FC<{ mode: Mode; onPick: (mode: Mode) => void }> = ({
  mode,
  onPick,
}) => (
  <div className="grid grid-cols-2 gap-2">
    <button
      type="button"
      data-testid="mode-single"
      onClick={() => onPick('single')}
      className={`btn btn-sm ${mode === 'single' ? 'btn-primary' : 'btn-ghost'}`}>
      One price
    </button>
    <button
      type="button"
      data-testid="mode-dual"
      onClick={() => onPick('dual')}
      className={`btn btn-sm ${mode === 'dual' ? 'btn-primary' : 'btn-ghost'}`}>
      Two prices
    </button>
  </div>
);

export const SinglePricePanel: FC<{
  price: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}> = ({ price, onChange, onSubmit }) => (
  <div className="flex flex-wrap items-center gap-2">
    <input
      type="number"
      min={1}
      value={price}
      onChange={(event) => onChange(event.target.value)}
      data-testid="price-input"
      placeholder="One price for all"
      className="input input-sm input-bordered w-40"
    />
    <button
      type="button"
      data-testid="submit-pricing"
      onClick={onSubmit}
      className="btn btn-primary btn-sm">
      Charge
    </button>
  </div>
);

export const DualPricePanel: FC<{
  priceB: string;
  priceL: string;
  onChangeB: (value: string) => void;
  onChangeL: (value: string) => void;
  onSubmit: () => void;
}> = ({ priceB, priceL, onChangeB, onChangeL, onSubmit }) => (
  <div className="flex flex-wrap items-center gap-2">
    <input
      type="number"
      min={1}
      value={priceB}
      onChange={(event) => onChangeB(event.target.value)}
      data-testid="price-b-input"
      placeholder="Business price"
      className="input input-sm input-bordered w-32"
    />
    <input
      type="number"
      min={1}
      value={priceL}
      onChange={(event) => onChangeL(event.target.value)}
      data-testid="price-l-input"
      placeholder="Leisure price"
      className="input input-sm input-bordered w-32"
    />
    <button
      type="button"
      data-testid="submit-pricing"
      onClick={onSubmit}
      className="btn btn-primary btn-sm">
      Charge
    </button>
  </div>
);
