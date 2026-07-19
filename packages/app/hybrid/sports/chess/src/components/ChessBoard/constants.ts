import { chess960, toInitialFen } from '@chess/ts';
import type { BoardTheme, Odds, Side } from './types';

export const INITIAL_ID: number = 518;
export const INITIAL_POSITION: string = chess960.at(INITIAL_ID) ?? '';
export const INITIAL_FEN: string = toInitialFen(INITIAL_POSITION);

export const BOARD_THEMES: Record<BoardTheme, { light: string; dark: string }> =
  {
    dark: { light: 'oklch(20.5% 0 0)', dark: 'oklch(14.5% 0 0)' },
    green: { light: '#efead0', dark: '#587547' },
    blue: { light: '#dbe4f0', dark: '#48668e' },
  };

export const BOARD_THEME_OPTIONS: { value: BoardTheme; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
];

export const SIDE_OPTIONS: { value: Side; label: string }[] = [
  { value: 'white', label: 'White' },
  { value: 'black', label: 'Black' },
  { value: 'random', label: 'Random' },
];

export const ODDS_OPTIONS: { value: Odds; label: string }[] = [
  { value: 'none', label: 'Even' },
  { value: 'queen', label: 'Queen odds' },
  { value: 'rook', label: 'Rook odds' },
  { value: 'knight', label: 'Knight odds' },
  { value: 'bishop', label: 'Bishop odds' },
];

export const MIN_DEPTH: number = 1;
export const MAX_DEPTH: number = 24;
