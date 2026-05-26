export enum TimeClass {
  CLASSICAL = 'classical',
  RAPID = 'rapid',
  BLITZ = 'blitz',
}

export enum Score {
  WIN = 'WIN',
  DRAW = 'DRAW',
  LOSS = 'LOSS',
}

export const getScoreValue = (score: Score): number => {
  switch (score) {
    case Score.WIN:
      return 1;
    case Score.DRAW:
      return 0.5;
    case Score.LOSS:
      return 0;
  }
};
