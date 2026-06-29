import { ComponentType } from 'react';

const loadAiGenerate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiGenerateModal').then(
    (m) => ({ default: m.AiGenerateModal })
  );

const loadAiRemoveBg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRemoveBgModal').then(
    (m) => ({ default: m.AiRemoveBgModal })
  );

const loadAiRemoveObject = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRemoveObjectModal').then(
    (m) => ({ default: m.AiRemoveObjectModal })
  );

const loadAiRemovePerson = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRemovePersonModal').then(
    (m) => ({ default: m.AiRemovePersonModal })
  );

const loadAiRemoveWatermark = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRemoveWatermarkModal').then(
    (m) => ({ default: m.AiRemoveWatermarkModal })
  );

const loadAiRestore = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRestoreModal').then(
    (m) => ({ default: m.AiRestoreModal })
  );

const loadAiUnblur = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiUnblurModal').then(
    (m) => ({ default: m.AiUnblurModal })
  );

const loadAiUpscale = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/ai/AiUpscaleModal').then(
    (m) => ({ default: m.AiUpscaleModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'ai-generate': loadAiGenerate,
  'ai-remove-bg': loadAiRemoveBg,
  'ai-remove-object': loadAiRemoveObject,
  'ai-remove-person': loadAiRemovePerson,
  'ai-remove-watermark': loadAiRemoveWatermark,
  'ai-restore': loadAiRestore,
  'ai-unblur': loadAiUnblur,
  'ai-upscale': loadAiUpscale,
};
