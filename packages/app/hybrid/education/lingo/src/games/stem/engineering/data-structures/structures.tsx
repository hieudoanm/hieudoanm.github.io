'use client';

import { useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
import { NumberInput, Panel, Stat, StatRow } from '../shared/Controls';
import { SlotGrid, Pre } from '../shared/SlotGrid';
import { DisjointSet, insertWord, renderTrie, searchWord } from './trees';
import type { TrieNode } from './trees';
import { buildSuffixArray } from './suffix';
import {
  fenwickBuild,
  fenwickQuerySteps,
  fenwickUpdate,
  segmentBuild,
  segmentQuerySteps,
  segmentRangeSum,
  segmentUpdate,
  treeSizeFor,
} from './ranges';

const VALUES = [3, 2, 5, 1, 6, 4, 7];

// ------------------------------------------------------------- trie

export const TrieSimulator: FC = () => {
  const [words, setWords] = useState<string[]>(['car', 'cat', 'dog']);
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string>('');

  const root = useMemo(
    () =>
      words.reduce(insertWord, { children: {}, terminal: false } as TrieNode),
    [words]
  );

  const add = useCallback(() => {
    const w = text.trim().toLowerCase();
    if (w) setWords((ws) => [...new Set([...ws, w])]);
    setText('');
  }, [text]);

  const lookup = useCallback(() => {
    const w = query.trim().toLowerCase();
    if (!w) return;
    const found = searchWord(root, w);
    const isPrefix =
      !found && w.split('').every((c, i) => true) && w.length > 0;
    setResult(
      found
        ? `${w} is in the set.`
        : isPrefix && renderTrie(root).some((l) => l.includes(w[0]))
          ? `${w} matches a path but is not a complete word.`
          : `${w} is not in the set.`
    );
  }, [query, root]);

  return (
    <div className="flex w-full flex-col gap-4">
      <Panel
        title="Words"
        hint="A trie shares prefixes, so shared letters cost one node between all words.">
        <NumberInput
          label="Add a word"
          value={text}
          placeholder="e.g. cart"
          onChange={setText}
        />
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary btn-sm" onClick={add}>
            Insert
          </button>
          <button className="btn btn-sm" onClick={() => setWords([])}>
            Clear
          </button>
        </div>
      </Panel>
      <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
        <Pre
          lines={renderTrie(root, 4)}
          title="Trie (* marks a complete word)"
        />
        <StatRow>
          <Stat label="Words" value={String(words.length)} />
          <Stat label="Nodes" value={String(renderTrie(root, 99).length)} />
        </StatRow>
      </div>
      <Panel
        title="Lookup"
        hint="Searching is a walk down the tree — one edge per character, no comparisons.">
        <NumberInput
          label="Query"
          value={query}
          placeholder="e.g. ca"
          onChange={setQuery}
        />
        <button className="btn btn-sm" onClick={lookup}>
          Search
        </button>
        <p
          className="text-base-content/70 min-h-8 text-sm"
          data-testid="step-note">
          {result}
        </p>
      </Panel>
    </div>
  );
};

// ---------------------------------------------------------- hash table

const BUCKETS = 11;

export const HashTableSimulator: FC = () => {
  const [keys, setKeys] = useState<number[]>([]);
  const [text, setText] = useState('');
  const [probe, setProbe] = useState<number[]>([]);

  const bucketOf = useCallback((k: number) => k % BUCKETS, []);

  const table = useMemo(() => {
    const b: number[][] = Array.from({ length: BUCKETS }, () => []);
    for (const k of keys) b[bucketOf(k)].push(k);
    return b;
  }, [keys, bucketOf]);

  const add = useCallback(() => {
    const k = Number.parseInt(text, 10);
    if (Number.isNaN(k) || keys.includes(k)) return;
    setKeys((ks) => [...ks, k]);
    setProbe([bucketOf(k)]);
    setText('');
  }, [text, keys, bucketOf]);

  const lookup = useCallback(() => {
    const k = Number.parseInt(text, 10);
    if (Number.isNaN(k)) return;
    const b = bucketOf(k);
    const chain = table[b];
    const walk = chain.map((_, i) => b + i * 0);
    setProbe(walk.length ? [b] : []);
    setResult(
      chain.includes(k)
        ? `${k} hashes to bucket ${b} and is found after ${chain.indexOf(k) + 1} probe(s).`
        : chain.length
          ? `Bucket ${b} is occupied by ${chain.join(', ')}; the chain is searched and ${k} is absent.`
          : `Bucket ${b} is empty, so ${k} is absent in one probe.`
    );
  }, [text, bucketOf, table]);

  const [result, setResult] = useState('');

  return (
    <div className="flex w-full flex-col gap-4">
      <Panel
        title="Operations"
        hint="The hash decides the bucket; collisions are resolved by chaining, so lookups stay O(1) on average.">
        <NumberInput
          label="Key"
          value={text}
          placeholder="e.g. 17"
          onChange={setText}
        />
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary btn-sm" onClick={add}>
            Insert
          </button>
          <button className="btn btn-sm" onClick={lookup}>
            Lookup
          </button>
          <button
            className="btn btn-sm"
            onClick={() => {
              setKeys([]);
              setResult('');
            }}>
            Clear
          </button>
        </div>
      </Panel>
      <div className="card border-base-content/10 flex flex-col gap-2 border p-4">
        {table.map((chain, b) => (
          <div key={b} className="flex items-center gap-2">
            <span className="text-base-content/50 w-16 font-mono text-xs">
              h(k) = {b}
            </span>
            <SlotGrid
              items={chain.length ? chain : [null]}
              highlight={probe.includes(b) ? [0] : []}
            />
          </div>
        ))}
        <p
          className="text-base-content/70 min-h-8 text-sm"
          data-testid="step-note">
          {result || 'Insert a key to fill the table.'}
        </p>
      </div>
      <StatRow>
        <Stat label="Keys" value={String(keys.length)} testId="keys" />
        <Stat label="Buckets" value={String(BUCKETS)} />
        <Stat
          label="Load factor"
          value={(keys.length / BUCKETS).toFixed(2)}
          tone={keys.length / BUCKETS > 0.75 ? 'warn' : 'default'}
        />
        <Stat
          label="Collisions"
          value={String(table.filter((c) => c.length > 1).length)}
        />
      </StatRow>
    </div>
  );
};

// ------------------------------------------------------------- suffix

export const SuffixArraySimulator: FC = () => {
  const [text, setText] = useState('banana');
  const steps = useMemo(() => buildSuffixArray(text), [text]);
  const last = steps.at(-1);

  const randomise = useCallback(() => {
    const alphabet = 'abc';
    const length = 4 + Math.floor(Math.random() * 5);
    let next = '';
    for (let i = 0; i < length; i += 1)
      next += alphabet[Math.floor(Math.random() * alphabet.length)];
    setText(next);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <Panel
        title="Input string"
        hint="Each suffix is sorted by doubling the compared prefix length: 1, 2, 4, 8, …">
        <NumberInput
          label="String"
          value={text}
          placeholder="banana"
          onChange={setText}
        />
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary btn-sm" onClick={randomise}>
            Randomise
          </button>
          <button className="btn btn-sm" onClick={() => setText('banana')}>
            Reset
          </button>
        </div>
      </Panel>
      <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
        <Pre
          lines={(last?.order ?? []).map(
            (i, rank) => `${String(rank).padStart(2)}  ${text.slice(i)}`
          )}
          title={`Suffix array${text ? ` for "${text}"` : ''}`}
        />
        <p
          className="text-base-content/70 min-h-8 text-sm"
          data-testid="step-note">
          {last?.note ?? 'Enter a string to build its suffix array.'}
        </p>
      </div>
      <StatRow>
        <Stat label="Length" value={String(text.length)} testId="length" />
        <Stat label="Rounds" value={String(steps.length)} />
        <Stat label="Sorted" value={text ? 'Yes' : '—'} tone="good" />
        <Stat label="Space" value={`${text.length * 2} cells`} />
      </StatRow>
    </div>
  );
};

// ---------------------------------------------------------- range trees

export const FenwickTreeSimulator: FC = () => {
  const [values, setValues] = useState(VALUES);
  const [index, setIndex] = useState(4);
  const [end, setEnd] = useState(6);
  const [delta, setDelta] = useState(2);

  const tree = useMemo(() => fenwickBuild(values), [values]);
  const steps = useMemo(() => fenwickQuerySteps(tree, end), [tree, end]);
  const step = steps.at(-1);

  return (
    <div className="flex w-full flex-col gap-4">
      <Panel
        title="Values"
        hint="Each node stores the sum of a lowbit-sized block ending at that index.">
        <SlotGrid items={values} highlight={step?.used ?? []} />
        <div className="grid grid-cols-2 gap-2">
          <NumberInput
            label="Point index"
            value={String(index)}
            onChange={(v) => setIndex(Number(v) || 0)}
          />
          <NumberInput
            label="Delta"
            value={String(delta)}
            onChange={(v) => setDelta(Number(v) || 0)}
          />
          <NumberInput
            label="Prefix end"
            value={String(end)}
            onChange={(v) => setEnd(Number(v) || 0)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              setValues((v) => v.map((x, i) => (i === index ? x + delta : x)))
            }>
            Point update
          </button>
          <button className="btn btn-sm" onClick={() => setValues(VALUES)}>
            Reset
          </button>
        </div>
      </Panel>
      <div className="card border-base-content/10 flex flex-col gap-2 border p-4">
        <SlotGrid items={tree} highlight={step?.used ?? []} />
        <p
          className="text-base-content/70 min-h-8 text-sm"
          data-testid="step-note">
          {step
            ? `${step.note} Running total ${step.runningTotal}.`
            : 'Choose a prefix end.'}
        </p>
      </div>
      <StatRow>
        <Stat label="Prefix sum" value={String(step?.runningTotal ?? 0)} />
        <Stat label="Blocks read" value={String(steps.length)} />
        <Stat label="Update" value="O(log n)" />
        <Stat label="Query" value="O(log n)" />
      </StatRow>
    </div>
  );
};

export const SegmentTreeSimulator: FC = () => {
  const [values, setValues] = useState(VALUES);
  const [lo, setLo] = useState(1);
  const [hi, setHi] = useState(5);
  const size = treeSizeFor(values.length);
  const tree = useMemo(() => segmentBuild(values, size), [values, size]);
  const steps = useMemo(
    () => segmentQuerySteps(tree, size, lo, hi),
    [tree, size, lo, hi]
  );
  const step = steps.at(-1);

  return (
    <div className="flex w-full flex-col gap-4">
      <Panel
        title="Values"
        hint="Each node stores the sum of a disjoint segment; a range query combines O(log n) of them.">
        <SlotGrid items={values} />
        <div className="grid grid-cols-2 gap-2">
          <NumberInput
            label="Range lo"
            value={String(lo)}
            onChange={(v) => setLo(Number(v) || 0)}
          />
          <NumberInput
            label="Range hi"
            value={String(hi)}
            onChange={(v) => setHi(Number(v) || 0)}
          />
        </div>
        <button className="btn btn-sm" onClick={() => setValues(VALUES)}>
          Reset
        </button>
      </Panel>
      <div className="card border-base-content/10 flex flex-col gap-2 border p-4">
        <SlotGrid
          items={tree.slice(1, 15)}
          highlight={(step?.used ?? []).map((n) => n - 1)}
        />
        <p
          className="text-base-content/70 min-h-8 text-sm"
          data-testid="step-note">
          {step
            ? `${step.note} Running total ${step.runningTotal}.`
            : 'Choose a range.'}
        </p>
      </div>
      <StatRow>
        <Stat
          label="Range sum"
          value={String(segmentRangeSum(tree, size, lo, hi))}
        />
        <Stat label="Nodes read" value={String(steps.length)} />
        <Stat label="Tree size" value={String(2 * size)} />
        <Stat label="Update" value="O(log n)" />
      </StatRow>
    </div>
  );
};

// -------------------------------------------------------- disjoint set

export const DisjointSetSimulator: FC = () => {
  const [size, setSize] = useState(8);
  const [ds, setDs] = useState(() => new DisjointSet(8));
  const [note, setNote] = useState(
    'Eight elements, each in its own component.'
  );

  const reset = useCallback((n: number) => {
    setSize(n);
    setDs(new DisjointSet(n));
    setNote(`${n} elements, each in its own component.`);
  }, []);

  const union = useCallback(
    (a: number, b: number) => {
      const next = ds.clone();
      const [ra, rb] = next.union(a, b);
      setDs(next);
      setNote(
        ra === rb
          ? `${a} and ${b} were already in the same component.`
          : `Merged the component of ${b} into the component of ${ra}.`
      );
    },
    [ds]
  );

  const groups = ds.groups.map((_, i) => ds.find(i));
  const rows: string[] = [];
  for (let r = 0; r < size; r++) {
    const members = groups
      .map((g, i) => (g === r ? i : -1))
      .filter((i) => i >= 0);
    if (members.length) rows.push(`root ${r}: { ${members.join(', ')} }`);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Panel
        title="Union"
        hint="Union by rank with path compression makes membership tests effectively constant time.">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: size }, (_, i) => (
            <button
              key={i}
              className="btn btn-xs"
              onClick={() => union(i, (i + 1) % size)}>
              union({i}, {(i + 1) % size})
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {[4, 6, 8, 10].map((n) => (
            <button key={n} className="btn btn-sm" onClick={() => reset(n)}>
              Reset to {n}
            </button>
          ))}
        </div>
      </Panel>
      <div className="card border-base-content/10 flex flex-col gap-2 border p-4">
        <SlotGrid items={groups} />
        <Pre lines={rows} title="Components" />
        <p
          className="text-base-content/70 min-h-8 text-sm"
          data-testid="step-note">
          {note}
        </p>
      </div>
      <StatRow>
        <Stat label="Elements" value={String(size)} testId="elements" />
        <Stat
          label="Components"
          value={String(ds.componentCount)}
          testId="components"
        />
        <Stat label="Unions so far" value={String(size - ds.componentCount)} />
        <Stat label="Find" value="O(α(n))" />
      </StatRow>
    </div>
  );
};
