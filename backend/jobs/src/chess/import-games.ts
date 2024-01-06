import {
  PrismaClient,
  ChessTimeClass,
  ChessResult,
  ChessVariant,
} from '@prisma/client';
import axios from 'axios';

const PUBLIC_URL: string = 'https://api.chess.com/pub';

type Game = {
  url: string;
  pgn: string;
  time_control: string;
  end_time: string;
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
    console.error('getGames error');
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
      for (const game of games) {
        const {
          uuid: id,
          url,
          pgn,
          time_control: timeControl,
          time_class: timeClass,
          end_time,
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
        const whiteResult2: ChessResult =
          whiteResult === '50move' ? 'fiftymove' : (whiteResult as ChessResult);
        const blackResult2: ChessResult =
          blackResult === '50move' ? 'fiftymove' : (blackResult as ChessResult);
        const body = {
          id,
          url,
          pgn,
          timeControl,
          timeClass: timeClass as ChessTimeClass,
          endTime: new Date(end_time),
          rated,
          tcn,
          initialSetup,
          rules: rules as ChessVariant,
          fen,
          whiteAccuracy,
          blackAccuracy,
          whiteUsername,
          blackUsername,
          whiteRating,
          blackRating,
          whiteResult: whiteResult2,
          blackResult: blackResult2,
        };
        try {
          await prismaClient.chessGame.upsert({
            create: body,
            update: body,
            where: { id },
          });
        } catch (error) {
          console.error('chessGame.upsert error', error);
        }
      }
    }
  } catch (error) {
    console.error('getArchives error');
  }
};

const main = async () => {
  const prismaClient = new PrismaClient();
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
    await getArchives(prismaClient, username);
  }
};

main();
