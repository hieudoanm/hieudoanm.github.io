import { WidgetClockAnalog } from '@web/widgets/clock/WidgetClockAnalog';
import { WidgetClockDigital } from '@web/widgets/clock/WidgetClockDigital';

import { NextPage } from 'next';

const ClockPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-100">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
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
      </div>
    </div>
  );
};

export default ClockPage;
