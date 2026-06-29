import { ComponentType, lazy } from 'react';

const loadvideo_mkv_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mkv/VideoMkvToMp4Modal').then(
    (m) => ({ default: m.VideoMkvToMp4Modal })
  );

const loadvideo_mkv_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mkv/VideoMkvToGifModal').then(
    (m) => ({ default: m.VideoMkvToGifModal })
  );

const loadvideo_mkv_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-mkv/VideoMkvToMp3Modal').then(
    (m) => ({ default: m.VideoMkvToMp3Modal })
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
  'video-mkv-to-mp4': loadvideo_mkv_to_mp4,
  'video-mkv-to-gif': loadvideo_mkv_to_gif,
  'video-mkv-to-mp3': loadvideo_mkv_to_mp3,
  'video-convert-to-webm': loadvideo_convert_to_webm,
  'video-to-gif': loadvideo_to_gif,
  'video-to-webp': loadvideo_to_webp,
};
