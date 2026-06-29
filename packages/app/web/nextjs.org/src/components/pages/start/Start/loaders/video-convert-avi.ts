import { ComponentType, lazy } from 'react';

const loadvideo_avi_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-avi/VideoAviToGifModal').then(
    (m) => ({ default: m.VideoAviToGifModal })
  );

const loadvideo_avi_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-avi/VideoAviToMp3Modal').then(
    (m) => ({ default: m.VideoAviToMp3Modal })
  );

const loadvideo_avi_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-avi/VideoAviToMp4Modal').then(
    (m) => ({ default: m.VideoAviToMp4Modal })
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
  'video-avi-to-gif': loadvideo_avi_to_gif,
  'video-avi-to-mp3': loadvideo_avi_to_mp3,
  'video-avi-to-mp4': loadvideo_avi_to_mp4,
  'video-convert-to-webm': loadvideo_convert_to_webm,
  'video-to-gif': loadvideo_to_gif,
  'video-to-webp': loadvideo_to_webp,
};
