'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { LBACanvas } from './components';
import { runLBASimulation, runLBATrial } from './game';
import type { LBAParams, LBASimulationResult, LBATrial } from './types';
import { Slider, Stat } from '../../shared/controls';

const DEFAULT_PARAMS: LBAParams = {
  v1: 2.0,
  v2: 1.5,
  s: 0.3,
  A: 1.0,
  b: 2.5,
  t0: 200,
};

export const LBASimulator: FC = () => {
  const [params, setParams] = useState<LBAParams>(DEFAULT_PARAMS);
  const [liveTrial, setLiveTrial] = useState<LBATrial | null>(null);
  const [simResult, setSimResult] = useState<LBASimulationResult | null>(null);

  useEffect(() => {
    setLiveTrial(runLBATrial(params));
  }, [params]);

  const handleSimulate = useCallback(() => {
    setSimResult(runLBASimulation(params, 100));
  }, [params]);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 md:flex-row">
      <div className="flex flex-1 flex-col gap-6">
        <h2 className="text-primary text-xl font-bold">LBA Parameters</h2>
        <div className="flex flex-col gap-4">
          <Slider
            label="Drift Rate 1 (Green)"
            value={params.v1}
            min={0.1}
            max={5.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, v1: v }))}
          />
          <Slider
            label="Drift Rate 2 (Blue)"
            value={params.v2}
            min={0.1}
            max={5.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, v2: v }))}
          />
          <Slider
            label="Drift Variability (s)"
            value={params.s}
            min={0.1}
            max={1.0}
            step={0.05}
            onChange={(v) => setParams((p) => ({ ...p, s: v }))}
          />
          <Slider
            label="Start Range (A)"
            value={params.A}
            min={0.1}
            max={2.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, A: v }))}
          />
          <Slider
            label="Threshold (b)"
            value={params.b}
            min={1.0}
            max={5.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, b: v }))}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSimulate}>
          Run 100 Trials
        </button>
      </div>

      <div className="flex flex-[2] flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-primary text-xl font-bold">Single Trial Trace</h2>
          <p className="text-base-content/60 text-xs">
            Ballistic accumulation (no within-trial noise). The race is
            determined by the random starting points and sampled drift rates.
          </p>
          <LBACanvas trial={liveTrial} b={params.b} A={params.A} />
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
