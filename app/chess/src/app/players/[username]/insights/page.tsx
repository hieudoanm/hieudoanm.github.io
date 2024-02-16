import {
  DocumentNode,
  OperationVariables,
  QueryOptions,
  gql,
} from '@apollo/client';
import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { APP_NAME } from '@chess/common/constants/app.constants';
import {
  DANIEL_CHESS_USERNAME,
  HIKARU_CHESS_USERNAME,
  MAGNUS_CHESS_USERNAME,
} from '@chess/common/constants/chess.constants';
import { logger } from '@chess/common/libs/logger';
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
          openings {
            white {
              opening
              pgn
              total
              win
              draw
              loss
            }
            black {
              opening
              pgn
              total
              win
              draw
              loss
            }
          }
          moves {
            pieces {
              king
              queen
              rook
              bishop
              knight
              pawn
            }
            castling {
              short {
                short {
                  win
                  draw
                  loss
                }
                long {
                  win
                  draw
                  loss
                }
                none {
                  win
                  draw
                  loss
                }
              }
              long {
                short {
                  win
                  draw
                  loss
                }
                long {
                  win
                  draw
                  loss
                }
                none {
                  win
                  draw
                  loss
                }
              }
              none {
                short {
                  win
                  draw
                  loss
                }
                long {
                  win
                  draw
                  loss
                }
                none {
                  win
                  draw
                  loss
                }
              }
            }
          }
          geography {
            flag
            code
            name
            total
            win
            draw
            loss
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

type InsightsPageProperties = {
  params: { username: string };
  searchParams: { timeClass: ChessTimeClass; variant: ChessVariant };
};

const InsightsPage: NextPage<InsightsPageProperties> = async ({
  params,
  searchParams,
}: InsightsPageProperties) => {
  const username: string = params.username ?? HIKARU_CHESS_USERNAME;
  const timeClass: ChessTimeClass =
    searchParams.timeClass ?? ChessTimeClass.blitz;
  const variant: ChessVariant = searchParams.variant ?? ChessVariant.chess;
  logger.info(
    `InsightsPage username=${username} timeClass=${timeClass} variant=${variant}`
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
        <title>
          {APP_NAME} - {username} - Insights
        </title>
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

// eslint-disable-next-line unicorn/prevent-abbreviations
export const generateStaticParams = () => {
  return [
    { username: DANIEL_CHESS_USERNAME },
    { username: HIKARU_CHESS_USERNAME },
    { username: MAGNUS_CHESS_USERNAME },
  ];
};

export default InsightsPage;
