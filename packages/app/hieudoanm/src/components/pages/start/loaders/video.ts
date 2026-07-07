import { ComponentType } from 'react';

const ALL_VIDEO_IDS = [
  'video',
  'video-aac-to-mp3',
  'video-aac-to-mp4',
  'video-aac-to-wav',
  'video-avi-to-gif',
  'video-avi-to-mp3',
  'video-avi-to-mp4',
  'video-flv-to-mp4',
  'video-gif-to-mov',
  'video-gif-to-mp4',
  'video-gif-to-webm',
  'video-m4a-to-mp3',
  'video-m4a-to-mp4',
  'video-m4a-to-wav',
  'video-mkv-to-gif',
  'video-mkv-to-mp3',
  'video-mkv-to-mp4',
  'video-mov-to-avi',
  'video-mov-to-gif',
  'video-mov-to-mp3',
  'video-mov-to-mp4',
  'video-mov-to-wav',
  'video-mp4-to-avi',
  'video-mp4-to-mov',
  'video-mp4-to-mp3',
  'video-mp4-to-ogg',
  'video-mp4-to-wav',
  'video-convert-to-webm',
  'video-to-gif',
  'video-to-webp',
  'video-ogg-to-mp3',
  'video-ogg-to-wav',
  'video-webm-to-mp3',
  'video-wmv-to-mp4',
  'video-compress',
  'video-crop',
  'video-extract-audio',
  'video-extract-frames',
  'video-merge',
  'video-mute',
  'video-resize',
  'video-speed',
  'video-stabilize',
  'video-trim',
  'audio-transcribe',
  'generate-subtitle',
  'video-download-facebook',
  'video-download-instagram',
  'video-download-tiktok',
  'video-download-twitter',
  'video-youtube-text',
  'video-youtube-transcript',
];

const loadVideo = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video').then(
    (m) => ({ default: m.VideoModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = Object.fromEntries(ALL_VIDEO_IDS.map((id) => [id, loadVideo]));
