import type { GameState } from './types';
import { parseFEN, moveToSAN } from './notation';

export type PGNGame = {
  headers: Record<string, string>;
  moves: PGNMove[];
  result: string;
};

export type PGNMove = {
  moveNumber: number;
  color: 'w' | 'b';
  san: string;
  nag?: string[];
  comment?: string;
  variations?: PGNMove[][];
};

const TAG_REGEX = /^\[(\w+)\s+"(.*)"\]$/;

export const parsePGN = (input: string): PGNGame[] => {
  const games: PGNGame[] = [];
  const chunks = input.split(/\n\n(?=\[Event)/);

  for (const chunk of chunks) {
    const lines = chunk
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    const headers: Record<string, string> = {};
    let movesText = '';

    for (const line of lines) {
      const headerMatch = line.match(TAG_REGEX);
      if (headerMatch) {
        const key: string | undefined = headerMatch[1];
        if (typeof key !== 'undefined') {
          const value: string | undefined = headerMatch[2];
          headers[key] = value ?? '';
        }
      } else {
        movesText += ' ' + line;
      }
    }

    const moves = parseMoves(movesText);
    games.push({
      headers,
      moves,
      result: headers.Result ?? '*',
    });
  }

  return games;
};

const parseMoves = (text: string): PGNMove[] => {
  const moves: PGNMove[] = [];
  const tokens = text
    .replace(/\{[^}]*\}/g, '')
    .split(/\s+/)
    .filter(Boolean);

  let moveNumber = 0;
  let color: 'w' | 'b' = 'w';

  for (const token of tokens) {
    if (/^\d+\./.test(token)) {
      moveNumber = parseInt(token, 10);
      color = 'w';
      continue;
    }

    if (/^(1-0|0-1|1\/2-1\/2|\*)$/.test(token)) {
      break;
    }

    moves.push({
      moveNumber,
      color,
      san: token,
    });

    color = color === 'w' ? 'b' : 'w';
  }

  return moves;
};

export const stringifyPGN = (games: PGNGame[]): string => {
  return games
    .map((game) => {
      const headers: string = Object.entries(game.headers)
        .map(([key, value]) => `[${key} "${value}"]`)
        .join('\n');

      const moves: string = game.moves
        .map((m) => (m.color === 'w' ? `${m.moveNumber}. ${m.san}` : m.san))
        .join(' ');

      return `${headers}\n\n${moves} ${game.result}`.trim();
    })
    .join('\n\n');
};

export const getMoves = (pgn: string): string[] => {
  const games = parsePGN(pgn);
  return games[0]?.moves.map((m) => m.san) ?? [];
};

export const getHeaders = (pgn: string): Record<string, string> => {
  const games = parsePGN(pgn);
  return games[0]?.headers ?? {};
};

export const stateToPGN = (state: GameState): string => {
  const sanList: string[] = [];
  for (const entry of state.history) {
    const before = parseFEN(entry.stateBefore);
    const san = moveToSAN(
      before.board,
      entry.move,
      before.turn,
      before.castlingRights,
      before.enPassant
    );
    sanList.push(san);
  }

  let pgn = '';
  for (let i = 0; i < sanList.length; i++) {
    if (i % 2 === 0) {
      pgn += `${Math.floor(i / 2) + 1}. ${sanList[i]} `;
    } else {
      pgn += `${sanList[i]} `;
    }
  }

  return (pgn.trim() + ' ' + state.result).trim();
};
