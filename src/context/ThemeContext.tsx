import { Theme } from 'daisyui';
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

export const DARK_THEMES: Theme[] = [
  'black',
  'business',
  'coffee',
  'dark',
  'dim',
  'dracula',
  'halloween',
  'forest',
  'luxury',
  'night',
  'sunset',
  'synthwave',
];

export const COLORED_THEMES: Theme[] = ['aqua', 'cyberpunk'];

export const LIGHT_THEMES: Theme[] = [
  'acid',
  'autumn',
  'bumblebee',
  'cmyk',
  'corporate',
  'cupcake',
  'emerald',
  'fantasy',
  'garden',
  'lemonade',
  'light',
  'lofi',
  'nord',
  'pastel',
  'retro',
  'valentine',
  'wireframe',
  'winter',
];

export const THEMES: Theme[] = [
  ...DARK_THEMES,
  ...COLORED_THEMES,
  ...LIGHT_THEMES,
];

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}>({
  theme: 'light',
  setTheme: (value: SetStateAction<Theme>) => value,
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({
  children = <></>,
}) => {
  const [theme, setTheme] = useState<Theme>('coffee');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
