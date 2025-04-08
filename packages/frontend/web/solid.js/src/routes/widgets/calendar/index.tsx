import { WidgetCalendarEvents } from '~/widgets/calendar/WidgetCalendarEvents';
import { WidgetCalendarMonthly } from '~/widgets/calendar/WidgetCalendarMonthly';
import { WidgetCalendarToday } from '~/widgets/calendar/WidgetCalendarToday';

const CalendarPage = () => {
  return (
    <div class="h-[150vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="grid h-full grid-cols-1 md:grid-cols-3">
        <div class="col-span-1">
          <div class="flex h-full w-full items-center justify-center">
            <WidgetCalendarToday />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full w-full items-center justify-center">
            <WidgetCalendarMonthly />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full w-full items-center justify-center">
            <WidgetCalendarEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
