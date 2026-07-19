import { FC } from 'react';
import Link from 'next/link';
import { HDDMSimulator } from '@/games/stem/neuroscience/theory/hierarchical-drift-diffusion-model';

const HDDMSimulatorPage: FC = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
    <Link
      href="/neuroscience/hierarchical-drift-diffusion-model"
      className="text-primary text-sm hover:underline">
      ← Back to HDDM Theory
    </Link>
    <div className="flex flex-col gap-2">
      <h1 className="text-primary text-3xl font-bold tracking-tight">
        HDDM Simulator
      </h1>
      <p className="text-base-content/70">
        Simulate a group of subjects where each individual's parameters are
        drawn from a hierarchical population distribution.
      </p>
    </div>
    <div className="card border-base-content/10 bg-base-100 border p-6 shadow-sm">
      <HDDMSimulator />
    </div>
  </div>
);

export default HDDMSimulatorPage;
