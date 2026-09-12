'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import { PiMathOperations } from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    testId: 'maths-kaprekar',
    name: 'Kaprekar',
    description: 'Explore the Kaprekar constant routine',
    icon: PiMathOperations,
    href: '/maths/kaprekar/',
  },
];

const MathsPage: NextPage = () => (
  <GamesTemplate
    title="Maths games"
    subtitle="Number puzzles that reveal surprising patterns."
    items={ITEMS}
  />
);

export default MathsPage;
