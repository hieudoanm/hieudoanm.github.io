const capitalize = (s: string): string =>
  s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;

const deburr = (s: string): string =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const kebabCase = (s: string): string =>
  s
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

const lowerCase = (s: string): string => s.toLowerCase();

const snakeCase = (s: string): string =>
  s
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();

const upperCase = (s: string): string => s.toUpperCase();

export { capitalize, deburr, kebabCase, lowerCase, snakeCase, upperCase };

export default async function init(): Promise<void> {}
