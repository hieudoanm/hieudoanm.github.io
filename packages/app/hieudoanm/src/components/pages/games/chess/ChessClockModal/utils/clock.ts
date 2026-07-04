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
  ticker: null,
  p1Moves: 0,
  p2Moves: 0,
  p1Delay: 0,
  p2Delay: 0,
  hist: [],
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

export const formatElapsed = (start: number | null): string =>
  start ? fmt(Date.now() - start) : '0:00';
