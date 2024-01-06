import axios from 'axios';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const PUBLIC_URL: string = 'https://api.chess.com/pub';

const getPGN = async (archive: string) => {
  // PGN
  console.log(`archive=${archive}`);
  const pgnUrl = `${archive}/pgn`;
  const { data } = await axios.get<string>(pgnUrl);
  return data;
};

const getArchives = async (username: string) => {
  try {
    // Archives
    console.log(`username=${username}`);
    const archivesUrl = `${PUBLIC_URL}/player/${username}/games/archives`;
    const { data } = await axios.get<{ archives: string[] }>(archivesUrl);
    const { archives = [] } = data;
    archives.reverse();
    for (const archive of archives) {
      const pgn: string = await getPGN(archive);
      const paths: string[] = archive.split('/');
      const filename = paths.slice(paths.length - 2).join('-');
      const folder: string = `../../resources/pgn/${username}`;
      const exists: boolean = existsSync(folder);
      if (!exists) mkdirSync(folder);
      writeFileSync(`${folder}/${filename}.pgn`, pgn);
    }
  } catch (error) {
    console.error('error', error);
  }
};

const main = async () => {
  const usernames = [
    'azerichess', // Shakhriyar Mamedyarov
    'danielnaroditsky',
    'fabianocaruana',
    'firouzja2003',
    'gmwso', // Wesley So
    'hikaru',
    'levonaronian',
    'liemle',
    'lyonbeast', // MVL
    'magnuscarlsen',
    'thedarkknighttrilogy',
    'wonderfultime',
  ];
  console.log(usernames.length);
  for (const username of usernames) {
    await getArchives(username);
  }
};

main();
