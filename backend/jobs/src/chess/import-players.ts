import {
  ChessTitle,
  League,
  PrismaClient,
  Status,
  ChessTimeClass,
} from '@prisma/client';
import axios from 'axios';
import chunk from 'lodash/chunk';

type Last = { rating: number; date: number; rd: number };

type Best = { rating: number; date: number; game: string };

type Record = { win: number; loss: number; draw: number };

type Stats = {
  chess_daily: {
    last: Last;
    best: Best;
    record: Record & {
      time_per_move: number;
      timeout_percent: number;
    };
  };
  chess960_daily: {
    last: Last;
    best: Best;
    record: Record & {
      time_per_move: number;
      timeout_percent: number;
    };
  };
  chess_rapid: {
    last: Last;
    best: Best;
    record: Record;
  };
  chess_bullet: {
    last: Last;
    best: Best;
    record: Record;
  };
  chess_blitz: {
    last: Last;
    best: Best;
    record: Record;
  };
  fide: number;
  tactics: {
    highest: { rating: number; date: number };
    lowest: { rating: number; date: number };
  };
  puzzle_rush: { best: { total_attempts: number; score: number } };
};

type Player = {
  avatar: string;
  player_id: number;
  '@id': string;
  url: string;
  name: string;
  username: string;
  title: string;
  followers: number;
  country: string;
  location: string;
  last_online: number;
  joined: number;
  status: string;
  is_streamer: boolean;
  twitch_url: string;
  verified: boolean;
  league: string;
};

const PUBLIC_URL: string = 'https://api.chess.com/pub';

const TITLES: string[] = [
  'GM',
  'WGM',
  'IM',
  'WIM',
  'FM',
  'WFM',
  'CM',
  'WCM',
  'NM',
  'WNM',
];

const getTitledPlayers = async (title: string): Promise<string[]> => {
  const url = `${PUBLIC_URL}/titled/${title}`;
  const { data } = await axios.get<{ players: string[] }>(url);
  const { players = [] } = data;
  return players;
};

const syncPlayer = async (
  prismaClient: PrismaClient,
  username: string
): Promise<string> => {
  try {
    // Archives
    console.log(`username=${username}`);
    const archivesUrl = `${PUBLIC_URL}/player/${username}/games/archives`;
    const { data } = await axios.get<{ archives: string[] }>(archivesUrl);
    const { archives = [] } = data;
    // Profile
    const url = `${PUBLIC_URL}/player/${username}`;
    const { data: player } = await axios.get<Player>(url);
    const {
      player_id: id,
      followers,
      avatar,
      location,
      verified,
      name,
      twitch_url: twitchUrl,
      is_streamer: isStreamer,
      last_online: lastOnline,
      joined,
      status,
      title,
      league,
    } = player;
    const body = {
      name,
      id,
      username,
      followers,
      avatar,
      location,
      twitchUrl,
      isStreamer,
      verified,
      joined: new Date(joined),
      lastOnline: new Date(lastOnline),
      status: status as Status,
      title: title as ChessTitle,
      league: league as League,
      archives,
    };
    await prismaClient.chessPlayer.upsert({
      create: body,
      update: body,
      where: { id },
    });
    // Stats
    const statsUrl = `${PUBLIC_URL}/player/${username}/stats`;
    const { data: stats } = await axios.get<Stats>(statsUrl);
    const {
      chess_daily: {
        last: { rating: dailyLastRating = 0, rd: dailyDeviation = 0 } = {
          rating: 0,
          rd: 0,
        },
        best: { rating: dailyBestRating = 0 } = { rating: 0 },
        record: {
          win: dailyWin = 0,
          draw: dailyDraw = 0,
          loss: dailyLoss = 0,
        } = { win: 0, draw: 0, loss: 0 },
      } = {
        last: { rating: 0, rd: 0 },
        best: { rating: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
      chess_blitz: {
        last: { rating: blitzLastRating, rd: blitzDeviation } = {
          rating: 0,
          rd: 0,
        },
        best: { rating: blitzBestRating } = { rating: 0 },
        record: { win: blitzWin, draw: blitzDraw, loss: blitzLoss } = {
          win: 0,
          draw: 0,
          loss: 0,
        },
      } = {
        last: { rating: 0, rd: 0 },
        best: { rating: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
      chess_bullet: {
        last: { rating: bulletLastRating, rd: bulletDeviation } = {
          rating: 0,
          rd: 0,
        },
        best: { rating: bulletBestRating } = { rating: 0 },
        record: { win: bulletWin, draw: bulletDraw, loss: bulletLoss } = {
          win: 0,
          draw: 0,
          loss: 0,
        },
      } = {
        last: { rating: 0, rd: 0 },
        best: { rating: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
      chess_rapid: {
        last: { rating: rapidLastRating = 0, rd: rapidDeviation = 0 } = {
          rating: 0,
          rd: 0,
        },
        best: { rating: rapidBestRating = 0 } = { rating: 0 },
        record: { win: rapidWin, draw: rapidDraw, loss: rapidLoss } = {
          win: 0,
          draw: 0,
          loss: 0,
        },
      } = {
        last: { rating: 0, rd: 0 },
        best: { rating: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
    } = stats;
    for (const { timeClass, last, best, deviation, win, draw, loss } of [
      {
        timeClass: 'bullet' as ChessTimeClass,
        last: bulletLastRating,
        best: bulletBestRating,
        deviation: bulletDeviation,
        win: bulletWin,
        draw: bulletDraw,
        loss: bulletLoss,
      },
      {
        timeClass: 'blitz' as ChessTimeClass,
        last: blitzLastRating,
        best: blitzBestRating,
        deviation: blitzDeviation,
        win: blitzWin,
        draw: blitzDraw,
        loss: blitzLoss,
      },
      {
        timeClass: 'rapid' as ChessTimeClass,
        last: rapidLastRating,
        best: rapidBestRating,
        deviation: rapidDeviation,
        win: rapidWin,
        draw: rapidDraw,
        loss: rapidLoss,
      },
      {
        timeClass: 'daily' as ChessTimeClass,
        last: dailyLastRating,
        best: dailyBestRating,
        deviation: dailyDeviation,
        win: dailyWin,
        draw: dailyDraw,
        loss: dailyLoss,
      },
    ]) {
      const body = {
        playerId: id,
        timeClass,
        best,
        last,
        deviation,
        win,
        draw,
        loss,
      };
      await prismaClient.chessStats.upsert({
        create: body,
        update: body,
        where: { playerId_timeClass: { playerId: id, timeClass } },
      });
    }
    return `${username} OK`;
  } catch (error) {
    console.error(`error ${error}`);
    return `${username} ERROR`;
  }
};

const main = async () => {
  const prismaClient = new PrismaClient();
  const usernames: Set<string> = new Set<string>();
  for (const title of TITLES) {
    const players: string[] = await getTitledPlayers(title);
    console.log(`${title} ${players.length}`);
    players.forEach(usernames.add, usernames);
  }
  console.log('usernames', usernames.size);
  const chunks = chunk(
    [...usernames].sort((a, b) => (a > b ? 1 : -1)),
    1
  );

  for (const chunk of chunks) {
    await Promise.all(
      chunk.map(async (username) => {
        return await syncPlayer(prismaClient, username);
      })
    ).then((responses: string[]) => {
      console.log('responses', responses);
    });
  }
};

main();
