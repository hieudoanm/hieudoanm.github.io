import { BASE_URL, PROXY } from '@chess/common/environments/environments';
import { logger } from '@chess/common/libs/logger';
import { addZero } from '@chess/common/utils/add-zero';
import axios from 'axios';
import {
  Archives,
  FullPlayer,
  Game,
  GamesResponse,
  Player,
  Stats,
  Title,
} from './chess.dto';

const CHESS_BASE_URL = `${BASE_URL}/api/chess.com`;

const getTitledUrl = (title: string): string =>
  `${CHESS_BASE_URL}/titled/${encodeURIComponent(title)}`;

const getPlayerUrl = (username: string): string =>
  `${CHESS_BASE_URL}/player/${encodeURIComponent(username)}`;

const getPlayerStatsUrl = (username: string): string =>
  `${CHESS_BASE_URL}/player/${encodeURIComponent(username)}/stats`;

const getPlayerArchivesUrl = (username: string): string =>
  `${CHESS_BASE_URL}/player/${encodeURIComponent(username)}/games/archives`;
const getPlayerGamesUrl = (
  username: string,
  yyyy: string,
  mm: string
): string =>
  `${CHESS_BASE_URL}/player/${encodeURIComponent(
    username
  )}/games/${encodeURIComponent(yyyy)}/${encodeURIComponent(mm)}`;

export const getPlayer = async (username: string): Promise<Player> => {
  try {
    const url = getPlayerUrl(username);
    logger.info(`getPlayer url=${url}`);
    const { data } = await axios.get<Player>(url);
    return data;
  } catch (error) {
    logger.error(`getPlayer error=${error}`);
    return {} as Player;
  }
};

export const getStats = async (username: string): Promise<Stats> => {
  try {
    const url = getPlayerStatsUrl(username);
    logger.info(`getStats url=${url}`);
    const { data } = await axios.get<Stats>(url);
    return data;
  } catch (error) {
    logger.error(`getStats error=${error}`);
    return {} as Stats;
  }
};

export const getArchives = async (username: string): Promise<Archives> => {
  try {
    const url = getPlayerArchivesUrl(username);
    logger.info(`getArchives url=${url}`);
    const { data } = await axios.get<Archives>(url);
    return data;
  } catch (error) {
    logger.error(`getArchives error=${error}`);
    return { archives: [] };
  }
};

export const getGamesByYearAndMonth = async (
  username: string,
  year: number,
  month: number
): Promise<GamesResponse> => {
  try {
    const url: string = getPlayerGamesUrl(
      username,
      addZero(year),
      addZero(month)
    );
    logger.info(`getGamesByYearAndMonth url=${url}`);
    const { data } = await axios.get<GamesResponse>(url);
    return data;
  } catch (error) {
    logger.error(`getGamesByYearAndMonth error=${error}`);
    return { games: [] };
  }
};

export const getFullPlayer = async (username: string): Promise<FullPlayer> => {
  const player = await getPlayer(username);
  const stats = await getStats(username);
  const { archives = [] } = await getArchives(username);
  return { ...player, stats, archives };
};

export const getGames = async (
  username: string,
  { month = 0, year = 0 }: { month: number; year: number }
): Promise<Game[]> => {
  const { archives = [] } = await getArchives(username);
  const filterArchives = archives.filter((archive: string) => {
    const [yearPath = '', monthPath = ''] = archive.split('/').slice(-2);
    const monthFlag: boolean =
      month === 0 ? true : addZero(month) === monthPath;
    const yearFlag: boolean = year === 0 ? true : addZero(year) === yearPath;
    return monthFlag && yearFlag;
  });
  logger.info(`filterArchives ${JSON.stringify(filterArchives)}`);
  const promiseArchives = filterArchives.map(async (archive: string) => {
    try {
      const { data } = await axios.get<{ games: Game[] }>(archive);
      const games = data.games || [];
      games.sort((a, b) => (a > b ? 1 : -1));
      return games;
    } catch (error) {
      logger.error(archive, error);
      return [];
    }
  });
  const responses: Game[][] = await Promise.all(promiseArchives);
  return responses.flat();
};

export const getTitled = async (title: Title): Promise<string[]> => {
  const url = getTitledUrl(title);
  logger.info(`getTitled url=${url}`);
  const { data } = await axios.get<{ players: string[] }>(url);
  return data.players || [];
};
