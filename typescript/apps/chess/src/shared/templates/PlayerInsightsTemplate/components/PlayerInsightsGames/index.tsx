import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { SectionHeading } from '@chess/shared/components/SectionHeading';
import { FaChessBoard } from 'react-icons/fa6';
import { PlayerInsightsGamesOverview } from '../PlayerInsightsGamesOverview';
import { PlayerInsightsGamesPhrases } from '../PlayerInsightsGamesPhrases';
import { PlayerInsightsGamesResults } from '../PlayerInsightsGamesResults';

export type PlayerInsightsGamesProperties = {
  insights?: Insights;
};

export const PlayerInsightsGames: React.FC<PlayerInsightsGamesProperties> = ({
  insights = {} as Insights,
}) => {
  return (
    <>
      <div id="games" className="flex flex-col gap-y-2 text-center">
        <SectionHeading>
          <div className="flex items-center justify-center gap-x-2">
            <FaChessBoard className="text-teal-500" /> Games
          </div>
        </SectionHeading>
        <p className="text-xs md:text-sm lg:text-base">
          How accurately are you playing in your games?
        </p>
      </div>
      <PlayerInsightsGamesOverview insights={insights} />
      <PlayerInsightsGamesResults insights={insights} />
      <PlayerInsightsGamesPhrases insights={insights} />
    </>
  );
};

PlayerInsightsGames.displayName = 'PlayerInsightsGames';
