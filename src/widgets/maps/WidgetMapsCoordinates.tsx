import { useGeolocation } from '@nothing/hooks/use-geolocation';
import { FC } from 'react';
import { FaLocationDot } from 'react-icons/fa6';

export const WidgetMapsCoordinates: FC = () => {
  const { latitude = 0, longitude = 0 } = useGeolocation();

  return (
    <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-full bg-black text-white">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-y-4">
          <FaLocationDot className="text-8xl" />
          <div className="text-center font-black">
            <p>{latitude?.toFixed(2)}°</p>
            <p>{longitude?.toFixed(2)}°</p>
          </div>
        </div>
      </div>
    </div>
  );
};
