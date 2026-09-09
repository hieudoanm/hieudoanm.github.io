import { Tool } from '@hieudoanm.github.io/components/atoms';
import type { IconType } from 'react-icons';
import {
  PiAirplane,
  PiAlien,
  PiArrowsClockwise,
  PiBook,
  PiBookOpen,
  PiBooks,
  PiBrain,
  PiBriefcase,
  PiBuilding,
  PiBuildings,
  PiCalendar,
  PiCamera,
  PiChartBar,
  PiChartLine,
  PiChatCircle,
  PiCheckCircle,
  PiClock,
  PiClockAfternoon,
  PiCloudArrowUp,
  PiCodeSimple,
  PiCurrencyDollar,
  PiDatabase,
  PiDivide,
  PiDotsNine,
  PiDrop,
  PiEnvelope,
  PiEnvelopeSimple,
  PiEyes,
  PiFacebookLogo,
  PiFileDoc,
  PiFileText,
  PiFilmStrip,
  PiFirstAidKit,
  PiFlag,
  PiFolder,
  PiGameController,
  PiGauge,
  PiGithubLogo,
  PiGlobe,
  PiHandPeace,
  PiHeart,
  PiHeartStraight,
  PiHourglass,
  PiInfinity,
  PiKey,
  PiLamp,
  PiLifebuoy,
  PiLightning,
  PiLink,
  PiMagnifyingGlass,
  PiMapPin,
  PiMoney,
  PiMoon,
  PiMusicNote,
  PiNewspaper,
  PiNotePencil,
  PiNotebook,
  PiNumberSquareOne,
  PiPackage,
  PiPianoKeys,
  PiPlay,
  PiPresentation,
  PiPresentationChart,
  PiQuestion,
  PiRepeat,
  PiRobot,
  PiRocket,
  PiRocketLaunch,
  PiScissors,
  PiSmiley,
  PiSmileyMelting,
  PiSmileyNervous,
  PiSnowflake,
  PiSparkle,
  PiSpiral,
  PiStarFour,
  PiTextAa,
  PiThreadsLogo,
  PiTimer,
  PiTrendDown,
  PiTwitterLogo,
  PiUsersThree,
  PiWatch,
  PiWaveSine,
  PiWaveform,
  PiWind,
  PiWindowsLogo,
  PiWrench,
} from 'react-icons/pi';
import appsJson from './apps.json';

export interface AppItem {
  label: string;
  description: string;
  icon: IconType;
  toolId: string;
}

export interface AppSection {
  id: string;
  label: string;
  items: AppItem[];
}

interface BookmarkJsonItem {
  label: string;
  description: string;
  icon: string;
  badge?: string;
  href: string;
}

interface AppJsonItem {
  label: string;
  description: string;
  icon: string;
  sectionId: string;
  toolId: string;
}

type JsonItem = BookmarkJsonItem | AppJsonItem;
type JsonSection = (typeof appsJson)[number];

const isAppItem = (item: JsonItem): item is AppJsonItem =>
  (item as AppJsonItem).sectionId !== undefined &&
  (item as AppJsonItem).toolId !== undefined;

const ICON_BY_NAME: Record<string, IconType> = {
  PiAirplane,
  PiAlien,
  PiArrowsClockwise,
  PiBook,
  PiBookOpen,
  PiBooks,
  PiBrain,
  PiBriefcase,
  PiBuilding,
  PiBuildings,
  PiCalendar,
  PiCamera,
  PiChartBar,
  PiChartLine,
  PiChatCircle,
  PiCheckCircle,
  PiClock,
  PiClockAfternoon,
  PiCloudArrowUp,
  PiCodeSimple,
  PiCurrencyDollar,
  PiDatabase,
  PiDivide,
  PiDotsNine,
  PiDrop,
  PiEnvelope,
  PiEnvelopeSimple,
  PiEyes,
  PiFacebookLogo,
  PiFileDoc,
  PiFileText,
  PiFilmStrip,
  PiFirstAidKit,
  PiFlag,
  PiFolder,
  PiGameController,
  PiGauge,
  PiGithubLogo,
  PiGlobe,
  PiHandPeace,
  PiHeart,
  PiHeartStraight,
  PiHourglass,
  PiInfinity,
  PiKey,
  PiLamp,
  PiLifebuoy,
  PiLightning,
  PiLink,
  PiMagnifyingGlass,
  PiMapPin,
  PiMoney,
  PiMoon,
  PiMusicNote,
  PiNewspaper,
  PiNotePencil,
  PiNotebook,
  PiNumberSquareOne,
  PiPackage,
  PiPianoKeys,
  PiPlay,
  PiPresentation,
  PiPresentationChart,
  PiQuestion,
  PiRepeat,
  PiRobot,
  PiRocket,
  PiRocketLaunch,
  PiScissors,
  PiSmiley,
  PiSmileyMelting,
  PiSmileyNervous,
  PiSnowflake,
  PiSparkle,
  PiSpiral,
  PiStarFour,
  PiTextAa,
  PiThreadsLogo,
  PiTimer,
  PiTrendDown,
  PiTwitterLogo,
  PiUsersThree,
  PiWatch,
  PiWaveSine,
  PiWaveform,
  PiWind,
  PiWindowsLogo,
  PiWrench,
};

const resolveIcon = (name: string): IconType => {
  const icon = ICON_BY_NAME[name];
  if (!icon) {
    throw new Error(`Unknown icon: ${name}`);
  }
  return icon;
};

const toBookmarkTool = (item: BookmarkJsonItem): Tool => ({
  label: item.label,
  description: item.description,
  href: item.href,
  icon: resolveIcon(item.icon),
  ...(item.badge ? { badge: item.badge } : {}),
});

export const APP_SECTIONS: AppSection[] = appsJson
  .filter((section) => section.id)
  .map((section) => ({
    id: section.id as string,
    label: section.label,
    items: section.items.filter(isAppItem).map((t) => ({
      label: t.label,
      description: t.description,
      icon: resolveIcon(t.icon),
      toolId: t.toolId as string,
    })),
  }));

export const getAppSections = (): {
  id: string;
  label: string;
  items: Tool[];
}[] =>
  APP_SECTIONS.map(({ id, label, items }) => ({
    id,
    label,
    items: items.map((t) => ({
      label: t.label,
      description: t.description,
      icon: t.icon,
      href: `/${id}/${t.toolId}`,
    })),
  }));

export const getHomeSections = (): {
  label: string;
  items: Tool[];
}[] =>
  appsJson.map((section: JsonSection) => ({
    label: section.label,
    items: section.items.map((item) =>
      isAppItem(item)
        ? {
            label: item.label,
            description: item.description,
            icon: resolveIcon(item.icon),
            href: `/${item.sectionId}/${item.toolId}`,
          }
        : toBookmarkTool(item)
    ),
  }));
