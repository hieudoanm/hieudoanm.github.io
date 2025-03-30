export const deburr = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
};

export const capitalise = (str: string) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const kebabcase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with hyphens
};

export const snakecase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '_'); // Replace spaces with hyphens
};
