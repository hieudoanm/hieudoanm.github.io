import type { FC } from 'react';
import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { PiMemory } from 'react-icons/pi';

const GAMES = [
  {
    name: 'Memory',
    description: 'Emoji card pairing grid, Pi digit memorization, and more',
    icon: PiMemory,
    href: '/memory/',
  },
  {
    name: 'Puzzles',
    description: '2048, Lights Out, Towers and more',
    icon: PiMemory,
    href: '/puzzles/',
  },
  {
    name: 'Nikoli',
    description: 'Sudoku, Masyu, Nurikabe and more',
    icon: PiMemory,
    href: '/nikoli/',
  },
  {
    name: 'Tic-Tac-Toe',
    description: 'Classic, Reverse, Duck, Wild and more',
    icon: PiMemory,
    href: '/tic-tac-toe/',
  },
  {
    name: '8-Bit',
    description: 'Maze, Snake, Dino Run and more',
    icon: PiMemory,
    href: '/8-bit/',
  },
];

const HomePage: FC = () => (
  <GamesTemplate
    title="Memory Games"
    subtitle="Train your brain with memory and cognitive challenges."
    items={GAMES}
  />
);

export default HomePage;
