import { ComponentType } from 'react';

const loadCreateTextToPdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-create/CreateTextToPdfModal').then(
    (m) => ({ default: m.CreateTextToPdfModal })
  );

const loadCreateUrlToPdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-create/CreateUrlToPdfModal').then(
    (m) => ({ default: m.CreateUrlToPdfModal })
  );

const loadEpubToPdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-create/EpubToPdfModal').then(
    (m) => ({ default: m.EpubToPdfModal })
  );

const loadImagesToPdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-create/ImagesToPdfModal').then(
    (m) => ({ default: m.ImagesToPdfModal })
  );

const loadPptToPdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-create/PptToPdfModal').then(
    (m) => ({ default: m.PptToPdfModal })
  );

const loadUrlToPdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-create/UrlToPdfModal').then(
    (m) => ({ default: m.UrlToPdfModal })
  );

const loadWordToPdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-create/WordToPdfModal').then(
    (m) => ({ default: m.WordToPdfModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'create-text-to-pdf': loadCreateTextToPdf,
  'create-url-to-pdf': loadCreateUrlToPdf,
  'epub-to-pdf': loadEpubToPdf,
  'images-to-pdf': loadImagesToPdf,
  'ppt-to-pdf': loadPptToPdf,
  'url-to-pdf': loadUrlToPdf,
  'word-to-pdf': loadWordToPdf,
};
