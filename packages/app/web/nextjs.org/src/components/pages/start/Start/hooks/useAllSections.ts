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
      {
        label: 'Developer',
        items: f(toolSections.developer, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Utilities',
        items: f(toolSections.utilities, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Converter',
        items: f(toolSections.converter, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Financial',
        items: f(toolSections.financial, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Casino',
        items: f(toolSections.casino, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Chess',
        items: f(toolSections.chess, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Clocks',
        items: f(toolSections.clocks, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Colors',
        items: f(toolSections.colors, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Format',
        items: f(toolSections.format, 'label'),
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
      {
        label: 'Games Arcade',
        items: f(toolSections['games-arcade'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Games Memory',
        items: f(toolSections['games-memory'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Games Puzzle',
        items: f(toolSections['games-puzzle'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Games Trivia',
        items: f(toolSections['games-trivia'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Games Word',
        items: f(toolSections['games-word'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Text Convert',
        items: f(toolSections['text-convert'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'AI',
        items: f(toolSections.ai, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Image Edit',
        items: f(toolSections['image-edit'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'JPG Convert',
        items: f(toolSections['image-convert-jpg'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'PNG Convert',
        items: f(toolSections['image-convert-png'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'WebP Convert',
        items: f(toolSections['image-convert-webp'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'HEIC Convert',
        items: f(toolSections['image-convert-heic'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'GIF Convert',
        items: f(toolSections['image-convert-gif'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'PSD Convert',
        items: f(toolSections['image-convert-psd'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'TIFF Convert',
        items: f(toolSections['image-convert-tiff'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'SVG Convert',
        items: f(toolSections['image-convert-svg'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Image Effect',
        items: f(toolSections['image-effect'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Image Create',
        items: f(toolSections['image-create'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Image Scan',
        items: f(toolSections['image-scan'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Visualization',
        items: f(toolSections.visualization, 'label'),
        Card: ItemCard as Card,
      },
      {
        label: 'Write Article',
        items: f(toolSections['write-article'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Write Business',
        items: f(toolSections['write-business'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Write Content',
        items: f(toolSections['write-content'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Write Edit',
        items: f(toolSections['write-edit'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Write Misc',
        items: f(toolSections['write-misc'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Write Real Estate',
        items: f(toolSections['write-real-estate'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Write Social',
        items: f(toolSections['write-social'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'AAC Convert',
        items: f(toolSections['video-convert-aac'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'AVI Convert',
        items: f(toolSections['video-convert-avi'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'FLV Convert',
        items: f(toolSections['video-convert-flv'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'GIF Convert',
        items: f(toolSections['video-convert-gif'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'M4A Convert',
        items: f(toolSections['video-convert-m4a'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'MKV Convert',
        items: f(toolSections['video-convert-mkv'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'MOV Convert',
        items: f(toolSections['video-convert-mov'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'MP4 Convert',
        items: f(toolSections['video-convert-mp4'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'OGG Convert',
        items: f(toolSections['video-convert-ogg'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'WMV Convert',
        items: f(toolSections['video-convert-wmv'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'WebM Convert',
        items: f(toolSections['video-convert-webm'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Video Edit',
        items: f(toolSections['video-edit'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Video Download',
        items: f(toolSections['video-download'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Video Audio',
        items: f(toolSections['video-audio'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Data CSV',
        items: f(toolSections['data-csv'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Data Excel',
        items: f(toolSections['data-excel'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Data JSON',
        items: f(toolSections['data-json'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'Data XML',
        items: f(toolSections['data-xml'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'PDF Convert',
        items: f(toolSections['pdf-convert'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'PDF Create',
        items: f(toolSections['pdf-create'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'PDF Ebook',
        items: f(toolSections['pdf-ebook'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'PDF Edit',
        items: f(toolSections['pdf-edit'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'PDF Extract',
        items: f(toolSections['pdf-extract'], 'label'),
        Card: ToolCard,
      },
      {
        label: 'PDF Misc',
        items: f(toolSections['pdf-misc'], 'label'),
        Card: ToolCard,
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
