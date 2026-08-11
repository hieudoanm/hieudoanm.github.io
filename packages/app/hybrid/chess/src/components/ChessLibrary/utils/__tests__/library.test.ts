import {
  deleteGame,
  decodeShare,
  encodeShare,
  filterGames,
  gameFromPgn,
  importGames,
  studyMoves,
} from '../library';
import type { StoredGame, StudyMove } from '../../types';

const SAMPLE = `[Event "Test Match"]
[White "Alice"]
[Black "Bob"]
[Result "1-0"]
[ECO "C20"]

1. e4 e5 2. Qh5 1-0`;

describe('gameFromPgn', () => {
  it('returns null for text without moves', () => {
    expect(gameFromPgn('')).toBeNull();
    expect(gameFromPgn('[Event "x"]')).toBeNull();
  });

  it('parses headers into a stored game', () => {
    const game = gameFromPgn(SAMPLE);
    expect(game).not.toBeNull();
    expect(game!.white).toBe('Alice');
    expect(game!.black).toBe('Bob');
    expect(game!.result).toBe('1-0');
    expect(game!.eco).toBe('C20');
    expect(game!.name).toBe('Test Match');
    expect(game!.id).toMatch(/-/);
  });

  it('names the game after the players when no event is present', () => {
    const game = gameFromPgn(SAMPLE.replace('[Event "Test Match"]\n', ''));
    expect(game!.name).toBe('Alice vs Bob');
  });
});

describe('importGames', () => {
  it('imports multiple games and counts skipped chunks', () => {
    const { games, skipped } = importGames(`${SAMPLE}\n\n[Event "Header only"]`);
    expect(games).toHaveLength(1);
    expect(skipped).toBe(1);
  });
});

describe('filterGames', () => {
  const games: StoredGame[] = [
    {
      id: 'a',
      name: 'Casual',
      savedAt: 1,
      white: 'Alice',
      black: 'Bob',
      result: '1-0',
      eco: 'C20',
      pgn: SAMPLE,
    },
    {
      id: 'b',
      name: 'Blitz',
      savedAt: 2,
      white: 'Zoe',
      black: 'Ivan',
      result: '0-1',
      pgn: 'x',
    },
  ];

  it('matches by player, event, eco and result', () => {
    expect(filterGames(games, 'alice').map((g) => g.id)).toEqual(['a']);
    expect(filterGames(games, 'casual').map((g) => g.id)).toEqual(['a']);
    expect(filterGames(games, 'c20').map((g) => g.id)).toEqual(['a']);
    expect(filterGames(games, '0-1').map((g) => g.id)).toEqual(['b']);
    expect(filterGames(games, 'zzz')).toHaveLength(0);
    expect(filterGames(games, '')).toHaveLength(2);
  });
});

describe('deleteGame', () => {
  it('removes the game with the given id', () => {
    const remaining = deleteGame(
      [
        { id: 'a', name: 'x' } as StoredGame,
        { id: 'b', name: 'y' } as StoredGame,
      ],
      'a'
    );
    expect(remaining.map((g) => g.id)).toEqual(['b']);
  });
});

describe('encodeShare / decodeShare', () => {
  it('round-trips a PGN with unicode and headers', () => {
    const pgn = '[White "José"]\n1. e4 e5';
    expect(decodeShare(encodeShare(pgn))).toBe(pgn);
  });

  it('returns null for invalid share text', () => {
    expect(decodeShare('###')).toBeNull();
  });
});

describe('studyMoves', () => {
  it('builds fens and colors for each move', () => {
    const moves: StudyMove[] = studyMoves(SAMPLE);
    expect(moves.length).toBeGreaterThanOrEqual(3);
    expect(moves[0].color).toBe('w');
    expect(moves[0].san).toBeDefined();
    expect(moves[1].color).toBe('b');
    expect(moves.every((m) => m.fen.length > 0)).toBe(true);
    expect(moves.every((m) => m.moveNumber >= 1)).toBe(true);
  });
});
