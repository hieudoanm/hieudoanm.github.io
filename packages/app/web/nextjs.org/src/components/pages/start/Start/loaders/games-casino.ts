import { ComponentType } from 'react';

const loadBlackjack = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-casino/BlackjackModal').then(
    (m) => ({ default: m.BlackjackModal })
  );

const loadPoker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-casino/PokerModal').then(
    (m) => ({ default: m.PokerModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  blackjack: loadBlackjack,
  poker: loadPoker,
};
