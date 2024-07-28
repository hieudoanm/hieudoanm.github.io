import { logger } from '@chess/common/libs/logger';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { Move, TopMove } from './stockfish.dto';

const BASE_URL = 'https://simplestockfishserver.onrender.com';

export const analyseFEN = async (
  fen: string,
  variations = 10
): Promise<TopMove[]> => {
  const body = { fen, variations };
  const url = `${BASE_URL}/fen`;
  logger.info(`analyseFEN url=${url}`);
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
    logger.error(`analyseFEN error=${error}`);
    return [];
  }
};

export const analysePGN = async (pgn: string): Promise<Move[]> => {
  const body = { pgn };
  const url = `${BASE_URL}/pgn`;
  logger.info(`analysePGN url=${url}`);
  try {
    const method: Method = 'post';
    const maxBodyLength: number = Number.POSITIVE_INFINITY;
    const config: AxiosRequestConfig = {
      url,
      method,
      maxBodyLength,
      data: JSON.stringify(body),
    };
    const { data } = await axios.request<Move[]>(config);
    return data;
  } catch (error) {
    logger.error(`analysePGN error=${error}`);
    return [];
  }
};
