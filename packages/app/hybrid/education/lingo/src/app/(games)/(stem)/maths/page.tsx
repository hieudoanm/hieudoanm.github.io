'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import { PiAtom, PiInfinity, PiMathOperations } from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    testId: 'maths-attractors',
    name: 'Attractors',
    description: 'Explore strange attractors as 3D particle flows',
    icon: PiAtom,
    href: '/maths/attractors/',
    group: 'Visuals',
  },
  {
    testId: 'maths-cyclic',
    name: 'Cyclic number',
    description: 'Visualise the cyclic number 142857',
    icon: PiInfinity,
    href: '/maths/cyclic/',
    group: 'Number Theory',
  },
  {
    testId: 'maths-kaprekar-constant',
    name: 'Kaprekar constant',
    description: 'Explore the Kaprekar constant routine',
    icon: PiMathOperations,
    href: '/maths/kaprekar-constant/',
    group: 'Number Theory',
  },
];

const MathsPage: NextPage = () => (
  <GamesTemplate
    title="Maths games"
    subtitle="Number puzzles that reveal surprising patterns."
    items={ITEMS}
    searchable
  />
);

export default MathsPage;
