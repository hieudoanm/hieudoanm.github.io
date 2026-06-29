import { ComponentType } from 'react';

const loadPokedex = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-trivia/PokedexModal').then(
    (m) => ({ default: m.PokedexModal })
  );

const loadPrisonerDilemma = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-trivia/PrisonerDilemmaModal').then(
    (m) => ({ default: m.PrisonerDilemmaModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  pokedex: loadPokedex,
  pd: loadPrisonerDilemma,
};
