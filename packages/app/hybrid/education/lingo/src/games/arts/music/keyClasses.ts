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
  return 'bg-white border-white text-black';
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
  return 'bg-black border-black text-white shadow-[0_4px_0_rgba(0,0,0,0.45)]';
};
