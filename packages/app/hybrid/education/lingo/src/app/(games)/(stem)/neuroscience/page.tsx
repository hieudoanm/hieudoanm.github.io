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
    href: '/neuroscience/random-dot-motion/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-flanker-task',
    name: 'Flanker Task',
    description:
      'Respond to the central arrow while ignoring flankers — measure the congruency cost on RT and accuracy.',
    icon: PiBrain,
    href: '/neuroscience/flanker-task/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-stroop-task',
    name: 'Stroop Task',
    description:
      'Name the ink colour while ignoring the printed colour word — observe the Stroop interference effect.',
    icon: PiBrain,
    href: '/neuroscience/stroop-task/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-lexical-decision',
    name: 'Lexical Decision',
    description:
      'Decide if each letter string is a real word — compare RTs for words vs non-words.',
    icon: PiBrain,
    href: '/neuroscience/lexical-decision/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-numerical-comparison',
    name: 'Numerical Comparison',
    description:
      'Choose the larger of two digits and experience the distance effect on speed and accuracy.',
    icon: PiBrain,
    href: '/neuroscience/numerical-comparison/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-memory-recognition',
    name: 'Memory Recognition',
    description:
      'Study a word list, then judge Old vs New probes — measure hit rate and false alarms.',
    icon: PiBrain,
    href: '/neuroscience/memory-recognition/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-visual-search',
    name: 'Visual Search',
    description:
      'Find the red circle among distractors across three set sizes — observe the set-size effect on RT.',
    icon: PiBrain,
    href: '/neuroscience/visual-search/',
    group: 'Cognitive Tasks',
  },
  {
    testId: 'neuroscience-eeg',
    name: 'Electroencephalography (EEG)',
    description:
      'Scalp voltage from cortical synchrony — the volume conductor problem, artefacts, and what ERPs reveal.',
    icon: PiBrain,
    href: '/neuroscience/eeg/',
    group: 'Neuroimaging',
  },
  {
    testId: 'neuroscience-qeeg',
    name: 'Quantitative EEG (qEEG)',
    description:
      'Spectral power and phase coupling from scalp recordings — and why the processing chain matters more than the metric.',
    icon: PiBrain,
    href: '/neuroscience/qeeg/',
    group: 'Neuroimaging',
  },
  {
    testId: 'neuroscience-meg',
    name: 'Magnetoencephalography (MEG)',
    description:
      'Millisecond-resolution magnetic fields — why the skull is transparent to MEG, and what SQUID hardware costs.',
    icon: PiBrain,
    href: '/neuroscience/meg/',
    group: 'Neuroimaging',
  },
  {
    testId: 'neuroscience-opm-meg',
    name: 'OPM-MEG',
    description:
      'Room-temperature on-scalp MEG — no cryogenics, a sensor fitted to each head, and real MEG/EEG co-registration.',
    icon: PiBrain,
    href: '/neuroscience/opm-meg/',
    group: 'Neuroimaging',
  },
  {
    testId: 'neuroscience-mri',
    name: 'Magnetic Resonance Imaging (MRI)',
    description:
      'Anatomy, diffusion, and the BOLD signal — spatial resolution bought with a sluggish haemodynamic response.',
    icon: PiBrain,
    href: '/neuroscience/mri/',
    group: 'Neuroimaging',
  },
  {
    testId: 'neuroscience-fmri',
    name: 'Functional MRI (fMRI)',
    description:
      'The BOLD contrast — a vascular proxy for neural activity, with temporal resolution set by the repetition time.',
    icon: PiBrain,
    href: '/neuroscience/fmri/',
    group: 'Neuroimaging',
  },
  {
    testId: 'neuroscience-fnirs',
    name: 'fNIRS',
    description:
      'Near-infrared haemoglobin measurement through the skull — portable, motion-tolerant, and shallow.',
    icon: PiBrain,
    href: '/neuroscience/fnirs/',
    group: 'Neuroimaging',
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
