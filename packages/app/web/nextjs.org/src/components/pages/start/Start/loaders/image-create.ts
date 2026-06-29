import { ComponentType } from 'react';

const loadBase64 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/Base64Modal').then(
    (m) => ({ default: m.Base64Modal })
  );

const loadBreakingBad = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/BreakingBadModal').then(
    (m) => ({ default: m.BreakingBadModal })
  );

const loadCamera = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/CameraModal').then(
    (m) => ({ default: m.CameraModal })
  );

const loadChartMaker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/ChartMakerModal').then(
    (m) => ({ default: m.ChartMakerModal })
  );

const loadCollageMaker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/CollageMakerModal').then(
    (m) => ({ default: m.CollageMakerModal })
  );

const loadGitHubSocialPreview = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/GitHubSocialPreviewModal').then(
    (m) => ({ default: m.GitHubSocialPreviewModal })
  );

const loadHouse = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/HouseModal').then(
    (m) => ({ default: m.HouseModal })
  );

const loadImageProfile = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/ImageProfileModal').then(
    (m) => ({ default: m.ImageProfileModal })
  );

const loadInstaSize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/InstaSizeModal').then(
    (m) => ({ default: m.InstaSizeModal })
  );

const loadMemeMaker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/MemeMakerModal').then(
    (m) => ({ default: m.MemeMakerModal })
  );

const loadPixel = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/PixelModal').then(
    (m) => ({ default: m.PixelModal })
  );

const loadYouTubeThumbnails = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/YouTubeThumbnailsModal').then(
    (m) => ({ default: m.YouTubeThumbnailsModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  base64: loadBase64,
  'breaking-bad': loadBreakingBad,
  camera: loadCamera,
  'chart-maker': loadChartMaker,
  'collage-maker': loadCollageMaker,
  'github-social-preview': loadGitHubSocialPreview,
  house: loadHouse,
  'image-profile': loadImageProfile,
  instasize: loadInstaSize,
  'meme-maker': loadMemeMaker,
  pixel: loadPixel,
  'youtube-thumbnails': loadYouTubeThumbnails,
};
