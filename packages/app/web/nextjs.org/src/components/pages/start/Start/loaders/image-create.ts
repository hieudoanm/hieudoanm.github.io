import { ComponentType, lazy } from 'react';

const loadcollage_maker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/CollageMakerModal').then(
    (m) => ({ default: m.CollageMakerModal })
  );
const loadgithub_social_preview = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/GitHubSocialPreviewModal').then(
    (m) => ({ default: m.GitHubSocialPreviewModal })
  );
const loadmeme_maker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/MemeMakerModal').then(
    (m) => ({ default: m.MemeMakerModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'collage-maker': loadcollage_maker,
  'github-social-preview': loadgithub_social_preview,
  'meme-maker': loadmeme_maker,
};
