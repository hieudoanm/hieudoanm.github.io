import { ComponentType, lazy } from 'react';

const loadvideo_gif_to_mov = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-gif/VideoGifToMovModal').then(
    (m) => ({ default: m.VideoGifToMovModal })
  );

const loadvideo_gif_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-gif/VideoGifToMp4Modal').then(
    (m) => ({ default: m.VideoGifToMp4Modal })
  );

const loadvideo_gif_to_webm = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-gif/VideoGifToWebmModal').then(
    (m) => ({ default: m.VideoGifToWebmModal })
  );

const loadvideo_convert_to_webm = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mp4/VideoConvertToWebmModal').then(
    (m) => ({ default: m.VideoConvertToWebmModal })
  );
const loadvideo_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mp4/VideoToGifModal').then(
    (m) => ({ default: m.VideoToGifModal })
  );
const loadvideo_to_webp = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mp4/VideoToWebpModal').then(
    (m) => ({ default: m.VideoToWebpModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-gif-to-mov': loadvideo_gif_to_mov,
  'video-gif-to-mp4': loadvideo_gif_to_mp4,
  'video-gif-to-webm': loadvideo_gif_to_webm,
  'video-convert-to-webm': loadvideo_convert_to_webm,
  'video-to-gif': loadvideo_to_gif,
  'video-to-webp': loadvideo_to_webp,
};
