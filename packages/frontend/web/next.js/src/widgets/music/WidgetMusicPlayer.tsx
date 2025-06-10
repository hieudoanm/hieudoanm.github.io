import { FC, useState } from 'react';
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeHigh,
  FaVolumeOff,
} from 'react-icons/fa6';

export const WidgetMusicPlayer: FC = () => {
  const [status, setStatus] = useState(false);

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="flex h-full w-full flex-col p-8">
        <div className="mb-2 text-center">
          <p className="truncate text-xl">
            <span className="text-neutral-300">Eminem</span> -{' '}
            <span className="font-black">Lose Yourself</span>
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-xs">0:00</p>
          <div className="flex grow flex-col items-center gap-y-2">
            <div className="h-2 w-full rounded-full border border-white">
              <div className="h-full bg-white" style={{ width: '50%' }}></div>
            </div>
          </div>
          <p className="text-xs">5:26</p>
        </div>
        <div className="grow">
          <div className="grid h-full grid-cols-3">
            <div className="col-span-1">
              <div className="flex h-full items-center justify-start">
                <FaBackward className="text-2xl" />
              </div>
            </div>
            <div className="col-span-1">
              <button
                type="button"
                onClick={() => setStatus(!status)}
                className="flex h-full w-full items-center justify-center">
                {status ? (
                  <FaPlay className="text-4xl" />
                ) : (
                  <FaPause className="text-4xl" />
                )}
              </button>
            </div>
            <div className="col-span-1">
              <div className="flex h-full items-center justify-end">
                <FaForward className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <FaVolumeOff />
          <div className="flex grow flex-col items-center gap-y-2">
            <div className="h-2 w-full rounded-full border border-white">
              <div className="h-full bg-white" style={{ width: '50%' }}></div>
            </div>
          </div>
          <FaVolumeHigh />
        </div>
      </div>
    </div>
  );
};
