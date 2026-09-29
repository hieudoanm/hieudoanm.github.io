export type Phase = 'scenario' | 'framer' | 'done';

export type ChoiceId = 'a' | 'b';

export interface Scenario {
  id: string;
  title: string;
  vignette: string;
  choiceA: string;
  choiceB: string;
  rational: ChoiceId;
  concept: string;
  explanation: string;
}

export interface WindfallCategory {
  id: string;
  label: string;
  emoji: string;
  hint: string;
}
