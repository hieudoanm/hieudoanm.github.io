import { FaSolidLocationDot } from 'solid-icons/fa';
import { useGeolocation } from '~/hooks/window/navigator/use-geolocation';

export const WidgetMapsCoordinates = () => {
  const { latitude = 0, longitude = 0 } = useGeolocation();

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-gray-900 text-gray-100">
      <div class="flex h-full w-full items-center justify-center">
        <div class="flex flex-col items-center gap-y-4">
          <FaSolidLocationDot class="text-6xl text-red-500" />
          <div class="text-center font-black">
            <p>{latitude?.toFixed(2)}°</p>
            <p>{longitude?.toFixed(2)}°</p>
          </div>
        </div>
      </div>
    </div>
  );
};
