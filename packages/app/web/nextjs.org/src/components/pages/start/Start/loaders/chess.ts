import { ComponentType } from 'react';

const loadChessClock = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/chess/ChessClockModal').then(
    (m) => ({ default: m.ChessClockModal })
  );

const loadElo = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/chess/EloModal').then(
    (m) => ({ default: m.EloModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'chess-clock': loadChessClock,
  elo: loadElo,
};
