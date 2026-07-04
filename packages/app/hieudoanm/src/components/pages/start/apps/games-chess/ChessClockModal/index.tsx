import { FC, useEffect, useRef, useState, useCallback } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { ChessClockSide, ClockState, Preset, Stage } from './types';
import { PRESETS, ONE_SECOND, TICK, DEFAULT_PLAYER } from './constants';
import { initClock, fmt, toTime, delayFor, formatElapsed } from './utils/clock';
import {
  GearIcon,
  PlayIcon,
  PauseIcon,
  RotateIcon,
  UndoIcon,
} from './components/icons';

const SideRow: FC<{
  label: string;
  side: ChessClockSide;
  state: ClockState;
  onPress: (s: ChessClockSide) => void;
}> = ({ label, side, state, onPress }) => {
  const live = state.turn === side;
  const ms = live ? toTime(state[side], Date.now()) : state[side];
  return (
    <button
      onClick={() => onPress(side)}
      className={`relative flex flex-col items-center justify-center rounded-2xl p-8 transition-all duration-150 ${live ? 'bg-base-300 ring-primary z-10 scale-105 shadow-xl ring-2' : 'bg-base-200 hover:bg-base-300'}`}>
      <span className="mb-2 text-4xl font-normal tracking-tight tabular-nums">
        {fmt(ms)}
      </span>
      <span className="text-xs opacity-40">
        {label} · {state.p1Moves + state.p2Moves} moves
      </span>
      {live && (
        <span className="bg-primary mt-2 h-2 w-2 animate-pulse rounded-full" />
      )}
    </button>
  );
};

