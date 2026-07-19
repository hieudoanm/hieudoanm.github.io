export enum Variant {
  STANDARD = 'standard',
  CHESS_960 = 'chess960',
  CRAZY_HOUSE = 'crazyhouse',
  ANTI_CHESS = 'antichess',
  ATOMIC = 'atomic',
  HORDE = 'horde',
  KING_OF_THE_HILL = 'kingOfTheHill',
  RACING_KINGS = 'racingKings',
  THREE_CHECK = 'threeCheck',
  FROM_POSITION = 'fromPosition',
}

export type CloudEvaluation = {
  error?: string;
  depth: number;
  fen: string;
  knodes: number;
  pvs: { mate?: number; cp?: number; moves: string }[];
};
