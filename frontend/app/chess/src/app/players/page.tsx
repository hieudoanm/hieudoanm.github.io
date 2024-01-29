import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { logger } from '@chess/common/libs/logger';
import { query } from '@chess/graphql/apollo/client';
import { PlayersTemplate } from '@chess/templates/PlayersTemplate';
import {
  ChessCountry,
  ChessPlayer,
  ChessStats,
  ChessTitleAbbreviation,
} from '@prisma/client';
import type { NextPage } from 'next';
import Head from 'next/head';

const playersQuery = gql`
  query PlayersQuery(
    $limit: Int
    $offset: Int
    $title: String
    $isStreamer: Boolean
    $countryCode: String
  ) {
    chess {
      players(
        limit: $limit
        offset: $offset
        title: $title
        isStreamer: $isStreamer
        countryCode: $countryCode
      ) {
        total
        titles {
          title
        }
        countries {
          countryCode
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

type PlayersData = {
  chess: {
    players: {
      total: number;
      titles: { title: ChessTitleAbbreviation }[];
      countries: { countryCode: string }[];
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
  logger.info(
    { limit, offset, title, isStreamer, countryCode },
    'PlayersPage searchParams'
  );

  const queryOptions: QueryOptions<OperationVariables, PlayersData> = {
    query: playersQuery,
    variables: { limit, offset, title, isStreamer, countryCode },
  };
  const data: PlayersData = await query<PlayersData>(
    'playersQuery',
    queryOptions
  );
  const total = data?.chess?.players?.total ?? 0;
  const titles = data?.chess?.players?.titles ?? [];
  const countries = data?.chess?.players?.countries ?? [];
  const players = data?.chess?.players?.players ?? [];
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
      />
    </>
  );
};

export default PlayersPage;
