import dynamic from 'next/dynamic';

export const PiModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/PiNumberModal').then(
      (m) => m.PiModal
    ),
  { ssr: false }
);
export const QuizifyModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/QuizifyModal').then(
      (m) => m.QuizifyModal
    ),
  { ssr: false }
);
export const RecallModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/RecallModal').then(
      (m) => m.RecallModal
    ),
  { ssr: false }
);
