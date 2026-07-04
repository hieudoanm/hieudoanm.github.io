import { ComponentType } from 'react';

const loadVideoCompress = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-edit/VideoCompressModal').then(
    (m) => ({ default: m.VideoCompressModal })
  );

const loadVideoCrop = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-edit/VideoCropModal').then(
    (m) => ({ default: m.VideoCropModal })
  );

const loadVideoExtractAudio = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-edit/VideoExtractAudioModal').then(
    (m) => ({ default: m.VideoExtractAudioModal })
  );

const loadVideoExtractFrames = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-edit/VideoExtractFramesModal').then(
    (m) => ({ default: m.VideoExtractFramesModal })
  );

const loadVideoMerge = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-edit/VideoMergeModal').then(
    (m) => ({ default: m.VideoMergeModal })
  );

const loadVideoMute = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-edit/VideoMuteModal').then(
    (m) => ({ default: m.VideoMuteModal })
  );

const loadVideoResize = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-edit/VideoResizeModal').then(
    (m) => ({ default: m.VideoResizeModal })
  );

const loadVideoSpeed = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-edit/VideoSpeedModal').then(
    (m) => ({ default: m.VideoSpeedModal })
  );

const loadVideoStabilize = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-edit/VideoStabilizeModal').then(
    (m) => ({ default: m.VideoStabilizeModal })
  );

const loadVideoTrim = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/video-edit/VideoTrimModal').then(
    (m) => ({ default: m.VideoTrimModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-compress': loadVideoCompress,
  'video-crop': loadVideoCrop,
  'video-extract-audio': loadVideoExtractAudio,
  'video-extract-frames': loadVideoExtractFrames,
  'video-merge': loadVideoMerge,
  'video-mute': loadVideoMute,
  'video-resize': loadVideoResize,
  'video-speed': loadVideoSpeed,
  'video-stabilize': loadVideoStabilize,
  'video-trim': loadVideoTrim,
};
