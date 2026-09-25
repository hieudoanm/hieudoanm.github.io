'use client';

import { FC, useMemo, useState } from 'react';
import { ColorBar, TopoMap } from './components';
import { onScalpGain, runForwardModel } from './game';
import type { DipoleParams } from './types';
import { Slider, Stat } from '../../../shared/controls';
import { Window } from '../../../shared/Window';

const DEFAULTS: DipoleParams = {
  depthCm: 1,
  orientationDeg: 0,
  sensorGapCm: 4,
  skullRatio: 0.5,
  sampleRate: 1000,
};

export const MegForwardSimulator: FC = () => {
  const [params, setParams] = useState<DipoleParams>(DEFAULTS);

  const result = useMemo(() => runForwardModel(params), [params]);
  const gain = onScalpGain(4, 1);

  return (
    <div className="flex w-full max-w-5xl flex-col gap-8 lg:flex-row">
      <div className="flex flex-1 flex-col gap-5">
        <Window
          title="Cortical source"
          hint="A single current dipole. Rotating it toward the skull changes what each modality sees.">
          <Slider
            label="Source depth"
            value={params.depthCm}
            min={0.5}
            max={6}
            step={0.1}
            format={(v) => `${v.toFixed(1)} cm`}
            onChange={(v) => setParams((p) => ({ ...p, depthCm: v }))}
          />
          <Slider
            label="Orientation (0 = radial, 90 = tangential)"
            value={params.orientationDeg}
            min={0}
            max={180}
            step={5}
            format={(v) => `${v}°`}
            onChange={(v) => setParams((p) => ({ ...p, orientationDeg: v }))}
          />
        </Window>

        <Window
          title="Sensor array"
          hint="Distance matters enormously: magnetic field falls off as 1/r³.">
          <Slider
            label="Scalp-to-sensor gap"
            value={params.sensorGapCm}
            min={0.5}
            max={6}
            step={0.1}
            format={(v) => `${v.toFixed(1)} cm`}
            onChange={(v) => setParams((p) => ({ ...p, sensorGapCm: v }))}
          />
        </Window>

        <Window
          title="Volume conduction"
          hint="How much the skull smears the scalp potential. 1 is a transparent skull.">
          <Slider
            label="Skull conductivity ratio"
            value={params.skullRatio}
            min={0.1}
            max={1}
            step={0.05}
            format={(v) => v.toFixed(2)}
            onChange={(v) => setParams((p) => ({ ...p, skullRatio: v }))}
          />
        </Window>
      </div>

      <div className="flex flex-[2] flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-primary text-xl font-bold">
            Forward model: same dipole, two modalities
          </h2>
          <p className="text-base-content/60 text-xs">
            Left is the magnetic field, which passes through the skull
            essentially unattenuated. Right is the scalp potential, blurred by
            volume conduction. A radial dipole is nearly invisible to MEG and
            strong in EEG — the reason an MEG helmet needs hair parting and a
            comb cap, not a wet cap.
          </p>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-6">
          <div className="flex items-end gap-2">
            <TopoMap
              samples={result.samples}
              field="magnetic"
              peak={result.peakMagnetic}
              title="MEG |B| (a.u.)"
            />
            <ColorBar peak={result.peakMagnetic} label="a.u." />
          </div>
          <div className="flex items-end gap-2">
            <TopoMap
              samples={result.samples}
              field="volumeConducted"
              peak={result.peakVolumeConducted}
              title="EEG scalp V (a.u.)"
            />
            <ColorBar peak={result.peakVolumeConducted} label="a.u." />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat
            label="Peak |B|"
            value={result.peakMagnetic.toExponential(2)}
            colorClass="text-success"
          />
          <Stat
            label="Peak scalp V"
            value={result.peakElectric.toExponential(2)}
            colorClass="text-info"
          />
          <Stat
            label="V after volume conduction"
            value={result.peakVolumeConducted.toExponential(2)}
            colorClass="text-info"
          />
          <Stat
            label="Nearest sensor"
            value={`${result.minDistanceCm.toFixed(1)} cm`}
          />
          <Stat
            label="On-scalp vs 4 cm helmet"
            value={`${gain.toFixed(0)}×`}
            colorClass="text-success"
          />
        </div>

        <div className="card border-base-content/10 border p-4">
          <p className="text-base-content/70 text-xs leading-relaxed">
            <strong className="text-primary">What to watch.</strong> Drop the
            scalp-to-sensor gap from 4 cm to 1 cm and the magnetic field grows
            by about {gain.toFixed(0)}×, while the scalp potential barely moves
            &mdash; that asymmetry is the entire argument for optically pumped
            magnetometers. Deep sources lose the same way: halving the
            source-to-sensor distance costs a factor of eight, so depth is the
            hardest part of any inverse solution in either modality.
          </p>
        </div>
      </div>
    </div>
  );
};
