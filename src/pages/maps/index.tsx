import { useGeolocation } from '@nothing/hooks/use-geolocation';
import { NextPage } from 'next';

const MapsPage: NextPage = () => {
  const { latitude = 0, longitude = 0 } = useGeolocation();

  const radius: number = 0.1;
  const left: number = parseFloat((longitude ?? 0).toFixed(1)) - radius;
  const right: number = parseFloat((longitude ?? 0).toFixed(1)) + radius;
  const top: number = parseFloat((latitude ?? 0).toFixed(1)) + radius;
  const bottom: number = parseFloat((latitude ?? 0).toFixed(1)) - radius;

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-3xl bg-black text-white">
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
      </div>
    </div>
  );
};

export default MapsPage;
