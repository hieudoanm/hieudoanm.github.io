'use client';

import {
  HomeTemplate,
  type ColorToolItem,
} from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';
import {
  PiCircleHalf,
  PiCrosshairSimple,
  PiDrop,
  PiFadersHorizontal,
  PiGradient,
  PiIntersectSquare,
  PiLightbulb,
  PiPalette,
  PiShuffle,
  PiSliders,
  PiSparkle,
  PiStack,
  PiSwap,
  PiTarget,
  PiTextT,
  PiWheelchair,
} from 'react-icons/pi';

const ITEMS: ColorToolItem[] = [
  {
    label: 'Color Converter',
    description: 'Convert between HEX, RGB, HSL, HSV and CMYK',
    icon: PiSwap,
    href: '/converter/',
  },
  {
    label: 'Color Adjuster',
    description: 'Tune hue, saturation and lightness of any color',
    icon: PiFadersHorizontal,
    href: '/adjuster/',
  },
  {
    label: 'Color Wheel',
    description: 'Explore hues and their harmonic relationships',
    icon: PiCircleHalf,
    href: '/wheel/',
  },
  {
    label: 'Color Schemes',
    description: 'Generate complementary, analogous and triadic sets',
    icon: PiPalette,
    href: '/schemes/',
  },
  {
    label: 'Contrast Checker',
    description: 'Verify contrast ratios against WCAG thresholds',
    icon: PiTarget,
    href: '/contrast/',
  },
  {
    label: 'Shades & Tints',
    description: 'Build a balanced scale from one color',
    icon: PiSliders,
    href: '/shades-tints/',
  },
  {
    label: 'Tint, Shade & Tone',
    description: 'Lighten, darken or mute a color in steps',
    icon: PiStack,
    href: '/tint-shade-tone/',
  },
  {
    label: 'Color Mixer',
    description: 'Blend two colors by weight',
    icon: PiDrop,
    href: '/mixer/',
  },
  {
    label: 'Color Temperature',
    description: 'Classify warm and cool colors and map Kelvin',
    icon: PiLightbulb,
    href: '/temperature/',
  },
  {
    label: 'Gradient Builder',
    description: 'Compose linear and radial CSS gradients',
    icon: PiGradient,
    href: '/gradient/',
  },
  {
    label: 'Opacity Overlay',
    description: 'Preview a color over white and black at any alpha',
    icon: PiIntersectSquare,
    href: '/opacity/',
  },
  {
    label: 'Color Blindness',
    description: 'Simulate protanopia, deuteranopia and tritanopia',
    icon: PiWheelchair,
    href: '/color-blindness/',
  },
  {
    label: 'CSS Scale Exporter',
    description: 'Export a color scale as CSS custom properties',
    icon: PiTextT,
    href: '/css-scale/',
  },
  {
    label: 'Palette Generator',
    description: 'Roll a random harmonious color palette',
    icon: PiShuffle,
    href: '/palette/',
  },
  {
    label: 'Random Color',
    description: 'Generate and lock a random color',
    icon: PiSparkle,
    href: '/random/',
  },
  {
    label: 'Theme Colors',
    description: 'Browse the active theme palette roles',
    icon: PiCrosshairSimple,
    href: '/theme/',
  },
];

const HomePage: NextPage = () => {
  return (
    <HomeTemplate
      title="Colors"
      description="A collection of practical tools for picking, tuning and shipping color."
      items={ITEMS}
    />
  );
};

export default HomePage;
