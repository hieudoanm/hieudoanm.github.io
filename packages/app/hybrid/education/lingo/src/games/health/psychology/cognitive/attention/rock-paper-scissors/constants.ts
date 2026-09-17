import { Choice } from './types';

export const CHOICES: Choice[] = ['rock', 'paper', 'scissors'];

export const LABELS: Record<Choice, string> = {
  rock: 'ROCK',
  paper: 'PAPER',
  scissors: 'SCISSORS',
};

export const GLYPHS: Record<Choice, string> = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
};

export const HOTKEYS: Record<Choice, string> = {
  rock: '1',
  paper: '2',
  scissors: '3',
};

export const COUNTERED_BY: Record<Choice, Choice> = {
  rock: 'paper',
  paper: 'scissors',
  scissors: 'rock',
};

export const HOTKEY_BY_INDEX: Record<string, Choice> = {
  '1': 'rock',
  '2': 'paper',
  '3': 'scissors',
};

export const MIN_REACTION_MS = 120;

export const LAPSE_MS = 1500;

export const FEEDBACK_MS = 700;

export const TRIAL_OPTIONS = [10, 20, 30];

export const DEFAULT_TRIALS = 20;
