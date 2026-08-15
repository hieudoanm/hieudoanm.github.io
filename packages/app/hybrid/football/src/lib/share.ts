import { defaultSquad, isSquad, uid, withFormation } from '@/lib/squad';
import { Player, Squad } from '@/types/football';

export const SHARE_VERSION = 1;
export const HISTORY_KEY = 'football:shared-history:v1';
export const MAX_HISTORY = 8;

export type ShareMode = 'squad' | 'lineup';

export interface SharedHistoryEntry {
  id: string;
  mode: ShareMode;
  name: string;
  url: string;
  at: number;
}

export interface LineupPayload {
  formationId: string;
  players: Player[];
  assignments: Record<string, string[]>;
  primaryColor: string;
  mirrored: boolean;
}

const QUERY_KEY = 'squad';

const encodeBase64 = (value: string): string =>
  btoa(encodeURIComponent(value))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

const decodeBase64 = (value: string): string =>
  decodeURIComponent(atob(value.replace(/-/g, '+').replace(/_/g, '/')));

const decodePayload = (encoded: string): unknown => {
  try {
    return JSON.parse(decodeBase64(encoded));
  } catch {
    return null;
  }
};

const isLineupPayload = (value: unknown): value is LineupPayload => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<LineupPayload>;
  return (
    typeof candidate.formationId === 'string' &&
    Array.isArray(candidate.players) &&
    typeof candidate.assignments === 'object' &&
    candidate.assignments !== null
  );
};

const envelope = (payload: {
  v: number;
  t: ShareMode;
  squad?: Squad;
  lineup?: LineupPayload;
}): string => encodeBase64(JSON.stringify(payload));

export const encodeSquad = (squad: Squad): string =>
  envelope({ v: SHARE_VERSION, t: 'squad', squad });

export const encodeLineup = (squad: Squad): string =>
  envelope({
    v: SHARE_VERSION,
    t: 'lineup',
    lineup: {
      formationId: squad.formationId,
      players: squad.players.filter((player) => player.bench !== true),
      assignments: squad.assignments,
      primaryColor: squad.primaryColor,
      mirrored: squad.mirrored,
    },
  });

export const decodeSquad = (encoded: string): Squad | null => {
  const payload = decodePayload(encoded);
  if (payload === null || typeof payload !== 'object') return null;
  const candidate = payload as {
    t?: unknown;
    squad?: unknown;
    lineup?: unknown;
  };
  if (candidate.t === 'lineup' && isLineupPayload(candidate.lineup)) {
    return withFormation({
      ...defaultSquad(),
      formationId: candidate.lineup.formationId,
      players: candidate.lineup.players,
      assignments: candidate.lineup.assignments,
      primaryColor: candidate.lineup.primaryColor,
      mirrored: candidate.lineup.mirrored,
    });
  }
  if (candidate.t === 'squad' && isSquad(candidate.squad)) {
    return withFormation(candidate.squad);
  }
  if (isSquad(payload)) return withFormation(payload);
  return null;
};

export const decodeShare = (
  encoded: string
): { squad: Squad; mode: ShareMode } | null => {
  const squad = decodeSquad(encoded);
  if (squad === null) return null;
  const payload = decodePayload(encoded);
  const mode: ShareMode =
    typeof payload === 'object' &&
    payload !== null &&
    (payload as { t?: unknown }).t === 'lineup'
      ? 'lineup'
      : 'squad';
  return { squad, mode };
};

export const buildShareUrl = (
  squad: Squad,
  mode: ShareMode = 'squad'
): string => {
  const url = new URL(window.location.href);
  url.searchParams.set(
    QUERY_KEY,
    mode === 'lineup' ? encodeLineup(squad) : encodeSquad(squad)
  );
  return url.toString();
};

export const squadFromUrl = (search: string): Squad | null => {
  const encoded = new URLSearchParams(search).get(QUERY_KEY);
  if (encoded === null) return null;
  return decodeSquad(encoded);
};

export const squadFromDeepLink = (
  url: string
): { squad: Squad; mode: ShareMode } | null => {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const encoded = parsed.searchParams.get(QUERY_KEY);
  if (encoded === null) return null;
  return decodeShare(encoded);
};

export const loadShareHistory = (): SharedHistoryEntry[] => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isHistoryEntry).slice(0, MAX_HISTORY);
  } catch {
    return [];
  }
};

const isHistoryEntry = (value: unknown): value is SharedHistoryEntry => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<SharedHistoryEntry>;
  return (
    typeof candidate.mode === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.url === 'string'
  );
};

export const saveShareHistory = (entries: SharedHistoryEntry[]): void => {
  try {
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(entries.slice(0, MAX_HISTORY))
    );
  } catch {
    // storage unavailable — ignore
  }
};

export const addShareHistory = (
  entry: Omit<SharedHistoryEntry, 'id' | 'at'>
): SharedHistoryEntry[] => {
  const current = loadShareHistory().filter((item) => item.url !== entry.url);
  const next: SharedHistoryEntry[] = [
    { ...entry, id: uid(), at: Date.now() },
    ...current,
  ].slice(0, MAX_HISTORY);
  saveShareHistory(next);
  return next;
};

export const clearShareHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // storage unavailable — ignore
  }
};
