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
  // PGN
  console.log(`archive=${archive}`);
  const { data } = await axios.get<{ games: Game[] }>(archive);
  const { games = [] } = data;
  return games;
};

const getArchives = async (prismaClient: PrismaClient, username: string) => {
  try {
    console.log(`username=${username}`);
    const archivesUrl = `${PUBLIC_URL}/player/${username}/games/archives`;
    const { data } = await axios.get<{ archives: string[] }>(archivesUrl);
    const { archives = [] } = data;
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
            result: whiteResult = 0,
            rating: whiteRating = 0,
          } = { username: '', result: 0, rating: 0 },
          black: {
            username: blackUsername = '',
            result: blackResult = 0,
            rating: blackRating = 0,
          } = { username: '', result: 0, rating: 0 },
        } = game;
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
          whiteResult: whiteResult as ChessResult,
          blackResult: blackResult as ChessResult,
        };
        await prismaClient.chessGame.upsert({
          create: body,
          update: body,
          where: { id },
        });
      }
    }
    archives.reverse();
  } catch (error) {
    console.error('error', error);
  }
};

const main = async () => {
  const prismaClient = new PrismaClient();
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
    'wonderfultime', // Le Minh Tuan
  ];
  console.log(usernames.length);
  for (const username of usernames) {
    await getArchives(prismaClient, username);
  }
};

main();
