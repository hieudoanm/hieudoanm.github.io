import {
  createContext,
  useContext,
  createSignal,
  createEffect,
  onMount,
  JSX,
} from 'solid-js';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>();

export function ThemeProvider(props: { children?: JSX.Element }) {
  const [theme, setTheme] = createSignal<Theme>('light');

  onMount(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  });

  createEffect(() => {
    document.documentElement.classList.toggle('dark', theme() === 'dark');
    localStorage.setItem('theme', theme());
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value: ThemeContextProps = {
    get theme() {
      return theme();
    },
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
