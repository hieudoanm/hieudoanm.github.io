import { createSignal, onCleanup, onMount } from 'solid-js';

export const createOnline = (): boolean => {
  const [isOnline, setIsOnline] = createSignal<boolean>(navigator.onLine);

  onMount(() => {
    const updateOnline = () => setIsOnline(true);
    const updateOffline = () => setIsOnline(false);

    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOffline);

    onCleanup(() => {
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOffline);
    });
  });

  return isOnline();
};
