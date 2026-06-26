import dynamic from 'next/dynamic';

export const VideoConvertModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoConvertModal').then(
      (m) => m.VideoConvertModal
    ),
  { ssr: false }
);
export const VideoEditModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoEditModal').then(
      (m) => m.VideoEditModal
    ),
  { ssr: false }
);
export const VideoProcessModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoProcessModal').then(
      (m) => m.VideoProcessModal
    ),
  { ssr: false }
);
export const VideoDownloadModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoDownloadModal').then(
      (m) => m.VideoDownloadModal
    ),
  { ssr: false }
);
export const VideoAudioModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoAudioModal').then(
      (m) => m.VideoAudioModal
    ),
  { ssr: false }
);
export const AudioToTextModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/AudioToTextModal').then(
      (m) => m.AudioToTextModal
    ),
  { ssr: false }
);
