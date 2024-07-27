export type FullCloudEvaluation = {
  fen: string;
  knodes: number;
  depth: number;
  principalVariationSearch: PrincipalVariationSearch[];
};

export type PrincipalVariationSearch = {
  nextMoves: string;
  centipawn: number;
  pawn: number;
};

export type CloudEvaluation = {
  fen: string;
  knodes: number;
  depth: number;
  pvs: PVS[];
};

export type PVS = {
  moves: string;
  cp: number;
};
