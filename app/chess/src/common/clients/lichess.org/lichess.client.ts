import { logger } from '@chess/common/libs/logger';
import axios, { Method } from 'axios';
import { CloudEvaluation, FullCloudEvaluation, PVS } from './lichess.dto';

const BASE_URL: string = 'https://lichess.org/api';
const TABLEBASE_URL: string = 'http://tablebase.lichess.ovh/standard';

export const getCloudEvaluation = async (
  fen: string,
  multiPv = 1
): Promise<FullCloudEvaluation> => {
  const urlSearchParameters = new URLSearchParams();
  urlSearchParameters.set('fen', fen);
  urlSearchParameters.set('multiPv', multiPv.toString());
  const url = `${BASE_URL}/cloud-eval?${urlSearchParameters.toString()}`;
  logger.info(`getCloudEvaluation url=${url}`);
  try {
    const method: Method = 'get';
    const maxBodyLength: number = Number.POSITIVE_INFINITY;
    const config = { url, method, maxBodyLength };
    const { data } = await axios.request<CloudEvaluation>(config);
    const { fen: fenString = '', knodes = 0, depth = 0, pvs = [] } = data;
    const principalVariationSearch = pvs.map(({ cp, moves }: PVS) => ({
      nextMoves: moves,
      centipawn: cp,
      pawn: Number.parseFloat((cp / 100).toFixed(2)),
    }));
    return {
      fen: fenString,
      knodes,
      depth,
      principalVariationSearch,
    };
  } catch (error) {
    logger.error(`getCloudEvaluation error=${error}`);
    throw new Error(`getCloudEvaluation error=${error}`);
  }
};

export const getTablebase = async (fen: string) => {
  const urlSearchParameters = new URLSearchParams();
  urlSearchParameters.set('fen', fen);
  const url = `${TABLEBASE_URL}/standard?${urlSearchParameters.toString()}`;
  logger.info(`getTablebase url=${url}`);
  try {
    const method: Method = 'get';
    const maxBodyLength: number = Number.POSITIVE_INFINITY;
    const config = { url, method, maxBodyLength };
    const { data } = await axios.request(config);
    return data;
  } catch (error) {
    logger.error(`getTablebase error=${error}`);
    throw new Error(`getTablebase error=${error}`);
  }
};
