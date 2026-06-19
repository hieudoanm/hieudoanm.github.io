interface BlogDateProps {
  date: string;
  format?: 'short' | 'long' | 'relative';
}

const formatRelative = (dateStr: string): string => {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const days = Math.floor(diff / 86400000);

  if (days < 1) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
};

const formatLong = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatShort = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const BlogDate = (props: BlogDateProps) => {
  const fmt = props.format ?? 'short';
  let label: string;
  if (fmt === 'long') label = formatLong(props.date);
  else if (fmt === 'relative') label = formatRelative(props.date);
  else label = formatShort(props.date);

  return (
    <time dateTime={props.date} class="text-base-content/40 text-xs">
      {label}
    </time>
  );
};
