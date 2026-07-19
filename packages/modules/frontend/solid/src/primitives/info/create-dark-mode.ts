import { createSignal, onMount } from 'solid-js';

export const createDarkMode = (): {
  darkMode: boolean;
  toggleDarkMode: () => void;
} => {
  const [darkMode, setDarkMode] = createSignal<boolean>(true);

  onMount(() => {
    const saved = localStorage.getItem('theme');

    if (saved === 'light') {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  });

  const toggleDarkMode = () => {
    setDarkMode((previous) => {
      const next = !previous;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return {
    get darkMode() {
      return darkMode();
    },
    toggleDarkMode,
  };
};
