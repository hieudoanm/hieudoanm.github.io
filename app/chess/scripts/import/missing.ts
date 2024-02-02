import { PrismaClient } from '@prisma/client';
import { getTitledPlayers } from '../client/chess.client';
import { TITLES } from '../constants/chess.constants';
import axios from 'axios';

const getTitled = async (): Promise<Set<string>> => {
  const usernames: Set<string> = new Set<string>();
  for (const title of TITLES) {
    const players: string[] = await getTitledPlayers(title);
    console.log(`${title} ${players.length}`);
    for (const player of players) {
      usernames.add(player);
    }
  }
  return usernames;
};

const syncPlayerByAPI = async (username: string) => {
  try {
    const url = `https://chessinsights.vercel.app/api/chess/players/${username}`;
    const { data } = await axios.get<{ id: number; username: string }>(url);
    const { id } = data;
    return `${username} ${id}`;
  } catch (error) {
    console.error(`${username} error=${error}`);
    return `${username} ERROR`;
  }
};

const main = async () => {
  const prismaClient = new PrismaClient();
  const players = await prismaClient.chessPlayer.findMany({
    select: { username: true },
    where: { title: { not: null } },
  });

  const usernamesFromAPI: Set<string> = await getTitled();
  console.log(usernamesFromAPI.size);

  const usernamesFromDB: Set<string> = new Set(
    players.map(({ username }) => username)
  );
  console.log(usernamesFromDB.size);

  const missingUsernames = new Set<string>();

  for (const username of usernamesFromAPI) {
    if (!usernamesFromDB.has(username)) {
      missingUsernames.add(username);
    }
  }

  console.log(missingUsernames);

  for (const username of missingUsernames) {
    await syncPlayerByAPI(username);
  }
};

main();
