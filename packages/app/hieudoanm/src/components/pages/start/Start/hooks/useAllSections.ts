import {
  ItemCard,
  ItemCardProps,
} from '@hieudoanm.github.io/components/pages/start/cards/ItemCard';
import {
  Tool,
  ToolCard,
} from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
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
import { ComponentType, FC, useMemo } from 'react';
import { match } from '../constants';
import { getToolSectionDefs } from '../sections';

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
    }[] = getToolSectionDefs(toolSections)
      .sort((a, b) => a.label.localeCompare(b.label))
      .map(({ label, items }) => ({
        label,
        items: f(items, 'label'),
        Card: label === 'Visualization' ? (ItemCard as Card) : ToolCard,
      }));

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
