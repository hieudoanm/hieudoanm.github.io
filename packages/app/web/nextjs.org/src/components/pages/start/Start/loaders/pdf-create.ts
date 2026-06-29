import { ComponentType, lazy } from 'react';

const loadcreate_md_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/CreateMdToPdfModal').then(
    (m) => ({ default: m.CreateMdToPdfModal })
  );
const loadcreate_text_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/CreateTextToPdfModal').then(
    (m) => ({ default: m.CreateTextToPdfModal })
  );
const loadcreate_url_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/CreateUrlToPdfModal').then(
    (m) => ({ default: m.CreateUrlToPdfModal })
  );
const loadcreate_zip = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/utility/CreateZipModal').then(
    (m) => ({ default: m.CreateZipModal })
  );
const loadimages_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/ImagesToPdfModal').then(
    (m) => ({ default: m.ImagesToPdfModal })
  );
const loadppt_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/PptToPdfModal').then(
    (m) => ({ default: m.PptToPdfModal })
  );
const loadurl_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/UrlToPdfModal').then(
    (m) => ({ default: m.UrlToPdfModal })
  );
const loadword_counter = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/utility/WordCounterModal').then(
    (m) => ({ default: m.WordCounterModal })
  );
const loadword_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/WordToPdfModal').then(
    (m) => ({ default: m.WordToPdfModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'create-md-to-pdf': loadcreate_md_to_pdf,
  'create-text-to-pdf': loadcreate_text_to_pdf,
  'create-url-to-pdf': loadcreate_url_to_pdf,
  'create-zip': loadcreate_zip,
  'images-to-pdf': loadimages_to_pdf,
  'ppt-to-pdf': loadppt_to_pdf,
  'url-to-pdf': loadurl_to_pdf,
  'word-counter': loadword_counter,
  'word-to-pdf': loadword_to_pdf,
};
