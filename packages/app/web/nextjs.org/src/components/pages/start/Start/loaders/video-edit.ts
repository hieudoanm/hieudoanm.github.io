import { ComponentType, lazy } from 'react';

const loadvideo_compress = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-edit/VideoCompressModal').then(
    (m) => ({ default: m.VideoCompressModal })
  );

const loadvideo_crop = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-edit/VideoCropModal').then(
    (m) => ({ default: m.VideoCropModal })
  );

const loadvideo_extract_audio = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-edit/VideoExtractAudioModal').then(
    (m) => ({ default: m.VideoExtractAudioModal })
  );

const loadvideo_extract_frames = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-edit/VideoExtractFramesModal').then(
    (m) => ({ default: m.VideoExtractFramesModal })
  );

const loadvideo_merge = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-edit/VideoMergeModal').then(
    (m) => ({ default: m.VideoMergeModal })
  );

const loadvideo_mute = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-edit/VideoMuteModal').then(
    (m) => ({ default: m.VideoMuteModal })
  );

const loadvideo_resize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-edit/VideoResizeModal').then(
    (m) => ({ default: m.VideoResizeModal })
  );

const loadvideo_speed = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-edit/VideoSpeedModal').then(
    (m) => ({ default: m.VideoSpeedModal })
  );

const loadvideo_stabilize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-edit/VideoStabilizeModal').then(
    (m) => ({ default: m.VideoStabilizeModal })
  );

const loadvideo_trim = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/video-edit/VideoTrimModal').then(
    (m) => ({ default: m.VideoTrimModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'video-compress': loadvideo_compress,
  'video-crop': loadvideo_crop,
  'video-extract-audio': loadvideo_extract_audio,
  'video-extract-frames': loadvideo_extract_frames,
  'video-merge': loadvideo_merge,
  'video-mute': loadvideo_mute,
  'video-resize': loadvideo_resize,
  'video-speed': loadvideo_speed,
  'video-stabilize': loadvideo_stabilize,
  'video-trim': loadvideo_trim,
};
