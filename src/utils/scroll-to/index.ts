export const scrollTo = (id: string) => {
  const top: number = document.getElementById(id)?.offsetTop || 0;
  if (window) {
    window.scrollTo({ top: top - 120, behavior: 'smooth' });
  }
};

export default scrollTo;
