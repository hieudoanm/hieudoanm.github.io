import { ComponentType, lazy } from 'react';

const loadvideo_aac_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoAacToMp3Modal').then(
    (m) => ({ default: m.VideoAacToMp3Modal })
  );

const loadvideo_aac_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoAacToMp4Modal').then(
    (m) => ({ default: m.VideoAacToMp4Modal })
  );

const loadvideo_aac_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoAacToWavModal').then(
    (m) => ({ default: m.VideoAacToWavModal })
  );

const loadvideo_m4a_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoM4aToMp3Modal').then(
    (m) => ({ default: m.VideoM4aToMp3Modal })
  );

const loadvideo_m4a_to_mp4 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoM4aToMp4Modal').then(
    (m) => ({ default: m.VideoM4aToMp4Modal })
  );

const loadvideo_m4a_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoM4aToWavModal').then(
    (m) => ({ default: m.VideoM4aToWavModal })
  );

const loadvideo_mov_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoMovToMp3Modal').then(
    (m) => ({ default: m.VideoMovToMp3Modal })
  );

const loadvideo_mov_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoMovToWavModal').then(
    (m) => ({ default: m.VideoMovToWavModal })
  );

const loadvideo_mp4_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoMp4ToMp3Modal').then(
    (m) => ({ default: m.VideoMp4ToMp3Modal })
  );

const loadvideo_mp4_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoMp4ToWavModal').then(
    (m) => ({ default: m.VideoMp4ToWavModal })
  );

const loadvideo_ogg_to_mp3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoOggToMp3Modal').then(
    (m) => ({ default: m.VideoOggToMp3Modal })
  );

const loadvideo_ogg_to_wav = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoOggToWavModal').then(
    (m) => ({ default: m.VideoOggToWavModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-aac-to-mp3': loadvideo_aac_to_mp3,
  'video-aac-to-mp4': loadvideo_aac_to_mp4,
  'video-aac-to-wav': loadvideo_aac_to_wav,
  'video-m4a-to-mp3': loadvideo_m4a_to_mp3,
  'video-m4a-to-mp4': loadvideo_m4a_to_mp4,
  'video-m4a-to-wav': loadvideo_m4a_to_wav,
  'video-mov-to-mp3': loadvideo_mov_to_mp3,
  'video-mov-to-wav': loadvideo_mov_to_wav,
  'video-mp4-to-mp3': loadvideo_mp4_to_mp3,
  'video-mp4-to-wav': loadvideo_mp4_to_wav,
  'video-ogg-to-mp3': loadvideo_ogg_to_mp3,
  'video-ogg-to-wav': loadvideo_ogg_to_wav,
};
