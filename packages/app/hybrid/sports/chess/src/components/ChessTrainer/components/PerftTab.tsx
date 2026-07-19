import { FC, useState } from 'react';
import type { PerftResult } from '../utils/perft';
import { DEFAULT_PERFT_FENS, runDivide, runPerft } from '../utils/perft';

export const PerftTab: FC = () => {
  const [fen, setFen] = useState(DEFAULT_PERFT_FENS[0]!);
  const [depth, setDepth] = useState(3);
  const [result, setResult] = useState<PerftResult | null>(null);
  const [divide, setDivide] = useState<Record<string, number> | null>(null);

  const run = () => {
    const res = runPerft(fen, depth);
    setResult(res);
    setDivide(runDivide(fen, depth));
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="card bg-base-200 p-4">
        <h3 className="font-semibold">Perft</h3>
        <label className="mt-3 block text-xs opacity-70">
          FEN
          <select
            value={fen}
            onChange={(e) => setFen(e.target.value)}
            className="select select-bordered mt-1 w-full font-mono text-xs">
            {DEFAULT_PERFT_FENS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-3 flex items-center gap-2 text-xs opacity-70">
          Depth
          <input
            type="range"
            min={1}
            max={4}
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className="range range-xs w-40"
          />
          {depth}
        </label>
        <button onClick={run} className="btn btn-primary btn-sm mt-4">
          Run perft
        </button>

        {result && (
          <div className="bg-base-100 mt-4 rounded p-3">
            <p className="text-sm">
              Nodes at depth {result.depth}:{' '}
              <span className="text-lg font-bold tabular-nums">
                {result.nodes.toLocaleString()}
              </span>
            </p>
          </div>
        )}
      </div>

      {divide && (
        <div className="card bg-base-200 max-h-[480px] overflow-y-auto p-4">
          <h4 className="text-sm font-semibold">Move breakdown</h4>
          <div className="mt-2 space-y-1">
            {Object.entries(divide).map(([move, count]) => (
              <div
                key={move}
                className="flex items-center justify-between rounded px-2 py-1 font-mono text-xs">
                <span>{move}</span>
                <span className="tabular-nums opacity-70">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
PerftTab.displayName = 'PerftTab';
