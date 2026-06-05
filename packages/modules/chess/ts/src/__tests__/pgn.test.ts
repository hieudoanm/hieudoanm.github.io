import { parsePGN, stringifyPGN } from '../pgn';
import type { PGNGame, PGNMove } from '../pgn';

describe('parsePGN', () => {
  it('parses a single game with headers and moves', () => {
    const pgn = `
[Event "Test Event"]
[Site "Internet"]
[Date "2024.01.01"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 1-0
`;

    const games: PGNGame[] = parsePGN(pgn);
    expect(games).toHaveLength(1);

    const game = games[0];
    if (!game) return;

    expect(game.headers).toEqual({
      Event: 'Test Event',
      Site: 'Internet',
      Date: '2024.01.01',
      Result: '1-0',
    });

    expect(game.result).toBe('1-0');
    expect(game.moves).toHaveLength(6);
  });

  it('parses move numbers and colors correctly', () => {
    const pgn = `
[Event "Moves Test"]

1. e4 e5 2. Nf3 Nc6 *
`;

    const game = parsePGN(pgn)[0];
    if (!game) return;

    const moves: PGNMove[] = game.moves;
    expect(moves[0]).toEqual({ moveNumber: 1, color: 'w', san: 'e4' });
    expect(moves[1]).toEqual({ moveNumber: 1, color: 'b', san: 'e5' });
    expect(moves[2]).toEqual({ moveNumber: 2, color: 'w', san: 'Nf3' });
    expect(moves[3]).toEqual({ moveNumber: 2, color: 'b', san: 'Nc6' });
  });

  it('strips comments from move text', () => {
    const pgn = `
[Event "Comments Test"]

1. e4 {Best by test} e5 2. Nf3 {Developing} Nc6 *
`;

    const game = parsePGN(pgn)[0];
    if (!game) return;

    const sans = game.moves.map((m) => m.san);
    expect(sans).toEqual(['e4', 'e5', 'Nf3', 'Nc6']);
  });

  it('defaults result to "*" if missing', () => {
    const pgn = `
[Event "No Result"]

1. d4 d5 2. c4 c6
`;

    const game = parsePGN(pgn)[0];
    if (!game) return;

    expect(game.result).toBe('*');
  });

  it('parses multiple games in one PGN string', () => {
    const pgn = `
[Event "Game 1"]
[Result "1-0"]

1. e4 e5 1-0

[Event "Game 2"]
[Result "0-1"]

1. d4 d5 0-1
`;

    const games = parsePGN(pgn);
    expect(games).toHaveLength(2);

    const game1 = games[0];
    const game2 = games[1];
    if (game1) expect(game1.headers.Event).toBe('Game 1');
    if (game2) expect(game2.headers.Event).toBe('Game 2');
  });
});

describe('stringifyPGN', () => {
  it('stringifies a single game with headers and moves', () => {
    const game: PGNGame = {
      headers: {
        Event: 'Test Event',
        Site: 'Internet',
        Result: '1-0',
      },
      moves: [
        { moveNumber: 1, color: 'w', san: 'e4' },
        { moveNumber: 1, color: 'b', san: 'e5' },
        { moveNumber: 2, color: 'w', san: 'Nf3' },
        { moveNumber: 2, color: 'b', san: 'Nc6' },
      ],
      result: '1-0',
    };

    const pgn = stringifyPGN([game]);
    expect(pgn).toBe(
      `[Event "Test Event"]
[Site "Internet"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 1-0`
    );
  });

  it('handles multiple games separated by a blank line', () => {
    const games: PGNGame[] = [
      {
        headers: { Event: 'Game 1', Result: '1-0' },
        moves: [
          { moveNumber: 1, color: 'w', san: 'e4' },
          { moveNumber: 1, color: 'b', san: 'e5' },
        ],
        result: '1-0',
      },
      {
        headers: { Event: 'Game 2', Result: '0-1' },
        moves: [
          { moveNumber: 1, color: 'w', san: 'd4' },
          { moveNumber: 1, color: 'b', san: 'd5' },
        ],
        result: '0-1',
      },
    ];

    const pgn = stringifyPGN(games);
    expect(pgn).toBe(
      `[Event "Game 1"]
[Result "1-0"]

1. e4 e5 1-0

[Event "Game 2"]
[Result "0-1"]

1. d4 d5 0-1`
    );
  });

  it('handles games with no moves', () => {
    const game: PGNGame = {
      headers: { Event: 'Empty Game', Result: '*' },
      moves: [],
      result: '*',
    };

    const pgn = stringifyPGN([game]);
    expect(pgn).toBe(
      `[Event "Empty Game"]
[Result "*"]

 *`
    );
  });

  it('does not insert move numbers for black moves', () => {
    const game: PGNGame = {
      headers: { Event: 'Color Test', Result: '*' },
      moves: [{ moveNumber: 1, color: 'b', san: 'e5' }],
      result: '*',
    };

    const pgn = stringifyPGN([game]);
    expect(pgn).toContain('e5 *');
    expect(pgn).not.toContain('1. e5');
  });
});
