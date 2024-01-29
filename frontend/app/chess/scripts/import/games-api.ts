import { ChessPlayer } from '@prisma/client';
import axios from 'axios';

const USERNAME = process.env.USERNAME ?? '';

const BASE_URL = 'https://chessinsights.vercel.app/api/chess';
// const BASE_URL = 'http://localhost:3210/api/chess';

const syncGames = async (username: string) => {
  try {
    const playerUrl = `${BASE_URL}/players/${username}`;
    console.info(`playerUrl ${playerUrl}`);
    const { data: player } = await axios.get<ChessPlayer>(playerUrl, {
      method: 'POST',
    });
    console.info(player, 'player');
    const { archives = [] } = player;
    for (const archive of archives) {
      try {
        const [yyyy = '', mm = ''] = archive.split('/').slice(-2);
        const year: number = Number.parseInt(yyyy, 10);
        const month: number = Number.parseInt(mm, 10);
        const gamesUrl = `${BASE_URL}/players/${username}/games`;
        const data = { year, month };
        console.info(`gamesUrl ${gamesUrl}`, data);
        const { data: syncedData } = await axios.request<{
          total: number;
          synced: number;
          existed: number;
        }>({
          url: gamesUrl,
          method: 'post',
          data: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
        const { total = 0, synced = 0, existed = 0 } = syncedData;
        console.info(
          `games year=${year} month=${month} total=${total} synced=${synced} existed=${existed}`
        );
      } catch (error) {
        console.error(`error=${error}`);
      }
    }
  } catch (error) {
    console.error(`error=${error}`);
  }
};

const main = async () => {
  if (USERNAME !== '') {
    await syncGames(USERNAME);
    return;
  }

  const usernames: string[] = ['hikaru', 'thedarkknighttrilogy'];
  for (const username of usernames) {
    await syncGames(username);
  }
};

main();
