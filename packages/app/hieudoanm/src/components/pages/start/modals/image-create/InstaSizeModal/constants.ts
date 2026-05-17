import { FilterDef } from './types';

export const FILTERS: FilterDef[] = [
  { label: 'None', css: '' },
  { label: 'Grayscale', css: 'grayscale(100%)' },
  { label: 'Sepia', css: 'sepia(100%)' },
  {
    label: 'Vintage',
    css: 'sepia(60%) contrast(110%) brightness(90%) saturate(80%)',
  },
  { label: 'Lofi', css: 'contrast(150%) saturate(80%)' },
  { label: 'Golden', css: 'sepia(40%) brightness(110%) saturate(140%)' },
  { label: 'Marine', css: 'hue-rotate(180deg) saturate(130%) brightness(95%)' },
  { label: 'Rosetint', css: 'sepia(30%) hue-rotate(320deg) saturate(120%)' },
  { label: 'Obsidian', css: 'grayscale(60%) contrast(130%) brightness(80%)' },
  {
    label: 'Oceanic',
    css: 'hue-rotate(160deg) saturate(160%) brightness(100%)',
  },
  { label: 'Mauve', css: 'hue-rotate(270deg) saturate(80%) brightness(105%)' },
  { label: 'Pastel', css: 'brightness(110%) saturate(60%)' },
  {
    label: 'Firenze',
    css: 'sepia(50%) contrast(120%) hue-rotate(350deg) saturate(120%)',
  },
  { label: 'Radio', css: 'grayscale(80%) contrast(140%) brightness(110%)' },
  { label: 'Liquid', css: 'hue-rotate(210deg) saturate(200%) brightness(90%)' },
  { label: 'Twenties', css: 'grayscale(40%) sepia(40%) contrast(115%)' },
];
