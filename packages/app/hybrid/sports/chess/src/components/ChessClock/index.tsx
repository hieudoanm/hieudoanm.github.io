import { FC, useEffect, useRef, useState, useCallback } from 'react';

import { ChessClockSide, ClockState, DelayType, Preset, Stage } from './types';
import {
  LOW_TIME_THRESHOLD,
  ONE_MINUTE,
  ONE_SECOND,
  PRESETS,
  TICK,
} from './constants';
import {
  applyMovesToGo,
  delayFor,
  fmt,
  formatElapsed,
  initClock,
  toTime,
} from './utils/clock';
import { playFlagFall, playLowTime, playTick } from './utils/sound';
import { GearIcon, RotateIcon, UndoIcon, ExpandIcon } from './components/icons';

const toMs = (min: number, sec: number): number =>
  min * 60 * ONE_SECOND + sec * ONE_SECOND;

const SideRow: FC<{
  label: string;
  side: ChessClockSide;
  state: ClockState;
  big?: boolean;
  onPress: (s: ChessClockSide) => void;
}> = ({ label, side, state, big, onPress }) => {
  const live = state.turn === side;
  const ms = live ? toTime(state[side], Date.now()) : state[side];
  return (
    <button
      onClick={() => onPress(side)}
      className={`relative flex flex-col items-center justify-center rounded-2xl transition-all duration-150 ${
        big ? 'min-h-[38vh] p-4' : 'p-8'
      } ${live ? 'bg-base-300 ring-primary z-10 scale-105 shadow-xl ring-2' : 'bg-base-200 hover:bg-base-300'}`}>
      <span
        className={`tracking-tight tabular-nums ${big ? 'text-7xl sm:text-8xl' : 'text-4xl'} font-normal`}>
        {fmt(ms)}
      </span>
      {!big && (
        <span className="mt-2 text-xs opacity-40">
          {label} · {state.p1Moves + state.p2Moves} moves
        </span>
      )}
      {live && (
        <span className="bg-primary mt-2 h-2 w-2 animate-pulse rounded-full" />
      )}
    </button>
  );
};

const MoveChart: FC<{ state: ClockState }> = ({ state }) => {
  const rows = state.movesLog.slice(-20);
  const max = Math.max(...rows.map((r) => r.ms), 1);
  return (
    <div className="mt-3">
      <p className="mb-1 text-xs font-semibold opacity-70">Move times</p>
      <div className="space-y-0.5">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2 text-[10px]">
            <span className="w-8 opacity-60">
              {row.side === 'player1' ? 'W' : 'B'}
            </span>
            <div className="bg-base-100 h-2 flex-1 rounded">
              <div
                className={`h-2 rounded ${row.side === 'player1' ? 'bg-neutral' : 'bg-primary'}`}
                style={{ width: `${Math.round((row.ms / max) * 100)}%` }}
              />
            </div>
            <span className="w-10 text-right tabular-nums opacity-70">
              {fmt(row.ms)}
            </span>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="text-[10px] opacity-40">No moves yet.</p>
        )}
      </div>
    </div>
  );
};

const Field: FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}> = ({ label, value, min, max, step = 1, onChange }) => (
  <label className="flex flex-col gap-0.5 text-xs">
    <span className="opacity-60">{label}</span>
    <input
      type="number"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="input input-bordered input-xs w-16"
    />
  </label>
);

