import { ComponentType, lazy } from 'react';

const loadai_remove_bg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRemoveBgModal').then(
    (m) => ({ default: m.AiRemoveBgModal })
  );

const loadai_restore = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRestoreModal').then(
    (m) => ({ default: m.AiRestoreModal })
  );

const loadai_colorize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiColorizeModal').then(
    (m) => ({ default: m.AiColorizeModal })
  );

const loadai_unblur = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiUnblurModal').then(
    (m) => ({ default: m.AiUnblurModal })
  );

const loadai_remove_watermark = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRemoveWatermarkModal').then(
    (m) => ({ default: m.AiRemoveWatermarkModal })
  );

const loadai_generate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiGenerateModal').then(
    (m) => ({ default: m.AiGenerateModal })
  );

const loadai_remove_person = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRemovePersonModal').then(
    (m) => ({ default: m.AiRemovePersonModal })
  );

const loadai_remove_object = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRemoveObjectModal').then(
    (m) => ({ default: m.AiRemoveObjectModal })
  );

const loadai_upscale = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiUpscaleModal').then(
    (m) => ({ default: m.AiUpscaleModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'ai-remove-bg': loadai_remove_bg,
  'ai-restore': loadai_restore,
  'ai-colorize': loadai_colorize,
  'ai-unblur': loadai_unblur,
  'ai-remove-watermark': loadai_remove_watermark,
  'ai-generate': loadai_generate,
  'ai-remove-person': loadai_remove_person,
  'ai-remove-object': loadai_remove_object,
  'ai-upscale': loadai_upscale,
};
