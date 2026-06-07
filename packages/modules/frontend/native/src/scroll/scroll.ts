// Call this after adding new content:
export const scrollTo = (
  id: string,
  top?: number,
  behavior: ScrollBehavior = 'smooth'
) => {
  const element = document.getElementById(id);
  if (!element) return;
  const topOffset = top ?? element.scrollHeight;
  element.scrollTo({ top: topOffset, behavior });
};

export const scrollToBottom = (id: string) => {
  scrollTo(id, undefined, 'smooth');
};
