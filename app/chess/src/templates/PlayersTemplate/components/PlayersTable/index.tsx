import { FullChessPlayer } from '@chess/app/api/chess/players/service';
import { TitleBadge } from '@chess/common/components/TitleBadge';
import { TwitchButton } from '@chess/common/components/TwitchButton';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { ChessStats, ChessTimeClass } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const getStats = (chessStats: ChessStats[] = []) => {
  return (chessTimeClass: ChessTimeClass) => {
    const stats = (chessStats ?? []).find(
      ({ timeClass }) => timeClass === chessTimeClass
    );
    return {
      best: stats?.best ?? 0,
      last: stats?.last ?? 0,
      win: stats?.win ?? 0,
      draw: stats?.draw ?? 0,
      loss: stats?.loss ?? 0,
    };
  };
};

export type PlayersTableProperties = {
  total: number;
  players: FullChessPlayer[];
};

export const PlayersTable: React.FC<PlayersTableProperties> = ({
  total = 0,
  players = [],
}) => {
  const [isStreamer, setIsStreamer] = useSearchParameter('isStreamer');
  const isStreamerFlag = isStreamer === 'true';

  if (players.length === 0) return <></>;

  return (
    <>
      <p className="text-center text-lg md:text-left md:text-2xl">
        Players ({total})
      </p>
      <div className="rounded border">
        <div className="collapse collapse-arrow border-0">
          <div className="collapse-title border-b">
            <div className="flex w-full items-center justify-between">
              <div className="flex-grow text-left">Players ({total})</div>
            </div>
          </div>
          <div className="p-0 collapse-content">
            <div className="rounded border border-gray-200">
              <table className="table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th align="right" className="w-8">
                      Bullet
                    </th>
                    <th align="right" className="w-8">
                      Blitz
                    </th>
                    <th align="right" className="w-8">
                      Rapid
                    </th>
                    <th align="right" className="w-8">
                      <button
                        type="button"
                        className="btn btn-xs bg-teal-500 text-white"
                        // variant={isStreamerFlag ? 'solid' : 'outline'}
                        onClick={() => {
                          setIsStreamer((!isStreamerFlag).toString());
                        }}>
                        Twitch
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players.map(
                    ({
                      title,
                      id = 0,
                      username = '',
                      avatar = '',
                      country,
                      twitchUrl,
                      stats = [],
                    }: FullChessPlayer) => {
                      const getStatsByTimeClass = getStats(stats);
                      const bulletStats = getStatsByTimeClass('bullet');
                      const blitzStats = getStatsByTimeClass('blitz');
                      const rapidStats = getStatsByTimeClass('rapid');

                      return (
                        <tr key={id}>
                          <td>
                            <div className="inline-flex items-center gap-x-2">
                              <div className="h-10 w-10 overflow-hidden rounded border">
                                {avatar.length > 0 ? (
                                  <Image
                                    src={avatar}
                                    alt={username}
                                    title={username}
                                    width={40}
                                    height={40}
                                  />
                                ) : (
                                  <></>
                                )}
                              </div>
                              <TitleBadge title={title} />
                              <Link
                                href={`/players/${encodeURIComponent(
                                  username
                                )}`}>
                                {username}
                              </Link>{' '}
                              <Link href={`/countries/${country.cca2}`}>
                                {country?.flag ?? ''}
                              </Link>
                            </div>
                          </td>
                          <td align="right">{bulletStats.last}</td>
                          <td align="right">{blitzStats.last}</td>
                          <td align="right">{rapidStats.last}</td>
                          <td align="right">
                            <TwitchButton href={twitchUrl} />
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
