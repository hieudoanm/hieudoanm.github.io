export interface TimeUnit {
  value: number;
  label: string;
}

export const getElapsed = (startTime: number): TimeUnit[] => {
  let totalSeconds = Math.floor((Date.now() - startTime) / 1000);

  const years = Math.floor(totalSeconds / (365 * 24 * 3600));
  totalSeconds -= years * 365 * 24 * 3600;

  const months = Math.floor(totalSeconds / (30 * 24 * 3600));
  totalSeconds -= months * 30 * 24 * 3600;

  const days = Math.floor(totalSeconds / (24 * 3600));
  totalSeconds -= days * 24 * 3600;

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds -= hours * 3600;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;

  return [
    { value: years, label: years === 1 ? 'year' : 'years' },
    { value: months, label: months === 1 ? 'month' : 'months' },
    { value: days, label: days === 1 ? 'day' : 'days' },
    { value: hours, label: hours === 1 ? 'hour' : 'hours' },
    { value: minutes, label: minutes === 1 ? 'minute' : 'minutes' },
    { value: seconds, label: seconds === 1 ? 'second' : 'seconds' },
  ];
};
