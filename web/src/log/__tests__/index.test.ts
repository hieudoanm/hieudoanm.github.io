import { logger } from '..';

describe('log', () => {
  it('info', () => {
    logger.info('info');
  });

  it('error', () => {
    logger.error('error');
  });

  it('warn', () => {
    logger.warn('warn');
  });

  it('debug', () => {
    logger.debug('debug');
  });

  it('fatal', () => {
    logger.fatal('fatal');
  });

  it('trace', () => {
    logger.trace('trace');
  });
});
