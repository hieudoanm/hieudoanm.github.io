export const scrollTo = (id: string): void => {
  const top: number = document.getElementById(id)?.offsetTop || 0;
  if (window) {
    window.scrollTo({ top: top - 120, behavior: 'smooth' });
  }
  return;
};

export default scrollTo;
