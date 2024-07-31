import { Layout } from '@web/layout';
import { NextPage } from 'next';
import { useState } from 'react';

export const CompassPage: NextPage = () => {
  const [rotate, setRotate] = useState(0);

  const handler = (event: DeviceOrientationEvent) => {
    const compass: number =
      (event as any).webkitCompassHeading || Math.abs(event.alpha ?? 0 - 360);
    setRotate(-compass);
  };

  const startCompass = () => {
    const isIOS = !(
      RegExp(/(iPod|iPhone|iPad)/).exec(navigator.userAgent) &&
      RegExp(/AppleWebKit/).exec(navigator.userAgent)
    );
    if (isIOS) {
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        (DeviceOrientationEvent as any)
          .requestPermission()
          .then((response: string) => {
            if (response === 'granted') {
              window.addEventListener('deviceorientation', handler, true);
            } else {
              alert('requestPermission has to be allowed!');
            }
          })
          .catch(() => alert('requestPermission is not supported'));
      } else {
        alert('requestPermission is not supported');
      }
    } else {
      window.addEventListener('deviceorientationabsolute', handler, true);
    }
  };

  return (
    <Layout nav full>
      <div className='flex h-full items-center justify-center p-8'>
        <div className='mx-auto flex w-64 flex-col gap-y-8'>
          <div
            className='h-64 w-64 rounded-full border border-base-content'
            style={{
              transform: `rotate(${rotate}deg)`,
            }}>
            <div className='relative h-full w-full'>
              <div className='absolute left-0 right-0 top-4 text-center'>N</div>
              <div className='absolute bottom-0 left-4 top-0 flex items-center'>
                W
              </div>
              <div className='absolute bottom-0 right-4 top-0 flex items-center'>
                E
              </div>
              <div className='absolute bottom-4 left-0 right-0 text-center'>
                S
              </div>
            </div>
          </div>
          <button
            type='button'
            className='btn btn-outline'
            onClick={() => startCompass()}>
            Start
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CompassPage;
