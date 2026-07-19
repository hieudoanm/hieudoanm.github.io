import { createSignal, onCleanup, onMount } from 'solid-js';

export const createMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = createSignal(window.matchMedia(query).matches);

  onMount(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener('change', listener);
    onCleanup(() => media.removeEventListener('change', listener));
  });

  return matches();
};
