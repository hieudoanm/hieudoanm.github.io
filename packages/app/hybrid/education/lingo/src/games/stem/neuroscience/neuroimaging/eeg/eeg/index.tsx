'use client';

import { FC, useCallback, useMemo, useState } from 'react';
import { ErpCanvas } from './components';
import {
  evidenceToDrift,
  scaleComponentsForEvidence,
  simulateErp,
} from './game';
import type { ArtefactSettings, ErpComponent, ErpParams } from './types';
import { Slider, Stat } from '../../../shared/controls';
import { Window } from '../../../shared/Window';

const BASE_COMPONENTS: ErpComponent[] = [
  { name: 'P1', latency: 100, amplitude: 4, width: 30 },
  { name: 'N1', latency: 140, amplitude: -6, width: 35 },
  { name: 'N170', latency: 170, amplitude: -9, width: 32 },
  { name: 'P300', latency: 380, amplitude: 12, width: 90 },
];

const NO_ARTIFACTS: ArtefactSettings = {
  blink: 0,
  emg: 0,
  lineNoise: 0,
  drift: 0,
};

export const ErpSimulator: FC = () => {
  const [coherence, setCoherence] = useState(0.5);
  const [nTrials, setNTrials] = useState(40);
  const [artefacts, setArtefacts] = useState<ArtefactSettings>(NO_ARTIFACTS);
  const [p300Latency, setP300Latency] = useState(380);

  const components = useMemo(() => {
    const scaled = scaleComponentsForEvidence(BASE_COMPONENTS, coherence);
    return scaled.map((c) =>
      c.name === 'P300'
        ? {
            ...c,
            latency: p300Latency / (0.75 + 0.35 * evidenceToDrift(coherence)),
          }
        : c
    );
  }, [coherence, p300Latency]);

  const params: ErpParams = useMemo(
    () => ({ components, artefacts, sampleRate: 250, windowMs: 800 }),
    [components, artefacts]
  );

  const result = useMemo(
    () => simulateErp(params, nTrials, 1),
    [params, nTrials]
  );

  const setArtefact = useCallback(
    (key: keyof ArtefactSettings, value: number) =>
      setArtefacts((a) => ({ ...a, [key]: value })),
    []
  );

  const drift = evidenceToDrift(coherence);

  return (
    <div className="flex w-full max-w-5xl flex-col gap-8 lg:flex-row">
      <div className="flex flex-1 flex-col gap-5">
        <Window
          title="Stimulus evidence"
          hint="Higher coherence means stronger, faster evidence — the DDM drift rate.">
          <Slider
            label="Coherence / evidence"
            value={coherence}
            min={0}
            max={1}
            step={0.01}
            format={(v) => `${(v * 100).toFixed(0)}%`}
            onChange={setCoherence}
          />
          <Slider
            label="P300 latency (base)"
            value={p300Latency}
            min={200}
            max={600}
            step={10}
            format={(v) => `${v} ms`}
            onChange={setP300Latency}
          />
        </Window>

        <Window
          title="Averaging"
          hint="Each trial adds independent noise. Averaging cancels it as 1/√N.">
          <Slider
            label="Trials averaged"
            value={nTrials}
            min={1}
            max={200}
            step={1}
            onChange={setNTrials}
          />
        </Window>

        <Window
          title="Artefacts"
          hint="Turn these on to see what the average looks like before cleaning.">
          <Slider
            label="Eye blink"
            value={artefacts.blink}
            min={0}
            max={1}
            step={0.05}
            onChange={(v) => setArtefact('blink', v)}
          />
          <Slider
            label="Muscle (EMG)"
            value={artefacts.emg}
            min={0}
            max={1}
            step={0.05}
            onChange={(v) => setArtefact('emg', v)}
          />
          <Slider
            label="Mains hum (50 Hz)"
            value={artefacts.lineNoise}
            min={0}
            max={1}
            step={0.05}
            onChange={(v) => setArtefact('lineNoise', v)}
          />
          <Slider
            label="Sweat / baseline drift"
            value={artefacts.drift}
            min={0}
            max={1}
            step={0.05}
            onChange={(v) => setArtefact('drift', v)}
          />
        </Window>
      </div>

      <div className="flex flex-[2] flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-primary text-xl font-bold">Grand Average ERP</h2>
          <p className="text-base-content/60 text-xs">
            Red is a single contaminated trial; blue is the average of {nTrials}
            . Negativity is plotted downward, following the usual convention.
          </p>
          <ErpCanvas
            params={params}
            signal={result.signal}
            contaminated={result.contaminated}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat
            label="Drift rate v"
            value={drift.toFixed(2)}
            colorClass="text-success"
          />
          <Stat
            label="Noise before averaging"
            value={`${result.noiseBefore.toFixed(1)} µV`}
            colorClass="text-error"
          />
          <Stat
            label="Noise after averaging"
            value={`${result.noiseAfter.toFixed(1)} µV`}
            colorClass="text-success"
          />
          <Stat
            label="Noise reduction"
            value={`${(result.noiseBefore / Math.max(result.noiseAfter, 1e-6)).toFixed(1)}×`}
          />
        </div>

        <div className="card border-base-content/10 border p-4">
          <p className="text-base-content/70 text-xs leading-relaxed">
            <strong className="text-primary">What to watch.</strong> Raising
            evidence compresses every latency and scales the P300 — the
            signature a diffusion model predicts. Artefacts are trial-locked, so
            averaging does <em>not</em> remove them: blink, muscle, and hum all
            survive the average, which is why they must be removed before
            averaging rather than after.
          </p>
        </div>
      </div>
    </div>
  );
};
