import { WidgetHealthBodyTemperature } from '~/widgets';
import { WidgetHealthBloodPressure } from '~/widgets/health/WidgetHealthBloodPressure';

const HealthPage = () => {
  return (
    <div class="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="grid h-full grid-cols-1 md:grid-cols-2">
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetHealthBodyTemperature />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetHealthBloodPressure />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthPage;
