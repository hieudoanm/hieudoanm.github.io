import { Insights } from '@chess/common/types/chess';
import { CardHeading } from '@chess/shared/components/CardHeading';
import { SectionHeading } from '@chess/shared/components/SectionHeading';
import { FaChessPawn } from 'react-icons/fa6';

export type PlayerInsightsMovesProperties = {
  insights?: Insights;
};

export const PlayerInsightsMoves: React.FC<PlayerInsightsMovesProperties> = ({
  insights = {} as Insights,
}) => {
  return (
    <>
      <div className="text-center">
        <SectionHeading>
          <div className="flex items-center justify-center gap-x-2">
            <FaChessPawn className="text-teal-500" /> Moves
          </div>
        </SectionHeading>
        <p className="text-xs md:text-sm lg:text-base">
          What are your strengths and areas to improve?
        </p>
      </div>
      <div className="card border border-gray-200 shadow">
        <div className="py-4 px-8 border-b">
          <CardHeading>Pieces</CardHeading>
        </div>
        <div className="card-body" />
      </div>
      <div className="card border border-gray-200 shadow">
        <div className="py-4 px-8 border-b">
          <CardHeading>Castling</CardHeading>
        </div>
        <div className="card-body" />
      </div>
    </>
  );
};

PlayerInsightsMoves.displayName = 'PlayerInsightsMoves';
