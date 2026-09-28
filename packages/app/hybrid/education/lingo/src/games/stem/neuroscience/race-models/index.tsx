'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { RaceCanvas } from './components';
import { runRaceSimulation, runRaceTrial } from './game';
import type { RaceParams, RaceSimulationResult, RaceTrial } from './types';
import { Slider, Stat } from '../drift-diffusion-model/components';

const DEFAULT_PARAMS: RaceParams = {
  v1: 2.0,
  v2: 1.5,
  noise: 1.0,
  boundary: 2.0,
  t0: 200,
};

export const RaceSimulator: FC = () => {
  const [params, setParams] = useState<RaceParams>(DEFAULT_PARAMS);
  const [liveTrial, setLiveTrial] = useState<RaceTrial | null>(null);
  const [simResult, setSimResult] = useState<RaceSimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    setLiveTrial(runRaceTrial(params));
  }, [params]);

  const handleSimulate = useCallback(() => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimResult(runRaceSimulation(params, 100));
      setIsSimulating(false);
    }, 10);
  }, [params]);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 md:flex-row">
      <div className="flex flex-1 flex-col gap-6">
        <h2 className="text-primary text-xl font-bold">Race Parameters</h2>
        <div className="flex flex-col gap-4">
          <Slider
            label="Drift Rate 1 (Green)"
            value={params.v1}
            min={0.5}
            max={5.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, v1: v }))}
          />
          <Slider
            label="Drift Rate 2 (Blue)"
            value={params.v2}
            min={0.5}
            max={5.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, v2: v }))}
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
            label="Threshold"
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
            Two accumulators race completely independently to the threshold.
            Notice the lack of mutual inhibition or leak.
          </p>
          <RaceCanvas trial={liveTrial} boundary={params.boundary} />
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
