/** Timestamps come from the pipeline as ISO strings; only reformat for display. */
export const formatTimestamp = (value: string | null | undefined): string => {
  if (!value) return '—';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatClock = (
  milliseconds: number | null | undefined
): string => {
  if (!milliseconds) return '—';
  return new Date(milliseconds).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatDate = (value: string | null | undefined): string => {
  if (!value) return '—';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString();
};
