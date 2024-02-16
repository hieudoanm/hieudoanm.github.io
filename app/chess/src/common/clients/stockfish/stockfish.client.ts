import { logger } from '@chess/common/libs/logger';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { TopMove } from './stockfish.dto';

const url = 'https://simplestockfishserver.onrender.com';

export const analyse = async (
  fen: string,
  variations = 10
): Promise<TopMove[]> => {
  const body = { fen, variations };
  logger.info(`analyse url=${url}`);
  try {
    const method: Method = 'post';
    const maxBodyLength: number = Number.POSITIVE_INFINITY;
    const config: AxiosRequestConfig = {
      url,
      method,
      maxBodyLength,
      data: JSON.stringify(body),
    };
    const { data } = await axios.request<TopMove[]>(config);
    return data;
  } catch (error) {
    logger.error(`analyse error=${error}`);
    throw new Error(`analyse error=${error}`);
  }
};
