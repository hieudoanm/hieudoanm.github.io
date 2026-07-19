import { createLogger } from './console';

describe('createLogger', () => {
  let consoleSpies: Record<string, jest.SpyInstance>;

  beforeEach(() => {
    consoleSpies = {
      debug: jest.spyOn(console, 'debug').mockImplementation(() => {}),
      info: jest.spyOn(console, 'info').mockImplementation(() => {}),
      warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
      error: jest.spyOn(console, 'error').mockImplementation(() => {}),
      table: jest.spyOn(console, 'table').mockImplementation(() => {}),
      group: jest.spyOn(console, 'group').mockImplementation(() => {}),
      groupCollapsed: jest
        .spyOn(console, 'groupCollapsed')
        .mockImplementation(() => {}),
      groupEnd: jest.spyOn(console, 'groupEnd').mockImplementation(() => {}),
      time: jest.spyOn(console, 'time').mockImplementation(() => {}),
      timeEnd: jest.spyOn(console, 'timeEnd').mockImplementation(() => {}),
      count: jest.spyOn(console, 'count').mockImplementation(() => {}),
      clear: jest.spyOn(console, 'clear').mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('basic logging', () => {
    it('should log info', () => {
      const logger = createLogger();
      logger.info('hello');

      expect(consoleSpies.info).toHaveBeenCalledTimes(1);
    });

    it('should respect minLevel', () => {
      const logger = createLogger({ minLevel: 'warn' });

      logger.debug('debug');
      logger.info('info');
      logger.warn('warn');

      expect(consoleSpies.debug).not.toHaveBeenCalled();
      expect(consoleSpies.info).not.toHaveBeenCalled();
      expect(consoleSpies.warn).toHaveBeenCalled();
    });

    it('should not log when disabled', () => {
      const logger = createLogger({ enabled: false });

      logger.error('error');

      expect(consoleSpies.error).not.toHaveBeenCalled();
    });
  });

  describe('scope', () => {
    it('should apply scope via withScope', () => {
      const logger = createLogger();
      const scoped = logger.withScope('Auth');

      scoped.info('message');

      expect(consoleSpies.info).toHaveBeenCalledTimes(1);
    });
  });

  describe('group', () => {
    it('should open and close group', () => {
      const logger = createLogger();

      logger.group('Test', (log) => {
        log.info('inside');
      });

      expect(consoleSpies.group).toHaveBeenCalledWith('Test');
      expect(consoleSpies.groupEnd).toHaveBeenCalled();
    });

    it('should use collapsed group', () => {
      const logger = createLogger();

      logger.group('Collapsed', () => {}, true);

      expect(consoleSpies.groupCollapsed).toHaveBeenCalledWith('Collapsed');
      expect(consoleSpies.groupEnd).toHaveBeenCalled();
    });
  });

  describe('table', () => {
    it('should call console.table', () => {
      const logger = createLogger();

      logger.table([{ id: 1 }]);

      expect(consoleSpies.table).toHaveBeenCalled();
    });
  });

  describe('time utilities', () => {
    it('should call console.time and timeEnd', () => {
      const logger = createLogger();

      logger.time('test');
      logger.timeEnd('test');

      expect(consoleSpies.time).toHaveBeenCalledWith('test');
      expect(consoleSpies.timeEnd).toHaveBeenCalledWith('test');
    });
  });

  describe('count and clear', () => {
    it('should call console.count', () => {
      const logger = createLogger();

      logger.count('counter');

      expect(consoleSpies.count).toHaveBeenCalledWith('counter');
    });

    it('should call console.clear', () => {
      const logger = createLogger();

      logger.clear();

      expect(consoleSpies.clear).toHaveBeenCalled();
    });
  });

  describe('timestamp option', () => {
    it('should include timestamp when enabled', () => {
      const logger = createLogger({ showTimestamp: true });

      logger.info('timestamp test');

      const callArgs = consoleSpies.info?.mock.calls[0][0];
      expect(callArgs).toContain('INFO');
    });

    it('should still log without timestamp', () => {
      const logger = createLogger({ showTimestamp: false });

      logger.info('no timestamp');

      expect(consoleSpies.info).toHaveBeenCalled();
    });
  });
});
