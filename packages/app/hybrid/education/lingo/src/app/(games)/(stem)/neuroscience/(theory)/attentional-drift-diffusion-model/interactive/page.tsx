import { FC } from 'react';
import Link from 'next/link';
import { ADDMSimulator } from '@/games/stem/neuroscience/theory/attentional-drift-diffusion-model';

const ADDMSimulatorPage: FC = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
    <Link
      href="/neuroscience/attentional-drift-diffusion-model"
      className="text-primary text-sm hover:underline">
      ← Back to aDDM Theory
    </Link>
    <div className="flex flex-col gap-2">
      <h1 className="text-primary text-3xl font-bold tracking-tight">
        aDDM Simulator
      </h1>
      <p className="text-base-content/70">
        Simulate how visual fixations drive evidence accumulation. The item
        currently being looked at contributes more to the drift rate.
      </p>
    </div>
    <div className="card border-base-content/10 bg-base-100 border p-6 shadow-sm">
      <ADDMSimulator />
    </div>
  </div>
);

export default ADDMSimulatorPage;
