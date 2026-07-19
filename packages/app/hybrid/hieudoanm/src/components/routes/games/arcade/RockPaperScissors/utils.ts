export type Choice = 'rock' | 'paper' | 'scissors';

export const CHOICES: { value: Choice; emoji: string; label: string }[] = [
  { value: 'rock', emoji: '🪨', label: 'Rock' },
  { value: 'paper', emoji: '📄', label: 'Paper' },
  { value: 'scissors', emoji: '✂️', label: 'Scissors' },
];

export const BEATS: Record<Choice, Choice> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

export type Result = 'win' | 'lose' | 'draw';

export const play = (player: Choice, computer: Choice): Result => {
  if (player === computer) return 'draw';
  return BEATS[player] === computer ? 'win' : 'lose';
};

export const randomChoice = (): Choice =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)].value;
