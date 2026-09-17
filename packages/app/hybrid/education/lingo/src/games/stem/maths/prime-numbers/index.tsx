'use client';

import { FC, useState } from 'react';

import {
  DEFAULT_LIMIT,
  isPerfectSquare,
  largestGapWithin,
  sieveGrid,
  twinPrimes,
} from './utils';

const MAX_LIMIT = 300;
const MAX_PROBE = 20_000;

const Stat: FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="bg-base-200 border-base-300 rounded-xl border p-3 text-center">
    <p className="font-mono text-2xl tabular-nums">{value}</p>
    <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
      {label}
    </p>
  </div>
);

export const PrimeNumbers: FC = () => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [probe, setProbe] = useState(97);

  const grid = sieveGrid(limit);
  const primes = grid.filter((row) => row.prime);
  const largest = largestGapWithin(limit);
  const twins = twinPrimes(limit);
  const bound = Math.floor(Math.sqrt(probe));
  const squareBound = isPerfectSquare(probe);

  return (
    <div className="flex w-full flex-col items-center gap-6 p-8">
      <div className="flex items-center gap-3">
        <label
          htmlFor="sieve-limit"
          className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
          Sieve up to
        </label>
        <input
          id="sieve-limit"
          type="number"
          min={10}
          max={MAX_LIMIT}
          value={limit}
          onChange={(e) =>
            setLimit(
              Math.min(MAX_LIMIT, Math.max(10, Number(e.target.value) || 10))
            )
          }
          className="input input-bordered input-sm w-28 text-center font-mono text-lg tabular-nums"
        />
      </div>

      <div
        role="img"
        aria-label={`Sieve of Eratosthenes up to ${limit}`}
        className="grid max-w-3xl grid-cols-10 gap-1 sm:grid-cols-14">
        {grid.map((row) => (
          <span
            key={row.value}
            data-prime={row.prime}
            className={`flex h-8 items-center justify-center rounded border font-mono text-xs tabular-nums ${
              row.prime
                ? 'border-primary/40 bg-primary/10 text-primary'
                : 'border-base-300/40 bg-base-200 text-base-content/30 line-through'
            }`}>
            {row.value}
          </span>
        ))}
      </div>

      <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Primes" value={primes.length} />
        <Stat label="Composites" value={grid.length - primes.length} />
        <Stat
          label="Density"
          value={`${((primes.length / grid.length) * 100).toFixed(1)}%`}
        />
        <Stat label="Largest gap" value={largest?.gap ?? '—'} />
      </div>

      <div className="bg-base-200 border-base-300 w-full max-w-2xl rounded-xl border p-4">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-3">
          <label
            htmlFor="probe"
            className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
            Test
          </label>
          <input
            id="probe"
            type="number"
            min={2}
            max={MAX_PROBE}
            value={probe}
            onChange={(e) =>
              setProbe(
                Math.min(MAX_PROBE, Math.max(2, Number(e.target.value) || 2))
              )
            }
            className="input input-bordered input-sm w-36 text-center font-mono text-lg tabular-nums"
          />
        </div>
        <p className="text-center text-sm">
          Trial division only needs to reach{' '}
          <span className="text-primary font-mono">
            √{probe} ≈ {bound}
          </span>
          {squareBound && (
            <span data-testid="perfect-square-note"> — a perfect square</span>
          )}{' '}
          — not {probe} divisors.
        </p>
        <p className="text-base-content/50 mt-2 text-center text-xs">
          Any composite n has a factor at most √n, so testing 2, 3, 5, …, √n
          settles primality.
        </p>
      </div>

      {twins.length > 0 && (
        <div className="bg-base-200 border-base-300 w-full max-w-2xl rounded-xl border p-4">
          <p className="text-base-content/40 mb-2 text-center font-mono text-[10px] tracking-widest uppercase">
            Twin primes below {limit}
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {twins.map((twin) => (
              <span
                key={twin}
                data-testid="twin-prime"
                className="rounded border border-fuchsia-400/40 bg-fuchsia-400/10 px-2.5 py-1 font-mono text-sm text-fuchsia-700 tabular-nums">
                {twin - 2} · {twin}
              </span>
            ))}
          </div>
          <p className="text-base-content/50 mt-3 text-center text-xs">
            Pairs separated by exactly 2. Whether infinitely many exist is
            unproven.
          </p>
        </div>
      )}
    </div>
  );
};

PrimeNumbers.displayName = 'PrimeNumbers';
