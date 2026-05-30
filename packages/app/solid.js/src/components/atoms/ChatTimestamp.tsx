interface ChatTimestampProps {
  timestamp: number;
}

const formatTime = (ts: number): string => {
  const d = new Date(ts);
  const now = new Date();
  const isToday =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  const time = d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isToday) return time;

  const date = d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return `${date} ${time}`;
};

export const ChatTimestamp = (props: ChatTimestampProps) => (
  <span class="text-base-content/30 text-[10px]">
    {formatTime(props.timestamp)}
  </span>
);
