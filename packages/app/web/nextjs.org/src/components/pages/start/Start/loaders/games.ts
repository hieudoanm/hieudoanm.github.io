import { ComponentType, lazy } from 'react';

const loadchess_clock = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/clocks/ChessClockModal').then(
    (m) => ({ default: m.ChessClockModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'chess-clock': loadchess_clock,
};
