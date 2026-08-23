import type { ComponentType } from 'react';
import { Tool } from '@hieudoanm.github.io/components/atoms';
import type { IconType } from 'react-icons';
import {
  PiBook,
  PiBugDroid,
  PiBuilding,
  PiCheckCircle,
  PiGameController,
  PiGraph,
  PiHurricane,
  PiLamp,
  PiNumberSquareOne,
  PiPaintBrushBroad,
  PiPi,
  PiPuzzlePiece,
  PiQuestion,
  PiRepeat,
  PiScales,
  PiScissors,
  PiShuffle,
  PiSnowflake,
  PiSortAscending,
  PiTarget,
} from 'react-icons/pi';
import gamesJson from './games.json';

export interface GameItem {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  toolId: string;
}

export interface GameSection {
  id: string;
  label: string;
  items: GameItem[];
}

type GameJsonItem = (typeof gamesJson)[number]['items'][number];

const ICON_BY_NAME: Record<string, IconType> = {
  PiBook,
  PiBugDroid,
  PiBuilding,
  PiCheckCircle,
  PiGameController,
  PiGraph,
  PiHurricane,
  PiLamp,
  PiNumberSquareOne,
  PiPaintBrushBroad,
  PiPi,
  PiPuzzlePiece,
  PiQuestion,
  PiRepeat,
  PiScales,
  PiScissors,
  PiShuffle,
  PiSnowflake,
  PiSortAscending,
  PiTarget,
};

const resolveIcon = (name: string): GameItem['icon'] => {
  const icon = ICON_BY_NAME[name];
  if (!icon) {
    throw new Error(`Unknown game icon: ${name}`);
  }
  return icon;
};

const toGameItem = (item: GameJsonItem): GameItem => ({
  label: item.label,
  description: item.description,
  icon: resolveIcon(item.icon),
  toolId: item.toolId,
});

export const GAME_SECTIONS: GameSection[] = gamesJson.map((section) => ({
  id: section.id,
  label: section.label,
  items: section.items.map(toGameItem),
}));

export const getGameSections = (): {
  id: string;
  label: string;
  items: Tool[];
}[] =>
  GAME_SECTIONS.map(({ id, label, items }) => ({
    id,
    label,
    items: items.map((t) => ({
      label: t.label,
      description: t.description,
      icon: t.icon,
      href: `/games/${id}/${t.toolId}`,
    })),
  }));
