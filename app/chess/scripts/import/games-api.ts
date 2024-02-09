import { ChessPlayer } from '@prisma/client';
import axios from 'axios';

const USERNAME = process.env.USERNAME ?? '';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const PROD_BASE_URL = 'https://chessinsights.vercel.app/api/chess';
const LOCAL_BASE_URL = 'http://localhost:3000/api/chess';
const BASE_URL = NODE_ENV === 'development' ? LOCAL_BASE_URL : PROD_BASE_URL;

const syncGames = async (username: string, archive: string) => {
  try {
    const [yyyy = '', mm = ''] = archive.split('/').slice(-2);
    const year: number = Number.parseInt(yyyy, 10);
    const month: number = Number.parseInt(mm, 10);
    const gamesUrl = `${BASE_URL}/players/${username}/games`;
    const data = { year, month, full: NODE_ENV === 'development' };
    console.info(`syncGames gamesUrl ${gamesUrl}`, data);
    const { data: syncedData } = await axios.post<{
      total: number;
      synced: number;
      existed: number;
    }>(gamesUrl, {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    const { total = 0, synced = 0, existed = 0 } = syncedData;
    console.info(
      `syncGames games year=${year} month=${month} total=${total} synced=${synced} existed=${existed}`
    );
  } catch (error) {
    console.error(`syncGames error=${error}`);
  }
};

const syncArchives = async (username: string) => {
  try {
    const playerUrl = `${BASE_URL}/players/${username}`;
    console.info(`playerUrl ${playerUrl}`);
    const { data: player } = await axios.post<ChessPlayer>(playerUrl);
    console.info(player, 'player');
    const { archives = [] } = player;
    archives.reverse();
    for (const archive of archives) {
      await syncGames(username, archive);
    }
  } catch (error) {
    console.error(`syncArchives error=${error}`);
  }
};

const main = async () => {
  if (USERNAME !== '') {
    await syncArchives(USERNAME);
    return;
  }

  const usernames: string[] = ['hikaru'];
  for (const username of usernames) {
    await syncArchives(username);
  }
};

main();
