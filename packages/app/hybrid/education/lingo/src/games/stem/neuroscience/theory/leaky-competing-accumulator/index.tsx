'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { LCACanvas } from './components';
import { runLCASimulation, runLCATrial } from './game';
import type { LCAParams, LCASimulationResult, LCATrial } from './types';
import { Slider, Stat } from '../../shared/controls';

const DEFAULT_PARAMS: LCAParams = {
  v1: 2.5,
  v2: 1.5,
  lambda: 0.5,
  beta: 0.5,
  noise: 0.5,
  startBias: 0,
  boundary: 2.0,
  t0: 200,
};

export const LCASimulator: FC = () => {
  const [params, setParams] = useState<LCAParams>(DEFAULT_PARAMS);
  const [liveTrial, setLiveTrial] = useState<LCATrial | null>(null);
  const [simResult, setSimResult] = useState<LCASimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    setLiveTrial(runLCATrial(params));
  }, [params]);

  const handleSimulate = useCallback(() => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimResult(runLCASimulation(params, 100));
      setIsSimulating(false);
    }, 10);
  }, [params]);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 md:flex-row">
      <div className="flex flex-1 flex-col gap-6">
        <h2 className="text-primary text-xl font-bold">LCA Parameters</h2>
        <div className="flex flex-col gap-4">
          <Slider
            label="Input 1 (Green)"
            value={params.v1}
            min={0.5}
            max={5.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, v1: v }))}
          />
          <Slider
            label="Input 2 (Blue)"
            value={params.v2}
            min={0.5}
            max={5.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, v2: v }))}
          />
          <Slider
            label="Leakage (λ)"
            value={params.lambda}
            min={0}
            max={2.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, lambda: v }))}
          />
          <Slider
            label="Inhibition (β)"
            value={params.beta}
            min={0}
            max={2.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, beta: v }))}
          />
          <Slider
            label="Noise (σ)"
            value={params.noise}
            min={0}
            max={2.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, noise: v }))}
          />
          <Slider
            label="Boundary"
            value={params.boundary}
            min={0.5}
            max={5.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, boundary: v }))}
          />
        </div>
        <button
          className="btn btn-primary"
          disabled={isSimulating}
          onClick={handleSimulate}>
          Run 100 Trials
        </button>
      </div>

      <div className="flex flex-[2] flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-primary text-xl font-bold">Single Trial Trace</h2>
          <p className="text-base-content/60 text-xs">
            Accumulators leak (decay toward zero) and inhibit each other (high
            values suppress competitors). Negative activations are prevented.
          </p>
          <LCACanvas trial={liveTrial} boundary={params.boundary} />
        </div>
        {simResult && (
          <div className="grid grid-cols-2 gap-4">
            <Stat
              label="Choice 1 (Green)"
              value={`${(simResult.accuracy * 100).toFixed(1)}%`}
            />
            <Stat
              label="Mean RT"
              value={`${Math.round(simResult.meanRT)} ms`}
            />
          </div>
        )}
      </div>
    </div>
  );
};
