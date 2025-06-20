import { WidgetHealthBodyTemperature } from '@web/widgets';
import { WidgetHealthBloodPressure } from '@web/widgets/health/WidgetHealthBloodPressure';
import { NextPage } from 'next';

const HealthPage: NextPage = () => {
  return (
    <div className="h-[100vh] w-screen overflow-hidden bg-neutral-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetHealthBodyTemperature />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetHealthBloodPressure />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthPage;
