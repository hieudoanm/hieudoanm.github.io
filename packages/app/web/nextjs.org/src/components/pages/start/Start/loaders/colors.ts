import { ComponentType } from 'react';

const loadAiColorize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/colors/AiColorizeModal').then(
    (m) => ({ default: m.AiColorizeModal })
  );

const loadColors = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/colors/ColorsModal').then(
    (m) => ({ default: m.ColorsModal })
  );

const loadContrastChecker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/colors/ContrastCheckerModal').then(
    (m) => ({ default: m.ContrastCheckerModal })
  );

const loadGradientGenerator = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/colors/GradientGeneratorModal').then(
    (m) => ({ default: m.GradientGeneratorModal })
  );

const loadImageColorize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/colors/ImageColorizeModal').then(
    (m) => ({ default: m.ImageColorizeModal })
  );

const loadImageDominantColor = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/colors/ImageDominantColorModal').then(
    (m) => ({ default: m.ImageDominantColorModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'ai-colorize': loadAiColorize,
  colors: loadColors,
  'contrast-checker': loadContrastChecker,
  'gradient-generator': loadGradientGenerator,
  'image-colorize': loadImageColorize,
  'image-dominant-color': loadImageDominantColor,
};
