/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';

const getDirection = (alpha: number): string => {
  if ((alpha >= 0 && alpha < 30) || alpha >= 330) return 'N';
  if (alpha >= 30 && alpha < 60) return 'NE';
  if (alpha >= 60 && alpha < 120) return 'E';
  if (alpha >= 120 && alpha < 150) return 'SE';
  if (alpha >= 150 && alpha < 210) return 'S';
  if (alpha >= 210 && alpha < 240) return 'SW';
  if (alpha >= 240 && alpha < 300) return 'W';
  if (alpha >= 300 && alpha < 330) return 'NW';
  return '';
};

export const WidgetCompassCompact: FC = () => {
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
    <div className="shadow-3xl relative aspect-square w-72 rounded-full bg-black text-white">
      <div className="relative flex h-full items-center justify-center text-5xl">
        <p>
          {alpha}° {getDirection(alpha)}
        </p>
        <div className="absolute left-0 right-0 top-0 mx-auto flex justify-center py-4">
          <div className="aspect-square w-4 rounded-full bg-red-500"></div>
        </div>
      </div>
    </div>
  );
};
