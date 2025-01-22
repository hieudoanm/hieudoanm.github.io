import { WidgetClockAnalog } from '@nothing/widgets/clock/WidgetClockAnalog';
import { WidgetClockDigital } from '@nothing/widgets/clock/WidgetClockDigital';
import { WidgetClockTimeZone } from '@nothing/widgets/clock/WidgetClockTimeZone';
import { NextPage } from 'next';

const ClockPage: NextPage = () => {
  return (
    <div className="h-screen-3 w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-none grid-rows-3 gap-8 p-8 md:grid-cols-3 md:grid-rows-none">
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
