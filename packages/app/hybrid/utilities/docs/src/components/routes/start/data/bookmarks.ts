import { Tool } from '@hieudoanm.github.io/components/atoms';
import type { IconType } from 'react-icons';
import {
  PiAirplane,
  PiAlien,
  PiBookOpen,
  PiBriefcase,
  PiCalendar,
  PiCamera,
  PiChartBar,
  PiChartLine,
  PiChatCircle,
  PiCheckCircle,
  PiCloudArrowUp,
  PiCodeSimple,
  PiDatabase,
  PiDrop,
  PiEnvelope,
  PiEnvelopeSimple,
  PiFacebookLogo,
  PiFileDoc,
  PiFolder,
  PiGameController,
  PiGithubLogo,
  PiGlobe,
  PiHeart,
  PiInfinity,
  PiLightning,
  PiMagnifyingGlass,
  PiMapPin,
  PiMoon,
  PiMusicNote,
  PiNewspaper,
  PiNotebook,
  PiNotePencil,
  PiPackage,
  PiPlay,
  PiPresentationChart,
  PiRobot,
  PiRocket,
  PiSmiley,
  PiSparkle,
  PiStarFour,
  PiThreadsLogo,
  PiTrendDown,
  PiTwitterLogo,
  PiUsersThree,
  PiWaveform,
  PiWind,
  PiWindowsLogo,
} from 'react-icons/pi';
import bookmarksJson from './bookmarks.json';

export interface BookmarkSection {
  label: string;
  items: Tool[];
}

type BookmarkItem = (typeof bookmarksJson)[number]['items'][number];

const ICON_BY_NAME: Record<string, IconType> = {
  PiAirplane,
  PiAlien,
  PiBookOpen,
  PiBriefcase,
  PiCalendar,
  PiCamera,
  PiChartBar,
  PiChartLine,
  PiChatCircle,
  PiCheckCircle,
  PiCloudArrowUp,
  PiCodeSimple,
  PiDatabase,
  PiDrop,
  PiEnvelope,
  PiEnvelopeSimple,
  PiFacebookLogo,
  PiFileDoc,
  PiFolder,
  PiGameController,
  PiGithubLogo,
  PiGlobe,
  PiHeart,
  PiInfinity,
  PiLightning,
  PiMagnifyingGlass,
  PiMapPin,
  PiMoon,
  PiMusicNote,
  PiNewspaper,
  PiNotebook,
  PiNotePencil,
  PiPackage,
  PiPlay,
  PiPresentationChart,
  PiRobot,
  PiRocket,
  PiSmiley,
  PiSparkle,
  PiStarFour,
  PiThreadsLogo,
  PiTrendDown,
  PiTwitterLogo,
  PiUsersThree,
  PiWaveform,
  PiWind,
  PiWindowsLogo,
};

const resolveIcon = (name: string): Tool['icon'] => {
  const icon = ICON_BY_NAME[name];
  if (!icon) {
    throw new Error(`Unknown bookmark icon: ${name}`);
  }
  return icon;
};

const toTool = (item: BookmarkItem): Tool => ({
  label: item.label,
  description: item.description,
  href: item.href,
  icon: resolveIcon(item.icon),
  ...(item.badge ? { badge: item.badge } : {}),
});

export const BOOKMARK_SECTIONS: BookmarkSection[] = bookmarksJson.map(
  (section) => ({
    label: section.label,
    items: section.items.map(toTool),
  })
);
