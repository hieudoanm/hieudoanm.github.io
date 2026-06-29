import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'MOV to AVI',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-mov-to-avi'),
  },
  {
    label: 'MOV to GIF',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-mov-to-gif'),
  },
  {
    label: 'MOV to MP3',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-mov-to-mp3'),
  },
  {
    label: 'MOV to MP4',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-mov-to-mp4'),
  },
  {
    label: 'MOV to WAV',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-mov-to-wav'),
  },
];
