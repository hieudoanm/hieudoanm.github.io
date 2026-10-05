/** Numbers are shown with a fixed precision so tables and exports agree. */
export const formatNumber = (
  value: number | null | undefined,
  digits = 3
): string => {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return value.toFixed(digits);
};

export const formatPercent = (
  value: number | null | undefined,
  digits = 1
): string =>
  value === null || value === undefined
    ? '—'
    : `${(value * 100).toFixed(digits)}%`;

export const formatDuration = (seconds: number | null | undefined): string => {
  if (seconds === null || seconds === undefined || Number.isNaN(seconds))
    return '—';
  const total = Math.max(0, Math.round(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${total % 60}s`;
  return `${total}s`;
};

export const formatBytes = (bytes: number | null | undefined): string => {
  if (bytes === null || bytes === undefined || Number.isNaN(bytes)) return '—';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
};

export const formatDurationLabel = (
  seconds: number | null | undefined
): string => formatDuration(seconds);
