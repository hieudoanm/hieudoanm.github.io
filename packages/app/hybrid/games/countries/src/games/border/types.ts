export interface BorderQuestion {
  currentName: string;
  currentFlag: string;
  correct: string;
  options: string[];
}

export type BorderMessage = {
  text: string;
  correct: boolean;
} | null;
