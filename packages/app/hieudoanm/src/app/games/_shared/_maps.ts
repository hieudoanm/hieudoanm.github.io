import type { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import type { ModalId } from '@hieudoanm.github.io/components/pages/start/types';

import { make as gamesArcadeMake } from '@hieudoanm.github.io/components/pages/start/menu/games-arcade';
import { make as gamesCasinoMake } from '@hieudoanm.github.io/components/pages/start/menu/games-casino';
import { make as gamesChessMake } from '@hieudoanm.github.io/components/pages/start/menu/games-chess';
import { make as gamesCountriesMake } from '@hieudoanm.github.io/components/pages/start/menu/games-countries';
import { make as gamesMemoryMake } from '@hieudoanm.github.io/components/pages/start/menu/games-memory';
import { make as gamesPuzzleMake } from '@hieudoanm.github.io/components/pages/start/menu/games-puzzle';
import { make as gamesTriviaMake } from '@hieudoanm.github.io/components/pages/start/menu/games-trivia';
import { make as gamesWordMake } from '@hieudoanm.github.io/components/pages/start/menu/games-word';

export { GAME_CATEGORY_LABELS } from '../constants';

export const CATEGORY_CONFIGS: Record<
  string,
  {
    make: (open: (id: ModalId) => () => void) => Tool[];
  }
> = {
  arcade: { make: gamesArcadeMake },
  casino: { make: gamesCasinoMake },
  chess: { make: gamesChessMake },
  countries: { make: gamesCountriesMake },
  memory: { make: gamesMemoryMake },
  puzzle: { make: gamesPuzzleMake },
  trivia: { make: gamesTriviaMake },
  word: { make: gamesWordMake },
};
