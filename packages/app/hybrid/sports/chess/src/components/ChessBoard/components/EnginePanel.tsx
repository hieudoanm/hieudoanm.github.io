import type { FC } from 'react';
import { MAX_DEPTH, MIN_DEPTH, ODDS_OPTIONS, SIDE_OPTIONS } from '../constants';
import type { BoardMode, Odds, Side } from '../types';
import type { AnalysisLine } from '../hooks/useAnalysisLines';
import type { EvalPoint } from '../hooks/useEvalHistory';
import { EvalChart } from './EvalChart';

interface EnginePanelProps {
  boardMode: BoardMode;
  whiteEval: number | null;
  evalPercent: number;
  statusLabel: string | null;
  depth: number;
  side: Side;
  odds: Odds;
  lines: AnalysisLine[] | null;
  linesBusy: boolean;
  graphPoints: EvalPoint[] | null;
  graphBusy: boolean;
  onModeSwitch: (mode: BoardMode) => void;
  onDepthChange: (depth: number) => void;
  onSideChange: (side: Side) => void;
  onOddsChange: (odds: Odds) => void;
  onAnalyzeLines: () => void;
  onComputeGraph: () => void;
}

const evalText = (whiteEval: number | null): string => {
  if (whiteEval === null) return '—';
  return `${whiteEval > 0 ? '+' : ''}${(whiteEval / 100).toFixed(2)}`;
};

const lineScore = (line: AnalysisLine): string => {
  if (line.mate !== null) return `M${line.mate > 0 ? '+' : ''}${line.mate}`;
  return `${line.scoreCp > 0 ? '+' : ''}${(line.scoreCp / 100).toFixed(1)}`;
};

export const EnginePanel: FC<EnginePanelProps> = ({
  boardMode,
  whiteEval,
  evalPercent,
  statusLabel,
  depth,
  side,
  odds,
  lines,
  linesBusy,
  graphPoints,
  graphBusy,
  onModeSwitch,
  onDepthChange,
  onSideChange,
  onOddsChange,
  onAnalyzeLines,
  onComputeGraph,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-base-content/60 text-xs font-semibold tracking-widest uppercase">
          Stockfish 18
        </span>
        <span
          className={`badge badge-sm ${
            boardMode === 'play' ? 'badge-success' : 'badge-ghost'
          }`}>
          {boardMode === 'play' ? 'Active' : 'Off'}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-base-content/60 font-semibold uppercase">
            Strength
          </span>
          <span className="font-mono">Depth {depth}</span>
        </div>
        <input
          type="range"
          min={MIN_DEPTH}
          max={MAX_DEPTH}
          value={depth}
          onChange={(e) => onDepthChange(Number(e.target.value))}
          className="range range-xs"
        />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <select
          className="select select-xs"
          title="Your side"
          value={side}
          onChange={(e) => onSideChange(e.target.value as Side)}>
          {SIDE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          className="select select-xs"
          title="Handicap"
          value={odds}
          onChange={(e) => onOddsChange(e.target.value as Odds)}>
          {ODDS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-base-100 flex flex-col items-center gap-1 rounded-xl p-4">
        <span className="text-base-content/40 text-xs">Evaluation</span>
        <span className="font-mono text-3xl font-black">
          {boardMode === 'play' && whiteEval !== null
            ? evalText(whiteEval)
            : '—'}
        </span>
        <div className="bg-base-300 mt-2 h-3 w-full overflow-hidden rounded-full">
          <div
            className="h-full rounded-full bg-white transition-all duration-300"
            style={{ width: `${evalPercent}%` }}
          />
        </div>
        <div className="text-base-content/40 mt-0.5 flex w-full justify-between text-[10px]">
          <span>Black</span>
          <span>White</span>
        </div>
      </div>
      <button
        className={`btn btn-sm w-full ${
          boardMode === 'play' ? 'btn-error' : 'btn-primary'
        }`}
        onClick={() => onModeSwitch(boardMode === 'play' ? 'explore' : 'play')}>
        🤖
        {boardMode === 'play' ? 'Stop Engine' : 'Start Engine'}
      </button>
      {statusLabel && (
        <div className="bg-base-100 rounded-lg p-3 text-center text-sm font-semibold">
          {statusLabel}
        </div>
      )}
      {boardMode === 'play' && (
        <button
          className="btn btn-outline btn-sm"
          onClick={() => onModeSwitch('play')}>
          🔄 Reset Game
        </button>
      )}
      <button
        className="btn btn-outline btn-sm"
        disabled={linesBusy}
        onClick={onAnalyzeLines}>
        {linesBusy ? 'Analyzing…' : '📊 Analyze Lines'}
      </button>
      {lines && (
        <div className="flex flex-col gap-1">
          {lines.map((line, i) => (
            <div
              key={line.san}
              className="bg-base-100 flex items-center justify-between rounded-lg px-3 py-1.5 font-mono text-xs">
              <span className={i === 0 ? 'font-bold' : 'text-base-content/70'}>
                {i + 1}. {line.san}
              </span>
              <span>{lineScore(line)}</span>
            </div>
          ))}
        </div>
      )}
      <button
        className="btn btn-outline btn-sm"
        disabled={graphBusy}
        onClick={onComputeGraph}>
        {graphBusy ? 'Computing…' : '📈 Evaluation Graph'}
      </button>
      {graphPoints && graphPoints.length > 1 && (
        <EvalChart points={graphPoints} />
      )}
    </div>
  );
};
EnginePanel.displayName = 'EnginePanel';
