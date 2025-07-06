import { useGeolocation } from '@web/hooks/window/navigator/use-geolocation';
import { FC } from 'react';

export const WidgetMapsEmbedded: FC = () => {
  const { latitude = 0, longitude = 0 } = useGeolocation();

  const radius: number = 0.1;
  const left: number = parseFloat((longitude ?? 0).toFixed(1)) - radius;
  const right: number = parseFloat((longitude ?? 0).toFixed(1)) + radius;
  const top: number = parseFloat((latitude ?? 0).toFixed(1)) + radius;
  const bottom: number = parseFloat((latitude ?? 0).toFixed(1)) - radius;

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-2">
        <div className="h-full w-full overflow-hidden rounded-2xl">
          <iframe
            title="open-street-map"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&amp;layer=mapnik`}
            className="h-full w-full grayscale"
          />
        </div>
      </div>
    </div>
  );
};
