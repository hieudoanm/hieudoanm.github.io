import { ComponentType, lazy } from 'react';

const loadazw3_to_epub = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-ebook/AZW3ToEPUBModal').then(
    (m) => ({ default: m.AZW3ToEPUBModal })
  );

const loadazw3_to_mobi = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-ebook/AZW3ToMOBIModal').then(
    (m) => ({ default: m.AZW3ToMOBIModal })
  );

const loadepub_to_azw3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-ebook/EPUBToAZW3Modal').then(
    (m) => ({ default: m.EPUBToAZW3Modal })
  );

const loadepub_to_mobi = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-ebook/EPUBToMOBIModal').then(
    (m) => ({ default: m.EPUBToMOBIModal })
  );

const loadmobi_to_azw3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-ebook/MOBIToAZW3Modal').then(
    (m) => ({ default: m.MOBIToAZW3Modal })
  );

const loadmobi_to_epub = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-ebook/MOBIToEPUBModal').then(
    (m) => ({ default: m.MOBIToEPUBModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'azw3-to-epub': loadazw3_to_epub,
  'azw3-to-mobi': loadazw3_to_mobi,
  'epub-to-azw3': loadepub_to_azw3,
  'epub-to-mobi': loadepub_to_mobi,
  'mobi-to-azw3': loadmobi_to_azw3,
  'mobi-to-epub': loadmobi_to_epub,
};
