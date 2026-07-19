'use client';

import { useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
import { NumberInput, Panel, Stat, StatRow } from '../shared/Controls';

/**
 * A singly linked list.
 *
 * Unlike the array-backed structures there is no index to address, so searching
 * has to walk node by node — which is the whole point of the visualisation.
 */

export interface Node {
  value: number;
  next: number | null;
}

export const appendNode = (nodes: Node[], value: number): Node[] => {
  const next = [...nodes, { value, next: null }];
  if (next.length > 1)
    next[next.length - 2] = { ...next[next.length - 2], next: next.length - 1 };
  return next;
};

export const walkFor = (nodes: Node[], target: number): number[] => {
  const visited: number[] = [];
  let cursor: number | null = 0;
  while (cursor !== null && nodes[cursor]) {
    visited.push(cursor);
    if (nodes[cursor].value === target) break;
    cursor = nodes[cursor].next;
  }
  return visited;
};

export const listLength = (nodes: Node[]): number =>
  walkFor(nodes, Infinity).length;

export const LinkedListSimulator: FC = () => {
  const [nodes, setNodes] = useState<Node[]>(() =>
    appendNode(appendNode(appendNode([], 12), 5), 27)
  );
  const [text, setText] = useState('');
  const [visited, setVisited] = useState<number[]>([]);
  const [note, setNote] = useState('Three nodes chained head to tail.');

  const values = useMemo(() => nodes.map((n) => n.value), [nodes]);

  const add = useCallback(() => {
    const v = Number.parseInt(text, 10);
    if (Number.isNaN(v)) return;
    setNodes((ns) => appendNode(ns, v));
    setText('');
    setVisited([]);
    setNote(`Appended ${v} at the tail.`);
  }, [text]);

  const find = useCallback(() => {
    const v = Number.parseInt(text, 10);
    if (Number.isNaN(v)) return;
    const walk = walkFor(nodes, v);
    setVisited(walk);
    setNote(
      walk.at(-1) !== undefined && nodes[walk.at(-1)!]?.value === v
        ? `Found ${v} after ${walk.length} node visits.`
        : `Reached the end of the list without finding ${v}, after ${walk.length} visits.`
    );
  }, [nodes, text]);

  return (
    <div className="flex w-full flex-col gap-4">
      <Panel
        title="Operations"
        hint="Search is O(n) because there is no index — each node can only be reached from its predecessor.">
        <NumberInput
          label="Value"
          value={text}
          placeholder="e.g. 27"
          onChange={setText}
        />
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary btn-sm" onClick={add}>
            Append
          </button>
          <button className="btn btn-sm" onClick={find}>
            Find
          </button>
          <button
            className="btn btn-sm"
            onClick={() => {
              setNodes([]);
              setVisited([]);
              setNote('Empty list.');
            }}>
            Clear
          </button>
        </div>
      </Panel>

      <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
        <div
          className="flex flex-wrap items-center gap-1"
          data-testid="linked-list">
          {nodes.length === 0 && (
            <span className="text-base-content/40 text-sm">empty</span>
          )}
          {nodes.map((node, i) => (
            <span key={i} className="flex items-center gap-1">
              <span
                data-testid={`node-${i}`}
                className={`flex h-10 w-12 items-center justify-center rounded border font-mono text-sm ${
                  visited.includes(i)
                    ? 'border-warning/70 bg-warning/25'
                    : 'border-primary/50 bg-primary/15'
                }`}>
                {node.value}
              </span>
              {i < nodes.length - 1 && (
                <span className="text-base-content/40">→</span>
              )}
            </span>
          ))}
          {nodes.length > 0 && (
            <span className="text-base-content/40 ml-1">→ null</span>
          )}
        </div>
        <p
          className="text-base-content/70 min-h-8 text-sm"
          data-testid="step-note">
          {note}
        </p>
      </div>

      <StatRow>
        <Stat label="Nodes" value={String(nodes.length)} />
        <Stat label="Visited" value={String(visited.length)} />
        <Stat label="Append" value="O(1) with a tail pointer" />
        <Stat label="Find" value="O(n)" />
      </StatRow>
    </div>
  );
};
