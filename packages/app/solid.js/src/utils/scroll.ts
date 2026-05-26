// Call this after adding new content:
export const scrollToBottom = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollTo({
    top: element.scrollHeight,
    behavior: 'smooth',
  });
};
