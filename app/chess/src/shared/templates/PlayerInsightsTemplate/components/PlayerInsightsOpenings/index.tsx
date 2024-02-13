import { Insights } from '@chess/common/types/chess';
import { CardHeading } from '@chess/shared/components/CardHeading';
import { SectionHeading } from '@chess/shared/components/SectionHeading';
import { FaBook } from 'react-icons/fa6';

export type PlayerInsightsOpeningsProperties = {
  insights?: Insights;
};

export const PlayerInsightsOpenings: React.FC<
  PlayerInsightsOpeningsProperties
> = ({ insights = {} as Insights }) => {
  return (
    <>
      <div className="text-center">
        <SectionHeading>
          <div className="flex items-center justify-center gap-x-2">
            <FaBook className="text-teal-500" /> Openings
          </div>
        </SectionHeading>
        <p className="text-xs md:text-sm lg:text-base">
          How well do you play your openings?
        </p>
      </div>
      <div className="card border border-gray-200 shadow">
        <div className="py-4 px-8 border-b">
          <CardHeading>Performance</CardHeading>
        </div>
        <div className="card-body" />
      </div>
      <div className="card border border-gray-200 shadow">
        <div className="py-4 px-8 border-b">
          <CardHeading>Mastery</CardHeading>
        </div>
        <div className="card-body" />
      </div>
    </>
  );
};

PlayerInsightsOpenings.displayName = 'PlayerInsightsOpenings';
