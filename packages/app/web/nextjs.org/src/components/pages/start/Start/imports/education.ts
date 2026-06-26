import dynamic from 'next/dynamic';

export const SignModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/SignModal').then(
      (m) => m.SignModal
    ),
  { ssr: false }
);
export const FlashcardsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/FlashcardsModal').then(
      (m) => m.FlashcardsModal
    ),
  { ssr: false }
);
export const LanguagesEnglishModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/EnglishModal').then(
      (m) => m.LanguagesEnglishModal
    ),
  { ssr: false }
);
export const PeriodicTableModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/chemistry/PeriodicTableModal').then(
      (m) => m.PeriodicTableModal
    ),
  { ssr: false }
);
export const PitchModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/music/PitchModal').then(
      (m) => m.PitchModal
    ),
  { ssr: false }
);
export const DOIModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/academic/DOIModal').then(
      (m) => m.DOIModal
    ),
  { ssr: false }
);
