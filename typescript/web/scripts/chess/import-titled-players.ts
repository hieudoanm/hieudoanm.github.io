import { PrismaClient, Title } from '@prisma/client';

const prismaClient = new PrismaClient();

const titles: Title[] = [
  'GM',
  'IM',
  'FM',
  'CM',
  'NM',
  'WGM',
  'WIM',
  'WFM',
  'WCM',
  'WNM',
];

const chunk = <T>(array: T[], count: number) => {
  return array.reduce((result: T[][], item: T, index: number) => {
    const chunkIndex: number = Math.floor(index / count);

    if (!result[chunkIndex]) {
      result[chunkIndex] = [];
    }

    result[chunkIndex].push(item);

    return result;
  }, []);
};

const getTitled = async (title: Title): Promise<string[]> => {
  const url = `https://api.chess.com/pub/titled/${title}`;
  const response = await fetch(url);
  const data: { players: string[] } = await response.json();
  const { players = [] } = data;
  return players;
};

type Player = {
  avatar: string;
  player_id: number;
  '@id': string;
  url: string;
  name: string;
  username: string;
  title: Title;
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
  streaming_platforms: string[];
};

type Stats = {
  chess_rapid: {
    last: { rating: number; date: number; rd: number };
    best: { rating: number; date: number; game: string };
    record: { win: number; loss: number; draw: number };
  };
  chess_bullet: {
    last: { rating: number; date: number; rd: number };
    best: { rating: number; date: number; game: string };
    record: { win: number; loss: number; draw: number };
  };
  chess_blitz: {
    last: { rating: number; date: number; rd: number };
    best: { rating: number; date: number; game: string };
    record: { win: number; loss: number; draw: number };
  };
};

const getPlayer = async (playerUsername: string) => {
  try {
    // Player
    const playerUrl = `https://api.chess.com/pub/player/${playerUsername}`;
    const playerResponse = await fetch(playerUrl);
    const player: Player = await playerResponse.json();
    const {
      player_id: id = 0,
      username = '',
      avatar = '',
      name = '',
      title = Title.GM,
      status = '',
      league = '',
      url = '',
      twitch_url: twitchUrl = '',
      is_streamer: isStreamer = false,
      verified = false,
      last_online: lastOnline = 0,
      joined = 0,
      country: countryUrl = '',
    } = player;
    // Country
    const countryResponse = await fetch(countryUrl);
    const { code: countryCode, name: country } = await countryResponse.json();
    // Stats
    const statsUrl = `https://api.chess.com/pub/player/${playerUsername}/stats`;
    const statsResponse = await fetch(statsUrl);
    const stats: Stats = await statsResponse.json();
    const {
      chess_rapid: {
        best: { rating: rapidRatingBest = 0 } = { rating: 0 },
        last: { rating: rapidRatingLast = 0, rd: rapidRatingDeviation = 0 } = {
          rating: 0,
          rd: 0,
        },
        record: {
          win: rapidRecordWin = 0,
          draw: rapidRecordDraw = 0,
          loss: rapidRecordLoss = 0,
        } = { win: 0, draw: 0, loss: 0 },
      } = {
        best: { rating: 0 },
        last: { rating: 0, rd: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
      chess_blitz: {
        best: { rating: blitzRatingBest = 0 } = { rating: 0 },
        last: { rating: blitzRatingLast = 0, rd: blitzRatingDeviation = 0 } = {
          rating: 0,
          rd: 0,
        },
        record: {
          win: blitzRecordWin = 0,
          draw: blitzRecordDraw = 0,
          loss: blitzRecordLoss = 0,
        } = { win: 0, draw: 0, loss: 0 },
      } = {
        best: { rating: 0 },
        last: { rating: 0, rd: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
      chess_bullet: {
        best: { rating: bulletRatingBest = 0 } = { rating: 0 },
        last: {
          rating: bulletRatingLast = 0,
          rd: bulletRatingDeviation = 0,
        } = {
          rating: 0,
          rd: 0,
        },
        record: {
          win: bulletRecordWin = 0,
          draw: bulletRecordDraw = 0,
          loss: bulletRecordLoss = 0,
        } = { win: 0, draw: 0, loss: 0 },
      } = {
        best: { rating: 0 },
        last: { rating: 0, rd: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
    } = stats;
    await prismaClient.player.upsert({
      create: {
        id,
        username,
        avatar,
        name,
        title,
        status,
        league,
        url,
        twitchUrl,
        isStreamer,
        verified,
        lastOnline: new Date(lastOnline * 1000),
        joined: new Date(joined * 1000),
        country,
        countryCode,
        rapidRatingBest,
        rapidRatingLast,
        rapidRatingDeviation,
        rapidRecordWin,
        rapidRecordDraw,
        rapidRecordLoss,
        blitzRatingBest,
        blitzRatingLast,
        blitzRatingDeviation,
        blitzRecordWin,
        blitzRecordDraw,
        blitzRecordLoss,
        bulletRatingBest,
        bulletRatingLast,
        bulletRatingDeviation,
        bulletRecordWin,
        bulletRecordDraw,
        bulletRecordLoss,
      },
      update: {
        id,
        username,
        avatar,
        name,
        title,
        status,
        league,
        url,
        twitchUrl,
        isStreamer,
        verified,
        lastOnline: new Date(lastOnline * 1000),
        joined: new Date(joined * 1000),
        country,
        countryCode,
        rapidRatingBest,
        rapidRatingLast,
        rapidRatingDeviation,
        rapidRecordWin,
        rapidRecordDraw,
        rapidRecordLoss,
        blitzRatingBest,
        blitzRatingLast,
        blitzRatingDeviation,
        blitzRecordWin,
        blitzRecordDraw,
        blitzRecordLoss,
        bulletRatingBest,
        bulletRatingLast,
        bulletRatingDeviation,
        bulletRecordWin,
        bulletRecordDraw,
        bulletRecordLoss,
      },
      where: { id },
    });
  } catch (error) {
    console.error(playerUsername, error);
  }
};

const getPlayers = (usernames: string[]): Promise<'OK' | 'ERROR'> => {
  return new Promise((resolve, reject) => {
    Promise.all(
      usernames.map(async (username) => {
        return await getPlayer(username);
      })
    )
      .then(() => {
        resolve('OK');
      })
      .catch(() => {
        reject('ERROR');
      });
  });
};

const getExistingUsernames = async (
  existing: boolean = true
): Promise<Set<string>> => {
  if (!existing) return new Set<string>();
  const existingPlayers = await prismaClient.player.findMany({
    select: { username: true },
  });
  const existingUsernames: string[] = existingPlayers.map(
    ({ username }) => username
  );
  const existingUsernamesSet: Set<string> = new Set(existingUsernames);
  return existingUsernamesSet;
};

const main = async () => {
  const existingUsernamesSet: Set<string> = await getExistingUsernames(true);
  titles.reverse();
  for (const title of titles) {
    const usernames = await getTitled(title);
    const usernamesSet: Set<string> = new Set(usernames);
    const newUsernamesSet = new Set(
      [...usernamesSet].filter((x) => !existingUsernamesSet.has(x))
    );
    const newUsernames: string[] = [...newUsernamesSet];
    console.info('========='.repeat(5));
    console.info(title, newUsernames.length);
    const chunkUsernames = chunk(newUsernames, 10);
    for (const usernames of chunkUsernames) {
      console.info(title, usernames);
      await getPlayers(usernames);
    }
  }
};

main().catch(console.error);
