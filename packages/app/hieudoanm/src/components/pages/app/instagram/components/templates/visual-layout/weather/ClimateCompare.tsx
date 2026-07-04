import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface CityWeather {
  city: string;
  temp: string;
  condition: string;
  humidity: string;
  wind: string;
}

export const ClimateCompare: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Climate Compare';
  const cityA = (data.cityA as CityWeather) ?? {
    city: 'London',
    temp: '14°C',
    condition: 'Cloudy',
    humidity: '78%',
    wind: '18 km/h',
  };
  const cityB = (data.cityB as CityWeather) ?? {
    city: 'Sydney',
    temp: '24°C',
    condition: 'Sunny',
    humidity: '55%',
    wind: '10 km/h',
  };

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <span className="text-accent mb-2 text-[10px] font-bold tracking-[0.2em] uppercase">
        {title}
      </span>

      <div className="mt-4 flex gap-4">
        {[cityA, cityB].map((c, i) => (
          <div
            key={i}
            className="flex-1 rounded-lg border border-[#e5e7eb] p-4 text-center">
            <span className="text-base-content text-sm font-bold">
              {c.city}
            </span>
            <span className="text-accent mt-2 block text-3xl font-black">
              {c.temp}
            </span>
            <span className="text-neutral mt-1 block text-xs">
              {c.condition}
            </span>
            <div className="bg-base-200 mt-3 flex justify-center gap-4 rounded px-3 py-2">
              <div className="text-center">
                <span className="text-neutral text-[8px] font-bold tracking-[0.1em] uppercase">
                  Humidity
                </span>
                <span className="text-base-content mt-0.5 block text-[10px] font-semibold">
                  {c.humidity}
                </span>
              </div>
              <div className="text-center">
                <span className="text-neutral text-[8px] font-bold tracking-[0.1em] uppercase">
                  Wind
                </span>
                <span className="text-base-content mt-0.5 block text-[10px] font-semibold">
                  {c.wind}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-accent/5 mt-5 flex items-center justify-center rounded-lg py-2">
        <span className="text-accent text-xs font-bold">
          {cityA.city} vs {cityB.city}
        </span>
      </div>
    </div>
  );
};

ClimateCompare.displayName = 'ClimateCompare';
