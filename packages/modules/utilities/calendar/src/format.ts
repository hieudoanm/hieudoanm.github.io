export const padZero = (n: number) => String(n).padStart(2, '0');

export const formatDate = (date: Date, separator = '-') => {
  const yyyy = date.getFullYear();
  const mm = padZero(date.getMonth() + 1);
  const dd = padZero(date.getDate());
  return `${yyyy}${separator}${mm}${separator}${dd}`;
};

export const formatTime = (date: Date, withSeconds = false) => {
  const hh = padZero(date.getHours());
  const mm = padZero(date.getMinutes());
  const ss = padZero(date.getSeconds());
  return withSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
};

export const formatDateTime = (date: Date) => {
  return `${formatDate(date)} ${formatTime(date, true)}`;
};

export const format = (date: Date) => {
  return {
    date: (separator = '-') => formatDate(date, separator),
    time: (withSeconds = false) => formatTime(date, withSeconds),
    dateTime: () => formatDate(date),
  };
};