export const ChessClockModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [preset, setPreset] = useState<Preset>(PRESETS[0]);
  const [editing, setEditing] = useState(false);
  const [editMin, setEditMin] = useState(DEFAULT_PLAYER / ONE_SECOND / 60);
  const [editInc, setEditInc] = useState(0);
  const [startSide, setStartSide] = useState<ChessClockSide>('player1');
  const [state, setState] = useState<ClockState>(() =>
    initClock(preset, startSide)
  );
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const syncRef = (s: ClockState) => {
    timerRef.current = s.ticker;
  };

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (state.stage === 'running' && state.ticker === null) {
      const id = window.setInterval(() => {
        setState((prev) => {
          if (prev.stage !== 'running') return prev;
          const now = Date.now();
          const target = prev.turn!;
          const remaining = toTime(prev[target], now);
          if (remaining <= 0) {
            stopTimer();
            return {
              ...prev,
              [target]: 0,
              stage: 'setup',
              winner: target === 'player1' ? 'player2' : 'player1',
              endTime: now,
              ticker: null,
            };
          }
          return { ...prev, [target]: remaining };
        });
      }, TICK);
      setState((prev) => {
        const s = { ...prev, ticker: id };
        syncRef(s);
        return s;
      });
    }
  }, [state.stage, state.ticker, stopTimer]);

  const press = (side: ChessClockSide) => {
    if (state.stage === 'preview') {
      startTimeRef.current = Date.now();
      const n = {
        ...state,
        stage: 'running' as Stage,
        startTime: Date.now(),
        turn: side,
        p1Delay: delayFor('player1', state),
        p2Delay: delayFor('player2', state),
      };
      setState(n);
      return;
    }
    if (state.stage !== 'running' || state.turn === side) return;
    const now = Date.now();
    const prevSide = state.turn!;
    const remaining = toTime(state[prevSide], now);
    if (state.delayType === 'bronstein') {
      const used = Math.min(
        state.delaySeconds * ONE_SECOND,
        state[prevSide] - remaining
      );
      setState((prev) => ({ ...prev, [prevSide]: remaining + used }));
    } else {
      setState((prev) => ({ ...prev, [prevSide]: remaining }));
    }
    setState((prev) => {
      const inc =
        prev.delayType === 'fischer' ? prev.increment * ONE_SECOND : 0;
      const nowMs = Date.now();
      const nextRemaining = prev[side] + inc;
      const d = delayFor(side, prev);
      const moveCountKey = side === 'player1' ? 'p1Moves' : 'p2Moves';
      return {
        ...prev,
        turn: side,
        [side]: nextRemaining + d,
        [moveCountKey]: prev[moveCountKey] + 1,
        hist: [...prev.hist, `${prevSide} → ${side}`],
      };
    });
  };

  const reset = () => {
    stopTimer();
    setState(initClock(preset, startSide));
    startTimeRef.current = null;
  };

  const undo = () => {
    if (state.hist.length === 0) return;
    stopTimer();
    const hist = [...state.hist];
    hist.pop();
    setState((prev) => ({
      ...prev,
      stage: 'preview',
      turn: null,
      ticker: null,
      hist,
      p1Moves: 0,
      p2Moves: 0,
    }));
  };

  const applyPreset = (p: Preset) => {
    setPreset(p);
    stopTimer();
    setState(initClock(p, startSide));
    setEditing(false);
  };
  const applyCustom = () => {
    const p: Preset = {
      label: `Custom ${editMin}m+${editInc}s`,
      p1: editMin * 60 * ONE_SECOND,
      p2: editMin * 60 * ONE_SECOND,
      delayType: 'none',
      delaySeconds: 0,
      increment: editInc,
    };
    setPreset(p);
    stopTimer();
    setState(initClock(p, startSide));
    setEditing(false);
  };

  return (
    <FullScreen onClose={onClose} title="Chess Clock">
      <div className="mb-3 flex flex-wrap gap-1">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className={`btn btn-xs ${preset.label === p.label ? 'btn-primary' : 'btn-ghost'}`}>
            {p.label}
          </button>
        ))}
        <button
          onClick={() => setEditing(!editing)}
          className={`btn btn-xs ${editing ? 'btn-primary' : 'btn-ghost'}`}>
          <GearIcon />
        </button>
      </div>
      {editing && (
        <div className="mb-3 flex items-center gap-2 text-xs">
          <span>Minutes:</span>
          <input
            type="number"
            min={1}
            max={180}
            value={editMin}
            onChange={(e) => setEditMin(Number(e.target.value))}
            className="input input-bordered input-xs w-16"
          />
          <span>Increment:</span>
          <input
            type="number"
            min={0}
            max={60}
            value={editInc}
            onChange={(e) => setEditInc(Number(e.target.value))}
            className="input input-bordered input-xs w-16"
          />
          <button onClick={applyCustom} className="btn btn-xs btn-primary">
            Set
          </button>
        </div>
      )}
      {(state.stage === 'running' || state.stage === 'preview') && (
        <div className="mb-3 grid grid-cols-2 gap-3">
          <SideRow label="White" side="player1" state={state} onPress={press} />
          <SideRow label="Black" side="player2" state={state} onPress={press} />
        </div>
      )}
      {state.winner && (
        <div className="alert alert-success mb-3 text-center text-sm">
          {state.winner === 'player1' ? 'White' : 'Black'} wins!
        </div>
      )}
      {state.stage === 'setup' && !state.winner && (
        <div className="alert alert-info mb-3 text-center text-sm">
          Clock expired
        </div>
      )}
      <div className="mb-2 flex justify-center gap-2">
        <button onClick={reset} className="btn btn-ghost btn-xs">
          <RotateIcon /> Reset
        </button>
        <button
          onClick={undo}
          disabled={state.hist.length === 0}
          className="btn btn-ghost btn-xs">
          <UndoIcon /> Undo
        </button>
      </div>
      {state.stage === 'running' && (
        <p className="text-center text-[10px] opacity-30">
          Elapsed {formatElapsed(state.startTime)}
        </p>
      )}
    </FullScreen>
  );
};
ChessClockModal.displayName = 'ChessClockModal';