export const ChessClock: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [preset, setPreset] = useState<Preset>(PRESETS[0]);
  const [editing, setEditing] = useState(false);
  const [startSide, setStartSide] = useState<ChessClockSide>('player1');
  const [state, setState] = useState<ClockState>(() =>
    initClock(preset, startSide)
  );
  const [soundOn, setSoundOn] = useState(true);
  const [tickOn, setTickOn] = useState(false);
  const [bigMode, setBigMode] = useState(false);
  const [editP1Min, setEditP1Min] = useState(10);
  const [editP1Sec, setEditP1Sec] = useState(0);
  const [editP2Min, setEditP2Min] = useState(10);
  const [editP2Sec, setEditP2Sec] = useState(0);
  const [editDelayType, setEditDelayType] = useState<DelayType>('none');
  const [editDelaySec, setEditDelaySec] = useState(0);
  const [editInc, setEditInc] = useState(0);
  const [editMovesToGo, setEditMovesToGo] = useState(0);
  const [editExtraMin, setEditExtraMin] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lowWarnedRef = useRef(false);

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

  useEffect(() => {
    if (!soundOn || !state.winner) return;
    playFlagFall();
  }, [soundOn, state.winner]);

  useEffect(() => {
    if (!soundOn || state.stage !== 'running' || !state.turn) return;
    const live = state[state.turn];
    const remaining = toTime(live, Date.now());
    if (remaining > 0 && remaining <= LOW_TIME_THRESHOLD) {
      if (!lowWarnedRef.current) {
        lowWarnedRef.current = true;
        playLowTime();
      }
    } else if (remaining > LOW_TIME_THRESHOLD) {
      lowWarnedRef.current = false;
    }
  }, [soundOn, state]);

  useEffect(() => {
    if (!soundOn || !tickOn || state.stage !== 'running' || !state.turn) return;
    const remaining = toTime(state[state.turn], Date.now());
    if (remaining > 0 && remaining % ONE_SECOND < TICK) playTick();
  }, [soundOn, tickOn, state]);

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
    const used = state[prevSide] - remaining;
    const restored =
      state.delayType === 'bronstein'
        ? Math.min(state.delaySeconds * ONE_SECOND, used)
        : 0;
    setState((prev) => {
      const inc =
        prev.delayType === 'fischer' ? prev.increment * ONE_SECOND : 0;
      const moveCountKey = side === 'player1' ? 'p1Moves' : 'p2Moves';
      const nextRemaining = prev[side] + inc;
      const d = delayFor(side, prev);
      const afterSwitch = {
        ...prev,
        turn: side,
        [prevSide]: remaining + restored,
        [side]: nextRemaining + d,
        [moveCountKey]: prev[moveCountKey] + 1,
        hist: [...prev.hist, `${prevSide} → ${side}`],
        movesLog: [...prev.movesLog, { side: prevSide, ms: used, at: now }],
      };
      return applyMovesToGo(afterSwitch);
    });
  };

  const reset = () => {
    stopTimer();
    setState(initClock(preset, startSide));
    startTimeRef.current = null;
    lowWarnedRef.current = false;
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
      movesLog: [],
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
      label: `Custom ${editP1Min}m${editP1Sec}s+${editInc}s`,
      p1: toMs(editP1Min, editP1Sec),
      p2: toMs(editP2Min, editP2Sec),
      delayType: editDelayType,
      delaySeconds: editDelaySec,
      increment: editInc,
      movesToGo: editMovesToGo,
      extraTime: editExtraMin * ONE_MINUTE,
    };
    setPreset(p);
    stopTimer();
    setState(initClock(p, startSide));
    setEditing(false);
  };

  const toggleFullscreen = () => {
    if (bigMode) {
      setBigMode(false);
      if (document.exitFullscreen) document.exitFullscreen();
    } else {
      setBigMode(true);
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => undefined);
      }
    }
  };

  const activeLive = state.stage === 'running' || state.stage === 'preview';

  return (
    <>
      {!bigMode && (
        <>
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
            <button
              onClick={toggleFullscreen}
              className={`btn btn-xs ${bigMode ? 'btn-primary' : 'btn-ghost'}`}>
              <ExpandIcon /> Fullscreen
            </button>
          </div>

          {editing && (
            <div className="border-base-300 bg-base-200 mb-3 rounded border p-3">
              <div className="flex flex-wrap items-end gap-3">
                <Field
                  label="P1 min"
                  value={editP1Min}
                  min={0}
                  max={300}
                  onChange={setEditP1Min}
                />
                <Field
                  label="P1 sec"
                  value={editP1Sec}
                  min={0}
                  max={59}
                  onChange={setEditP1Sec}
                />
                <Field
                  label="P2 min"
                  value={editP2Min}
                  min={0}
                  max={300}
                  onChange={setEditP2Min}
                />
                <Field
                  label="P2 sec"
                  value={editP2Sec}
                  min={0}
                  max={59}
                  onChange={setEditP2Sec}
                />
                <label className="flex flex-col gap-0.5 text-xs">
                  <span className="opacity-60">Delay</span>
                  <select
                    value={editDelayType}
                    onChange={(e) =>
                      setEditDelayType(e.target.value as DelayType)
                    }
                    className="select select-bordered select-xs w-28">
                    <option value="none">None</option>
                    <option value="delay">Fixed</option>
                    <option value="fischer">Fischer</option>
                    <option value="bronstein">Bronstein</option>
                  </select>
                </label>
                <Field
                  label="Delay sec"
                  value={editDelaySec}
                  min={0}
                  max={60}
                  onChange={setEditDelaySec}
                />
                <Field
                  label="Increment"
                  value={editInc}
                  min={0}
                  max={60}
                  onChange={setEditInc}
                />
                <Field
                  label="Moves to go"
                  value={editMovesToGo}
                  min={0}
                  max={120}
                  onChange={setEditMovesToGo}
                />
                <Field
                  label="Extra min"
                  value={editExtraMin}
                  min={0}
                  max={120}
                  onChange={setEditExtraMin}
                />
                <button
                  onClick={applyCustom}
                  className="btn btn-xs btn-primary">
                  Set
                </button>
              </div>
            </div>
          )}

          {activeLive && (
            <div className="mb-3 grid grid-cols-2 gap-3">
              <SideRow
                label="White"
                side="player1"
                state={state}
                onPress={press}
              />
              <SideRow
                label="Black"
                side="player2"
                state={state}
                onPress={press}
              />
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
            <button
              onClick={() => setSoundOn(!soundOn)}
              className={`btn btn-ghost btn-xs ${soundOn ? 'btn-primary' : ''}`}>
              Sound {soundOn ? 'on' : 'off'}
            </button>
            <button
              onClick={() => setTickOn(!tickOn)}
              className={`btn btn-ghost btn-xs ${tickOn ? 'btn-primary' : ''}`}>
              Tick {tickOn ? 'on' : 'off'}
            </button>
          </div>
          {state.stage === 'running' && (
            <p className="text-center text-[10px] opacity-30">
              Elapsed {formatElapsed(state.startTime)} · {preset.label}
              {preset.movesToGo > 0 &&
                ` · ${state.p1Moves + state.p2Moves}/${preset.movesToGo} moves to flag`}
            </p>
          )}
          {activeLive && <MoveChart state={state} />}
        </>
      )}

      {bigMode && (
        <div className="bg-base-100 fixed inset-0 z-50 flex flex-col">
          <div className="grid flex-1 grid-cols-1 gap-2 p-2 sm:grid-cols-2">
            <SideRow
              label="White"
              side="player1"
              state={state}
              big
              onPress={press}
            />
            <SideRow
              label="Black"
              side="player2"
              state={state}
              big
              onPress={press}
            />
          </div>
          <div className="flex justify-center gap-2 p-2">
            <button onClick={toggleFullscreen} className="btn btn-sm">
              Exit fullscreen
            </button>
            <button onClick={reset} className="btn btn-ghost btn-sm">
              <RotateIcon /> Reset
            </button>
            {state.winner && (
              <span className="btn btn-success btn-sm">
                {state.winner === 'player1' ? 'White' : 'Black'} wins
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};
ChessClock.displayName = 'ChessClock';
