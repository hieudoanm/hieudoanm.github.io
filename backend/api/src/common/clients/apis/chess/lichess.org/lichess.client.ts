import { Logger } from '@nestjs/common';
import axios from 'axios';
import { CloudEvaluation, FullCloudEvaluation, PVS } from './lichess.dto';

export class LichessClient {
  private baseUrl = 'https://lichess.org/api';
  private readonly logger = new Logger(LichessClient.name);

  async getCloudEvaluation(
    fen: string,
    multiPv = 1
  ): Promise<FullCloudEvaluation> {
    const urlSearchParameters = new URLSearchParams();
    urlSearchParameters.set('fen', fen);
    urlSearchParameters.set('multiPv', multiPv.toString());
    const url = `${this.baseUrl}/cloud-eval?${urlSearchParameters.toString()}`;
    this.logger.log(`getCloudEvaluation url=${url}`);
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
      this.logger.error(`getCloudEvaluation error=${error}`);
      throw new Error(`getCloudEvaluation error=${error}`);
    }
  }
}
