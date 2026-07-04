import { ComponentType } from 'react';

const loadBaccarat = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-casino/BaccaratModal').then(
    (m) => ({ default: m.BaccaratModal })
  );

const loadBlackjack = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-casino/BlackjackModal').then(
    (m) => ({ default: m.BlackjackModal })
  );

const loadPoker = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-casino/PokerModal').then(
    (m) => ({ default: m.PokerModal })
  );

const loadDiceGame = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-casino/DiceGameModal').then(
    (m) => ({ default: m.DiceGameModal })
  );

const loadSlotMachine = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-casino/SlotMachineModal').then(
    (m) => ({ default: m.SlotMachineModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  blackjack: loadBlackjack,
  'dice-game': loadDiceGame,
  poker: loadPoker,
  'slot-machine': loadSlotMachine,
  'tai-baccarat': loadBaccarat,
};
