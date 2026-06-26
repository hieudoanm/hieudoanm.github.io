import dynamic from 'next/dynamic';

export const Game2048Modal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/Game2048Modal').then(
      (m) => m.Game2048Modal
    ),
  { ssr: false }
);
export const PalindromeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PalindromeModal').then(
      (m) => m.PalindromeModal
    ),
  { ssr: false }
);
export const PdModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PrisonerDilemmaModal').then(
      (m) => m.PrisonerDilemmaModal
    ),
  { ssr: false }
);
export const PokedexModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PokedexModal').then(
      (m) => m.PokedexModal
    ),
  { ssr: false }
);
export const RockPaperScissorsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/RockPaperScissorsModal').then(
      (m) => m.RockPaperScissorsModal
    ),
  { ssr: false }
);
export const SudokuModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/SudokuModal').then(
      (m) => m.SudokuModal
    ),
  { ssr: false }
);
export const T3Modal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/T3Modal').then(
      (m) => m.T3Modal
    ),
  { ssr: false }
);
export const TowersModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/TowersModal').then(
      (m) => m.TowersModal
    ),
  { ssr: false }
);
export const TypoglycemiaModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/TypoglycemiaModal').then(
      (m) => m.TypoglycemiaModal
    ),
  { ssr: false }
);
export const WordleModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/WordleModal').then(
      (m) => m.WordleModal
    ),
  { ssr: false }
);
export const SnakeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/SnakeModal').then(
      (m) => m.SnakeModal
    ),
  { ssr: false }
);
