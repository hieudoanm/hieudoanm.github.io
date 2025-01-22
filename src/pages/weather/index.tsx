import { NextPage } from 'next';
import { FaCloudSunRain } from 'react-icons/fa6';

const WeatherPage: NextPage = () => {
  return (
    <div className="h-screen-2 w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-none grid-rows-2 md:grid-cols-2 md:grid-rows-none">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-full bg-black text-white">
              <div className="flex h-full w-full items-center justify-center text-7xl">
                30°C
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-full bg-black text-white">
              <div className="flex h-full w-full items-center justify-center text-7xl">
                <FaCloudSunRain />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
