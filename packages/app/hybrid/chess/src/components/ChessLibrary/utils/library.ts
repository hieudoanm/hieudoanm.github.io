import { createGame, fromPgn, fromSan, makeMove, toFen } from '@chess/ts';
import type { Color } from '@chess/ts';
import type { StoredGame, StudyMove } from '../types';

const STORAGE_KEY = 'chess-library-games-v1';

type PGNMoveLike = {
  san?: string;
  color?: 'w' | 'b';
  moveNumber?: number;
  comment?: string;
};

export const uid = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const loadGames = (): StoredGame[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredGame[]) : [];
  } catch {
    return [];
  }
};

export const persistGames = (games: StoredGame[]): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  } catch {
    // storage unavailable (private mode / quota) — keep in memory only
  }
};

export const parseHeaders = (pgn: string): Record<string, string> => {
  const headers: Record<string, string> = {};
  const regex = /^\s*\[(\w+)\s+"([^"]*)"\]\s*$/gm;
  for (const match of pgn.matchAll(regex)) {
    const key = match[1];
    if (key) headers[key] = match[2] ?? '';
  }
  return headers;
};

export const gameFromPgn = (pgn: string): StoredGame | null => {
  const games = fromPgn(pgn);
  const moves = games[0]?.moves;
  if (!games.length || !moves?.length) return null;
  const headers = parseHeaders(pgn);
  const white = headers.White || '?';
  const black = headers.Black || '?';
  const result = headers.Result || games[0].result || '*';
  const event = headers.Event ? (headers.Event === '?' ? undefined : headers.Event) : undefined;
  const eco = headers.ECO || undefined;
  const name = event ?? `${white} vs ${black}`;
  return { id: uid(), name, savedAt: Date.now(), white, black, result, event, eco, pgn };
};

export const importGames = (pgn: string): { games: StoredGame[]; skipped: number } => {
  const games: StoredGame[] = [];
  let skipped = 0;
  for (const chunk of pgn.split(/\n\n(?=\[Event)/)) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;
    const game = gameFromPgn(trimmed);
    if (game) games.push(game);
    else skipped += 1;
  }
  return { games, skipped };
};

export const deleteGame = (games: StoredGame[], id: string): StoredGame[] =>
  games.filter((g) => g.id !== id);

export const filterGames = (games: StoredGame[], query: string): StoredGame[] => {
  const q = query.trim().toLowerCase();
  if (!q) return games;
  return games.filter((g) =>
    [g.name, g.white, g.black, g.result, g.event, g.eco].some((v) =>
      (v ?? '').toLowerCase().includes(q)
    )
  );
};

export const encodeShare = (pgn: string): string => {
  const bytes = new TextEncoder().encode(pgn);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const decodeShare = (text: string): string | null => {
  try {
    const base64 = text.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
};

export const studyMoves = (pgn: string): StudyMove[] => {
  const game = fromPgn(pgn)[0];
  if (!game) return [];
  const moves: PGNMoveLike[] = (game.moves ?? []) as PGNMoveLike[];
  const out: StudyMove[] = [];
  let state = createGame();
  for (let i = 0; i < moves.length; i += 1) {
    const mv = moves[i];
    const san = mv.san ?? '';
    const color: Color = mv.color ?? (i % 2 === 0 ? 'w' : 'b');
    const move = fromSan(san, state.board, state.turn, state.castlingRights, state.enPassant);
    if (!move) break;
    state = makeMove(state, move);
    out.push({
      index: i,
      moveNumber: mv.moveNumber ?? Math.floor(i / 2) + 1,
      color,
      san,
      fen: toFen(state),
      comment: mv.comment,
    });
  }
  return out;
};

export const downloadPgn = (game: StoredGame): void => {
  const blob = new Blob([game.pgn], { type: 'application/x-chess-pgn' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${game.name.replace(/[^\w.-]+/g, '_')}.pgn`;
  anchor.click();
  URL.revokeObjectURL(url);
};
