export type DynamicVarResolver = (name: string) => string | undefined;

export interface DynamicVarValue {
  name: string;
  value: string;
  builtin: boolean;
}

const PATTERN = /\$\{([a-zA-Z0-9_.]+)\}/g;

function randomId(): string {
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function randomGuid(): string {
  const hex = () =>
    Math.floor(Math.random() * 0x10000)
      .toString(16)
      .padStart(4, '0');
  return `${hex()}${hex()}-${hex()}-${hex()}-${hex()}-${hex()}${hex()}${hex()}`;
}

function createBuiltins(): Record<string, () => string> {
  return {
    randomId,
    randomGuid,
    timestamp: () => String(Date.now()),
    currentTime: () => String(Date.now()),
    isoTimestamp: () => new Date().toISOString(),
    currentYear: () => String(new Date().getFullYear()),
  };
}

function builtinValue(name: string): string | undefined {
  const fn = createBuiltins()[name];
  return fn ? fn() : undefined;
}

export function expandDynamicVars(
  input: string,
  resolve: DynamicVarResolver
): string {
  if (!input || !input.includes('${')) return input;
  return input.replace(PATTERN, (whole, name: string) => {
    const fromUser = resolve(name);
    if (fromUser !== undefined) return fromUser;
    const fromBuiltin = builtinValue(name);
    if (fromBuiltin !== undefined) return fromBuiltin;
    return whole;
  });
}

export function listDynamicVars(
  input: string
): Array<{ name: string; ref: string }> {
  if (!input || !input.includes('${')) return [];
  const found: Array<{ name: string; ref: string }> = [];
  const seen = new Set<string>();
  let match: RegExpExecArray | null;
  const regex = new RegExp(PATTERN.source, 'g');
  while ((match = regex.exec(input)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      found.push({ name: match[1], ref: match[0] });
    }
  }
  return found;
}

export const BUILTIN_VAR_NAMES = Object.keys(createBuiltins());
