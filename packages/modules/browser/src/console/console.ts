type Level = 'debug' | 'info' | 'warn' | 'error';

type LevelPriority = Record<Level, number>;
type StyleMap = Record<Level, string>;

interface Options {
  enabled?: boolean;
  showTimestamp?: boolean;
  minLevel?: Level;
  styles?: Partial<StyleMap>;
  scope?: string;
}

const LEVEL_PRIORITY: LevelPriority = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const DEFAULT_STYLES: StyleMap = {
  debug: 'background:#4b5563;color:white;padding:2px 6px;border-radius:4px;',
  info: 'background:#2563eb;color:white;padding:2px 6px;border-radius:4px;',
  warn: 'background:#f59e0b;color:black;padding:2px 6px;border-radius:4px;',
  error: 'background:#dc2626;color:white;padding:2px 6px;border-radius:4px;',
};

/* =========================================
   Logger Type (NO circular reference)
   ========================================= */

export type Logger = {
  info: (message?: string, ...data: unknown[]) => void;
  warn: (message?: string, ...data: unknown[]) => void;
  error: (message?: string, ...data: unknown[]) => void;
  debug: (message?: string, ...data: unknown[]) => void;

  table: (data: unknown, columns?: string[]) => void;

  group: (
    label: string,
    callback: (logger: Logger) => void,
    collapsed?: boolean
  ) => void;

  time: (label: string) => void;
  timeEnd: (label: string) => void;
  count: (label: string) => void;
  clear: () => void;

  withScope: (scope: string) => Logger;
};

/* =========================================
   Factory
   ========================================= */

export const createLogger = (userOptions: Options = {}): Logger => {
  const options: Required<Options> = {
    enabled: userOptions.enabled ?? true,
    showTimestamp: userOptions.showTimestamp ?? true,
    minLevel: userOptions.minLevel ?? 'debug',
    styles: { ...DEFAULT_STYLES, ...userOptions.styles },
    scope: userOptions.scope ?? '',
  };

  const shouldPrint = (level: Level): boolean =>
    options.enabled &&
    LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[options.minLevel];

  const format = (level: Level, message?: string) => {
    const parts: string[] = [];
    const styles: string[] = [];

    parts.push(`%c ${level.toUpperCase()} `);
    styles.push(options.styles[level] ?? '');

    if (options.scope) {
      parts.push(`%c ${options.scope} `);
      styles.push(
        'background:#111827;color:white;padding:2px 6px;border-radius:4px;'
      );
    }

    if (options.showTimestamp) {
      parts.push(`%c ${new Date().toISOString()} `);
      styles.push('color:#6b7280;');
    }

    parts.push(`%c ${message ?? ''}`);
    styles.push('color:inherit;');

    return { text: parts.join(''), styles };
  };

  const print = (level: Level, message?: string, ...data: unknown[]): void => {
    if (!shouldPrint(level)) return;

    const method = console[level].bind(console);
    const { text, styles } = format(level, message);

    method(text, ...styles, ...data);
  };

  const api: Logger = {
    info: (message?: string, ...data: unknown[]) =>
      print('info', message, ...data),

    warn: (message?: string, ...data: unknown[]) =>
      print('warn', message, ...data),

    error: (message?: string, ...data: unknown[]) =>
      print('error', message, ...data),

    debug: (message?: string, ...data: unknown[]) =>
      print('debug', message, ...data),

    table: (data: unknown, columns?: string[]) => {
      if (!options.enabled) return;
      console.table(data, columns);
    },

    group: (
      label: string,
      callback: (logger: Logger) => void,
      collapsed = false
    ) => {
      if (!options.enabled) return;

      if (collapsed) {
        console.groupCollapsed(label);
      } else {
        console.group(label);
      }

      try {
        callback(api);
      } finally {
        console.groupEnd();
      }
    },

    time: (label: string) => {
      if (!options.enabled) return;
      console.time(label);
    },

    timeEnd: (label: string) => {
      if (!options.enabled) return;
      console.timeEnd(label);
    },

    count: (label: string) => {
      if (!options.enabled) return;
      console.count(label);
    },

    clear: () => {
      if (!options.enabled) return;
      console.clear();
    },

    withScope: (scope: string): Logger => createLogger({ ...options, scope }),
  };

  return api;
};
