import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Agent Bio',
    description: 'Write',
    tags: ['real-estate', 'property', 'listing'],
    emoji: '✍️',
    onClick: open('write-real-estate-bio'),
  },
  {
    label: 'Real Estate Desc',
    description: 'Write',
    tags: ['real-estate', 'property', 'listing'],
    emoji: '✍️',
    onClick: open('write-real-estate-description'),
  },
  {
    label: 'Real Estate Listing',
    description: 'Write',
    tags: ['real-estate', 'property'],
    emoji: '✍️',
    onClick: open('write-real-estate-listing'),
  },
];
