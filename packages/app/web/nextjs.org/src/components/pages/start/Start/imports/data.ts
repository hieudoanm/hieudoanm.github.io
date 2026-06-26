import dynamic from 'next/dynamic';

export const FileConvertModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/FileConvertModal').then(
      (m) => m.FileConvertModal
    ),
  { ssr: false }
);
export const FileArchiveModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/FileArchiveModal').then(
      (m) => m.FileArchiveModal
    ),
  { ssr: false }
);
