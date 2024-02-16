'use client';

import { gql } from '@apollo/client';
import {
  DRAW_RESULTS,
  LOSS_RESULTS,
  WIN_RESULTS,
} from '@chess/common/constants/chess.constants';
import { NEXT_PUBLIC_GRAPHQL_URI } from '@chess/common/environments/environments';
import { getApolloClient } from '@chess/graphql/apollo/client';
import { ChessGame, ChessResult, ChessTimeClass } from '@prisma/client';
import Link from 'next/link';
import {
  FaBolt,
  FaClock,
  FaRocket,
  FaSearchengin,
  FaSync,
} from 'react-icons/fa';

const getPoint = (result: ChessResult): number => {
  if (WIN_RESULTS.includes(result)) {
    return 1;
  }
  if (DRAW_RESULTS.includes(result)) {
    return 0.5;
  }
  if (LOSS_RESULTS.includes(result)) {
    return 0;
  }
  return -1;
};

const TimeClassIcon: React.FC<{ timeClass: ChessTimeClass }> = ({
  timeClass = '',
}) => {
  if (timeClass === ChessTimeClass.bullet) {
    return <FaRocket />;
  }
  if (timeClass === ChessTimeClass.rapid) {
    return <FaClock />;
  }
  if (timeClass === ChessTimeClass.blitz) {
    return <FaBolt />;
  }
  return <></>;
};

const FONT_SEMIBOLD = 'font-semibold';

const mutation = gql`
  mutation SyncGames($username: String!) {
    chess {
      games(username: $username) {
        existed
        synced
        total
      }
    }
  }
`;

type PlayerGamesTemplateProperties = {
  username: string;
  games: ChessGame[];
};

export const PlayerGamesTemplate: React.FC<PlayerGamesTemplateProperties> = ({
  username,
  games = [],
}) => {
  const syncGames = async () => {
    await getApolloClient(NEXT_PUBLIC_GRAPHQL_URI).mutate({
      mutation,
      variables: { username },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
        <div className="card border border-gray-200 shadow">
          <div className="py-4 px-8">
            <div className="flex items-center justify-between">
              <p className="text-xl">Games ({games.length})</p>
              <button
                type="button"
                className="bg-teal-500 text-white btn"
                onClick={syncGames}>
                <FaSync />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            {games.map(
              ({
                id,
                timeClass,
                whiteUsername,
                blackUsername,
                whiteResult,
                whiteRating,
                blackResult,
                blackRating,
                endTime,
              }: ChessGame) => {
                return (
                  <div key={id} className="border-t p-2 md:p-4">
                    <div className="flex items-center justify-between gap-2 md:gap-4">
                      <div className="flex items-center gap-x-2 md:gap-x-4">
                        <div>
                          <TimeClassIcon timeClass={timeClass} />
                        </div>
                        <div>
                          <Link
                            href={`/players/${encodeURIComponent(
                              whiteUsername
                            )}`}
                            className={`block ${
                              whiteUsername === username ? FONT_SEMIBOLD : ''
                            }`}>
                            {whiteUsername} ({whiteRating})
                          </Link>
                          <Link
                            href={`/players/${encodeURIComponent(
                              blackUsername
                            )}`}
                            className={`block ${
                              blackUsername === username ? FONT_SEMIBOLD : ''
                            }`}>
                            {blackUsername} ({blackRating})
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-2 md:gap-x-4">
                        <div className="text-right">
                          <p
                            className={
                              whiteUsername === username ? FONT_SEMIBOLD : ''
                            }>
                            {getPoint(whiteResult)}
                          </p>
                          <p
                            className={
                              blackUsername === username ? FONT_SEMIBOLD : ''
                            }>
                            {getPoint(blackResult)}
                          </p>
                        </div>
                        <div>
                          <p>{endTime.toString().split('T')[0]}</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="bg-teal-500 text-white btn">
                            <FaSearchengin />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      {/* <div className="toast toast-center none">
        <div className="alert bg-teal-500 text-white">
          <span>New mail arrived.</span>
        </div>
      </div> */}
    </>
  );
};
