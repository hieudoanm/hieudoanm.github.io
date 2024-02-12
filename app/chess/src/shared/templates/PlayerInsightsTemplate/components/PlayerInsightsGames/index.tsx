import { Insights } from '@chess/common/types/chess';
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
      <div className="text-center">
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
