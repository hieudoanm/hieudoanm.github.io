import { logger } from '@chess/common/libs/logger';
import axios from 'axios';
import { CloudEvaluation, FullCloudEvaluation, PVS } from './lichess.dto';

const BASE_URL = 'https://lichess.org/api';

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
    const config = {
      method: 'get',
      maxBodyLength: Number.POSITIVE_INFINITY,
      url,
    };
    const {
      data: { fen: fenString = '', knodes = 0, depth = 0, pvs = [] },
    } = await axios.request<CloudEvaluation>(config);
    return {
      fen: fenString,
      knodes,
      depth,
      principalVariationSearch: pvs.map(({ cp, moves }: PVS) => ({
        nextMoves: moves,
        centipawn: cp,
        pawn: Number.parseFloat((cp / 100).toFixed(2)),
      })),
    };
  } catch (error) {
    logger.error(`getCloudEvaluation error=${error}`);
    throw new Error(`getCloudEvaluation error=${error}`);
  }
};
