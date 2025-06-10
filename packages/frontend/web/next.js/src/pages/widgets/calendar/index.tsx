import { WidgetCalendarEvents } from '@web/widgets/calendar/WidgetCalendarEvents';
import { WidgetCalendarMonthly } from '@web/widgets/calendar/WidgetCalendarMonthly';
import { WidgetCalendarToday } from '@web/widgets/calendar/WidgetCalendarToday';
import { NextPage } from 'next';

const CalendarPage: NextPage = () => {
  return (
    <div className="h-[150vh] w-screen overflow-hidden bg-neutral-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-3">
        <div className="col-span-1">
          <div className="flex h-full w-full items-center justify-center">
            <WidgetCalendarToday />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full w-full items-center justify-center">
            <WidgetCalendarMonthly />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full w-full items-center justify-center">
            <WidgetCalendarEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
