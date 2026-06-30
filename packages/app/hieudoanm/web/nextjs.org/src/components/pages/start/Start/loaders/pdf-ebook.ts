import { ComponentType } from 'react';

const loadAZW3ToEPUB = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-ebook/AZW3ToEPUBModal').then(
    (m) => ({ default: m.AZW3ToEPUBModal })
  );

const loadAZW3ToMOBI = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-ebook/AZW3ToMOBIModal').then(
    (m) => ({ default: m.AZW3ToMOBIModal })
  );

const loadEPUBToAZW3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-ebook/EPUBToAZW3Modal').then(
    (m) => ({ default: m.EPUBToAZW3Modal })
  );

const loadEPUBToMOBI = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-ebook/EPUBToMOBIModal').then(
    (m) => ({ default: m.EPUBToMOBIModal })
  );

const loadMOBIToAZW3 = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-ebook/MOBIToAZW3Modal').then(
    (m) => ({ default: m.MOBIToAZW3Modal })
  );

const loadMOBIToEPUB = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/pdf-ebook/MOBIToEPUBModal').then(
    (m) => ({ default: m.MOBIToEPUBModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'azw3-to-epub': loadAZW3ToEPUB,
  'azw3-to-mobi': loadAZW3ToMOBI,
  'epub-to-azw3': loadEPUBToAZW3,
  'epub-to-mobi': loadEPUBToMOBI,
  'mobi-to-azw3': loadMOBIToAZW3,
  'mobi-to-epub': loadMOBIToEPUB,
};
