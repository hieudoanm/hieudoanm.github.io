'use client';

import { useCallback, useState } from 'react';
import type { FC } from 'react';
import { NumberInput, Panel, Stat, StatRow } from '../shared/Controls';
import { SlotGrid } from '../shared/SlotGrid';
import { empty, pop, push, scan } from './linear';
import type { Step } from './linear';

interface Props {
  capacity: number;
  /** Which end removes items: a stack takes from the end, a queue from the front. */
  end: 'front' | 'end';
  addLabel: string;
  removeLabel: string;
  hint: string;
}

const nextValue = (last: number): number => last + 1;

/**
 * One component drives the three array-backed structures, since push, pop and
 * scan are the same operations with a different end.
 */
const ArrayBacked: FC<Props> = ({
  capacity,
  end,
  addLabel,
  removeLabel,
  hint,
}) => {
  const [items, setItems] = useState<(number | null)[]>(() => empty(capacity));
  const [log, setLog] = useState<string[]>(['Empty.']);
  const [text, setText] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [used, setUsed] = useState(0);

  const record = useCallback((line: string) => {
    setLog((l) => [line, ...l].slice(0, 6));
  }, []);

  const add = useCallback(() => {
    const parsed = Number.parseInt(text, 10);
    if (Number.isNaN(parsed)) return;
    const step = push(
      items,
      parsed,
      `${addLabel} ${parsed}`,
      `Wrote to the first free slot.`
    );
    setItems(step.items);
    setUsed((u) => u + 1);
    record(step.detail);
    setText('');
  }, [items, text, addLabel, record]);

  const remove = useCallback(() => {
    const step = pop(items, end, removeLabel);
    setItems(step.items);
    setUsed((u) => Math.max(0, u - 1));
    record(step.detail);
  }, [items, end, removeLabel, record]);

  const runScan = useCallback(() => {
    const parsed = Number.parseInt(text, 10);
    if (Number.isNaN(parsed)) return;
    const recorded = scan(items, parsed);
    setSteps(recorded);
    setStepIndex(0);
    if (recorded.length === 0) record('Nothing to scan.');
  }, [items, text, record]);

  const step = steps[stepIndex];
  const view = step ? step.items : items;
  const fill = step
    ? step.count
    : items.reduce<number>((n, v) => (v === null ? n : n + 1), 0);

  return (
    <div className="flex w-full flex-col gap-4">
      <Panel title="Operations" hint={hint}>
        <NumberInput
          label="Value"
          value={text}
          placeholder="e.g. 7"
          onChange={setText}
        />
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary btn-sm" onClick={add}>
            {addLabel}
          </button>
          <button className="btn btn-sm" onClick={remove}>
            {removeLabel}
          </button>
          <button className="btn btn-sm" onClick={runScan}>
            Linear scan
          </button>
          <button className="btn btn-sm" onClick={() => setSteps([])}>
            Clear trace
          </button>
        </div>
      </Panel>

      <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
        <SlotGrid items={view} highlight={step?.highlight ?? []} />
        <p
          className="text-base-content/70 min-h-8 text-sm"
          data-testid="step-note">
          {step?.detail ?? 'Add a value to begin.'}
        </p>
        {steps.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              className="btn btn-xs"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}>
              Back
            </button>
            <button
              className="btn btn-xs"
              disabled={stepIndex >= steps.length - 1}
              onClick={() => setStepIndex((i) => i + 1)}>
              Step
            </button>
            <span className="text-base-content/50 font-mono text-xs">
              {stepIndex + 1} / {steps.length}
            </span>
          </div>
        )}
      </div>

      <StatRow>
        <Stat
          label="Occupied"
          value={`${fill}/${capacity}`}
          testId="occupied"
        />
        <Stat label="Added" value={String(used)} testId="added" />
        <Stat
          label="Probes"
          value={String(step?.comparisons ?? 0)}
          testId="probes"
        />
      </StatRow>

      <div className="flex flex-col gap-1">
        <span className="text-base-content/50 text-xs font-medium">
          Operation log
        </span>
        <ul className="text-base-content/70 flex flex-col gap-1 font-mono text-xs">
          {log.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const ArraySimulator: FC = () => (
  <ArrayBacked
    capacity={10}
    end="end"
    addLabel="Append"
    removeLabel="Remove"
    hint="Contiguous storage, constant-time index access, and an O(n) cost to insert in the middle."
  />
);

export const StackSimulator: FC = () => (
  <ArrayBacked
    capacity={8}
    end="end"
    addLabel="Push"
    removeLabel="Pop"
    hint="Last in, first out. Both operations touch one end of the array, so both are O(1)."
  />
);

export const QueueSimulator: FC = () => (
  <ArrayBacked
    capacity={8}
    end="front"
    addLabel="Enqueue"
    removeLabel="Dequeue"
    hint="First in, first out. Removing from the front means either shifting O(n) elements or using a ring buffer."
  />
);
