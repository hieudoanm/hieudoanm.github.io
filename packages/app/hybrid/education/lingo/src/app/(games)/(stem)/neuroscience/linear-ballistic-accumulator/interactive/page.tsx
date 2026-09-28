import { FC } from 'react';
import Link from 'next/link';
import { LBASimulator } from '@/games/stem/neuroscience/linear-ballistic-accumulator';

const LBAPage: FC = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
    <Link
      href="/neuroscience/linear-ballistic-accumulator"
      className="text-primary text-sm hover:underline">
      ← Back to LBA Theory
    </Link>
    <div className="flex flex-col gap-2">
      <h1 className="text-primary text-3xl font-bold tracking-tight">
        LBA Simulator
      </h1>
      <p className="text-base-content/70">
        Adjust the drift rates, variability, and thresholds to see how two
        independent ballistic accumulators race to a decision.
      </p>
    </div>
    <div className="card border-base-content/10 bg-base-100 border p-6 shadow-sm">
      <LBASimulator />
    </div>
  </div>
);

export default LBAPage;
