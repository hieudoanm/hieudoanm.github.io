import { createSignal, createEffect } from 'solid-js';

export const useCamera = ({
  width = 0,
  height = 0,
  facingMode = 'environment',
}: {
  width?: number;
  height?: number;
  facingMode?: 'user' | 'environment';
}): MediaStream | null => {
  const [mediaStream, setMediaStream] = createSignal<MediaStream | null>(null);

  createEffect(() => {
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
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width, height },
        });
        setMediaStream(stream);
      } catch (error) {
        console.error('error', error);
      }
    };

    enableVideoStream({ width, height, facingMode });

    return () => {
      if (!mediaStream) return;
      const tracks = mediaStream()?.getTracks() ?? [];
      for (const track of tracks) {
        track.stop();
      }
    };
  });

  return mediaStream();
};
