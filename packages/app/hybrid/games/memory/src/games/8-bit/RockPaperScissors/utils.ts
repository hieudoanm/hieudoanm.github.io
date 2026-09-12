export type Choice = 'rock' | 'paper' | 'scissors';

export const CHOICES: { value: Choice; label: string }[] = [
  { value: 'rock', label: 'ROCK' },
  { value: 'paper', label: 'PAPER' },
  { value: 'scissors', label: 'SCISSORS' },
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
