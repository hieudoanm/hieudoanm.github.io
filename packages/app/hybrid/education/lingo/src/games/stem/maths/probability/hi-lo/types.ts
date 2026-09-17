import type { Card } from '../_shared/cards';

export type HiLoGuess = 'higher' | 'lower';

export interface HiLoMessage {
  text: string;
  correct: boolean;
}
