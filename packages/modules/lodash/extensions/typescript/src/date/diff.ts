const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

export const diffTime = (a: Date, b: Date): number => {
  return Math.abs(a.getTime() - b.getTime());
};

export const diffDays = (a: Date, b: Date): number => {
  return Math.floor(diffTime(a, b) / ONE_DAY);
};

export const diffHours = (a: Date, b: Date): number => {
  return Math.floor(diffTime(a, b) / ONE_HOUR);
};

export const diffMinutes = (a: Date, b: Date): number => {
  return Math.floor(diffTime(a, b) / ONE_MINUTE);
};

export const diffSeconds = (a: Date, b: Date): number => {
  return Math.floor(diffTime(a, b) / ONE_SECOND);
};

export const diff = (a: Date, b: Date) => {
  return {
    days: () => diffDays(a, b),
    hours: () => diffHours(a, b),
    minutes: () => diffMinutes(a, b),
    seconds: () => diffSeconds(a, b),
  };
};
