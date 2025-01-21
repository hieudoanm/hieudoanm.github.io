/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const CompassPage: NextPage = () => {
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

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <div className="shadow-3xl relative aspect-square w-72 rounded-full bg-black">
          <div className="absolute left-0 right-0 top-0 mx-auto flex justify-center py-4">
            <span className="font-black text-red-500">N</span>
          </div>
          <div className="absolute bottom-0 left-0 top-0 mx-auto flex items-center px-4">
            <span className="font-black text-white">W</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 mx-auto flex justify-center py-4">
            <span className="font-black text-white">S</span>
          </div>
          <div className="absolute bottom-0 right-0 top-0 mx-auto flex items-center px-4">
            <span className="font-black text-white">E</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-0 z-10 m-auto aspect-square w-4 rounded-full bg-black"></div>
          <div
            className="absolute bottom-0 left-0 right-0 top-0 m-auto aspect-square w-6"
            style={{ transform: `rotate(${alpha}deg)` }}>
            <div className="relative h-full w-full">
              <div className="absolute -left-1 bottom-0 right-0 top-0 m-auto flex h-44 w-8 flex-col gap-y-0">
                <div className="h-[50%] w-8">
                  <div
                    className="clip-triangle rotate-y-180 inline-block h-full w-[50%] bg-white"
                    style={{ transform: 'rotateY(180deg)' }}
                  />
                  <div className="clip-triangle rotate-y-180 inline-block h-full w-[50%] bg-white" />
                </div>
                <div className="h-[25%] w-8">
                  <div
                    className="clip-triangle rotate-y-180 inline-block h-full w-[50%] bg-white"
                    style={{
                      transform: 'rotateX(180deg) rotateY(180deg)',
                    }}
                  />
                  <div
                    className="clip-triangle rotate-y-180 inline-block h-full w-[50%] bg-white"
                    style={{ transform: 'rotateX(180deg)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default CompassPage;
