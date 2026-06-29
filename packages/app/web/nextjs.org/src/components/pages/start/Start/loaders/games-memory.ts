import { ComponentType } from 'react';

const loadPiNumber = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-memory/PiNumberModal').then(
    (m) => ({ default: m.PiModal })
  );

const loadQuizify = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-memory/QuizifyModal').then(
    (m) => ({ default: m.QuizifyModal })
  );

const loadRecall = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-memory/RecallModal').then(
    (m) => ({ default: m.RecallModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  pi: loadPiNumber,
  quizify: loadQuizify,
  recall: loadRecall,
};
