'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { DDMSimulator } from '@/games/stem/neuroscience/theory/drift-diffusion-model';

const DDMInteractivePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/neuroscience/drift-diffusion-model"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      DDM Simulator
    </h1>
    <p className="text-base-content/60 text-sm">
      Adjust the model parameters and watch how evidence accumulates toward a
      decision boundary. Run 100 trials to see the speed–accuracy trade-off in
      action.
    </p>
    <DDMSimulator />
  </div>
);

export default DDMInteractivePage;
