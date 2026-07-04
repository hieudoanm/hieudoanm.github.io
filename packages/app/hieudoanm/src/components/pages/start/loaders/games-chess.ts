import { ComponentType } from 'react';

const loadChessClock = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-chess/ChessClockModal').then(
    (m) => ({ default: m.ChessClockModal })
  );

const loadChessElo = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-chess/ChessEloModal').then(
    (m) => ({ default: m.ChessEloModal })
  );

const loadChessBoard = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-chess/ChessBoardModal').then(
    (m) => ({ default: m.ChessBoardModal })
  );

const loadChessStats = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-chess/ChessStatsModal').then(
    (m) => ({ default: m.ChessStatsModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'chess-board': loadChessBoard,
  'chess-clock': loadChessClock,
  'chess-stats': loadChessStats,
  'chess-elo': loadChessElo,
};
