'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import {
  PiAtom,
  PiGridFour,
  PiInfinity,
  PiMathOperations,
  PiSpiral,
} from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    testId: 'maths-attractors',
    name: 'Attractors',
    description: 'Explore strange attractors as 3D particle flows',
    icon: PiAtom,
    href: '/maths/attractors/',
    group: 'Dynamical Systems',
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
    testId: 'maths-fibonacci-sequence',
    name: 'Fibonacci sequence',
    description: 'Watch the ratios converge on the golden ratio',
    icon: PiSpiral,
    href: '/maths/fibonacci-sequence/',
    group: 'Sequences',
  },
  {
    testId: 'maths-prime-numbers',
    name: 'Prime numbers',
    description: 'Sieve the primes and explore prime gaps',
    icon: PiGridFour,
    href: '/maths/prime-numbers/',
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
