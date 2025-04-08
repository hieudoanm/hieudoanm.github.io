import { FaSolidCloudSunRain } from 'solid-icons/fa';

export const WidgetWeatherDescription = () => {
  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-gray-900 text-gray-100">
      <div class="flex h-full w-full items-center justify-center">
        <div class="flex flex-col items-center gap-y-2">
          <FaSolidCloudSunRain class="text-6xl text-red-500" />
          <p class="text-xl font-bold">Sunny</p>
        </div>
      </div>
    </div>
  );
};
