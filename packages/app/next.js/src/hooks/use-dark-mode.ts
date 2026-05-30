import { useEffect, useState } from 'react';

export const useDarkMode = (): {
  darkMode: boolean;
  toggleDarkMode: () => void;
} => {
  const [darkMode, setDarkMode] = useState<boolean>(true); // default to dark mode

  useEffect(() => {
    const saved = localStorage.getItem('theme');

    if (saved === 'light') {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((previous) => {
      const next = !previous;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return { darkMode, toggleDarkMode };
};
