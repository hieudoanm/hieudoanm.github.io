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
      const paths: string[] = archive.split('/');
      const filename = paths.slice(paths.length - 2).join('-');
      const folder: string = `../../resources/pgn/${username}`;
      const folderExists: boolean = existsSync(folder);
      if (!folderExists) mkdirSync(folder);
      const file: string = `${folder}/${filename}.pgn`;
      const fileExists: boolean = existsSync(file);
      if (fileExists) continue;
      const pgn: string = await getPGN(archive);
      writeFileSync(file, pgn);
    }
  } catch (error) {
    console.error('error', error);
  }
};

const main = async () => {
  const usernames = [
    'azerichess', // Shakhriyar Mamedyarov
    'chesswarrior7197', // Nodirbek Abdusattorov
    'danielnaroditsky', // Daniel Naroditsky
    'duhless', // Daniil Dubov
    'fabianocaruana', // Fabiano Caruana
    'firouzja2003', // Alireza Firouzja
    'gmwso', // Wesley So
    'grischuk', // Alexander Grischuk
    'hikaru', // Hikaru Nakamura
    'levonaronian', // Levon Aronian
    'liemle', // Liem Le
    'lyonbeast', // MVL
    'magnuscarlsen', // Magnus Carlsen
    'thedarkknighttrilogy',
    'thevish', // Viswanathan Anand
    'sergeykarjakin', // Sergey Karjakin
    'wonderfultime', // Tuan Minh Le
  ];
  console.log(usernames.length);
  for (const username of usernames) {
    await getArchives(username);
  }
};

main();
