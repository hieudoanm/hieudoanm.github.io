import { Tool } from '@hieudoanm.github.io/components/atoms';
import type { IconType } from 'react-icons';
import {
  PiAtom,
  PiBooks,
  PiBrain,
  PiCardholder,
  PiChat,
  PiClipboard,
  PiCodeSimple,
  PiCurrencyDollar,
  PiDatabase,
  PiDiceOne,
  PiEye,
  PiFilePdf,
  PiFolder,
  PiFrameCorners,
  PiGameController,
  PiGear,
  PiGlobe,
  PiGlobeHemisphereWest,
  PiGraduationCap,
  PiGridFour,
  PiGridNine,
  PiHamburger,
  PiImage,
  PiMarkdownLogo,
  PiMicroscope,
  PiMusicNote,
  PiPaintBrush,
  PiPaperPlaneTilt,
  PiPassword,
  PiPath,
  PiPresentation,
  PiProhibit,
  PiScan,
  PiShoppingCart,
  PiSoccerBall,
  PiTable,
  PiTerminal,
  PiTimer,
  PiTrophy,
  PiVideoCamera,
  PiWallet,
  PiWaveSine,
  PiX,
} from 'react-icons/pi';
import downloadsJson from './downloads.json';

export interface DownloadSection {
  id: string;
  label: string;
  items: Tool[];
}

type DownloadJsonSection = (typeof downloadsJson)[number];
type DownloadJsonItem = DownloadJsonSection['items'][number];

const ICON_BY_NAME: Record<string, IconType> = {
  PiAtom,
  PiBooks,
  PiBrain,
  PiCardholder,
  PiChat,
  PiClipboard,
  PiCodeSimple,
  PiCurrencyDollar,
  PiDatabase,
  PiDiceOne,
  PiEye,
  PiFilePdf,
  PiFolder,
  PiFrameCorners,
  PiGameController,
  PiGear,
  PiGlobe,
  PiGlobeHemisphereWest,
  PiGraduationCap,
  PiGridFour,
  PiGridNine,
  PiHamburger,
  PiImage,
  PiMarkdownLogo,
  PiMicroscope,
  PiMusicNote,
  PiPaintBrush,
  PiPaperPlaneTilt,
  PiPassword,
  PiPath,
  PiPresentation,
  PiProhibit,
  PiScan,
  PiShoppingCart,
  PiSoccerBall,
  PiTable,
  PiTerminal,
  PiTimer,
  PiTrophy,
  PiVideoCamera,
  PiWallet,
  PiWaveSine,
  PiX,
};

const resolveIcon = (name: string): Tool['icon'] => {
  const icon = ICON_BY_NAME[name];
  if (!icon) {
    throw new Error(`Unknown download icon: ${name}`);
  }
  return icon;
};

const toTool = (item: DownloadJsonItem): Tool => ({
  label: item.label,
  description: item.description,
  icon: resolveIcon(item.icon),
  href: item.href,
  actions: item.actions,
});

export const DOWNLOAD_SECTIONS: DownloadSection[] = downloadsJson.map(
  (section) => ({
    id: section.id,
    label: section.label,
    items: section.items.map(toTool),
  })
);
