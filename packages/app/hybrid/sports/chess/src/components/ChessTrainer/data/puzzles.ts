import type { TacticsPuzzle } from '../types';

export const TACTICS_PUZZLES: TacticsPuzzle[] = [
  {
    id: 't01',
    fen: '6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1',
    rating: 900,
    hint: 'Back rank mate with the rook.',
  },
  {
    id: 't02',
    fen: 'r1bqkb1r/pppp1p1p/2n3p1/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 4',
    rating: 1000,
    hint: "The scholar's mate pattern.",
  },
  {
    id: 't03',
    fen: '6k1/5ppp/8/8/8/8/8/1R4K1 w - - 0 1',
    rating: 900,
    hint: 'Another back rank mate.',
  },
  {
    id: 't04',
    fen: '7k/8/6p1/8/8/8/8/R5K1 w - - 0 1',
    rating: 1200,
    hint: 'Pin the pawn and mate on the back rank.',
  },
  {
    id: 't05',
    fen: 'r3r1k1/ppp2ppp/2np4/4n3/2B5/2N2N2/PPPP1PPP/R1B1R1K1 w - - 0 1',
    rating: 1600,
    hint: 'The knight on e5 is overloaded.',
  },
  {
    id: 't06',
    fen: '2kr3r/ppp2ppp/2nb1n2/4p3/2B1P1b1/P1NP1N2/1PP2PPP/R1BQR1K1 w - - 0 1',
    rating: 1800,
    hint: 'Watch the diagonal to the king.',
  },
  {
    id: 't07',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/2PP4/2N1PN2/PP3PPP/R1BQ1RK1 w - - 0 1',
    rating: 1400,
    hint: 'Exploit the pinned knight.',
  },
  {
    id: 't08',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 1',
    rating: 1500,
    hint: 'A winning pawn fork is available.',
  },
];
