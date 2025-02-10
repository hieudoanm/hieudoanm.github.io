/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';

export const WidgetCompassFull: FC = () => {
  const [{ alpha = 0, error = '' }, setCompass] = useState<{
    alpha: number;
    error: string;
  }>({
    alpha: 0,
    error: '',
  });

  useEffect(() => {
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
  }, []);

  console.error('error', error);

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 rounded-full bg-black">
      <div className="absolute top-0 right-0 left-0 mx-auto flex justify-center py-4">
        <span className="font-black text-red-500">N</span>
      </div>
      <div className="absolute top-0 bottom-0 left-0 mx-auto flex items-center px-4">
        <span className="font-black text-white">W</span>
      </div>
      <div className="absolute right-0 bottom-0 left-0 mx-auto flex justify-center py-4">
        <span className="font-black text-white">S</span>
      </div>
      <div className="absolute top-0 right-0 bottom-0 mx-auto flex items-center px-4">
        <span className="font-black text-white">E</span>
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-0 z-10 m-auto aspect-square w-4 rounded-full bg-black"></div>
      <div
        className="absolute top-0 right-0 bottom-0 left-0 m-auto aspect-square w-6"
        style={{ transform: `rotate(${alpha}deg)` }}>
        <div className="relative h-full w-full">
          <div className="absolute top-0 right-0 bottom-0 -left-1 m-auto flex h-36 w-8 flex-col gap-y-0">
            <div className="h-[50%] w-8">
              <div className="clip-triangle inline-block h-full w-[50%] rotate-y-180 bg-white" />
              <div className="clip-triangle inline-block h-full w-[50%] bg-white" />
            </div>
            <div className="h-[25%] w-8">
              <div
                className="clip-triangle inline-block h-full w-[50%] rotate-y-180 bg-white"
                style={{
                  transform: 'rotateX(180deg) rotateY(180deg)',
                }}
              />
              <div
                className="clip-triangle inline-block h-full w-[50%] rotate-y-180 bg-white"
                style={{ transform: 'rotateX(180deg)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
