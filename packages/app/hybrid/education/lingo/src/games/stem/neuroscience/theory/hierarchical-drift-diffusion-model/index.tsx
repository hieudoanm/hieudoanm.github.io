'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { HDDMScatterPlot } from './components';
import { runHDDMSimulation } from './game';
import type { HDDMParams, HDDMSimulationResult } from './types';
import { Slider, Stat } from '../../shared/controls';

const DEFAULT_PARAMS: HDDMParams = {
  popDriftMu: 1.5,
  popDriftSigma: 0.5,
  popBoundaryMu: 1.5,
  popBoundarySigma: 0.3,
  noise: 1.0,
  nonDecisionTime: 200,
};

export const HDDMSimulator: FC = () => {
  const [params, setParams] = useState<HDDMParams>(DEFAULT_PARAMS);
  const [simResult, setSimResult] = useState<HDDMSimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Run initial sim
  useEffect(() => {
    handleSimulate();
  }, []); // eslint-disable-line

  const handleSimulate = useCallback(() => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimResult(runHDDMSimulation(params, 50)); // 50 subjects
      setIsSimulating(false);
    }, 10);
  }, [params]);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 md:flex-row">
      <div className="flex flex-1 flex-col gap-6">
        <h2 className="text-primary text-xl font-bold">
          Hierarchical Parameters
        </h2>
        <div className="flex flex-col gap-4">
          <Slider
            label="Group Drift Mean (μ_v)"
            value={params.popDriftMu}
            min={-3}
            max={3.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, popDriftMu: v }))}
          />
          <Slider
            label="Group Drift Variance (σ_v)"
            value={params.popDriftSigma}
            min={0}
            max={2.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, popDriftSigma: v }))}
          />
          <Slider
            label="Group Boundary Mean (μ_a)"
            value={params.popBoundaryMu}
            min={0.5}
            max={4.0}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, popBoundaryMu: v }))}
          />
          <Slider
            label="Group Boundary Variance (σ_a)"
            value={params.popBoundarySigma}
            min={0}
            max={1.5}
            step={0.1}
            onChange={(v) => setParams((p) => ({ ...p, popBoundarySigma: v }))}
          />
        </div>
        <button
          className="btn btn-primary"
          disabled={isSimulating}
          onClick={handleSimulate}>
          Simulate 50 Subjects
        </button>
      </div>

      <div className="flex flex-[2] flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-primary text-xl font-bold">
            Population Distribution
          </h2>
          <p className="text-base-content/60 text-xs">
            Scatter plot showing RT vs Accuracy for 50 simulated subjects. Each
            dot is a subject whose underlying parameters were drawn from the
            Group Distributions on the left. The green cross is the group
            average.
          </p>
          <HDDMScatterPlot result={simResult} />
        </div>
        {simResult && (
          <div className="grid grid-cols-2 gap-4">
            <Stat
              label="Group Accuracy"
              value={`${(simResult.popAccuracy * 100).toFixed(1)}%`}
            />
            <Stat
              label="Group Mean RT"
              value={`${Math.round(simResult.popMeanRT)} ms`}
            />
          </div>
        )}
      </div>
    </div>
  );
};
