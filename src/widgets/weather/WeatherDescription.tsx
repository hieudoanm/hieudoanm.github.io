import { FC } from 'react';
import { FaCloudSunRain } from 'react-icons/fa6';

export const WidgetWeatherDescription: FC = () => {
  return (
    <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-full bg-black text-white">
      <div className="flex h-full w-full items-center justify-center text-7xl">
        <FaCloudSunRain />
      </div>
    </div>
  );
};
