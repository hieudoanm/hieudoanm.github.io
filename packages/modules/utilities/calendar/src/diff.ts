const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

export const diffInTime = (a: Date, b: Date): number => {
  return Math.abs(a.getTime() - b.getTime());
};

export const diffInDays = (a: Date, b: Date): number => {
  return Math.floor(diffInTime(a, b) / ONE_DAY);
};

export const diffInHours = (a: Date, b: Date): number => {
  return Math.floor(diffInTime(a, b) / ONE_HOUR);
};

export const diffInMinutes = (a: Date, b: Date): number => {
  return Math.floor(diffInTime(a, b) / ONE_MINUTE);
};

export const diffInSeconds = (a: Date, b: Date): number => {
  return Math.floor(diffInTime(a, b) / ONE_SECOND);
};

export const diff = (a: Date, b: Date) => {
  return {
    days: () => diffInDays(a, b),
    hours: () => diffInHours(a, b),
    minutes: () => diffInMinutes(a, b),
    seconds: () => diffInSeconds(a, b),
  };
};
