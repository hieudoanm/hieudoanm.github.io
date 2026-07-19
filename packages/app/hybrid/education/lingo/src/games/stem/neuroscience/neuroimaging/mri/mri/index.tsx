'use client';

import { FC, useMemo, useState } from 'react';
import { BoldCanvas, LagDiagram } from './components';
import { simulateBold } from './game';
import type { BOLDParams } from './types';
import { Slider, Stat } from '../../../shared/controls';
import { Window } from '../../../shared/Window';

const DEFAULTS: BOLDParams = {
  hrf: {
    peakTimeS: 5,
    dispersionS: 1.5,
    undershootRatio: 0.35,
    undershootTimeS: 12,
  },
  blockS: 20,
  isiS: 20,
  blockHz: 0,
  trS: 1,
  neuralNoise: 0.05,
  physioNoise: 0.02,
};

export const BoldSimulator: FC = () => {
  const [params, setParams] = useState<BOLDParams>(DEFAULTS);

  const result = useMemo(() => simulateBold(params), [params]);

  const setHrf = <K extends keyof BOLDParams['hrf']>(
    key: K,
    value: BOLDParams['hrf'][K]
  ) => setParams((p) => ({ ...p, hrf: { ...p.hrf, [key]: value } }));

  return (
    <div className="flex w-full max-w-5xl flex-col gap-8 lg:flex-row">
      <div className="flex flex-1 flex-col gap-5">
        <Window
          title="Task design"
          hint="A block design convolves the neural drive with the vascular response.">
          <Slider
            label="Block duration"
            value={params.blockS}
            min={2}
            max={25}
            step={1}
            format={(v) => `${v} s`}
            onChange={(v) => setParams((p) => ({ ...p, blockS: v }))}
          />
          <Slider
            label="Block repetition"
            value={params.blockHz}
            min={0}
            max={0.2}
            step={0.005}
            format={(v) => (v === 0 ? 'single block' : `${v.toFixed(3)} Hz`)}
            onChange={(v) => setParams((p) => ({ ...p, blockHz: v }))}
          />
        </Window>

        <Window
          title="Haemodynamic response"
          hint="Delay, peak, and undershoot all vary with neural, vascular, and pharmacological state.">
          <Slider
            label="Time to peak"
            value={params.hrf.peakTimeS}
            min={2}
            max={10}
            step={0.1}
            format={(v) => `${v.toFixed(1)} s`}
            onChange={(v) => setHrf('peakTimeS', v)}
          />
          <Slider
            label="Undershoot ratio"
            value={params.hrf.undershootRatio}
            min={0}
            max={0.8}
            step={0.05}
            format={(v) => v.toFixed(2)}
            onChange={(v) => setHrf('undershootRatio', v)}
          />
        </Window>

        <Window
          title="Acquisition"
          hint="TR is the floor on temporal resolution — you cannot sample faster than you acquire.">
          <Slider
            label="Repetition time (TR)"
            value={params.trS}
            min={0.2}
            max={3}
            step={0.05}
            format={(v) => `${v.toFixed(2)} s`}
            onChange={(v) => setParams((p) => ({ ...p, trS: v }))}
          />
          <Slider
            label="Physiological noise"
            value={params.physioNoise}
            min={0}
            max={0.2}
            step={0.005}
            format={(v) => v.toFixed(3)}
            onChange={(v) => setParams((p) => ({ ...p, physioNoise: v }))}
          />
        </Window>
      </div>

      <div className="flex flex-[2] flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-primary text-xl font-bold">
            Neural drive → BOLD
          </h2>
          <p className="text-base-content/60 text-xs">
            Green is the neural drive, blue the BOLD response, red the BOLD as
            actually sampled at the TR. Amber lines mark individual volumes.
          </p>
          <BoldCanvas samples={result.samples} windowS={result.windowS} />
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat
            label="Neural → BOLD lag"
            value={`${result.boldLagS.toFixed(1)} s`}
            colorClass="text-warning"
          />
          <Stat
            label="T1 (3 T)"
            value={`${result.t1S.toFixed(2)} s`}
            colorClass="text-info"
          />
          <Stat
            label="Effective T2*"
            value={`${(result.t2StarS * 1000).toFixed(0)} ms`}
            colorClass="text-info"
          />
          <Stat label="Volumes sampled" value={`${result.trSamples}`} />
        </div>

        <LagDiagram lagS={result.boldLagS} />

        <div className="card border-base-content/10 border p-4">
          <p className="text-base-content/70 text-xs leading-relaxed">
            <strong className="text-primary">What to watch.</strong> BOLD lags
            neural activity by several seconds and never returns exactly to
            baseline, so event-related fMRI cannot be analysed trial by trial
            the way EEG can. Raise the TR above about 2 s and the undershoot is
            aliased away; lengthen the block to 20 s and the peak returns, which
            is why block designs use slow cycles.
          </p>
        </div>
      </div>
    </div>
  );
};
