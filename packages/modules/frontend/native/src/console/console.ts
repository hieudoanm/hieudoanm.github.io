type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  minLevel?: LogLevel;
  showTimestamp?: boolean;
  scope?: string;
  enabled?: boolean;
}

export interface Logger {
  debug: (msg: string, ...data: unknown[]) => void;
  info: (msg: string, ...data: unknown[]) => void;
  warn: (msg: string, ...data: unknown[]) => void;
  error: (msg: string, ...data: unknown[]) => void;
  group: (
    label: string,
    fn: (log: Logger) => void,
    collapsed?: boolean
  ) => void;
  time: (label: string) => void;
  timeEnd: (label: string) => void;
  table: (data: unknown) => void;
  count: (label: string) => void;
  clear: () => void;
  withScope: (newScope: string) => Logger;
}

/* =========================
   Level priority
   ========================= */

const levelOrder: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/* =========================
   Detect environment
   ========================= */

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

/* =========================
   Node colors (ANSI)
   ========================= */

const nodeColors: Record<LogLevel, string> = {
  debug: '\x1b[36m',
  info: '\x1b[32m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
};

const reset = '\x1b[0m';

/* =========================
   Browser styles
   ========================= */

const browserStyles: Record<LogLevel, string> = {
  debug: 'background:#4b5563;color:white;padding:2px 6px;border-radius:4px;',
  info: 'background:#2563eb;color:white;padding:2px 6px;border-radius:4px;',
  warn: 'background:#f59e0b;color:black;padding:2px 6px;border-radius:4px;',
  error: 'background:#dc2626;color:white;padding:2px 6px;border-radius:4px;',
};

/* =========================
   Console method map
   ========================= */

const consoleMethods: Record<LogLevel, 'debug' | 'info' | 'warn' | 'error'> = {
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
};

/* =========================
   Logger factory
   ========================= */

export const createLogger = (config: LoggerConfig = {}) => {
  const minLevel = config.minLevel ?? 'info';
  const showTimestamp = config.showTimestamp ?? true;
  const scope = config.scope ?? '';
  const enabled = config.enabled ?? true;

  const shouldLog = (msgLevel: LogLevel) =>
    enabled && levelOrder[msgLevel] >= levelOrder[minLevel];

  /* =========================
     Core formatter
     ========================= */

  const formatNode = (msgLevel: LogLevel, message: string): string => {
    const time = showTimestamp ? `${new Date().toISOString()}  ` : '';
    const scopeStr = scope ? `${scope}  ` : '';

    return `${nodeColors[msgLevel]} ${msgLevel.toUpperCase()}  ${scopeStr}${time}${message}${reset}`;
  };

  const formatBrowser = (msgLevel: LogLevel, message: string) => {
    const parts: string[] = [];
    const styles: string[] = [];

    parts.push(`%c ${msgLevel.toUpperCase()} `);
    styles.push(browserStyles[msgLevel]);

    if (scope) {
      parts.push(`%c ${scope} `);
      styles.push(
        'background:#111827;color:white;padding:2px 6px;border-radius:4px;'
      );
    }

    if (showTimestamp) {
      parts.push(`%c ${new Date().toISOString()} `);
      styles.push('color:#6b7280;');
    }

    parts.push(`%c ${message}`);
    styles.push('color:inherit;');

    return {
      text: parts.join(''),
      styles,
    };
  };

  /* =========================
     Logger core
     ========================= */

  const log = (msgLevel: LogLevel, message: string, ...data: unknown[]) => {
    if (!shouldLog(msgLevel)) return;

    if (isBrowser) {
      const { text, styles } = formatBrowser(msgLevel, message);
      console[consoleMethods[msgLevel]](text, ...styles, ...data);
    } else {
      console[consoleMethods[msgLevel]](formatNode(msgLevel, message), ...data);
    }
  };

  /* =========================
     API
     ========================= */

  const logger: Logger = {
    debug: (msg: string, ...data: unknown[]) => log('debug', msg, ...data),

    info: (msg: string, ...data: unknown[]) => log('info', msg, ...data),

    warn: (msg: string, ...data: unknown[]) => log('warn', msg, ...data),

    error: (msg: string, ...data: unknown[]) => log('error', msg, ...data),

    /* useful extras */
    group: (label: string, fn: (log: Logger) => void, collapsed = false) => {
      if (collapsed) {
        console.groupCollapsed(label);
      } else {
        console.group(label);
      }
      fn(logger);
      console.groupEnd();
    },

    time: (label: string) => console.time(label),
    timeEnd: (label: string) => console.timeEnd(label),
    table: (data: unknown) => console.table(data),
    count: (label: string) => console.count(label),
    clear: () => console.clear(),

    withScope: (newScope: string) =>
      createLogger({ ...config, scope: newScope }),
  };

  return logger;
};
