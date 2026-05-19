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

export const uppercase = (str: string) => str.toUpperCase();

export const lowercase = (str: string) => str.toLowerCase();

export enum FormatStyle {
  Capitalise = 'capitalise',
  Deburr = 'deburr',
  Kebabcase = 'kebabcase',
  Lowercase = 'lowercase',
  Snakecase = 'snakecase',
  Uppercase = 'uppercase',
}

export const strings = (str: string) => {
  return {
    format: (style: FormatStyle): string => {
      if (style === FormatStyle.Capitalise) return capitalise(str);
      if (style === FormatStyle.Deburr) return deburr(str);
      if (style === FormatStyle.Kebabcase) return kebabcase(str);
      if (style === FormatStyle.Lowercase) return lowercase(str);
      if (style === FormatStyle.Snakecase) return snakecase(str);
      if (style === FormatStyle.Uppercase) return uppercase(str);
      return str;
    },
  };
};
