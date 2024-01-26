import { logger } from '@chess/common/libs/logger';
import { addZero } from '@chess/common/utils/add-zero';
import axios from 'axios';
import { FullPlayer, Game, Player, Stats, Title } from './chess.dto';

const BASE_URL = 'https://api.chess.com/pub';

export const getPlayer = async (username: string): Promise<Player> => {
  const encodedUsername: string = encodeURIComponent(username);
  const url = `${BASE_URL}/player/${encodedUsername}`;
  logger.info(`getPlayer url=${url}`);
  const { data } = await axios.get<Player>(url);
  return data;
};

export const getStats = async (username: string): Promise<Stats> => {
  const encodedUsername: string = encodeURIComponent(username);
  const url = `${BASE_URL}/player/${encodedUsername}/stats`;
  logger.info(`getStats url=${url}`);
  const { data } = await axios.get<Stats>(url);
  return data;
};

export const getArchives = async (username: string): Promise<string[]> => {
  const encodedUsername: string = encodeURIComponent(username);
  const url = `${BASE_URL}/player/${encodedUsername}/games/archives`;
  logger.info(`getArchives url=${url}`);
  const { data } = await axios.get<{ archives: string[] }>(url);
  return data.archives || [];
};

export const getGamesByYearAndMonth = async (
  username: string,
  year: number,
  month: number
): Promise<Game[]> => {
  const encodedUsername: string = encodeURIComponent(username);
  const yyyy: string = encodeURIComponent(addZero(year));
  const mm: string = encodeURIComponent(addZero(month));
  const url = `${BASE_URL}/player/${encodedUsername}/games/${yyyy}/${mm}`;
  logger.info(`getGamesByYearAndMonth url=${url}`);
  const { data } = await axios.get<{ games: Game[] }>(url);
  return data.games || [];
};

export const getFullPlayer = async (username: string): Promise<FullPlayer> => {
  const player = await getPlayer(username);
  const stats = await getStats(username);
  const archives = await getArchives(username);
  return { ...player, stats, archives };
};

export const getGames = async (
  username: string,
  { month = 0, year = 0 }: { month: number; year: number }
): Promise<Game[]> => {
  const archives = await getArchives(username);
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
  const encodedTitle: string = encodeURIComponent(title);
  const url = `${BASE_URL}/titled/${encodedTitle}`;
  logger.info(`getTitled url=${url}`);
  const { data } = await axios.get<{ players: string[] }>(url);
  return data.players || [];
};
