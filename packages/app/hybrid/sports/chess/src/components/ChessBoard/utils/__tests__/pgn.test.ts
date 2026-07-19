import { recordsFromPgn } from '../pgn';

describe('recordsFromPgn', () => {
  it('returns records for a valid PGN', () => {
    const records = recordsFromPgn('1. e4 e5 2. Nf3');
    expect(records).not.toBeNull();
    expect(records).toHaveLength(3);
    expect(records![0].san).toBe('e4');
    expect(records![0].fen).toBeTruthy();
  });

  it('returns null for invalid PGN', () => {
    expect(recordsFromPgn('not a pgn')).toBeNull();
  });

  it('returns null for empty PGN', () => {
    expect(recordsFromPgn('')).toBeNull();
  });
});

describe('recordsFromPgn with failing moves', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('@chess/ts', () => {
      const actual = jest.requireActual('../../../../../__mocks__/chess-ts');
      return {
        ...actual,
        fromPgn: jest.fn().mockReturnValue([
          {
            turn: 'w',
            moves: [{ san: 'e4' }, { san: 'zz' }],
            castlingRights: { K: true, Q: true, k: true, q: true },
            enPassant: null,
          },
        ]),
      };
    });
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('returns null when fromSan returns null mid-game', () => {
    const { recordsFromPgn: localRecordsFromPgn } = require('../pgn');
    expect(localRecordsFromPgn('1. e4 zz')).toBeNull();
  });
});
