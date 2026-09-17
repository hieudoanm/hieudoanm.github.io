'use client';

import { FC, useState } from 'react';

import {
  CYCLIC_DIGITS,
  CYCLIC_NUMBER,
  MAX_MULTIPLIER,
  getCyclicProduct,
} from './utils';

const SLOT_STYLES = [
  'border-sky-400/40 bg-sky-400/10 text-sky-700',
  'border-emerald-400/40 bg-emerald-400/10 text-emerald-700',
  'border-amber-400/40 bg-amber-400/10 text-amber-700',
  'border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-700',
  'border-cyan-400/40 bg-cyan-400/10 text-cyan-700',
  'border-rose-400/40 bg-rose-400/10 text-rose-700',
];

const NEUTRAL_STYLE = 'border-base-300/60 bg-base-200 text-base-content/60';

const ProductDigits: FC<{ product: number; highlighted: boolean }> = ({
  product,
  highlighted,
}) => {
  const digits = String(product).padStart(6, '0').split('').map(Number);

  return (
    <div role="img" aria-label={String(product)} className="flex gap-1.5">
      {digits.map((digit, i) => {
        const source = CYCLIC_DIGITS.indexOf(digit);
        const style =
          highlighted && source !== -1 ? SLOT_STYLES[source] : NEUTRAL_STYLE;
        return (
          <span
            key={`${i}-${digit}-${source}`}
            data-source={source}
            className={`flex h-12 w-9 items-center justify-center rounded-lg border font-mono text-2xl tabular-nums ${style}`}>
            {digit}
          </span>
        );
      })}
    </div>
  );
};

const FACT: Record<string, string> = {
  cyclic: 'the same six digits, rotated around the cycle',
  seven: '×7 gives all nines — the base-six repeat of 1/7',
  beyond: 'the cyclic pattern resets after ×6; higher multiples grow the cycle',
};

export const CyclicNumber: FC = () => {
  const [multiplier, setMultiplier] = useState(1);
  const { product, cyclicSpecial, permutationOffset } =
    getCyclicProduct(multiplier);

  const fact =
    cyclicSpecial && multiplier !== 7
      ? `${FACT.cyclic} (${permutationOffset} forward)`
      : multiplier === 7
        ? FACT.seven
        : FACT.beyond;

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1.5">
          {CYCLIC_DIGITS.map((digit, i) => (
            <span
              key={`${digit}-${i}`}
              data-source={i}
              className={`flex h-12 w-9 items-center justify-center rounded-lg border font-mono text-2xl tabular-nums ${SLOT_STYLES[i]}`}>
              {digit}
            </span>
          ))}
        </div>
        <p className="text-base-content/40 text-[10px] tracking-[3px] uppercase">
          The cyclic number
        </p>
      </div>

      <div className="join">
        <button
          onClick={() => setMultiplier((p) => Math.max(p - 1, 1))}
          className="btn btn-outline join-item btn-sm w-10 font-mono text-base"
          aria-label="Decrease multiplier">
          −
        </button>
        <input
          type="number"
          min={1}
          max={MAX_MULTIPLIER}
          value={multiplier}
          onChange={(e) =>
            setMultiplier(
              Math.min(MAX_MULTIPLIER, Math.max(1, Number(e.target.value)))
            )
          }
          aria-label="Multiplier"
          className="input input-bordered input-sm join-item w-20 text-center font-mono text-lg tabular-nums"
        />
        <button
          onClick={() => setMultiplier((p) => Math.min(p + 1, MAX_MULTIPLIER))}
          className="btn btn-outline join-item btn-sm w-10 font-mono text-base"
          aria-label="Increase multiplier">
          +
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="font-mono text-[1.35rem] font-semibold">
          {CYCLIC_NUMBER} × {multiplier} =
        </p>
        <ProductDigits product={product} highlighted={cyclicSpecial} />
      </div>

      <div className="bg-base-200 border-base-300 w-full max-w-md rounded-xl border p-4 text-center text-sm">
        <p className="text-base-content/70">{fact}</p>
        <p className="text-base-content/40 mt-3 text-xs">
          142857 is the repeating block of 1/7 = 0.
          <span className="font-mono">142857</span>
        </p>
      </div>
    </div>
  );
};

CyclicNumber.displayName = 'CyclicNumber';
