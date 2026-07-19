'use client';

import { useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
import { ArrayBars, AuxRow } from './ArrayBars';
import { Panel, PlaybackControls, Slider, Stat, StatRow } from './Controls';
import { usePlayer } from './usePlayer';
import { makeDistinctArray } from './random';
import type { Frame } from './types';
import type { SortProfile } from '../algorithms/profiles';

/**
 * The visualiser every sorting page shares.
 *
 * The algorithm is passed in as a pure recorder, so all six sorts render the
 * same controls and readouts and differ only in the animation they produce.
 */
export const SortSimulator: FC<SortSimulatorProps> = ({
  record,
  profile,
  defaultSize = 24,
}) => {
  const [size, setSize] = useState(defaultSize);
  const [seed, setSeed] = useState(7);
  const [speedMs, setSpeedMs] = useState(220);

  const input = useMemo(
    () => makeDistinctArray(seed, size, 1, 120),
    [seed, size]
  );
  const frames = useMemo<Frame[]>(() => record(input), [record, input]);
  const player = usePlayer(frames, speedMs);
  const frame = player.frame;

  const shuffle = useCallback(() => setSeed((s) => s + 1), []);

  const last = frames[frames.length - 1];

  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row">
      <div className="flex flex-col gap-4 lg:w-72">
        <Panel title="Input" hint={profile.inputHint}>
          <Slider
            label="Elements"
            value={size}
            min={6}
            max={48}
            onChange={setSize}
          />
          <button className="btn btn-sm" onClick={shuffle}>
            Shuffle
          </button>
        </Panel>
        <Panel title="Complexity" hint="Operations for n elements.">
          <ul className="text-base-content/70 flex flex-col gap-1 text-xs">
            <li>
              <span className="text-base-content/50">Best</span> {profile.best}
            </li>
            <li>
              <span className="text-base-content/50">Average</span>{' '}
              {profile.average}
            </li>
            <li>
              <span className="text-base-content/50">Worst</span>{' '}
              {profile.worst}
            </li>
          </ul>
          <p className="text-base-content/50 text-xs">
            {profile.stable ? 'Stable' : 'Not stable'} ·{' '}
            {profile.inPlace ? 'In place' : 'Needs O(n) space'}
          </p>
        </Panel>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
          {frame && (
            <ArrayBars
              values={frame.values}
              states={frame.states}
              range={frame.range}
            />
          )}
          {frame?.aux && <AuxRow buffer={frame.aux} />}
          <p
            className="text-base-content/70 min-h-8 text-sm"
            data-testid="step-note">
            {frame?.note}
          </p>
          <PlaybackControls
            player={player}
            speedMs={speedMs}
            onSpeed={setSpeedMs}
          />
        </div>
        <StatRow>
          <Stat label="Comparisons" value={String(frame?.comparisons ?? 0)} />
          <Stat label="Writes" value={String(frame?.writes ?? 0)} />
          <Stat label="Steps" value={`${player.index + 1}/${player.total}`} />
          <Stat
            label="Result"
            value={player.isFinished ? 'Sorted' : 'Running'}
            tone={player.isFinished ? 'good' : 'default'}
          />
        </StatRow>
        <p className="text-base-content/50 text-xs">{last?.note}</p>
      </div>
    </div>
  );
};

interface SortSimulatorProps {
  record: (input: readonly number[]) => Frame[];
  profile: SortProfile;
  defaultSize?: number;
}
