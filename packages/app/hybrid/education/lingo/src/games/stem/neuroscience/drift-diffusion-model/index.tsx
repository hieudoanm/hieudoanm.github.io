'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { Histogram, Slider, Stat, TraceCanvas } from './components';
import { DEFAULT_PARAMS, N_SIM_TRIALS } from './constants';
import { runSimulation, runTrial } from './game';
import type { DDMParams, DDMTrial, SimulationResult } from './types';

export const DDMSimulator: FC = () => {
  const [params, setParams] = useState<DDMParams>(DEFAULT_PARAMS);
  const [liveTrial, setLiveTrial] = useState<DDMTrial | null>(null);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Update live single trial when params change
  useEffect(() => {
    setLiveTrial(runTrial(params));
  }, [params]);

  const handleSimulate = useCallback(() => {
    setIsSimulating(true);
    // Use setTimeout to allow UI to render the button state before heavy work
    setTimeout(() => {
      setSimResult(runSimulation(params, N_SIM_TRIALS));
      setIsSimulating(false);
    }, 10);
  }, [params]);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 md:flex-row">
      {/* ─── Controls ─── */}
      <div className="flex flex-1 flex-col gap-6">
        <h2 className="text-primary text-xl font-bold">Parameters</h2>
        <div className="flex flex-col gap-4">
          <Slider
            label="Drift Rate (v)"
            value={params.driftRate}
            min={-3}
            max={3}
            step={0.1}
            format={(v) => (v > 0 ? `+${v.toFixed(1)}` : v.toFixed(1))}
            onChange={(v) => setParams((p) => ({ ...p, driftRate: v }))}
          />
          <Slider
            label="Boundary (a)"
            value={params.boundary}
            min={0.5}
            max={3.0}
            step={0.1}
            format={(v) => v.toFixed(1)}
            onChange={(v) => setParams((p) => ({ ...p, boundary: v }))}
          />
          <Slider
            label="Starting Bias (z)"
            value={params.startBias}
            min={0.1}
            max={0.9}
            step={0.1}
            format={(v) => v.toFixed(1)}
            onChange={(v) => setParams((p) => ({ ...p, startBias: v }))}
          />
          <Slider
            label="Noise (σ)"
            value={params.noise}
            min={0.1}
            max={2.0}
            step={0.1}
            format={(v) => v.toFixed(1)}
            onChange={(v) => setParams((p) => ({ ...p, noise: v }))}
          />
          <Slider
            label="Non-Decision Time (t₀)"
            value={params.nonDecisionTime}
            min={0}
            max={500}
            step={10}
            format={(v) => `${v} ms`}
            onChange={(v) => setParams((p) => ({ ...p, nonDecisionTime: v }))}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary w-full"
          disabled={isSimulating}
          onClick={handleSimulate}>
          {isSimulating ? 'Simulating...' : `Run ${N_SIM_TRIALS} Trials`}
        </button>
      </div>

      {/* ─── Visualisation ─── */}
      <div className="flex flex-[2] flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-primary text-xl font-bold">Single Trial Trace</h2>
          <TraceCanvas trial={liveTrial} boundary={params.boundary} />
        </div>

        {simResult && (
          <div className="flex flex-col gap-4">
            <h2 className="text-primary text-xl font-bold">
              Simulation Results
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat
                label="Accuracy"
                value={`${(simResult.accuracy * 100).toFixed(1)}%`}
              />
              <Stat
                label="Mean RT"
                value={`${Math.round(simResult.meanRT)} ms`}
              />
              <Stat
                label="Correct RT"
                value={`${Math.round(simResult.meanCorrectRT)} ms`}
                colorClass="text-success"
              />
              <Stat
                label="Error RT"
                value={`${Math.round(simResult.meanErrorRT)} ms`}
                colorClass="text-error"
              />
            </div>
            <Histogram result={simResult} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DDMSimulator;
