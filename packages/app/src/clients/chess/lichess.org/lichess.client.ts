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

export const getCloudEvaluation = async ({
  fen,
  multiPv = 1,
  variant = Variant.STANDARD,
}: {
  fen: string;
  multiPv?: number;
  variant?: Variant;
}): Promise<CloudEvaluation> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('fen', fen);
  urlSearchParams.set('multiPv', multiPv.toString());
  urlSearchParams.set('variant', variant);
  const url = `https://lichess.org/api/cloud-eval?${urlSearchParams.toString()}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
