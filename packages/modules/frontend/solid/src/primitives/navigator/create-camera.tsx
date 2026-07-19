import { createSignal, onCleanup, onMount } from 'solid-js';

export const createCamera = () => {
  const [stream, setStream] = createSignal<MediaStream | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  onMount(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
      } catch (err) {
        console.error(err);
        setError('Camera access denied or not available');
      }
    };

    startCamera();
  });

  onCleanup(() => {
    stream()
      ?.getTracks()
      .forEach((track) => track.stop());
  });

  return { stream, error };
};
