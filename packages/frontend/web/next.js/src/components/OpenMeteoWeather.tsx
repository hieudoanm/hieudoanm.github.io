import { useQuery } from '@tanstack/react-query';
import { useGeolocation } from '@web/hooks/window/navigator/use-geolocation';
import { tryCatch } from '@web/utils/try-catch';
import { FC, ReactNode } from 'react';
import {
  FaCloud,
  FaCloudBolt,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaMapPin,
  FaSnowflake,
  FaSun,
  FaWater,
} from 'react-icons/fa6';

type OpenMeteo = {
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    weather_code: number;
  };
};

const weatherIcons: Record<number, ReactNode> = {
  0: <FaSun className="text-4xl" />,
  1: <FaSun className="text-4xl" />,
  2: <FaCloud className="text-4xl" />,
  3: <FaCloud className="text-4xl" />,
  45: <FaWater className="text-4xl" />,
  48: <FaWater className="text-4xl" />,
  51: <FaCloudRain className="text-4xl" />,
  53: <FaCloudRain className="text-4xl" />,
  55: <FaCloudRain className="text-4xl" />,
  56: <FaCloudRain className="text-4xl" />,
  57: <FaCloudRain className="text-4xl" />,
  61: <FaCloudRain className="text-4xl" />,
  63: <FaCloudRain className="text-4xl" />,
  65: <FaCloudRain className="text-4xl" />,
  66: <FaCloudRain className="text-4xl" />,
  67: <FaCloudRain className="text-4xl" />,
  71: <FaSnowflake className="text-4xl" />,
  73: <FaSnowflake className="text-4xl" />,
  75: <FaSnowflake className="text-4xl" />,
  77: <FaSnowflake className="text-4xl" />,
  80: <FaCloudShowersHeavy className="text-4xl" />,
  81: <FaCloudShowersHeavy className="text-4xl" />,
  82: <FaCloudShowersHeavy className="text-4xl" />,
  85: <FaCloudShowersHeavy className="text-4xl" />,
  86: <FaCloudShowersHeavy className="text-4xl" />,
  95: <FaCloudBolt className="text-4xl" />,
  96: <FaCloudBolt className="text-4xl" />,
  99: <FaCloudBolt className="text-4xl" />,
};

const weatherCodes: Record<number, string> = {
  0: 'Clear Sky',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing Rime Fog',
  51: 'Light Drizzle',
  53: 'Moderate Drizzle',
  55: 'Dense Drizzle',
  56: 'Light Freezing Drizzle',
  57: 'Dense Freezing Drizzle',
  61: 'Slight Rain',
  63: 'Moderate Rain',
  65: 'Heavy Rain',
  66: 'Light Freezing Rain',
  67: 'Heavy Freezing Rain',
  71: 'Slight Snow Fall',
  73: 'Moderate Snow Fall',
  75: 'Heavy Snow Fall',
  77: 'Snow Grains',
  80: 'Slight Rain Showers',
  81: 'Moderate Rain Showers',
  82: 'Violent Rain Showers',
  85: 'Slight Snow Showers',
  86: 'Heavy Snow Showers',
  95: 'Thunderstorm: Slight or moderate',
  96: 'Slight Thunderstorm',
  99: 'Heavy Hail Thunderstorm',
};

export const OpenMeteoWeather: FC = () => {
  const { latitude = 0, longitude = 0 } = useGeolocation();
  const url: string = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;
  const { isPending, error, data } = useQuery<OpenMeteo>({
    queryKey: [`open-meteo`],
    queryFn: async () => {
      const { error, data } = await tryCatch(
        fetch(url).then((response) => response.json())
      );
      if (error) return {};
      return data;
    },
  });

  if (isPending) return <p className="text-center">Loading</p>;

  if (error) return <p className="text-center">{error.message}</p>;

  if (JSON.stringify(data) === '{}')
    return <p className="text-center">No Data</p>;

  const { current = { temperature_2m: 0, weather_code: 0 } } = data ?? {
    current: {},
  };
  const { temperature_2m: temperature = 0, weather_code: code = 0 } = current;
  const weather = weatherCodes[code] ?? 'Unknown Weather';
  const icon = weatherIcons[code] ?? <></>;

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex aspect-square w-64 items-center justify-center rounded-full bg-neutral-800">
        <div className="flex flex-col items-center gap-y-2 text-center">
          {icon}
          <p className="font-bold">{weather}</p>
          <p className="text-4xl">{temperature}°C</p>
          <div className="flex items-center gap-x-1 text-xs">
            <FaMapPin />
            {Math.abs(latitude).toFixed(2)}°{latitude >= 0 ? 'N' : 'S'}
          </div>
          <div className="flex items-center gap-x-1 text-xs">
            <FaMapPin />
            {Math.abs(longitude).toFixed(2)}°{latitude >= 0 ? 'E' : 'W'}
          </div>
        </div>
      </div>
    </div>
  );
};
