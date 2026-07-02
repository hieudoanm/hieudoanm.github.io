import { ComponentType } from 'react';

const loadDOI = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/education/DOIModal').then(
    (m) => ({ default: m.DOIModal })
  );

const loadEnglish = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/education/EnglishModal').then(
    (m) => ({ default: m.LanguagesEnglishModal })
  );

const loadFlashcards = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/education/FlashcardsModal').then(
    (m) => ({ default: m.FlashcardsModal })
  );

const loadPeriodicTable = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/education/PeriodicTableModal').then(
    (m) => ({ default: m.PeriodicTableModal })
  );

const loadPitch = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/education/PitchModal').then(
    (m) => ({ default: m.PitchModal })
  );

const loadSign = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/education/SignModal').then(
    (m) => ({ default: m.SignModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  doi: loadDOI,
  english: loadEnglish,
  flashcards: loadFlashcards,
  'periodic-table': loadPeriodicTable,
  pitch: loadPitch,
  sign: loadSign,
};
