import { FC } from 'react';
import Link from 'next/link';
import { RaceSimulator } from '@/games/stem/neuroscience/theory/race-models';

const RaceModelsInteractivePage: FC = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
    <Link
      href="/neuroscience/race-models"
      className="text-primary text-sm hover:underline">
      ← Back to Race Models Theory
    </Link>
    <div className="flex flex-col gap-2">
      <h1 className="text-primary text-3xl font-bold tracking-tight">
        Race Model Simulator
      </h1>
      <p className="text-base-content/70">
        Simulate completely independent evidence accumulators racing toward a
        decision boundary.
      </p>
    </div>
    <div className="card border-base-content/10 bg-base-100 border p-6 shadow-sm">
      <RaceSimulator />
    </div>
  </div>
);

export default RaceModelsInteractivePage;
