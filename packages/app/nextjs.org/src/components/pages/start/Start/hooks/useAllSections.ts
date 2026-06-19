import { useMemo } from 'react';

import {
  agents as agentsBookmarks,
  code as codeBookmarks,
  google as googleBookmarks,
  messaging as messagingBookmarks,
  music as musicBookmarks,
  social as socialBookmarks,
  work as workBookmarks,
} from '@hieudoanm.github.io/data/bookmarks';
import {
  agents,
  clis,
  extensions,
  packages,
} from '@hieudoanm.github.io/data/downloads';
import { ItemCardProps } from '@hieudoanm.github.io/components/pages/start/cards/ItemCard';
import {
  Tool,
  ToolCard,
} from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ItemCard } from '@hieudoanm.github.io/components/pages/start/cards/ItemCard';
import { ComponentType, FC } from 'react';

import { match } from '../constants';

type SectionItem = ItemCardProps | Tool;
type Card = FC<any> | ComponentType<any>;

export const useAllSections = (
  query: string,
  toolSections: Record<string, Tool[]>
) =>
  useMemo(() => {
    const filtering = query.trim().length > 0;
    const f = <T extends { label?: string; id?: string }>(
      items: T[],
      key: keyof T & ('label' | 'id')
    ) =>
      filtering
        ? items.filter((item) => match(String(item[key] ?? ''), query))
        : items;

    const toItemCard = <
      T extends { url: string; downloads?: { label: string; url: string }[] },
    >(
      item: T
    ): Omit<T, 'url' | 'downloads'> & {
      href: string;
      actions?: { label: string; url: string }[];
    } => ({
      ...item,
      href: item.url,
      actions: item.downloads,
    });

    const bookmarkSections: {
      label: string;
      items: SectionItem[];
      Card: Card;
    }[] = [
      { label: 'Agents', items: f(agentsBookmarks, 'label'), Card: ItemCard },
      { label: 'Code', items: f(codeBookmarks, 'label'), Card: ItemCard },
      {
        label: 'Google Workspace',
        items: f(googleBookmarks, 'label'),
        Card: ItemCard,
      },
      {
        label: 'Messaging',
        items: f(messagingBookmarks, 'label'),
        Card: ItemCard,
      },
      { label: 'Music', items: f(musicBookmarks, 'label'), Card: ItemCard },
      { label: 'Social', items: f(socialBookmarks, 'label'), Card: ItemCard },
      { label: 'Work', items: f(workBookmarks, 'label'), Card: ItemCard },
    ];

    const toolSectionDefs: {
      label: string;
      items: SectionItem[];
      Card: Card;
    }[] = [
      { label: 'Tools', items: f(toolSections.tools, 'label'), Card: ToolCard },
      {
        label: 'Calculators',
        items: f(toolSections.calculators, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Casino',
        items: f(toolSections.casino, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Clocks',
        items: f(toolSections.clocks, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Converters',
        items: f(toolSections.converters, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Editors',
        items: f(toolSections.editors, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Education',
        items: f(toolSections.education, 'label'),
        Card: ToolCard,
      },
      { label: 'Eyes', items: f(toolSections.eyes, 'label'), Card: ToolCard },
      { label: 'Games', items: f(toolSections.games, 'label'), Card: ToolCard },
      {
        label: 'Memory',
        items: f(toolSections.memory, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Images',
        items: f(toolSections.images, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Visualization',
        items: f(toolSections.visualization, 'label'),
        Card: ItemCard as Card,
      },
    ];

    const downloadSections: {
      label: string;
      items: SectionItem[];
      Card: Card;
    }[] = [
      {
        label: 'Agents',
        items: f(agents, 'label').map(toItemCard),
        Card: ItemCard,
      },
      { label: 'CLIs', items: f(clis, 'id').map(toItemCard), Card: ItemCard },
      {
        label: 'Extensions',
        items: f(extensions, 'id').map(toItemCard),
        Card: ItemCard,
      },
      {
        label: 'Packages',
        items: f(packages, 'id').map(toItemCard),
        Card: ItemCard,
      },
    ];

    return [...bookmarkSections, ...toolSectionDefs, ...downloadSections];
  }, [query, toolSections]);
