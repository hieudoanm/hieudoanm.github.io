import { WidgetClockAnalog } from '@web/widgets/clock/WidgetClockAnalog';
import { WidgetClockDigital } from '@web/widgets/clock/WidgetClockDigital';
import { WidgetClockPomodoro } from '@web/widgets/clock/WidgetClockPomodoro';
import { WidgetClockTimeZone } from '@web/widgets/clock/WidgetClockTimeZone';
import { NextPage } from 'next';

const ClockPage: NextPage = () => {
  return (
    <div className="h-[200vh] w-screen overflow-hidden bg-neutral-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 h-full">
          <div className="flex h-full items-center justify-center">
            <WidgetClockPomodoro />
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="flex h-full items-center justify-center">
            <WidgetClockAnalog />
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="flex h-full items-center justify-center">
            <WidgetClockDigital />
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="flex h-full items-center justify-center">
            <WidgetClockTimeZone />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockPage;
