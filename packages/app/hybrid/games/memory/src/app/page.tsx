import type { FC } from 'react';
import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { PiMemory } from 'react-icons/pi';

const GAMES = [
  {
    name: 'Nikoli',
    description: 'Sudoku, Masyu, Nurikabe and more',
    icon: PiMemory,
    href: '/nikoli/',
  },
  {
    name: 'Puzzles',
    description: '2048 and sliding puzzles',
    icon: PiMemory,
    href: '/puzzles/',
  },
  {
    name: 'Tic-Tac-Toe',
    description: 'Classic, Reverse, Duck, Wild and more',
    icon: PiMemory,
    href: '/tic-tac-toe/',
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
