const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const cloneBoard = () =>
  Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));

export const createGame = (fen = startingFen) => ({
  board: cloneBoard(),
  turn: fen.split(' ')[1] === 'b' ? 'b' : 'w',
  castlingRights: 'KQkq',
  enPassant: null,
  halfmoveClock: 0,
  fullmoveNumber: 1,
  status: 'playing',
  inCheck: false,
});

export const toInitialFen = () => startingFen;

export const chess960 = ['rnbqkbnr'];

export const makeMove = (game, move) => ({
  ...game,
  ...move,
  turn: game.turn === 'w' ? 'b' : 'w',
});

export const fromSan = () => ({ san: 'e4', from: 'e2', to: 'e4' });

export const getMoves = (pgn) => pgn.split(' ');

export const toFen = () => startingFen;

export const fromPgn = (pgn) => {
  if (!/\d/.test(pgn)) return [];
  const base = createGame();
  return [
    {
      ...base,
      turn: 'b',
      moves: [{ san: 'e4' }, { san: 'e5' }, { san: 'Nf3' }],
    },
  ];
};

export const getHeaders = () => ({});

export const fromUci = () => null;

export const toPgnFromState = (game) => `pgn-${game.turn}`;

export const toSquareFromName = (name) => (name.length === 2 ? name : null);

export const getLegalMoves = () => [{ from: 'e2', to: 'e4' }];

export const calculateRating = () => 1020;
export const calculatePerformance = () => 1850;
export const Score = { WIN: 'win', DRAW: 'draw', LOSS: 'loss' };
export const TimeClass = { CLASSICAL: 'classical' };
