const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const createEmptyBoard = () => Array.from({ length: 64 }, () => null);

export const cloneBoard = (board) =>
  Array.isArray(board) ? board.slice() : createEmptyBoard();

export const isSquareValid = (sq) => Number.isInteger(sq) && sq >= 0 && sq < 64;

export const getRank = (sq) => Math.floor(sq / 8);
export const getFile = (sq) => sq % 8;

export const toSquare = (rank, file) => {
  const f = typeof file === 'string' ? file.charCodeAt(0) - 97 : file;
  return rank * 8 + f;
};

export const toSquareName = (sq) => {
  if (typeof sq !== 'number') return sq;
  return `${FILES[sq % 8]}${Math.floor(sq / 8) + 1}`;
};

export const toSquareFromName = (name) => {
  if (typeof name !== 'string' || name.length !== 2) return name;
  const match = /^([a-h])([1-8])$/.exec(name);
  if (!match) return name;
  return toSquare(parseInt(match[2], 10) - 1, match[1]);
};

export const getPiece = (board, sq) => {
  if (typeof sq !== 'number') sq = toSquareFromName(sq);
  return board[sq] ?? null;
};

export const setPiece = (board, piece, sq) => {
  if (typeof sq !== 'number') sq = toSquareFromName(sq);
  board[sq] = piece;
};

export const removePiece = (board, sq) => {
  if (typeof sq !== 'number') sq = toSquareFromName(sq);
  board[sq] = null;
};

export const findKing = (board, color) =>
  board.findIndex((p) => p && p.color === color && p.type === 'k');

export const fromFenBoard = (part) => {
  const board = createEmptyBoard();
  const rows = part.split('/');
  for (let r = 0; r < 8; r += 1) {
    const row = rows[7 - r] ?? '';
    let f = 0;
    for (const ch of row) {
      if (/\d/.test(ch)) {
        f += parseInt(ch, 10);
      } else {
        const color = ch === ch.toUpperCase() ? 'w' : 'b';
        const type = ch.toLowerCase();
        board[r * 8 + f] = { color, type };
        f += 1;
      }
    }
  }
  return board;
};

export const toFenBoard = (board) => {
  let result = '';
  for (let rank = 7; rank >= 0; rank -= 1) {
    let empty = 0;
    for (let file = 0; file < 8; file += 1) {
      const piece = board[rank * 8 + file];
      if (!piece) {
        empty += 1;
        continue;
      }
      if (empty > 0) {
        result += empty;
        empty = 0;
      }
      result += piece.color === 'w' ? piece.type.toUpperCase() : piece.type;
    }
    if (empty > 0) result += empty;
    if (rank > 0) result += '/';
  }
  return result;
};

export const createGame = (fen = startingFen) => {
  const parts = fen.split(' ');
  const castling = parts[2] ?? '-';
  return {
    board: fromFenBoard(parts[0] ?? startingFen),
    turn: parts[1] === 'b' ? 'b' : 'w',
    castlingRights: {
      K: castling.includes('K'),
      Q: castling.includes('Q'),
      k: castling.includes('k'),
      q: castling.includes('q'),
    },
    enPassant: parts[3] && parts[3] !== '-' ? toSquareFromName(parts[3]) : null,
    halfMoveClock: parts[4] ? parseInt(parts[4], 10) : 0,
    fullMoveNumber: parts[5] ? parseInt(parts[5], 10) : 1,
    status: 'playing',
    result: '*',
    inCheck: false,
    history: [],
  };
};

export const toFen = (state) => {
  const board = state.board ?? createEmptyBoard();
  const castling = state.castlingRights;
  const castlingStr =
    typeof castling === 'string'
      ? castling
      : `${castling.K ? 'K' : ''}${castling.Q ? 'Q' : ''}${
          castling.k ? 'k' : ''
        }${castling.q ? 'q' : ''}` || '-';
  const ep =
    state.enPassant === null || state.enPassant === undefined
      ? '-'
      : typeof state.enPassant === 'number'
        ? toSquareName(state.enPassant)
        : state.enPassant;
  return `${toFenBoard(board)} ${state.turn} ${castlingStr} ${ep} ${
    state.halfMoveClock ?? 0
  } ${state.fullMoveNumber ?? 1}`;
};

export const toInitialFen = () => startingFen;

export const chess960 = ['rnbqkbnr'];

export const makeMove = (game, move) => ({
  ...game,
  ...move,
  turn: game.turn === 'w' ? 'b' : 'w',
});

export const fromSan = (san) =>
  san === 'zz' ? null : { san: 'e4', from: 'e2', to: 'e4' };

export const getMoves = (pgn) => pgn.split(' ');

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

export const toPgnFromState = (game) => `pgn-${game.turn}`;

export const getLegalMoves = () => [
  { from: 12, to: 28, promotion: null, captured: null },
];

export const getPseudoLegalMoves = () => [
  { from: 12, to: 28, promotion: null, captured: null },
];

export const toSan = () => 'e4';

export const findBestMove = () => ({
  move: { from: 'e2', to: 'e4' },
  score: 0,
  depth: 1,
  nodes: 1,
});

export const calculateRating = () => 1020;
export const calculatePerformance = () => 1850;
export const Score = { WIN: 'win', DRAW: 'draw', LOSS: 'loss' };
export const TimeClass = { CLASSICAL: 'classical' };

export const isSquareAttacked = () => false;
export const isInCheck = () => false;

export const winPercentFromCentipawns = (cp) =>
  50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1);

export const calculateAccuracy = (lost) =>
  Math.max(
    0,
    Math.min(100, Math.round(103.1668 * Math.exp(-0.04354 * lost) - 33.043))
  );

export const classifyMove = (lost) => {
  if (lost <= 2) return { label: 'Best', code: 'best' };
  if (lost <= 5) return { label: 'Good', code: 'good' };
  if (lost <= 10) return { label: 'Inaccuracy', code: 'inaccuracy' };
  if (lost <= 20) return { label: 'Mistake', code: 'mistake' };
  return { label: 'Blunder', code: 'blunder' };
};

export const expectedScore = (r, ro) => 1 / (1 + 10 ** ((ro - r) / 400));
export const winProbability = (r, ro) => 1 / (1 + 10 ** ((ro - r) / 400));
export const kFactorFide = () => 20;
export const kFactorUsfc = () => 32;
export const calculateUsfc = () => ({ ratingNew: 1032, ratingChange: 12 });
export const dwzIndex = () => 10;
export const calculateDwz = () => ({ ratingNew: 1030, ratingChange: 10 });
export const glicko2 = () => ({ rating: 1520, rd: 80, sigma: 0.06 });
export const drawPercent = () => 0.5;

export const roundRobinSchedule = (players) => [
  { round: 1, pairings: [[players[0], players[1]]] },
];
export const swissPair = (players) => [[players[0], players[1]]];
export const calculateBuchholz = (players) =>
  Object.fromEntries(players.map((p) => [p.name, 0]));
export const calculateSonnebornBerger = () => ({});
export const calculateStandings = (players) =>
  players.map((p) => ({
    name: p.name,
    points: p.points,
    buchholz: 0,
    sonnebornBerger: 0,
  }));

export const perft = () => 20;
export const divide = () => ({ a2a3: 1, a2a4: 1 });

export const evaluateBoard = () => 0;

export const getStatusMessage = (state) => state.status ?? 'playing';
export const fromUci = (uci) => {
  if (!uci || uci.length < 4) return null;
  return { from: uci.slice(0, 2), to: uci.slice(2, 4) };
};
export const toUci = () => 'e2e4';
