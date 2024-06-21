export const scrollTo = (id: string): void => {
  const element: HTMLElement | null = document.querySelector<HTMLElement>(
    `#${id}`
  );
  if (!element) return;
  const top: number = element.offsetHeight || 0;
  window.scrollTo({ top: top - 120, behavior: 'smooth' });
};
