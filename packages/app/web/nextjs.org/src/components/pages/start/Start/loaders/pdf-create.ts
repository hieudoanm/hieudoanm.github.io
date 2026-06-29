import { ComponentType, lazy } from 'react';

const loadepub_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/EpubToPdfModal').then(
    (m) => ({ default: m.EpubToPdfModal })
  );

const loadimages_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/ImagesToPdfModal').then(
    (m) => ({ default: m.ImagesToPdfModal })
  );

const loadcreate_md_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/CreateMdToPdfModal').then(
    (m) => ({ default: m.CreateMdToPdfModal })
  );

const loadppt_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/PptToPdfModal').then(
    (m) => ({ default: m.PptToPdfModal })
  );

const loadcreate_text_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/CreateTextToPdfModal').then(
    (m) => ({ default: m.CreateTextToPdfModal })
  );

const loadcreate_url_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/CreateUrlToPdfModal').then(
    (m) => ({ default: m.CreateUrlToPdfModal })
  );

const loadurl_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/UrlToPdfModal').then(
    (m) => ({ default: m.UrlToPdfModal })
  );

const loadword_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/WordToPdfModal').then(
    (m) => ({ default: m.WordToPdfModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'epub-to-pdf': loadepub_to_pdf,
  'images-to-pdf': loadimages_to_pdf,
  'create-md-to-pdf': loadcreate_md_to_pdf,
  'ppt-to-pdf': loadppt_to_pdf,
  'create-text-to-pdf': loadcreate_text_to_pdf,
  'create-url-to-pdf': loadcreate_url_to_pdf,
  'url-to-pdf': loadurl_to_pdf,
  'word-to-pdf': loadword_to_pdf,
};
