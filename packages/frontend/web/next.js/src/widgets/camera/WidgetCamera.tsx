import { useCamera } from '@web/hooks/window/navigator/use-camera';
import { logger } from '@web/utils/log';
import { useEffect, useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa6';

export const WidgetCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [size, setSize] = useState({
    width: videoRef.current?.videoWidth ?? 0,
    height: videoRef.current?.videoHeight ?? 0,
  });
  const camera = useCamera({
    width: size.width,
    height: size.height,
    facingMode: 'environment',
  });

  useEffect(() => {
    if (!camera || typeof document === 'undefined') return;
    logger.info(camera);
    const cameraElement: HTMLVideoElement = document.getElementById(
      'camera'
    ) as HTMLVideoElement;
    cameraElement.srcObject = camera;
    return () => {
      cameraElement.srcObject = null;
    };
  }, [camera]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener(
      'resize',
      () => {
        const videoWidth = videoRef.current?.videoWidth ?? 0;
        const videoHeight = videoRef.current?.videoHeight ?? 0;
        const size = videoWidth < videoHeight ? videoWidth : videoHeight;
        setSize({ width: size, height: size });
      },
      true
    );
    return () => {
      window.removeEventListener('resize', () => {}, false);
    };
  }, []);

  if (!camera) {
    return (
      <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
        <div className="flex h-full w-full items-center justify-center p-2">
          <FaCamera />
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div className="h-full w-full p-2">
        <video
          id="camera"
          className="h-full overflow-hidden rounded-2xl object-cover grayscale"
          ref={videoRef}
          autoPlay>
          <track kind="captions" />
        </video>
      </div>
    </div>
  );
};
