import { ComponentType } from 'react';

const loadMemoryMatch = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-memory/MemoryMatchModal').then(
    (m) => ({ default: m.MemoryMatchModal })
  );

const loadNBack = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-memory/NBackModal').then(
    (m) => ({ default: m.NBackModal })
  );

const loadPiNumber = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-memory/PiNumberModal').then(
    (m) => ({ default: m.PiModal })
  );

const loadQuizify = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-memory/QuizifyModal').then(
    (m) => ({ default: m.QuizifyModal })
  );

const loadRecall = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-memory/RecallModal').then(
    (m) => ({ default: m.RecallModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'memory-match': loadMemoryMatch,
  'n-back': loadNBack,
  pi: loadPiNumber,
  quizify: loadQuizify,
  recall: loadRecall,
};
