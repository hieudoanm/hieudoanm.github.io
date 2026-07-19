'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import {
  PiCircleHalf,
  PiGradient,
  PiSliders,
  PiSwap,
  PiTarget,
} from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    testId: 'colors-models',
    name: 'Color Models',
    description: 'Numbers behind a color — HEX, RGB, HSL, HSV and CMYK',
    icon: PiSwap,
    href: '/colors/models/',
  },
  {
    testId: 'colors-harmony',
    name: 'Color Harmony',
    description: 'Color wheels, schemes and mixing colors by weight',
    icon: PiCircleHalf,
    href: '/colors/harmony/',
  },
  {
    testId: 'colors-perception',
    name: 'Color & Perception',
    description: 'Contrast, color blindness and warm versus cool',
    icon: PiTarget,
    href: '/colors/perception/',
  },
  {
    testId: 'colors-scales',
    name: 'Color Scales',
    description: 'Shades, tints and tones as even, reusable steps',
    icon: PiSliders,
    href: '/colors/scales/',
  },
  {
    testId: 'colors-css',
    name: 'Color in CSS',
    description: 'Gradients, palettes and theme roles for shipping color',
    icon: PiGradient,
    href: '/colors/css/',
  },
];

const ColorsPage: NextPage = () => (
  <GamesTemplate
    title="Colors"
    subtitle="Practical tools for picking, tuning and shipping color."
    items={ITEMS}
  />
);

export default ColorsPage;
