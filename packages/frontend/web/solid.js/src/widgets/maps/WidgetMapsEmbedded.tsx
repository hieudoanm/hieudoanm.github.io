import { useGeolocation } from '~/hooks/window/navigator/use-geolocation';

export const WidgetMapsEmbedded = () => {
  const { latitude = 0, longitude = 0 } = useGeolocation();

  const radius: number = 0.1;
  const left: number = parseFloat((longitude ?? 0).toFixed(1)) - radius;
  const right: number = parseFloat((longitude ?? 0).toFixed(1)) + radius;
  const top: number = parseFloat((latitude ?? 0).toFixed(1)) + radius;
  const bottom: number = parseFloat((latitude ?? 0).toFixed(1)) - radius;

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-2">
        <div class="h-full w-full overflow-hidden rounded-2xl">
          <iframe
            title="open-street-map"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&amp;layer=mapnik`}
            class="h-full w-full grayscale"
          />
        </div>
      </div>
    </div>
  );
};
