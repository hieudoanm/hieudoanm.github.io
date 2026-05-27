import * as tryCatchModule from '../src';

describe('try-catch package exports', () => {
  it('exports all expected functions', () => {
    expect(tryCatchModule.tryCatch).toBeDefined();
  });
});
