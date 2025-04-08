import { WidgetClockAnalog } from '~/widgets/clock/WidgetClockAnalog';
import { WidgetClockDigital } from '~/widgets/clock/WidgetClockDigital';
import { WidgetClockPomodoro } from '~/widgets/clock/WidgetClockPomodoro';
import { WidgetClockTimeZone } from '~/widgets/clock/WidgetClockTimeZone';

const ClockPage = () => {
  return (
    <div class="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="grid h-full grid-cols-1 md:grid-cols-4">
        <div class="col-span-1 h-full">
          <div class="flex h-full items-center justify-center">
            <WidgetClockPomodoro />
          </div>
        </div>
        <div class="col-span-1 h-full">
          <div class="flex h-full items-center justify-center">
            <WidgetClockAnalog />
          </div>
        </div>
        <div class="col-span-1 h-full">
          <div class="flex h-full items-center justify-center">
            <WidgetClockDigital />
          </div>
        </div>
        <div class="col-span-1 h-full">
          <div class="flex h-full items-center justify-center">
            <WidgetClockTimeZone />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockPage;
