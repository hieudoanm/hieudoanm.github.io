import { createSignal } from 'solid-js';

export const createLanguage = (): string => {
  const [language, setLanguage] = createSignal<string>(
    navigator.language || 'en'
  );

  setLanguage(navigator.language);

  return language();
};
