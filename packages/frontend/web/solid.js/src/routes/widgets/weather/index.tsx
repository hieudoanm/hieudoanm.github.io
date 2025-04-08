import { WidgetWeatherDescription } from '~/widgets/weather/WidgetWeatherDescription';
import { WidgetWeatherTemperature } from '~/widgets/weather/WidgetWeatherTemperature';

const WeatherPage = () => {
  return (
    <div class="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="grid h-full grid-cols-none grid-rows-2 md:grid-cols-2 md:grid-rows-none">
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetWeatherTemperature />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetWeatherDescription />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
