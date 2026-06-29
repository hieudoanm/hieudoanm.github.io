import { ComponentType, lazy } from 'react';

const loadchart_maker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/ChartMakerModal').then(
    (m) => ({ default: m.ChartMakerModal })
  );

const loadmeme_maker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/MemeMakerModal').then(
    (m) => ({ default: m.MemeMakerModal })
  );

const loadcollage_maker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/CollageMakerModal').then(
    (m) => ({ default: m.CollageMakerModal })
  );

const loadimage_profile = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/ImageProfileModal').then(
    (m) => ({ default: m.ImageProfileModal })
  );

const loadgithub_social_preview = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/GitHubSocialPreviewModal').then(
    (m) => ({ default: m.GitHubSocialPreviewModal })
  );

const loadyoutube_thumbnails = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/YouTubeThumbnailsModal').then(
    (m) => ({ default: m.YouTubeThumbnailsModal })
  );

const loadbreaking_bad = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/BreakingBadModal').then(
    (m) => ({ default: m.BreakingBadModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'chart-maker': loadchart_maker,
  'meme-maker': loadmeme_maker,
  'collage-maker': loadcollage_maker,
  'image-profile': loadimage_profile,
  'github-social-preview': loadgithub_social_preview,
  'youtube-thumbnails': loadyoutube_thumbnails,
  'breaking-bad': loadbreaking_bad,
};
