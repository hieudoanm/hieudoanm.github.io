'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { ADDMCanvas } from './components';
import { runADDMSimulation, runADDMTrial } from './game';
import type { ADDMParams, ADDMSimulationResult, ADDMTrial } from './types';
import { Slider, Stat } from '../drift-diffusion-model/components';

const DEFAULT_PARAMS: ADDMParams = {
  valueLeft: 2.0,
  valueRight: 1.5,
  d: 2.0,
  theta: 0.3,
  noise: 1.0,
  boundary: 2.0,
  t0: 200,
};

export const ADDMSimulator: FC = () => {
  const [params, setParams] = useState<ADDMParams>(DEFAULT_PARAMS);
  const [liveTrial, setLiveTrial] = useState<ADDMTrial | null>(null);
  const [simResult, setSimResult] = useState<ADDMSimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    setLiveTrial(runADDMTrial(params));
  }, [params]);

  const handleSimulate = useCallback(() => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimResult(runADDMSimulation(params, 100));
      setIsSimulating(false);
    }, 10);
  }, [params]);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 md:flex-row">
      <div className="flex flex-1 flex-col gap-6">
        <h2 className="text-primary text-xl font-bold">aDDM Parameters</h2>
        <div className="flex flex-col gap-4">
          <Slider
            label="Value Left (V_L)"
            value={params.valueLeft}
            min={0}
            max={5.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, valueLeft: v }))}
          />
          <Slider
            label="Value Right (V_R)"
            value={params.valueRight}
            min={0}
            max={5.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, valueRight: v }))}
          />
          <Slider
            label="Attentional Discount (θ)"
            value={params.theta}
            min={0}
            max={1.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, theta: v }))}
          />
          <Slider
            label="Scaling Factor (d)"
            value={params.d}
            min={0.1}
            max={5.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, d: v }))}
          />
          <Slider
            label="Noise (σ)"
            value={params.noise}
            min={0.1}
            max={3.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, noise: v }))}
          />
          <Slider
            label="Boundary (b)"
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
            Background colour indicates fixation (green = looking left, blue =
            looking right). When looking at an item, its value is fully weighted
            while the other is discounted by θ.
          </p>
          <ADDMCanvas trial={liveTrial} boundary={params.boundary} />
        </div>
        {simResult && (
          <div className="grid grid-cols-2 gap-4">
            <Stat
              label="Choice Left Probability"
              value={`${(simResult.probLeft * 100).toFixed(1)}%`}
              colorClass="text-success"
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
