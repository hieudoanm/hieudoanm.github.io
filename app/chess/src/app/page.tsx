import {
  DocumentNode,
  OperationVariables,
  QueryOptions,
  gql,
} from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { CHESS_USERNAME } from '@chess/common/constants/chess.constants';
import { logger } from '@chess/common/libs/logger';
import { Insights } from '@chess/common/types/chess';
import { query } from '@chess/graphql/apollo/client';
import { PlayerInsightsTemplate } from '@chess/shared/templates/PlayerInsightsTemplate';
import {
  ChessPlayer,
  ChessTimeClass,
  ChessTitleAbbreviation,
  ChessVariant,
} from '@prisma/client';
import { NextPage } from 'next';
import Head from 'next/head';

const playerInsightsQuery: DocumentNode = gql`
  query PlayerQuery($username: String!, $timeClass: String, $variant: String) {
    chess {
      player(username: $username, timeClass: $timeClass, variant: $variant) {
        username
        avatar
        title
        name
        insights {
          accuracy {
            average
            win
            draw
            loss
            periods {
              average
              period
            }
            timeOfDays {
              average
              timeOfDay
            }
            daysOfWeek {
              average
              dayOfWeek
            }
          }
          games {
            total
            win
            draw
            loss
            periods {
              games
              period
            }
            timeOfDays {
              games
              timeOfDay
            }
            daysOfWeek {
              games
              dayOfWeek
            }
          }
          opponents {
            opponent
            games
            win
            draw
            loss
          }
          results {
            win {
              result
              count
            }
            draw {
              result
              count
            }
            loss {
              result
              count
            }
            timeOfDays {
              win
              draw
              loss
              timeOfDay
            }
            daysOfWeek {
              win
              draw
              loss
              dayOfWeek
            }
            opponents {
              rating
              win
              draw
              loss
            }
            endPhrases {
              phrase
              win
              draw
              loss
            }
          }
        }
      }
    }
  }
`;

type PlayerData = { chess: { player: ChessPlayer & { insights: Insights } } };

type HomePageProperties = {
  searchParams: {
    username: string;
    timeClass: ChessTimeClass;
    variant: ChessVariant;
  };
};

const HomePage: NextPage<HomePageProperties> = async ({ searchParams }) => {
  const username: string = searchParams.username ?? CHESS_USERNAME;
  const timeClass: ChessTimeClass =
    searchParams.timeClass ?? ChessTimeClass.blitz;
  const variant: ChessVariant = searchParams.variant ?? ChessVariant.chess;
  logger.info(
    `HomePage username=${username} timeClass=${timeClass} variant=${variant}`
  );

  const queryOptions: QueryOptions<OperationVariables, PlayerData> = {
    query: playerInsightsQuery,
    variables: { username, timeClass, variant },
  };
  const data: PlayerData = await query<PlayerData>(
    'playerInsightsQuery',
    queryOptions
  );
  const name: string = data?.chess?.player?.name ?? '';
  const avatar: string = data?.chess?.player?.avatar ?? '';
  const title: ChessTitleAbbreviation =
    data?.chess?.player?.title ?? ('' as ChessTitleAbbreviation);
  const insights: Insights = data?.chess?.player?.insights ?? [];

  return (
    <>
      <Head>
        <title>{APP_NAME} - Home</title>
      </Head>
      <PlayerInsightsTemplate
        name={name}
        title={title}
        avatar={avatar}
        username={username}
        insights={insights}
      />
    </>
  );
};

export default HomePage;
