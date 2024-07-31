import { PrismaClient, Result, TimeClass, Variant } from '@prisma/client';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PUBLIC_URL: string = 'https://api.chess.com/pub';

type Game = {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  tcn: string;
  uuid: string;
  initial_setup: string;
  fen: string;
  time_class: string;
  rules: string;
  accuracies: { white: number; black: number };
  white: { rating: number; result: string; username: string };
  black: { rating: number; result: string; username: string };
};

const getGames = async (archive: string): Promise<Game[]> => {
  try {
    const { data } = await axios.get<{ games: Game[] }>(archive);
    const { games = [] } = data;
    return games;
  } catch (error) {
    console.error(`getGames error=${error}`);
    return [];
  }
};

const getArchives = async (prismaClient: PrismaClient, username: string) => {
  try {
    console.log(`username=${username}`);
    const archivesUrl = `${PUBLIC_URL}/player/${username}/games/archives`;
    const { data } = await axios.get<{ archives: string[] }>(archivesUrl);
    const { archives = [] } = data;
    archives.reverse();
    for (const archive of archives) {
      const games = await getGames(archive);
      console.info(`archive=${archive} games=${games.length}`);
      for (const game of games) {
        const {
          uuid,
          url,
          pgn,
          time_control: timeControl,
          time_class: timeClass,
          end_time: endTime,
          rated,
          tcn,
          initial_setup: initialSetup,
          rules,
          fen,
          accuracies: { white: whiteAccuracy = 0, black: blackAccuracy = 0 } = {
            white: 0,
            black: 0,
          },
          white: {
            username: whiteUsername = '',
            result: whiteResult = '',
            rating: whiteRating = 0,
          } = { username: '', result: '', rating: 0 },
          black: {
            username: blackUsername = '',
            result: blackResult = '',
            rating: blackRating = 0,
          } = { username: '', result: '', rating: 0 },
        } = game;
        const whiteResult2: Result =
          whiteResult === '50move' ? 'fiftymove' : (whiteResult as Result);
        const blackResult2: Result =
          blackResult === '50move' ? 'fiftymove' : (blackResult as Result);
        const body = {
          uuid,
          url,
          pgn,
          timeControl,
          timeClass: timeClass as TimeClass,
          endTime: new Date(endTime * 1000),
          rated,
          tcn,
          initialSetup,
          rules: rules as Variant,
          fen,
          whiteAccuracy,
          blackAccuracy,
          whiteUsername: whiteUsername.toLowerCase(),
          blackUsername: blackUsername.toLowerCase(),
          whiteRating,
          blackRating,
          whiteResult: whiteResult2,
          blackResult: blackResult2,
        };
        try {
          await prismaClient.game.upsert({
            create: body,
            update: body,
            where: { uuid },
          });
        } catch (error) {
          console.error('chessGame.upsert error', error, body);
        }
      }
    }
  } catch (error) {
    console.error(`getArchives error=${error}`);
  }
};

const CHESS_USERNAME = process.env.CHESS_USERNAME ?? '';

const main = async () => {
  const prismaClient = new PrismaClient();

  if (CHESS_USERNAME) {
    await getArchives(prismaClient, CHESS_USERNAME);
    return;
  }

  const usernames = [
    // { username: 'thedarkknighttrilogy', title: '' }, // Hieu Doan
    // { username: 'anishgiri', title: 'gm' }, // Anish Giri
    // { username: 'azerichess', title: 'gm' }, // Shakhriyar Mamedyarov
    // { username: 'chesswarrior7197', title: 'gm' }, // Nodirbek Abdusattorov
    { username: 'chefshouse', title: 'gm' }, // Ding Liren
    // { username: 'crescentmoon2411', title: 'gm' }, // Nguyen Ngoc Truong Son
    // { username: 'danielnaroditsky', title: 'gm' }, // Daniel Naroditsky
    // { username: 'duhless', title: 'gm' }, // Daniil Dubov
    // { username: 'fabianocaruana', title: 'gm' }, // Fabiano Caruana
    // { username: 'firouzja2003', title: 'gm' }, // Alireza Firouzja
    // { username: 'ghandeevam2003', title: 'gm' }, // Arjun Erigaisi
    // { username: 'gmwso', title: 'gm' }, // Wesley So
    // { username: 'grischuk', title: 'gm' }, // Alexander Grischuk
    // { username: 'gukeshdommaraju', title: 'gm' }, // Gukesh D
    // { username: 'hikaru', title: 'gm' }, // Hikaru Nakamura
    // { username: 'lachesisq', title: 'gm' }, // Ian Nepomniachtchi
    // { username: 'levonaronian', title: 'gm' }, // Levon Aronian
    // { username: 'liemle', title: 'gm' }, // Liem Le
    // { username: 'lyonbeast', title: 'gm' }, // MVL
    // { username: 'magnuscarlsen', title: 'gm' }, // Magnus Carlsen
    // { username: 'nihalsarin', title: 'gm' }, // Nihal Sarin
    // { username: 'polish_fighter3000', title: 'gm' }, // Jan-Krzysztof Duda
    // { username: 'thevish', title: 'gm' }, // Viswanathan Anand
    // { username: 'tradjabov', title: 'gm' }, // Teimour Radjabov
    // { username: 'viditchess', title: 'gm' }, // Vidit Gujrathi
    // { username: 'vincentkeymer', title: 'gm' }, // Vincent Keymer
    // { username: 'vladimirkramnik', title: 'gm' }, // Vladimir Kramnik
    // { username: 'rpragchess', title: 'gm' }, // Praggnanandhaa Rameshbabu
    // { username: 'sergeykarjakin', title: 'gm' }, // Sergey Karjakin
    // { username: 'wonderfultime', title: 'gm' }, // Tuan Minh Le
    // { username: 'yifan0227', title: 'gm' }, // Hou Yifan
  ];
  console.log(usernames.length);
  for (const { username } of usernames) {
    await getArchives(prismaClient, username);
  }
};

main();
