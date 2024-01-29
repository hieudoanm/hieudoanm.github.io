import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { logger } from '@chess/common/libs/logger';
import { TimeRange } from '@chess/common/types/time';
import { query } from '@chess/graphql/apollo/client';
import { PlayersTemplate } from '@chess/templates/PlayersTemplate';
import {
  ChessCountry,
  ChessPlayer,
  ChessStats,
  ChessTimeClass,
  ChessTitle,
  ChessTitleAbbreviation,
} from '@prisma/client';
import type { NextPage } from 'next';
import Head from 'next/head';

const playersQuery = gql`
  query PlayersQuery(
    $limit: Int
    $offset: Int
    $title: String
    $timeClass: String
    $timeRange: String
    $isStreamer: Boolean
    $countryCode: String
  ) {
    chess {
      countries {
        cca2
        cca3
        name
        flag
      }
      titled {
        abbreviation
        title
      }
      players(
        title: $title
        limit: $limit
        offset: $offset
        timeClass: $timeClass
        timeRange: $timeRange
        isStreamer: $isStreamer
        countryCode: $countryCode
      ) {
        total
        titles {
          title
          total
        }
        countries {
          countryCode
          total
        }
        players {
          timeClass
          best
          last
          deviation
          win
          draw
          loss
          player {
            id
            username
            name
            followers
            avatar
            location
            verified
            lastOnline
            joined
            status
            title
            league
            twitchUrl
            isStreamer
            countryCode
            archives
            country {
              cca2
              cca3
              name
              flag
            }
          }
        }
      }
    }
  }
`;

export type TitleTotal = { title: ChessTitleAbbreviation; total: number };

export type CountryTotal = { countryCode: string; total: number };

type PlayersData = {
  chess: {
    countries: ChessCountry[];
    titled: ChessTitle[];
    players: {
      total: number;
      titles: TitleTotal[];
      countries: CountryTotal[];
      players: (ChessStats & {
        player: ChessPlayer & { country: ChessCountry };
      })[];
    };
  };
};

type PlayersPageProperties = {
  searchParams: {
    limit: string;
    offset: string;
    title: ChessTitleAbbreviation;
    isStreamer: string;
    countryCode: string;
    timeRange: TimeRange;
    timeClass: ChessTimeClass;
  };
};

const PlayersPage: NextPage<PlayersPageProperties> = async ({
  searchParams,
}: PlayersPageProperties) => {
  const limit: number = Number.parseInt(searchParams.limit ?? '100', 10);
  const offset: number = Number.parseInt(searchParams.offset ?? '0', 10);
  const title: ChessTitleAbbreviation = searchParams.title ?? undefined;
  const countryCode: string = searchParams.countryCode ?? '';
  const isStreamer: boolean = (searchParams.isStreamer ?? '') === 'true';
  const timeRange: TimeRange = searchParams.timeRange ?? undefined;
  const timeClass: ChessTimeClass = searchParams.timeClass ?? 'blitz';
  logger.info(
    { limit, offset, title, timeRange, timeClass, isStreamer, countryCode },
    'PlayersPage searchParams'
  );

  const queryOptions: QueryOptions<OperationVariables, PlayersData> = {
    query: playersQuery,
    variables: {
      title,
      limit,
      offset,
      timeClass,
      timeRange,
      isStreamer,
      countryCode,
    },
  };
  const data: PlayersData = await query<PlayersData>(
    'playersQuery',
    queryOptions
  );
  const titleOptions = data?.chess?.titled ?? [];
  const countryOptions = data?.chess?.countries ?? [];
  const total = data?.chess?.players?.total ?? 0;
  const titles = data?.chess?.players?.titles ?? [];
  const players = data?.chess?.players?.players ?? [];
  const countries = data?.chess?.players?.countries ?? [];
  logger.info(`PlayersPage players=${players.length}`);

  return (
    <>
      <Head>
        <title>{APP_NAME} - Players</title>
      </Head>
      <PlayersTemplate
        total={total}
        titles={titles}
        players={players}
        countries={countries}
        titleOptions={titleOptions}
        countryOptions={countryOptions}
      />
    </>
  );
};

export default PlayersPage;
