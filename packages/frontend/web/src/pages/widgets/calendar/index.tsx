import { WidgetCalendarEvents } from '@nothing/widgets/calendar/WidgetCalendarEvents';
import { WidgetCalendarMonthly } from '@nothing/widgets/calendar/WidgetCalendarMonthly';
import { WidgetCalendarToday } from '@nothing/widgets/calendar/WidgetCalendarToday';
import { NextPage } from 'next';

const CalendarPage: NextPage = () => {
  return (
    <div className="h-[300vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
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
