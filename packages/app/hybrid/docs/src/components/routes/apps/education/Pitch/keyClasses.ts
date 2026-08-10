export const whiteKeyClass = (
  feedback: { correctId?: string; wrongId?: string } | null,
  highlightedKey: string | null,
  id: string
) => {
  if (feedback?.correctId === id)
    return 'bg-success border-success text-success-content';
  if (feedback?.wrongId === id)
    return 'bg-error border-error text-error-content';
  if (highlightedKey === id) return 'bg-info border-info text-info-content';
  return 'bg-base-content border-base-content text-base-100';
};

export const blackKeyClass = (
  feedback: { correctId?: string; wrongId?: string } | null,
  highlightedKey: string | null,
  id: string
) => {
  if (feedback?.correctId === id)
    return 'bg-success border-success text-success-content shadow-[0_4px_0_oklch(var(--su)/0.6)]';
  if (feedback?.wrongId === id)
    return 'bg-error border-error text-error-content shadow-[0_4px_0_oklch(var(--er)/0.6)]';
  if (highlightedKey === id)
    return 'bg-info border-info text-info-content shadow-[0_4px_0_oklch(var(--in)/0.6)]';
  return 'bg-base-100 border-base-300 text-base-content shadow-[0_4px_0_oklch(0_0_0/0.3)]';
};
