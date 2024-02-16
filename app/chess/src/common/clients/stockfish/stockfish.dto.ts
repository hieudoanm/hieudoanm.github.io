export type TopMove = {
  centipawn: number;
  pawn: number;
  mate: number;
  move_san: string;
  move_uci: string;
};

export type Move = {
  centipawn: number;
  mate: number;
  fen: string;
  san: string;
  uci: string;
};
