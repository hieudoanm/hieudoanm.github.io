import axios from 'axios';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const PUBLIC_URL: string = 'https://api.chess.com/pub';

const addZero = (number: number): string => {
  return number > 9 ? `${number}` : `0${number}`;
};

const getPGN = async (archive: string) => {
  // PGN
  console.log(`archive=${archive}`);
  const pgnUrl = `${archive}/pgn`;
  const { data } = await axios.get<string>(pgnUrl);
  return data;
};

const getArchives = async (username: string, current: string, title = '') => {
  try {
    // Archives
    console.log(`username=${username}`);
    const archivesUrl = `${PUBLIC_URL}/player/${username}/games/archives`;
    const { data } = await axios.get<{ archives: string[] }>(archivesUrl);
    const { archives = [] } = data;
    archives.reverse();
    for (const archive of archives) {
      const paths: string[] = archive.split('/');
      const filename = paths.slice(-2).join('-');
      const folder: string = ['..', '..', 'resources', 'pgn', title, username]
        .filter((path) => path !== '')
        .join('/');
      const folderExists: boolean = existsSync(folder);
      if (!folderExists) mkdirSync(folder);
      const file: string = `${folder}/${filename}.pgn`;
      const fileExists: boolean = existsSync(file);
      if (fileExists && current !== filename) continue;
      const pgn: string = await getPGN(archive);
      writeFileSync(file, pgn);
    }
  } catch (error) {
    console.error('error', error);
  }
};

const main = async () => {
  const d: Date = new Date();
  const month: number = d.getMonth() + 1;
  const year: number = d.getFullYear();
  const current = `${year}-${addZero(month)}.pgn`;
  const usernames = [
    { username: 'thedarkknighttrilogy', title: '' },
    { username: 'anishgiri', title: 'gm' }, // Anish Giri
    { username: 'azerichess', title: 'gm' }, // Shakhriyar Mamedyarov
    { username: 'chesswarrior7197', title: 'gm' }, // Nodirbek Abdusattorov
    { username: 'chefshouse', title: 'gm' }, // Ding Liren
    { username: 'crescentmoon2411', title: 'gm' }, // Nguyen Ngoc Truong Son
    { username: 'danielnaroditsky', title: 'gm' }, // Daniel Naroditsky
    { username: 'duhless', title: 'gm' }, // Daniil Dubov
    { username: 'fabianocaruana', title: 'gm' }, // Fabiano Caruana
    { username: 'firouzja2003', title: 'gm' }, // Alireza Firouzja
    { username: 'ghandeevam2003', title: 'gm' }, // Arjun Erigaisi
    { username: 'gmwso', title: 'gm' }, // Wesley So
    { username: 'grischuk', title: 'gm' }, // Alexander Grischuk
    { username: 'gukeshdommaraju', title: 'gm' }, // Gukesh D
    { username: 'hikaru', title: 'gm' }, // Hikaru Nakamura
    { username: 'lachesisq', title: 'gm' }, // Ian Nepomniachtchi
    { username: 'levonaronian', title: 'gm' }, // Levon Aronian
    { username: 'liemle', title: 'gm' }, // Liem Le
    { username: 'lyonbeast', title: 'gm' }, // MVL
    { username: 'magnuscarlsen', title: 'gm' }, // Magnus Carlsen
    { username: 'nihalsarin', title: 'gm' }, // Nihal Sarin
    { username: 'polish_fighter3000', title: 'gm' }, // Jan-Krzysztof Duda
    { username: 'thevish', title: 'gm' }, // Viswanathan Anand
    { username: 'tradjabov', title: 'gm' }, // Teimour Radjabov
    { username: 'viditchess', title: 'gm' }, // Vidit Gujrathi
    { username: 'vincentkeymer', title: 'gm' }, // Vincent Keymer
    { username: 'vladimirkramnik', title: 'gm' }, // Vladimir Kramnik
    { username: 'rpragchess', title: 'gm' }, // Praggnanandhaa Rameshbabu
    { username: 'sergeykarjakin', title: 'gm' }, // Sergey Karjakin
    { username: 'wonderfultime', title: 'gm' }, // Tuan Minh Le
    { username: 'yifan0227', title: 'gm' }, // Hou Yifan
  ];
  console.log(usernames.length);
  for (const { username, title } of usernames) {
    await getArchives(username, current, title);
  }
};

main();
