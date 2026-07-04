import { createTryCatch, formatError } from '../try-catch';

describe('createTryCatch', () => {
  it('returns the result when fn succeeds', async () => {
    const onError = jest.fn();
    const tryCatch = createTryCatch(onError);

    const result = await tryCatch(() => Promise.resolve(42), 'do something');

    expect(result).toBe(42);
    expect(onError).not.toHaveBeenCalled();
  });

  it('calls onError and returns undefined when fn throws', async () => {
    const onError = jest.fn();
    const tryCatch = createTryCatch(onError);

    const result = await tryCatch(
      () => Promise.reject(new Error('boom')),
      'do something'
    );

    expect(result).toBeUndefined();
    expect(onError).toHaveBeenCalledWith({
      message: 'Failed to do something',
      detail: 'boom',
    });
  });

  it('handles non-Error throws', async () => {
    const onError = jest.fn();
    const tryCatch = createTryCatch(onError);

    const result = await tryCatch(
      () => Promise.reject('string error'),
      'process'
    );

    expect(result).toBeUndefined();
    expect(onError).toHaveBeenCalledWith({
      message: 'Failed to process',
      detail: 'string error',
    });
  });

  it('handles sync throws', async () => {
    const onError = jest.fn();
    const tryCatch = createTryCatch(onError);

    const result = await tryCatch(() => {
      throw new Error('sync error');
    }, 'sync task');

    expect(result).toBeUndefined();
    expect(onError).toHaveBeenCalledWith({
      message: 'Failed to sync task',
      detail: 'sync error',
    });
  });
});

describe('formatError', () => {
  it('formats an Error instance', () => {
    const result = formatError(new Error('test error'));
    expect(result.message).toBe('test error');
    expect(result.detail).toContain('test error');
  });

  it('formats a string', () => {
    const result = formatError('string error');
    expect(result.message).toBe('string error');
    expect(result.detail).toBeUndefined();
  });

  it('formats a number', () => {
    const result = formatError(404);
    expect(result.message).toBe('404');
    expect(result.detail).toBeUndefined();
  });
});
