import { ComponentType, lazy } from 'react';

const loadvideo_wmv_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-convert-wmv/VideoWmvToMp4Modal').then(
    (m) => ({ default: m.VideoWmvToMp4Modal })
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
  'video-wmv-to-mp4': loadvideo_wmv_to_mp4,
  'video-convert-to-webm': loadvideo_convert_to_webm,
  'video-to-gif': loadvideo_to_gif,
  'video-to-webp': loadvideo_to_webp,
};
