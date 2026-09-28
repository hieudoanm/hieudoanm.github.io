import { FC } from 'react';
import Link from 'next/link';
import { LCASimulator } from '@/games/stem/neuroscience/leaky-competing-accumulator';

const LCAPage: FC = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
    <Link
      href="/neuroscience/leaky-competing-accumulator"
      className="text-primary text-sm hover:underline">
      ← Back to LCA Theory
    </Link>
    <div className="flex flex-col gap-2">
      <h1 className="text-primary text-3xl font-bold tracking-tight">
        LCA Simulator
      </h1>
      <p className="text-base-content/70">
        Tune the leakage and mutual inhibition parameters to observe their
        effects on evidence accumulation and choice dynamics.
      </p>
    </div>
    <div className="card border-base-content/10 bg-base-100 border p-6 shadow-sm">
      <LCASimulator />
    </div>
  </div>
);

export default LCAPage;
