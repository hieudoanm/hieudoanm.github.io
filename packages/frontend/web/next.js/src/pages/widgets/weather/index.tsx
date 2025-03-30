import { WidgetWeatherDescription } from '@web/widgets/weather/WidgetWeatherDescription';
import { WidgetWeatherTemperature } from '@web/widgets/weather/WidgetWeatherTemperature';
import { NextPage } from 'next';

const WeatherPage: NextPage = () => {
  return (
    <div className="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-none grid-rows-2 md:grid-cols-2 md:grid-rows-none">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetWeatherTemperature />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetWeatherDescription />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
