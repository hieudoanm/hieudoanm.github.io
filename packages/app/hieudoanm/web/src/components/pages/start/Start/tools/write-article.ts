import { PiPencilLine } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Article',
    description: 'Write',
    tags: ['content', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-article'),
  },
  {
    label: 'Article Rewriter',
    description: 'Write',
    tags: ['content', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-article-rewriter'),
  },
  {
    label: 'Blog Ideas',
    description: 'Write',
    tags: ['article', 'content', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-blog-ideas'),
  },
  {
    label: 'Blog Outline',
    description: 'Write',
    tags: ['article', 'content', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-blog-outline'),
  },
  {
    label: 'Blog Post',
    description: 'Write',
    tags: ['article', 'content', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-blog-post'),
  },
  {
    label: 'Essay',
    description: 'Write',
    tags: ['article', 'content', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-essay'),
  },
  {
    label: 'Listicle',
    description: 'Write',
    tags: ['article', 'content', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-listicle'),
  },
  {
    label: 'Paragraph',
    description: 'Write',
    tags: ['article', 'content', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-paragraph'),
  },
  {
    label: 'Story',
    description: 'Write',
    tags: ['article', 'content', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-story'),
  },
  {
    label: 'Story Ideas',
    description: 'Write',
    tags: ['article', 'content', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-story-ideas'),
  },
  {
    label: 'YouTube Script',
    description: 'Write',
    tags: ['article', 'content', 'writing', 'yt', 'video', 'download'],
    icon: PiPencilLine,
    onClick: open('write-youtube-script'),
  },
];
