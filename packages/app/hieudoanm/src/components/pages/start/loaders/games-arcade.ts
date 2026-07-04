import { ComponentType } from 'react';

const loadDinoRun = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-arcade/DinoRunModal').then(
    (m) => ({ default: m.DinoRunModal })
  );

const loadRockPaperScissors = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-arcade/RockPaperScissorsModal').then(
    (m) => ({ default: m.RockPaperScissorsModal })
  );

const loadSnake = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-arcade/SnakeModal').then(
    (m) => ({ default: m.SnakeModal })
  );

const loadT3 = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-arcade/T3Modal').then(
    (m) => ({ default: m.T3Modal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'dino-run': loadDinoRun,
  rps: loadRockPaperScissors,
  snake: loadSnake,
  t3: loadT3,
};
