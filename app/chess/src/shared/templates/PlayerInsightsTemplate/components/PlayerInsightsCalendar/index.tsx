import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { SectionHeading } from '@chess/shared/components/SectionHeading';
import { FaCalendarDays } from 'react-icons/fa6';
import { PlayerInsightsCalendarDaysOfWeek } from '../PlayerInsightsCalendarDaysOfWeek';
import { PlayerInsightsCalendarTimeOfDays } from '../PlayerInsightsCalendarTimeOfDays';

export const PlayerInsightsCalendar: React.FC<{ insights?: Insights }> = ({
  insights = {} as Insights,
}) => {
  return (
    <>
      <div id="calendar" className="text-center flex flex-col gap-y-2">
        <SectionHeading>
          <div className="flex items-center justify-center gap-x-2">
            <FaCalendarDays className="text-teal-500" /> Calendar
          </div>
        </SectionHeading>
        <p className="text-xs md:text-sm lg:text-base">
          When do you play your best?
        </p>
      </div>
      <PlayerInsightsCalendarTimeOfDays insights={insights} />
      <PlayerInsightsCalendarDaysOfWeek insights={insights} />
    </>
  );
};

PlayerInsightsCalendar.displayName = 'PlayerInsightsCalendar';
