import {
  Be_Vietnam_Pro,
  Fira_Code,
  Inter,
  JetBrains_Mono,
  Lato,
  Merriweather,
  Noto_Sans,
  Open_Sans,
  Roboto,
  Roboto_Mono,
  Source_Code_Pro,
  Ubuntu_Mono,
} from 'next/font/google';

const beVietnamPro = Be_Vietnam_Pro({ subsets: ['latin'], weight: '400' });
const firaCode = Fira_Code({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: '400' });
const merriweather = Merriweather({ subsets: ['latin'], weight: '400' });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: '400' });
const openSans = Open_Sans({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'] });
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });
const ubuntuMono = Ubuntu_Mono({ subsets: ['latin'], weight: '400' });

export const FONTS = [
  {
    id: 'be-vietnam-pro',
    name: 'Be Vietnam Pro',
    className: beVietnamPro.className,
  },
  { id: 'fira-code', name: 'Fira Code', className: firaCode.className },
  { id: 'inter', name: 'Inter', className: inter.className },
  {
    id: 'jetbrains-mono',
    name: 'JetBrains Mono',
    className: jetBrainsMono.className,
  },
  { id: 'lato', name: 'Lato', className: lato.className },
  {
    id: 'merriweather',
    name: 'Merriweather',
    className: merriweather.className,
  },
  { id: 'noto-sans', name: 'Noto Sans', className: notoSans.className },
  { id: 'open-sans', name: 'Open Sans', className: openSans.className },
  { id: 'roboto', name: 'Roboto', className: roboto.className },
  { id: 'roboto-mono', name: 'Roboto Mono', className: robotoMono.className },
  {
    id: 'source-code-pro',
    name: 'Source Code Pro',
    className: sourceCodePro.className,
  },
  { id: 'ubuntu-mono', name: 'Ubuntu Mono', className: ubuntuMono.className },
];

export const DEFAULT_FONT_ID = 'roboto';
