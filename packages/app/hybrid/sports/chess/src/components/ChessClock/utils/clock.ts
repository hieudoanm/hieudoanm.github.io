import { ClockState, Preset, ChessClockSide } from '../types';
import { ONE_SECOND } from '../constants';

export const toTime = (ms: number, start: number): number =>
  Math.max(0, ms - (Date.now() - start));
export const fmt = (ms: number): string => {
  const s = Math.ceil(ms / ONE_SECOND);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

export const initClock = (
  p: Preset,
  startSide: ChessClockSide
): ClockState => ({
  player1: p.p1,
  player2: p.p2,
  turn: startSide,
  stage: 'preview',
  delayType: p.delayType,
  delaySeconds: p.delaySeconds,
  increment: p.increment,
  movesToGo: p.movesToGo,
  extraTime: p.extraTime,
  phase2: false,
  ticker: null,
  p1Moves: 0,
  p2Moves: 0,
  p1Delay: 0,
  p2Delay: 0,
  hist: [],
  movesLog: [],
  startTime: null,
  endTime: null,
  winner: null,
});

export const delayFor = (side: ChessClockSide, state: ClockState): number => {
  if (state.delayType === 'none') return 0;
  const delay = state.delaySeconds * ONE_SECOND;
  if (state.delayType === 'delay') return delay;
  if (state.delayType === 'bronstein') return Math.min(delay, state[side]);
  return 0;
};

export const applyMovesToGo = (state: ClockState): ClockState => {
  if (state.movesToGo <= 0 || state.phase2) return state;
  if (state.p1Moves + state.p2Moves < state.movesToGo) return state;
  const extra = state.extraTime;
  return {
    ...state,
    player1: state.player1 + extra,
    player2: state.player2 + extra,
    phase2: true,
    hist: [...state.hist, `Flag: +${fmt(extra)}`],
  };
};

export const formatElapsed = (start: number | null): string =>
  start ? fmt(Date.now() - start) : '0:00';
