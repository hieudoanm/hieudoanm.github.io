import { CloudEvaluation, Variant } from './lichess.dto.js';

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
