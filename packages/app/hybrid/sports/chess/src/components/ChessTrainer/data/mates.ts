import type { TacticsPuzzle } from '../types';

export const MATE_PUZZLES: TacticsPuzzle[] = [
  {
    id: 'm01',
    fen: '6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1',
    rating: 800,
    hint: 'Rook to the back rank.',
  },
  {
    id: 'm02',
    fen: '6k1/5ppp/8/8/8/8/8/1R4K1 w - - 0 1',
    rating: 800,
    hint: 'Back rank mate.',
  },
  {
    id: 'm03',
    fen: '6k1/5ppp/8/8/8/8/8/Q5K1 w - - 0 1',
    rating: 900,
    hint: 'The queen finishes along the back rank.',
  },
  {
    id: 'm04',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
    rating: 1000,
    hint: 'The scholar\u2019s mate: queen takes f7.',
  },
  {
    id: 'm05',
    fen: '7k/5ppp/8/8/8/8/8/Q5K1 w - - 0 1',
    rating: 900,
    hint: 'Queen to a8.',
  },
  {
    id: 'm06',
    fen: '6k1/5ppp/5n2/8/8/8/8/R5K1 w - - 0 1',
    rating: 850,
    hint: 'The knight does not defend the back rank.',
  },
  {
    id: 'm07',
    fen: '6k1/5ppp/8/8/8/8/8/4R2K w - - 0 1',
    rating: 850,
    hint: 'Rook mate along the eighth rank.',
  },
  {
    id: 'm08',
    fen: '6k1/5ppp/8/8/8/8/8/3R2K1 w - - 0 1',
    rating: 850,
    hint: 'Bring the rook to d8.',
  },
];

export const MATE_IN_2_PUZZLES: TacticsPuzzle[] = [
  {
    id: 'm2-01',
    fen: 'r1b1kb1r/pppp1ppp/2n2n2/4p3/4P3/3P4/PPP2PPP/RNBQK2R w KQkq - 0 1',
    rating: 1500,
    hint: 'Threaten Qxg7 mate with a quiet queen move.',
  },
  {
    id: 'm2-02',
    fen: '5k2/5ppp/8/8/8/8/8/K2Q4 w - - 0 1',
    rating: 1400,
    hint: 'Keep the king in the corner.',
  },
  {
    id: 'm2-03',
    fen: 'r4rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1B2RK1 w - - 0 1',
    rating: 1600,
    hint: 'A quiet move threatens mate on the open file.',
  },
];
