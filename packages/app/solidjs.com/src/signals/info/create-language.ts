import { createSignal } from 'solid-js';

export const useLanguage = () => {
  const [language] = createSignal<string>(navigator.language || 'en');
  return language;
};
