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
  {
    testId: 'neuroscience-attentional-drift-diffusion-model',
    name: 'Attentional Drift Diffusion Model',
    description:
      'Explore how visual attention dynamically biases evidence accumulation',
    icon: PiBrain,
    href: '/neuroscience/attentional-drift-diffusion-model/',
    group: 'Decision Neuroscience',
  },
  {
    testId: 'neuroscience-hierarchical-drift-diffusion-model',
    name: 'Hierarchical Drift Diffusion Model',
    description:
      'Simulate population-level and subject-level Bayesian parameter estimation',
    icon: PiBrain,
    href: '/neuroscience/hierarchical-drift-diffusion-model/',
    group: 'Decision Neuroscience',
  },
  {
    testId: 'neuroscience-random-dot-motion',
    name: 'Random Dot Motion',
    description:
      'Judge the direction of coherent motion at four difficulty levels and observe how coherence scales drift rate.',
    icon: PiBrain,
    href: '/neuroscience/drift-diffusion-model/random-dot-motion/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-flanker-task',
    name: 'Flanker Task',
    description:
      'Respond to the central arrow while ignoring flankers — measure the congruency cost on RT and accuracy.',
    icon: PiBrain,
    href: '/neuroscience/drift-diffusion-model/flanker-task/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-stroop-task',
    name: 'Stroop Task',
    description:
      'Name the ink colour while ignoring the printed colour word — observe the Stroop interference effect.',
    icon: PiBrain,
    href: '/neuroscience/drift-diffusion-model/stroop-task/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-lexical-decision',
    name: 'Lexical Decision',
    description:
      'Decide if each letter string is a real word — compare RTs for words vs non-words.',
    icon: PiBrain,
    href: '/neuroscience/drift-diffusion-model/lexical-decision/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-numerical-comparison',
    name: 'Numerical Comparison',
    description:
      'Choose the larger of two digits and experience the distance effect on speed and accuracy.',
    icon: PiBrain,
    href: '/neuroscience/drift-diffusion-model/numerical-comparison/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-memory-recognition',
    name: 'Memory Recognition',
    description:
      'Study a word list, then judge Old vs New probes — measure hit rate and false alarms.',
    icon: PiBrain,
    href: '/neuroscience/drift-diffusion-model/memory-recognition/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-visual-search',
    name: 'Visual Search',
    description:
      'Find the red circle among distractors across three set sizes — observe the set-size effect on RT.',
    icon: PiBrain,
    href: '/neuroscience/drift-diffusion-model/visual-search/',
    group: 'Cognitive Tasks',
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
