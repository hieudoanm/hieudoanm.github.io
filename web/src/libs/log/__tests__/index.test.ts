import { log } from '..';

describe('log', () => {
  it('info', () => {
    log.info('info');
  });

  it('error', () => {
    log.error('error');
  });

  it('warn', () => {
    log.warn('warn');
  });

  it('debug', () => {
    log.debug('debug');
  });

  it('fatal', () => {
    log.fatal('fatal');
  });

  it('trace', () => {
    log.trace('trace');
  });
});
