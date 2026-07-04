import {
  Tool,
  ToolCard,
} from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import {
  ItemCard,
  ItemCardProps,
} from '@hieudoanm.github.io/components/pages/start/components/main/BookmarksView/ItemCard';
import { ComponentType, FC, useMemo } from 'react';
import {
  agents as agentsBookmarks,
  code as codeBookmarks,
  google as googleBookmarks,
  messaging as messagingBookmarks,
  music as musicBookmarks,
  social as socialBookmarks,
  work as workBookmarks,
} from '../components/main/BookmarksView/data';
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

    return [...bookmarkSections, ...toolSectionDefs];
  }, [query, toolSections]);
