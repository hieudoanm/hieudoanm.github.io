import type { ComponentType } from 'react';
import { Tool } from '@hieudoanm.github.io/components/atoms';
import type { IconType } from 'react-icons';
import {
  PiArrowsClockwise,
  PiBook,
  PiBooks,
  PiBrain,
  PiBuilding,
  PiBuildings,
  PiCalendar,
  PiChartBar,
  PiClock,
  PiClockAfternoon,
  PiCurrencyDollar,
  PiDivide,
  PiDotsNine,
  PiEyes,
  PiFileText,
  PiFilmStrip,
  PiFirstAidKit,
  PiFlag,
  PiGauge,
  PiGlobe,
  PiHandPeace,
  PiHeart,
  PiHeartStraight,
  PiHourglass,
  PiKey,
  PiLamp,
  PiLifebuoy,
  PiLink,
  PiMagnifyingGlass,
  PiMoney,
  PiMoon,
  PiNotePencil,
  PiNotebook,
  PiNumberSquareOne,
  PiPianoKeys,
  PiPresentation,
  PiQuestion,
  PiRepeat,
  PiRocketLaunch,
  PiScissors,
  PiSmiley,
  PiSmileyMelting,
  PiSmileyNervous,
  PiSnowflake,
  PiSparkle,
  PiSpiral,
  PiTextAa,
  PiTimer,
  PiWatch,
  PiWaveSine,
  PiWrench,
} from 'react-icons/pi';
import appsJson from './apps.json';

export interface AppItem {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  toolId: string;
}

export interface AppSection {
  id: string;
  label: string;
  items: AppItem[];
}

type AppJsonItem = (typeof appsJson)[number]['items'][number];

const ICON_BY_NAME: Record<string, IconType> = {
  PiArrowsClockwise,
  PiBook,
  PiBooks,
  PiBrain,
  PiBuilding,
  PiBuildings,
  PiCalendar,
  PiChartBar,
  PiClock,
  PiClockAfternoon,
  PiCurrencyDollar,
  PiDivide,
  PiDotsNine,
  PiEyes,
  PiFileText,
  PiFilmStrip,
  PiFirstAidKit,
  PiFlag,
  PiGauge,
  PiGlobe,
  PiHandPeace,
  PiHeart,
  PiHeartStraight,
  PiHourglass,
  PiKey,
  PiLamp,
  PiLifebuoy,
  PiLink,
  PiMagnifyingGlass,
  PiMoney,
  PiMoon,
  PiNotePencil,
  PiNotebook,
  PiNumberSquareOne,
  PiPianoKeys,
  PiPresentation,
  PiQuestion,
  PiRepeat,
  PiRocketLaunch,
  PiScissors,
  PiSmiley,
  PiSmileyMelting,
  PiSmileyNervous,
  PiSnowflake,
  PiSparkle,
  PiSpiral,
  PiTextAa,
  PiTimer,
  PiWatch,
  PiWaveSine,
  PiWrench,
};

const resolveIcon = (name: string): AppItem['icon'] => {
  const icon = ICON_BY_NAME[name];
  if (!icon) {
    throw new Error(`Unknown app icon: ${name}`);
  }
  return icon;
};

const toAppItem = (item: AppJsonItem): AppItem => ({
  label: item.label,
  description: item.description,
  icon: resolveIcon(item.icon),
  toolId: item.toolId,
});

export const APP_SECTIONS: AppSection[] = appsJson.map((section) => ({
  id: section.id,
  label: section.label,
  items: section.items.map(toAppItem),
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
      href: `/apps/${id}/${t.toolId}`,
    })),
  }));
