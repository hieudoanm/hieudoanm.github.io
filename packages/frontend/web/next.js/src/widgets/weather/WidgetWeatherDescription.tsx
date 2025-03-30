import { FC } from 'react';
import { FaCloudSunRain } from 'react-icons/fa6';

export const WidgetWeatherDescription: FC = () => {
  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-gray-900 text-gray-100">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-y-2">
          <FaCloudSunRain className="text-6xl text-red-500" />
          <p className="text-xl font-bold">Sunny</p>
        </div>
      </div>
    </div>
  );
};
