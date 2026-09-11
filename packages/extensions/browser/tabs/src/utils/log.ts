export type LogLevel = 'debug' | 'log' | 'info' | 'warn' | 'error';

export interface Logger {
  debug(...args: unknown[]): void;
  log(...args: unknown[]): void;
  info(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
}

const bindLevel = (
  level: LogLevel,
  prefix: string
): ((...args: unknown[]) => void) => {
  return (...args: unknown[]) => {
    if (prefix) {
      console[level](prefix, ...args);
    } else {
      console[level](...args);
    }
  };
};

export function createLogger(prefix: string): Logger {
  return {
    debug: bindLevel('debug', prefix),
    log: bindLevel('log', prefix),
    info: bindLevel('info', prefix),
    warn: bindLevel('warn', prefix),
    error: bindLevel('error', prefix),
  };
}
