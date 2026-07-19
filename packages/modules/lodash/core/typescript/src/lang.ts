/* eslint-disable @typescript-eslint/no-explicit-any */

export function clone<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return [...value] as unknown as T;
  return { ...value } as T;
}

export function cloneDeep<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value;
  if (value instanceof Date) return new Date(value.getTime()) as T;
  if (value instanceof RegExp)
    return new RegExp(value.source, value.flags) as T;
  if (Array.isArray(value))
    return value.map((item) => cloneDeep(item)) as unknown as T;
  const result: Record<string, any> = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = cloneDeep((value as Record<string, any>)[key]);
    }
  }
  return result as T;
}

export function eq(value: any, other: any): boolean {
  return value === other || (value !== value && other !== other);
}

export function gt(value: any, other: any): boolean {
  return value > other;
}

export function gte(value: any, other: any): boolean {
  return value >= other;
}

export function isArguments(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Arguments]';
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

export function isDate(value: any): value is Date {
  return value instanceof Date;
}

export function isElement(value: any): boolean {
  return value !== null && typeof value === 'object' && value.nodeType === 1;
}

export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value) || typeof value === 'string')
    return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return true;
}

export function isEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  if (a == null || b == null) return a === b;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object') return a === b;
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (a instanceof RegExp && b instanceof RegExp)
    return a.toString() === b.toString();
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!isEqual(a[key], b[key])) return false;
  }
  return true;
}

export function isError(value: any): value is Error {
  return value instanceof Error;
}

export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function isInteger(value: any): value is number {
  return Number.isInteger(value);
}

export function isLength(value: any): boolean {
  return Number.isInteger(value) && value >= 0;
}

export function isMap(value: any): value is Map<any, any> {
  return value instanceof Map;
}

export function isNaN(value: any): boolean {
  return Number.isNaN(value);
}

export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined;
}

export function isNull(value: any): value is null {
  return value === null;
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isObject(value: any): value is object {
  return (
    value !== null && (typeof value === 'object' || typeof value === 'function')
  );
}

export function isObjectLike(value: any): value is object {
  return value !== null && typeof value === 'object';
}

export function isPlainObject(value: any): boolean {
  if (value === null || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

export function isRegExp(value: any): value is RegExp {
  return value instanceof RegExp;
}

export function isSet(value: any): value is Set<any> {
  return value instanceof Set;
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isSymbol(value: any): value is symbol {
  return typeof value === 'symbol';
}

export function isUndefined(value: any): value is undefined {
  return value === undefined;
}

export function lt(value: any, other: any): boolean {
  return value < other;
}

export function lte(value: any, other: any): boolean {
  return value <= other;
}

export function toArray<T>(value: T | T[]): T[] {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return value.split('') as unknown as T[];
  if (typeof value === 'object') return Object.values(value) as T[];
  return [];
}

export function toFinite(value: any): number {
  const num = Number(value);
  if (isNaN(num)) return 0;
  if (num === Infinity || num === -Infinity) {
    return num > 0 ? Number.MAX_VALUE : -Number.MAX_VALUE;
  }
  return num;
}

export function toInteger(value: any): number {
  return Math.floor(toFinite(value));
}

export function toNumber(value: any): number {
  return Number(value);
}

export function toString(value: any): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  return String(value);
}
