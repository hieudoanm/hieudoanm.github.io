import {
  FaSolidBackward,
  FaSolidForward,
  FaSolidPause,
  FaSolidPlay,
  FaSolidVolumeHigh,
  FaSolidVolumeOff,
} from 'solid-icons/fa';
import { createSignal } from 'solid-js';

export const WidgetMusicPlayer = () => {
  const [status, setStatus] = createSignal(false);

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="flex h-full w-full flex-col p-8">
        <div class="mb-2 text-center">
          <p class="truncate text-xl">
            <span class="text-gray-300">Eminem</span> -{' '}
            <span class="font-black">Lose Yourself</span>
          </p>
        </div>
        <div class="flex items-center gap-x-2">
          <p class="text-xs">0:00</p>
          <div class="flex grow flex-col items-center gap-y-2">
            <div class="h-2 w-full rounded-full border border-white">
              <div class="h-full bg-white" style={{ width: '50%' }}></div>
            </div>
          </div>
          <p class="text-xs">5:26</p>
        </div>
        <div class="grow">
          <div class="grid h-full grid-cols-3">
            <div class="col-span-1">
              <div class="flex h-full items-center justify-start">
                <FaSolidBackward class="text-2xl" />
              </div>
            </div>
            <div class="col-span-1">
              <button
                type="button"
                onClick={() => setStatus(!status)}
                class="flex h-full w-full items-center justify-center">
                {status() ? (
                  <FaSolidPlay class="text-4xl" />
                ) : (
                  <FaSolidPause class="text-4xl" />
                )}
              </button>
            </div>
            <div class="col-span-1">
              <div class="flex h-full items-center justify-end">
                <FaSolidForward class="text-2xl" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-x-2">
          <FaSolidVolumeOff />
          <div class="flex grow flex-col items-center gap-y-2">
            <div class="h-2 w-full rounded-full border border-white">
              <div class="h-full bg-white" style={{ width: '50%' }}></div>
            </div>
          </div>
          <FaSolidVolumeHigh />
        </div>
      </div>
    </div>
  );
};
