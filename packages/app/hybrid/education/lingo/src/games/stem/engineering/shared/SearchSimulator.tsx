'use client';

import { useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
import { ArrayBars } from './ArrayBars';
import {
  NumberInput,
  Panel,
  PlaybackControls,
  Slider,
  Stat,
  StatRow,
} from './Controls';
import { usePlayer } from './usePlayer';
import { makeDistinctArray } from './random';
import type { Frame } from './types';

/**
 * The visualiser every search page shares.
 *
 * Both searches walk one array looking for one target, so the difference the
 * user is meant to notice is purely how much of the array gets lit up.
 */
export const SearchSimulator: FC<SearchSimulatorProps> = ({
  search,
  inputHint,
  complexity,
}) => {
  const [size, setSize] = useState(16);
  const [seed, setSeed] = useState(11);
  const [speedMs, setSpeedMs] = useState(320);
  const [targetText, setTargetText] = useState('');
  const [target, setTarget] = useState<number | null>(null);

  const input = useMemo(
    () => makeDistinctArray(seed, size, 1, 100),
    [seed, size]
  );
  const frames = useMemo<Frame[]>(
    () => (target === null ? [] : search(input, target)),
    [search, input, target]
  );
  const player = usePlayer(frames, speedMs);
  const frame = player.frame;

  const submit = useCallback(() => {
    const parsed = Number.parseInt(targetText, 10);
    setTarget(Number.isNaN(parsed) ? null : parsed);
  }, [targetText]);

  const randomTarget = useCallback(() => {
    const pick = input[Math.floor(input.length / 2)];
    setTargetText(String(pick));
    setTarget(pick);
  }, [input]);

  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row">
      <div className="flex flex-col gap-4 lg:w-72">
        <Panel title="Query" hint={inputHint}>
          <Slider
            label="Elements"
            value={size}
            min={6}
            max={40}
            onChange={setSize}
          />
          <NumberInput
            label="Target value"
            value={targetText}
            placeholder="e.g. 42"
            onChange={setTargetText}
          />
          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={submit}>
              Search
            </button>
            <button className="btn btn-sm" onClick={randomTarget}>
              Pick one
            </button>
            <button
              className="btn btn-sm"
              onClick={() => setSeed((s) => s + 1)}>
              Shuffle
            </button>
          </div>
        </Panel>
        <Panel title="Complexity" hint="Comparisons to locate one target.">
          <p className="text-base-content/70 font-mono text-sm">{complexity}</p>
        </Panel>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
          {frame ? (
            <ArrayBars
              values={frame.values}
              states={frame.states}
              range={frame.range}
            />
          ) : (
            <p className="text-base-content/50 py-16 text-center text-sm">
              Choose a target to start searching.
            </p>
          )}
          <p
            className="text-base-content/70 min-h-8 text-sm"
            data-testid="step-note">
            {frame?.note}
          </p>
          {frames.length > 0 && (
            <PlaybackControls
              player={player}
              speedMs={speedMs}
              onSpeed={setSpeedMs}
            />
          )}
        </div>
        <StatRow>
          <Stat
            label="Probes"
            value={String(player.index + (frames.length ? 1 : 0))}
          />
          <Stat label="Steps" value={`${player.index}/${player.total}`} />
          <Stat
            label="Outcome"
            value={
              target === null
                ? '—'
                : player.isFinished
                  ? frame?.note.includes('found')
                    ? 'Found'
                    : 'Absent'
                  : 'Searching'
            }
            tone={
              player.isFinished
                ? frame?.note.includes('found')
                  ? 'good'
                  : 'warn'
                : 'default'
            }
          />
          <Stat label="Array length" value={String(size)} />
        </StatRow>
      </div>
    </div>
  );
};

interface SearchSimulatorProps {
  search: (input: readonly number[], target: number) => Frame[];
  inputHint: string;
  complexity: string;
}
