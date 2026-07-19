'use client';

import { FC, useState } from 'react';

import {
  GOLDEN_RATIO,
  binetError,
  fibonacci,
  fibonacciRatio,
  termsToDouble,
  zeckendorf,
} from './utils';

const MAX_N = 40;
const MAX_DECOMPOSE = 100_000;

const ZECKENDORF_COLOR = [
  'border-sky-400/40 bg-sky-400/10 text-sky-700',
  'border-emerald-400/40 bg-emerald-400/10 text-emerald-700',
  'border-amber-400/40 bg-amber-400/10 text-amber-700',
  'border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-700',
];

const RatioPanel: FC<{ n: number }> = ({ n }) => {
  const ratio = fibonacciRatio(n);
  if (ratio === null) {
    return (
      <p className="text-base-content/40 text-center text-xs">
        Start at n = 1 — F(0) = 0 has no ratio.
      </p>
    );
  }

  const error = Math.abs(ratio - GOLDEN_RATIO);
  // Log scale: the error falls by ~2.6× per term, so a linear bar reads as
  // "still wrong" long after it is visually indistinguishable.
  const closeness = Math.max(0, 1 - Math.log10(1 + error * 1e6) / 6);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-center gap-2 font-mono">
        <span className="text-base-content/50 text-sm">
          F({n + 1})/F({n}) =
        </span>
        <span className="text-2xl tabular-nums">{ratio.toFixed(9)}</span>
      </div>
      <div className="bg-base-300 h-1.5 w-full overflow-hidden rounded-full">
        <div
          data-testid="ratio-closeness"
          className="bg-primary h-full rounded-full transition-all"
          style={{ width: `${closeness * 100}%` }}
        />
      </div>
      <p className="text-base-content/60 text-center text-sm">
        φ ={' '}
        <span className="text-primary font-mono">
          {GOLDEN_RATIO.toFixed(9)}
        </span>{' '}
        — off by <span className="font-mono">{error.toExponential(2)}</span>
      </p>
    </div>
  );
};

export const FibonacciSequence: FC = () => {
  const [n, setN] = useState(10);
  const [target, setTarget] = useState(100);

  const terms = fibonacci(n + 1);
  const value = terms[n] ?? 0;
  const next = terms[n + 1] ?? 0;
  const parts = zeckendorf(target);
  const error = binetError(n);

  return (
    <div className="flex w-full flex-col items-center gap-6 p-8">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {terms.slice(1).map((term, i) => (
          <span
            key={`${i}-${term}`}
            data-active={i + 1 === n}
            className={`flex h-11 w-11 items-center justify-center rounded-lg border font-mono text-lg tabular-nums transition-colors ${
              i + 1 === n
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-base-300/60 bg-base-200 text-base-content/50'
            }`}>
            {term}
          </span>
        ))}
      </div>

      <div className="join">
        <button
          onClick={() => setN((p) => Math.max(1, p - 1))}
          className="btn btn-outline join-item btn-sm w-10 font-mono text-base"
          aria-label="Previous term">
          −
        </button>
        <input
          type="number"
          min={1}
          max={MAX_N}
          value={n}
          onChange={(e) =>
            setN(Math.min(MAX_N, Math.max(1, Number(e.target.value) || 1)))
          }
          aria-label="Term index"
          className="input input-bordered input-sm join-item w-20 text-center font-mono text-lg tabular-nums"
        />
        <button
          onClick={() => setN((p) => Math.min(MAX_N, p + 1))}
          className="btn btn-outline join-item btn-sm w-10 font-mono text-base"
          aria-label="Next term">
          +
        </button>
      </div>

      <div className="grid w-full max-w-xl gap-3 sm:grid-cols-3">
        {[
          { label: 'F(n)', value },
          { label: 'F(n+1)', value: next },
          { label: 'Terms to double', value: termsToDouble(n) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-base-200 border-base-300 rounded-xl border p-3 text-center">
            <p className="font-mono text-2xl tabular-nums">{stat.value}</p>
            <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-base-200 border-base-300 w-full max-w-xl rounded-xl border p-4">
        <RatioPanel n={n} />
      </div>

      <div className="bg-base-200 border-base-300 w-full max-w-xl rounded-xl border p-4">
        <div className="mb-3 flex items-center gap-3">
          <label
            htmlFor="zeckendorf-target"
            className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
            Decompose
          </label>
          <input
            id="zeckendorf-target"
            type="number"
            min={0}
            max={MAX_DECOMPOSE}
            value={target}
            onChange={(e) =>
              setTarget(
                Math.min(
                  MAX_DECOMPOSE,
                  Math.max(0, Number(e.target.value) || 0)
                )
              )
            }
            className="input input-bordered input-sm w-32 text-center font-mono text-lg tabular-nums"
          />
        </div>
        {parts.length ? (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {parts.map((part, i) => (
              <span
                key={`${part}-${i}`}
                data-testid="zeckendorf-term"
                className={`flex h-10 items-center rounded-lg border px-3 font-mono text-lg tabular-nums ${ZECKENDORF_COLOR[i % ZECKENDORF_COLOR.length]}`}>
                {part}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-base-content/40 text-center text-xs">
            0 has no representation.
          </p>
        )}
        <p className="text-base-content/50 mt-3 text-center text-xs">
          Zeckendorf: every integer is a unique sum of non-consecutive Fibonacci
          numbers.
        </p>
      </div>

      <p className="text-base-content/40 max-w-xl text-center text-xs">
        Binet&apos;s formula <span className="font-mono">φⁿ/√5</span> rounds to
        F(n) for every n — here the error is{' '}
        <span className="font-mono">{error.toFixed(4)}</span>.
      </p>
    </div>
  );
};

FibonacciSequence.displayName = 'FibonacciSequence';
