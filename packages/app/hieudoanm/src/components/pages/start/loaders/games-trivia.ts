import { ComponentType } from 'react';

const loadFlagGuesser = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-trivia/FlagGuesserModal').then(
    (m) => ({ default: m.FlagGuesserModal })
  );

const loadPokedex = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-trivia/PokedexModal').then(
    (m) => ({ default: m.PokedexModal })
  );

const loadPrisonerDilemma = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/games-trivia/PrisonerDilemmaModal').then(
    (m) => ({ default: m.PrisonerDilemmaModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'flag-guesser': loadFlagGuesser,
  pokedex: loadPokedex,
  pd: loadPrisonerDilemma,
};
