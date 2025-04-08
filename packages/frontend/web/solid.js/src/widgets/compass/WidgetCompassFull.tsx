/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSignal, onMount } from 'solid-js';

export const WidgetCompassFull = () => {
  const [signal, setCompass] = createSignal<{
    alpha: number;
    error: string;
  }>({
    alpha: 0,
    error: '',
  });

  onMount(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      console.log('event', event);
      if (event.alpha !== null) {
        setCompass((previous) => ({
          ...previous,
          alpha: parseFloat(event.alpha?.toFixed(2) ?? '0'),
        }));
      } else {
        setCompass((previous) => ({
          ...previous,
          error: 'Compass data not available',
        }));
      }
    };

    const requestPermission = async () => {
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        console.log('requestPermission with permission');
        try {
          const permissionState = await (
            DeviceOrientationEvent as any
          ).requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener(
              'deviceorientation',
              handleOrientation,
              true
            );
          } else {
            setCompass((previous) => ({
              ...previous,
              error: 'Permission to access device orientation denied.',
            }));
          }
        } catch (error) {
          console.error(error);
          setCompass((previous) => ({
            ...previous,
            error: 'Error requesting device orientation permission.',
          }));
        }
      } else {
        console.log('requestPermission without permission');
        // For devices/browsers that don't require permission
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  });

  if (signal().error) {
    console.error('error', signal().error);
  }

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 rounded-full bg-gray-900">
      <div class="absolute top-0 right-0 left-0 mx-auto flex justify-center py-4">
        <span class="font-black text-red-500">N</span>
      </div>
      <div class="absolute top-0 bottom-0 left-0 mx-auto flex items-center px-4">
        <span class="font-black text-gray-100">W</span>
      </div>
      <div class="absolute right-0 bottom-0 left-0 mx-auto flex justify-center py-4">
        <span class="font-black text-gray-100">S</span>
      </div>
      <div class="absolute top-0 right-0 bottom-0 mx-auto flex items-center px-4">
        <span class="font-black text-gray-100">E</span>
      </div>
      <div class="absolute top-0 right-0 bottom-0 left-0 z-10 m-auto aspect-square w-4 rounded-full bg-gray-900"></div>
      <div
        class="absolute top-0 right-0 bottom-0 left-0 m-auto aspect-square w-6"
        style={{ transform: `rotate(${signal().alpha}deg)` }}>
        <div class="relative h-full w-full">
          <div class="absolute top-0 right-0 bottom-0 -left-1 m-auto flex h-36 w-8 flex-col gap-y-0">
            <div class="h-[50%] w-8">
              <div class="clip-triangle inline-block h-full w-[50%] rotate-y-180 bg-white" />
              <div class="clip-triangle inline-block h-full w-[50%] bg-white" />
            </div>
            <div class="h-[25%] w-8">
              <div
                class="clip-triangle inline-block h-full w-[50%] rotate-y-180 bg-white"
                style={{
                  transform: 'rotateX(180deg) rotateY(180deg)',
                }}
              />
              <div
                class="clip-triangle inline-block h-full w-[50%] rotate-y-180 bg-white"
                style={{ transform: 'rotateX(180deg)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
