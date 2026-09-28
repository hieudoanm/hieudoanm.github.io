'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import { PiBrain } from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    testId: 'neuroscience-drift-diffusion-model',
    name: 'Drift Diffusion Model',
    description:
      'Simulate evidence accumulation toward a binary decision boundary',
    icon: PiBrain,
    href: '/neuroscience/drift-diffusion-model/',
    group: 'Decision Neuroscience',
  },
  {
    testId: 'neuroscience-linear-ballistic-accumulator',
    name: 'Linear Ballistic Accumulator',
    description:
      'Simulate ballistic racing accumulators driven by trial-to-trial variability',
    icon: PiBrain,
    href: '/neuroscience/linear-ballistic-accumulator/',
    group: 'Decision Neuroscience',
  },
  {
    testId: 'neuroscience-leaky-competing-accumulator',
    name: 'Leaky Competing Accumulator',
    description:
      'Explore decision dynamics with lateral inhibition and leakage',
    icon: PiBrain,
    href: '/neuroscience/leaky-competing-accumulator/',
    group: 'Decision Neuroscience',
  },
  {
    testId: 'neuroscience-race-models',
    name: 'Race Models',
    description:
      'Observe independent evidence accumulators racing toward a threshold',
    icon: PiBrain,
    href: '/neuroscience/race-models/',
    group: 'Decision Neuroscience',
  },
];

const NeurosciencePage: NextPage = () => (
  <GamesTemplate
    title="Neuroscience"
    subtitle="Explore computational models of perception, memory, and decision-making."
    items={ITEMS}
    searchable
  />
);

export default NeurosciencePage;
