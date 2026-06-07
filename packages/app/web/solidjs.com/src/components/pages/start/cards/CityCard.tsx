import {
  WeatherData,
  weatherCodeToText,
} from '@hieudoanm.github.io/data/weather';

export const WeatherBadge = (props: { weather: WeatherData | undefined }) => {
  if (!props.weather)
    return <span class="badge badge-ghost badge-sm italic opacity-40">…</span>;
  return (
    <div class="flex flex-col items-end gap-0.5">
      <span class="badge badge-outline badge-sm font-mono font-semibold tracking-wider">
        {props.weather.temperature_2m}°C
      </span>
      <span class="text-xs whitespace-nowrap opacity-50">
        {weatherCodeToText(props.weather.weather_code)}
      </span>
    </div>
  );
};

export const CityCard = (props: {
  label: string;
  time: string;
  weather: WeatherData | undefined;
  index: number;
}) => {
  const [hh, mm, ss] = props.time.split(':');
  return (
    <div
      class="card bg-base-200 border-base-300 hover:border-primary/40 hover:bg-base-300 group border transition-all duration-300"
      style={{ animationDelay: `${props.index * 60}ms` }}>
      <div class="card-body flex-row items-center justify-between gap-3 p-3">
        <div class="min-w-0">
          <div class="mb-1 flex items-center gap-1.5">
            <div class="bg-primary h-1.5 w-1.5 rounded-full opacity-70 transition-opacity group-hover:opacity-100" />
            <h2 class="truncate text-xs font-semibold tracking-widest uppercase opacity-60">
              {props.label}
            </h2>
          </div>
          <div class="flex items-baseline gap-0.5 font-mono text-lg font-bold tracking-tight tabular-nums">
            <span>{hh}</span>
            <span class="animate-pulse opacity-30">:</span>
            <span>{mm}</span>
            <span class="animate-pulse opacity-30">:</span>
            <span class="text-sm opacity-50">{ss}</span>
          </div>
        </div>
        <div class="shrink-0">
          <WeatherBadge weather={props.weather} />
        </div>
      </div>
    </div>
  );
};
