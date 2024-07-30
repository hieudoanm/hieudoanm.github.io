import { randomNumber } from '@web/utils/random/number';
import { Theme } from 'daisyui';
import {
  Inter,
  Lato,
  Montserrat,
  Open_Sans,
  Oswald,
  Poppins,
  Raleway,
  Roboto,
  Roboto_Mono,
  Space_Mono,
  Ubuntu,
  Ubuntu_Mono,
} from 'next/font/google';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

export type Font =
  | 'inter'
  | 'lato'
  | 'montserrat'
  | 'openSans'
  | 'oswald'
  | 'poppins'
  | 'raleway'
  | 'roboto'
  | 'robotoMono'
  | 'spaceMono'
  | 'ubuntu'
  | 'ubuntuMono';
const inter = Inter({ subsets: ['latin'], weight: '400' });
const interClassName: string = inter.className;
const lato = Lato({ subsets: ['latin'], weight: '400' });
const latoClassName: string = lato.className;
const montserrat = Montserrat({ subsets: ['latin'], weight: '400' });
const montserratClassName: string = montserrat.className;
const openSans = Open_Sans({ subsets: ['latin'], weight: '400' });
const openSansClassName: string = openSans.className;
const oswald = Oswald({ subsets: ['latin'], weight: '400' });
const oswaldClassName: string = oswald.className;
const poppins = Poppins({ subsets: ['latin'], weight: '400' });
const poppinsClassName: string = poppins.className;
const raleway = Raleway({ subsets: ['latin'], weight: '400' });
const ralewayClassName: string = raleway.className;
const roboto = Roboto({ subsets: ['latin'], weight: '400' });
const robotoClassName: string = roboto.className;
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '400' });
const robotoMonoClassName: string = robotoMono.className;
const spaceMono = Space_Mono({ subsets: ['latin'], weight: '400' });
const spaceMonoClassName: string = spaceMono.className;
const ubuntu = Ubuntu({ subsets: ['latin'], weight: '400' });
const ubuntuClassName: string = ubuntu.className;
const ubuntuMono = Ubuntu_Mono({ subsets: ['latin'], weight: '400' });
const ubuntuMonoClassName: string = ubuntuMono.className;
export const fonts: Record<Font, string> = {
  inter: interClassName,
  lato: latoClassName,
  montserrat: montserratClassName,
  openSans: openSansClassName,
  oswald: oswaldClassName,
  poppins: poppinsClassName,
  raleway: ralewayClassName,
  roboto: robotoClassName,
  robotoMono: robotoMonoClassName,
  spaceMono: spaceMonoClassName,
  ubuntu: ubuntuClassName,
  ubuntuMono: ubuntuMonoClassName,
};

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
  font: string;
  setFont: (font: Font) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  font: fonts.robotoMono,
  setFont: (value: Font) => value,
  theme: 'light',
  setTheme: (value: Theme) => value,
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({
  children = <></>,
}) => {
  // const randomThemeIndex: number = randomNumber(0, DARK_THEMES.length - 1);
  const [settings, setSettings] = useState<{ font: Font; theme: Theme }>({
    font: 'robotoMono',
    theme: 'coffee',
  });
  const setTheme = (theme: Theme) => setSettings({ ...settings, theme });
  const setFont = (font: Font) => setSettings({ ...settings, font });

  const { theme, font } = settings;
  const value = useMemo(
    () => ({ font, setFont, theme, setTheme }),
    [font, theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={theme} className={fonts[settings.font]}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
