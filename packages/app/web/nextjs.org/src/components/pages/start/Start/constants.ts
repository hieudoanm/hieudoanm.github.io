export const match = (label: string, q: string) =>
  label.toLowerCase().includes(q.toLowerCase());

export const GRID = 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3';
export const GRID_MOBILE = 'grid grid-cols-2 sm:grid-cols-3 gap-3';
