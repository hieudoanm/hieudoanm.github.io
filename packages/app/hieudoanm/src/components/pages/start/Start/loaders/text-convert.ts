import { ComponentType } from 'react';

const loadBraille = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/text-convert/BrailleModal').then(
    (m) => ({ default: m.BrailleModal })
  );

const loadLeetSpeak = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/text-convert/LeetSpeakModal').then(
    (m) => ({ default: m.LeetSpeakModal })
  );

const loadMorse = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/text-convert/MorseModal').then(
    (m) => ({ default: m.MorseModal })
  );

const loadTextCase = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/text-convert/TextCaseModal').then(
    (m) => ({ default: m.TextCaseModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  braille: loadBraille,
  leetspeak: loadLeetSpeak,
  morse: loadMorse,
  'text-case': loadTextCase,
};
