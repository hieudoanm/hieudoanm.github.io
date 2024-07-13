import { logger } from '@web/log';
import { useEffect, useState } from 'react';

export const useCamera = ({
  width = 0,
  height = 0,
  facingMode = 'environment',
}: {
  width?: number;
  height?: number;
  facingMode?: 'user' | 'environment';
}): any => {
  const [mediaStream, setMediaStream] = useState<any>(null);

  useEffect(() => {
    const enableVideoStream = async ({
      width,
      height,
      facingMode,
    }: {
      width: number;
      height: number;
      facingMode: 'user' | 'environment';
    }) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width, height },
        });
        setMediaStream(stream);
      } catch (error) {
        logger.error(error);
      }
    };

    enableVideoStream({ width, height, facingMode });

    return () => {
      if (!mediaStream) return;
      const tracks = mediaStream.getTracks();
      for (const track of tracks) {
        track.stop();
      }
    };
  }, [width, height, facingMode]);

  return mediaStream;
};
