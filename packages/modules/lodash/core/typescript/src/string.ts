/* eslint-disable @typescript-eslint/no-explicit-any */

function wordsCase(string: string): string[] {
  return (
    string.match(/[A-Z]{2,}(?=[A-Z][a-z]+|[0-9]|$)|\d+|[A-Z]?[a-z]+|[A-Z]+/g) ||
    []
  );
}

export function camelCase(string: string = ''): string {
  const w = wordsCase(string);
  if (w.length === 0) return '';
  return (
    w[0]!.toLowerCase() +
    w
      .slice(1)
      .map((w) => w[0]!.toUpperCase() + w.slice(1).toLowerCase())
      .join('')
  );
}

export function capitalize(string: string = ''): string {
  if (!string) return '';
  return string[0]!.toUpperCase() + string.slice(1).toLowerCase();
}

export function deburr(string: string = ''): string {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function endsWith(
  string: string = '',
  target: string,
  position?: number
): boolean {
  const pos = position === undefined ? string.length : position;
  return string.slice(0, pos).slice(-target.length) === target;
}

export function escape(string: string = ''): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return string.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

export function escapeRegExp(string: string = ''): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function kebabCase(string: string = ''): string {
  return wordsCase(string)
    .map((w) => w.toLowerCase())
    .join('-');
}

export function lowerCase(string: string = ''): string {
  return wordsCase(string)
    .map((w) => w.toLowerCase())
    .join(' ');
}

export function lowerFirst(string: string = ''): string {
  if (!string) return '';
  return string[0]!.toLowerCase() + string.slice(1);
}

export function pad(
  string: string = '',
  length: number = 0,
  chars: string = ' '
): string {
  if (!string && length <= 0) return '';
  const totalPad = length - string.length;
  if (totalPad <= 0) return string;
  const padStart = Math.floor(totalPad / 2);
  const padEnd = totalPad - padStart;
  return createPadding(padStart, chars) + string + createPadding(padEnd, chars);
}

export function padEnd(
  string: string = '',
  length: number = 0,
  chars: string = ' '
): string {
  const totalPad = length - string.length;
  if (totalPad <= 0) return string;
  return string + createPadding(totalPad, chars);
}

export function padStart(
  string: string = '',
  length: number = 0,
  chars: string = ' '
): string {
  const totalPad = length - string.length;
  if (totalPad <= 0) return string;
  return createPadding(totalPad, chars) + string;
}

function createPadding(length: number, chars: string): string {
  if (chars === ' ') return ' '.repeat(length);
  return chars.repeat(Math.ceil(length / chars.length)).slice(0, length);
}

export function parseInt(string: string, radix: number = 10): number {
  return Number.parseInt(string, radix);
}

export function repeat(string: string = '', n: number = 1): string {
  return string.repeat(n);
}

export function replace(
  string: string = '',
  pattern: string | RegExp,
  replacement: string | ((substring: string, ...args: any[]) => string)
): string {
  return string.replace(pattern, replacement as any);
}

export function snakeCase(string: string = ''): string {
  return wordsCase(string)
    .map((w) => w.toLowerCase())
    .join('_');
}

export function split(
  string: string = '',
  separator: string | RegExp,
  limit?: number
): string[] {
  return string.split(separator, limit);
}

export function startCase(string: string = ''): string {
  return wordsCase(string)
    .map((w) => w[0]!.toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export function startsWith(
  string: string = '',
  target: string,
  position: number = 0
): boolean {
  return string.slice(position, position + target.length) === target;
}

export function toLower(string: string = ''): string {
  return string.toLowerCase();
}

export function toUpper(string: string = ''): string {
  return string.toUpperCase();
}

export function trim(string: string = '', chars?: string): string {
  if (!chars) return string.trim();
  const pattern = new RegExp(
    `^[${escapeRegExp(chars)}]+|[${escapeRegExp(chars)}]+$`,
    'g'
  );
  return string.replace(pattern, '');
}

export function trimEnd(string: string = '', chars?: string): string {
  if (!chars) return string.trimEnd();
  const pattern = new RegExp(`[${escapeRegExp(chars)}]+$`, 'g');
  return string.replace(pattern, '');
}

export function trimStart(string: string = '', chars?: string): string {
  if (!chars) return string.trimStart();
  const pattern = new RegExp(`^[${escapeRegExp(chars)}]+`, 'g');
  return string.replace(pattern, '');
}

export function truncate(
  string: string = '',
  options: {
    length?: number;
    omission?: string;
    separator?: string | RegExp;
  } = {}
): string {
  const { length = 30, omission = '...', separator } = options;
  if (string.length <= length) return string;
  let result = string.slice(0, length - omission.length);
  if (separator) {
    if (typeof separator === 'string') {
      const lastIdx = result.lastIndexOf(separator);
      if (lastIdx > 0) result = result.slice(0, lastIdx);
    } else {
      const match = result.match(separator);
      if (match && match.index !== undefined && match.index > 0) {
        result = result.slice(0, match.index);
      }
    }
  }
  return result + omission;
}

export function unescape(string: string = ''): string {
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x27;': "'",
  };
  return string.replace(
    /&(?:amp|lt|gt|quot|#39|#x27);/g,
    (entity) => htmlUnescapes[entity] || entity
  );
}

export function upperCase(string: string = ''): string {
  return wordsCase(string)
    .map((w) => w.toUpperCase())
    .join(' ');
}

export function upperFirst(string: string = ''): string {
  if (!string) return '';
  return string[0]!.toUpperCase() + string.slice(1);
}

export function words(string: string = '', pattern?: RegExp): string[] {
  if (pattern) {
    return string.match(pattern) || [];
  }
  return wordsCase(string);
}
