import { logger } from '..';

describe('logger', () => {
  it('info', () => {
    logger.fatal('fatal');
    logger.error('error');
    logger.warn('warn');
    logger.info('info');
    logger.debug('debug');
    logger.trace('trace');
  });
});
