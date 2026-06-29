import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Convert to WebM',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-convert-to-webm'),
  },
  {
    label: 'MP4 to AVI',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-mp4-to-avi'),
  },
  {
    label: 'MP4 to MOV',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-mp4-to-mov'),
  },
  {
    label: 'MP4 to MP3',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-mp4-to-mp3'),
  },
  {
    label: 'MP4 to OGG',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-mp4-to-ogg'),
  },
  {
    label: 'MP4 to WAV',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-mp4-to-wav'),
  },
  {
    label: 'Video to GIF',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-to-gif'),
  },
  {
    label: 'Video to WebP',
    description: 'Video',
    tags: ['media', 'convert'],
    emoji: '🎬',
    color: '#ef4444',
    onClick: open('video-to-webp'),
  },
];
