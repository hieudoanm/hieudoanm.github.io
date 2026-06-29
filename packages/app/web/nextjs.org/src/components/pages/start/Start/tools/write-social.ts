import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Caption',
    description: 'Write',
    tags: ['social-media', 'post', 'writing'],
    emoji: '✍️',
    color: '#8b5cf6',
    onClick: open('write-caption'),
  },
  {
    label: 'Headline',
    description: 'Write',
    tags: ['social-media', 'post', 'writing'],
    emoji: '✍️',
    color: '#8b5cf6',
    onClick: open('write-headline'),
  },
  {
    label: 'LinkedIn Post',
    description: 'Write',
    tags: ['social-media', 'writing'],
    emoji: '✍️',
    color: '#8b5cf6',
    onClick: open('write-linkedin-post'),
  },
  {
    label: 'Meta Description',
    description: 'Write',
    tags: ['social-media', 'post', 'writing'],
    emoji: '✍️',
    color: '#8b5cf6',
    onClick: open('write-meta-description'),
  },
  {
    label: 'TikTok Script',
    description: 'Write',
    tags: ['social-media', 'post', 'writing', 'social', 'short-video'],
    emoji: '✍️',
    color: '#8b5cf6',
    onClick: open('write-tiktok-script'),
  },
  {
    label: 'Twitter Generator',
    description: 'Write',
    tags: [
      'social-media',
      'post',
      'writing',
      'social',
      'tweet',
      'create',
      'maker',
      'builder',
    ],
    emoji: '✍️',
    color: '#8b5cf6',
    onClick: open('write-twitter-generator'),
  },
];
