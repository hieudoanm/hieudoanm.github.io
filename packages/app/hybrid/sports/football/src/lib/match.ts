import {
  HALF_MINUTES,
  HALF_TIME_BREAK_SECONDS,
  fullMatchSeconds,
  matchPhase,
} from '@/lib/clock';
import { uid } from '@/lib/squad';

export const MAX_SUBSTITUTIONS = 5;

export type MatchEventType =
  | 'goal'
  | 'concede'
  | 'yellow-card'
  | 'red-card'
  | 'substitution'
  | 'half-time-whistle'
  | 'full-time-whistle';

export interface MatchEvent {
  id: string;
  minute: number;
  added: number;
  type: MatchEventType;
  playerName?: string;
}

export interface MatchState {
  running: boolean;
  elapsed: number;
  goalsFor: number;
  goalsAgainst: number;
  substitutions: number;
  addedTime: number;
  events: MatchEvent[];
}

export const defaultMatch = (): MatchState => ({
  running: false,
  elapsed: 0,
  goalsFor: 0,
  goalsAgainst: 0,
  substitutions: 0,
  addedTime: 0,
  events: [],
});

const makeEvent = (
  type: MatchEventType,
  minute: number,
  added = 0,
  playerName?: string
): MatchEvent => ({ id: uid(), type, minute, added, playerName });

const hasEvent = (match: MatchState, type: MatchEventType): boolean =>
  match.events.some((event) => event.type === type);

export const matchMinute = (
  match: MatchState
): { minute: number; added: number } => {
  const halfSeconds = HALF_MINUTES * 60;
  const phase = matchPhase(match.elapsed);
  if (phase === 'first-half') {
    const minute = Math.min(HALF_MINUTES, Math.floor(match.elapsed / 60));
    return { minute, added: minute >= HALF_MINUTES ? match.addedTime : 0 };
  }
  if (phase === 'second-half') {
    const secondHalfElapsed =
      match.elapsed - (halfSeconds + HALF_TIME_BREAK_SECONDS);
    const minute = Math.min(
      HALF_MINUTES * 2,
      HALF_MINUTES + Math.floor(secondHalfElapsed / 60)
    );
    return { minute, added: minute >= HALF_MINUTES * 2 ? match.addedTime : 0 };
  }
  if (phase === 'half-time') {
    return { minute: HALF_MINUTES, added: match.addedTime };
  }
  return { minute: HALF_MINUTES * 2, added: match.addedTime };
};

export const formatEventMinute = (minute: number, added: number): string =>
  `${minute}${added > 0 ? `+${added}` : ''}'`;

export const tick = (match: MatchState): MatchState => {
  if (!match.running) return match;
  const elapsed = match.elapsed + 1;
  const phase = matchPhase(elapsed);
  if (phase === 'half-time' && !hasEvent(match, 'half-time-whistle')) {
    return whistle({ ...match, elapsed }, 'half-time');
  }
  if (phase === 'full-time' && !hasEvent(match, 'full-time-whistle')) {
    return whistle({ ...match, elapsed }, 'full-time');
  }
  if (elapsed >= fullMatchSeconds())
    return { ...match, elapsed, running: false };
  return { ...match, elapsed };
};

export const whistle = (
  match: MatchState,
  phase: 'half-time' | 'full-time'
): MatchState => {
  const minute = phase === 'half-time' ? HALF_MINUTES : HALF_MINUTES * 2;
  const type: MatchEventType =
    phase === 'half-time' ? 'half-time-whistle' : 'full-time-whistle';
  return {
    ...match,
    running: false,
    events: [...match.events, makeEvent(type, minute)],
  };
};

export const addGoal = (match: MatchState): MatchState => {
  const { minute, added } = matchMinute(match);
  return {
    ...match,
    goalsFor: match.goalsFor + 1,
    events: [...match.events, makeEvent('goal', minute, added)],
  };
};

export const addConcede = (match: MatchState): MatchState => {
  const { minute, added } = matchMinute(match);
  return {
    ...match,
    goalsAgainst: match.goalsAgainst + 1,
    events: [...match.events, makeEvent('concede', minute, added)],
  };
};

export const undoGoal = (match: MatchState): MatchState => ({
  ...match,
  goalsFor: Math.max(0, match.goalsFor - 1),
});

export const undoConcede = (match: MatchState): MatchState => ({
  ...match,
  goalsAgainst: Math.max(0, match.goalsAgainst - 1),
});

export const addCard = (
  match: MatchState,
  kind: 'yellow' | 'red'
): MatchState => {
  const { minute, added } = matchMinute(match);
  const type: MatchEventType = kind === 'yellow' ? 'yellow-card' : 'red-card';
  return {
    ...match,
    events: [...match.events, makeEvent(type, minute, added)],
  };
};

export const recordSubstitution = (
  match: MatchState,
  playerName?: string
): MatchState => {
  const { minute, added } = matchMinute(match);
  const substitutions = Math.min(MAX_SUBSTITUTIONS, match.substitutions + 1);
  return {
    ...match,
    substitutions,
    events: [
      ...match.events,
      makeEvent('substitution', minute, added, playerName),
    ],
  };
};

export const substitutionsRemaining = (match: MatchState): number =>
  Math.max(0, MAX_SUBSTITUTIONS - match.substitutions);

export const setAddedTime = (
  match: MatchState,
  minutes: number
): MatchState => ({
  ...match,
  addedTime: Math.max(0, Math.min(9, Math.floor(minutes))),
});

const STORAGE_KEY = 'football:match:v1';

export const saveMatch = (match: MatchState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(match));
  } catch {
    // storage unavailable — ignore
  }
};

export const loadMatch = (): MatchState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isMatch(parsed)) return null;
    return { ...defaultMatch(), ...parsed };
  } catch {
    return null;
  }
};

export const isMatch = (value: unknown): value is MatchState => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<MatchState>;
  return (
    typeof candidate.running === 'boolean' &&
    typeof candidate.elapsed === 'number' &&
    typeof candidate.goalsFor === 'number' &&
    typeof candidate.goalsAgainst === 'number' &&
    typeof candidate.substitutions === 'number' &&
    Array.isArray(candidate.events)
  );
};
