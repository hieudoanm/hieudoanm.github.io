import { ComponentType, lazy } from 'react';

const loadchess_clock = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/chess/ChessClockModal').then(
    (m) => ({ default: m.ChessClockModal })
  );

const loadelo = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/chess/EloModal').then(
    (m) => ({ default: m.EloModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'chess-clock': loadchess_clock,
  elo: loadelo,
};
