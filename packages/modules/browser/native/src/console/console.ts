type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  level?: LogLevel;
  timestamp?: boolean;
  scope?: string;
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
   Logger factory
   ========================= */

export const createLogger = (config: LoggerConfig = {}) => {
  const level = config.level ?? 'info';
  const timestamp = config.timestamp ?? true;
  const scope = config.scope ?? '';

  const shouldLog = (msgLevel: LogLevel) =>
    levelOrder[msgLevel] >= levelOrder[level];

  /* =========================
     Core formatter
     ========================= */

  const formatNode = (msgLevel: LogLevel, message: string): string => {
    const time = timestamp ? `[${new Date().toISOString()}] ` : '';
    const scopeStr = scope ? `[${scope}] ` : '';

    return `${nodeColors[msgLevel]}${time}${scopeStr}${msgLevel.toUpperCase()}: ${message}${reset}`;
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

    if (timestamp) {
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
      console.log(text, ...styles, ...data);
    } else {
      console.log(formatNode(msgLevel, message), ...data);
    }
  };

  /* =========================
     API
     ========================= */

  return {
    debug: (msg: string, ...data: unknown[]) => log('debug', msg, ...data),

    info: (msg: string, ...data: unknown[]) => log('info', msg, ...data),

    warn: (msg: string, ...data: unknown[]) => log('warn', msg, ...data),

    error: (msg: string, ...data: unknown[]) => log('error', msg, ...data),

    /* useful extras */
    group: (label: string, fn: () => void) => {
      if (isBrowser) {
        console.group(label);
        fn();
        console.groupEnd();
      } else {
        console.log(`\n=== ${label} ===`);
        fn();
        console.log(`=== /${label} ===\n`);
      }
    },

    time: (label: string) => console.time(label),
    timeEnd: (label: string) => console.timeEnd(label),
    table: (data: unknown) => console.table(data),
    clear: () => console.clear(),

    withScope: (newScope: string) =>
      createLogger({ ...config, scope: newScope }),
  };
};
