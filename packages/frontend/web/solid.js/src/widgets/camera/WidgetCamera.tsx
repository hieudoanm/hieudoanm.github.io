import { FaSolidCamera } from 'solid-icons/fa';
import { createEffect, createSignal, onMount } from 'solid-js';
import { useCamera } from '~/hooks/window/navigator/use-camera';

export const WidgetCamera = () => {
  let videoRef: HTMLVideoElement | null = null;
  const [size, setSize] = createSignal({
    width: (videoRef as unknown as HTMLVideoElement).videoWidth ?? 0,
    height: (videoRef as unknown as HTMLVideoElement).videoHeight ?? 0,
  });
  const camera = useCamera({
    width: size().width,
    height: size().height,
    facingMode: 'environment',
  });

  createEffect(() => {
    if (!camera || typeof document === 'undefined') return;
    console.log(camera);
    const cameraElement: HTMLVideoElement = document.getElementById(
      'camera'
    ) as HTMLVideoElement;
    cameraElement.srcObject = camera;
    return () => {
      cameraElement.srcObject = null;
    };
  });

  onMount(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener(
      'resize',
      () => {
        if (!videoRef) return;
        const videoWidth = videoRef.videoWidth ?? 0;
        const videoHeight = videoRef.videoHeight ?? 0;
        const size = videoWidth < videoHeight ? videoWidth : videoHeight;
        setSize({ width: size, height: size });
      },
      true
    );
    return () => {
      window.removeEventListener('resize', () => {}, false);
    };
  });

  const handleMetadataLoaded = () => {
    if (videoRef) {
      console.log('Video height:', videoRef.videoHeight);
      console.log('Video width:', videoRef.videoWidth);
    }
  };

  if (!camera) {
    return (
      <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
        <div class="flex h-full w-full items-center justify-center p-2">
          <FaSolidCamera />
        </div>
      </div>
    );
  }

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-2">
        <video
          id="camera"
          class="h-full overflow-hidden rounded-2xl object-cover grayscale"
          ref={(el) => {
            videoRef = el;
            videoRef.addEventListener('loadedmetadata', handleMetadataLoaded);
          }}
          autoplay>
          <track kind="captions" />
        </video>
      </div>
    </div>
  );
};
