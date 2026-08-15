export type MatchPhase =
  'first-half' | 'half-time' | 'second-half' | 'full-time';

export const HALF_MINUTES = 45;
export const HALF_TIME_BREAK_SECONDS = 15 * 60;

export const fullMatchSeconds = (): number =>
  HALF_MINUTES * 60 * 2 + HALF_TIME_BREAK_SECONDS;

export const formatMatchTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = minutes.toString().padStart(2, '0');
  const ss = seconds.toString().padStart(2, '0');
  return `${mm}:${ss}`;
};

export const matchPhase = (totalSeconds: number): MatchPhase => {
  const halfSeconds = HALF_MINUTES * 60;
  const firstHalfEnd = halfSeconds;
  const secondHalfStart = halfSeconds + HALF_TIME_BREAK_SECONDS;
  const fullTime = secondHalfStart + halfSeconds;

  if (totalSeconds >= fullTime) return 'full-time';
  if (totalSeconds >= secondHalfStart) return 'second-half';
  if (totalSeconds >= firstHalfEnd) return 'half-time';
  return 'first-half';
};

export const phaseLabel = (phase: MatchPhase): string => {
  switch (phase) {
    case 'first-half':
      return '1st half';
    case 'half-time':
      return 'Half-time';
    case 'second-half':
      return '2nd half';
    case 'full-time':
      return 'Full time';
  }
};
