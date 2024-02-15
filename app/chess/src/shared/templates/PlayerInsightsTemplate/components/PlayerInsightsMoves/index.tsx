import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { SectionHeading } from '@chess/shared/components/SectionHeading';
import { FaChessPawn } from 'react-icons/fa6';
import { PlayerInsightsMovesCastling } from '../PlayerInsightsMovesCastling';
import { PlayerInsightsMovesPieces } from '../PlayerInsightsMovesPieces';

export type PlayerInsightsMovesProperties = {
  insights?: Insights;
};

export const PlayerInsightsMoves: React.FC<PlayerInsightsMovesProperties> = ({
  insights = {} as Insights,
}) => {
  return (
    <>
      <div id="moves" className="text-center flex flex-col gap-y-2">
        <SectionHeading>
          <div className="flex items-center justify-center gap-x-2">
            <FaChessPawn className="text-teal-500" /> Moves
          </div>
        </SectionHeading>
        <p className="text-xs md:text-sm lg:text-base">
          What are your strengths and areas to improve?
        </p>
      </div>
      <PlayerInsightsMovesPieces insights={insights} />
      <PlayerInsightsMovesCastling insights={insights} />
    </>
  );
};

PlayerInsightsMoves.displayName = 'PlayerInsightsMoves';
