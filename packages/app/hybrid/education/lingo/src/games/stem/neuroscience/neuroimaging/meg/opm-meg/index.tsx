'use client';

import { FC, useMemo, useState } from 'react';
import { NoiseBudget, SnrCanvas } from './components';
import { fieldAt, runOpmSimulation } from './game';
import type { OPMParams } from './types';
import { Slider, Stat } from '../../../shared/controls';
import { Window } from '../../../shared/Window';

const DEFAULTS: OPMParams = {
  sourceDepthCm: 2,
  sensorGapCm: 0.5,
  sourceStrength: 0.6,
  ambientNT: 180,
  sensorNoiseNT: 0.00005,
  sensorCount: 100,
  shielded: false,
};

export const OpmSimulator: FC = () => {
  const [params, setParams] = useState<OPMParams>(DEFAULTS);
  const result = useMemo(() => runOpmSimulation(params), [params]);

  const totalDistance = params.sourceDepthCm + params.sensorGapCm;
  const signalNT = fieldAt(params.sourceStrength, totalDistance);

  return (
    <div className="flex w-full max-w-5xl flex-col gap-8 lg:flex-row">
      <div className="flex flex-1 flex-col gap-5">
        <Window
          title="Source"
          hint="Cortical dipoles are a few nA·m; the field they make is only tens to hundreds of fT.">
          <Slider
            label="Source depth below scalp"
            value={params.sourceDepthCm}
            min={0.5}
            max={6}
            step={0.1}
            format={(v) => `${v.toFixed(1)} cm`}
            onChange={(v) => setParams((p) => ({ ...p, sourceDepthCm: v }))}
          />
          <Slider
            label="Source moment"
            value={params.sourceStrength}
            min={0.05}
            max={3}
            step={0.05}
            format={(v) => `${v.toFixed(2)} nA·m`}
            onChange={(v) => setParams((p) => ({ ...p, sourceStrength: v }))}
          />
        </Window>

        <Window
          title="Sensor placement"
          hint="This is where OPMs win: 0.5 cm from cortex instead of 4 cm for a cryogenic helmet.">
          {' '}
          <Slider
            label="Sensor-to-cortex gap"
            value={params.sensorGapCm}
            min={0.2}
            max={3}
            step={0.1}
            format={(v) => `${v.toFixed(1)} cm`}
            onChange={(v) => setParams((p) => ({ ...p, sensorGapCm: v }))}
          />
          <Slider
            label="Sensor count"
            value={params.sensorCount}
            min={8}
            max={300}
            step={4}
            onChange={(v) => setParams((p) => ({ ...p, sensorCount: v }))}
          />
        </Window>

        <Window
          title="Noise environment"
          hint="Cars, elevators, and elevators-adjacent buildings swamp brain fields until you shield.">
          <Slider
            label="Ambient field"
            value={params.ambientNT}
            min={1}
            max={500}
            step={1}
            format={(v) => `${v.toFixed(0)} nT`}
            onChange={(v) => setParams((p) => ({ ...p, ambientNT: v }))}
          />
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-xs"
              checked={params.shielded}
              onChange={(e) =>
                setParams((p) => ({ ...p, shielded: e.target.checked }))
              }
            />
            <span className="text-base-content/70 text-xs font-medium">
              Inside a magnetically shielded room
            </span>
          </label>
        </Window>
      </div>

      <div className="flex flex-[2] flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-primary text-xl font-bold">
            Signal versus distance
          </h2>
          <p className="text-base-content/60 text-xs">
            Because the field falls off as 1/r³, distance is the dominant term.
            The curve below is signal magnitude against source-to-sensor
            distance for the current source.
          </p>
          <SnrCanvas curve={result.curve} opmDistanceCm={totalDistance} />
        </div>

        <NoiseBudget
          signalNT={signalNT}
          ambientNT={result.residualAmbientNT}
          sensorNoiseNT={params.sensorNoiseNT}
        />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat
            label="Cortical signal"
            value={`${(signalNT * 1000).toFixed(1)} fT`}
            colorClass="text-success"
          />
          <Stat
            label="OPM SNR"
            value={result.opmSnr.toExponential(2)}
            colorClass="text-success"
          />
          <Stat
            label="Helmet SNR"
            value={result.helmetSnr.toExponential(2)}
            colorClass="text-base-content/60"
          />
          <Stat
            label="OPM advantage"
            value={`${result.gain.toFixed(0)}×`}
            colorClass="text-success"
          />{' '}
        </div>

        <div className="card border-base-content/10 border p-4">
          <p className="text-base-content/70 text-xs leading-relaxed">
            <strong className="text-primary">What to watch.</strong> Two
            separate facts, often conflated. <em>Detectability</em> is set by
            the noise floor: unshielded, the ambient field is four orders of
            magnitude above any cortical signal, so nothing is detectable no
            matter how close the sensor sits &mdash; tick the shield and the
            signal emerges. <em>OPM advantage over a helmet</em> is then purely
            geometric: 1/r³ puts the on-scalp sensor about{' '}
            {result.gain.toFixed(0)}× ahead for the same source, and the ratio
            is set by where each sensor sits, not by shielding. The remaining
            OPM constraints are practical: hair must be parted or held aside,
            and the sensors weigh about 0.5&nbsp;kg each.
          </p>
        </div>
      </div>
    </div>
  );
};
