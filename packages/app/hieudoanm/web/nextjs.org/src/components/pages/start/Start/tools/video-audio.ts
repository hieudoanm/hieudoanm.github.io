import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Subtitles',
    description: 'Video',
    tags: ['audio', 'media', 'mp4', 'movie', 'clip', 'footage'],
    emoji: '🎤',
    onClick: open('generate-subtitle'),
  },
  {
    label: 'Transcribe',
    description: 'Video',
    tags: ['audio', 'media', 'mp4', 'movie', 'clip', 'footage'],
    emoji: '🎤',
    onClick: open('audio-transcribe'),
  },
];
