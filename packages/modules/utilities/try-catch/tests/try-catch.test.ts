import { tryCatch } from '../src';

describe('tryCatch', () => {
  it('returns data and null error when promise resolves', async () => {
    const promise = Promise.resolve('success');
    const result = await tryCatch(promise);

    expect(result.data).toBe('success');
    expect(result.error).toBeNull();
  });

  it('returns null data and error when promise rejects', async () => {
    const error = new Error('failure');
    const promise = Promise.reject(error);
    const result = await tryCatch(promise);

    expect(result.data).toBeNull();
    expect(result.error).toBe(error);
  });

  it('handles generic types for data', async () => {
    const promise = Promise.resolve({ id: 1, name: 'Test' });
    const result = await tryCatch<{ id: number; name: string }>(promise);

    if (result.error === null) {
      expect(result.data.id).toBe(1);
      expect(result.data.name).toBe('Test');
    }
  });

  it('handles custom error types', async () => {
    class CustomError extends Error {
      code = 500;
    }
    const error = new CustomError('custom error');
    const promise = Promise.reject(error);
    const result = await tryCatch<string, CustomError>(promise);

    if (result.error !== null) {
      expect(result.error.code).toBe(500);
      expect(result.error.message).toBe('custom error');
    }
  });
});
