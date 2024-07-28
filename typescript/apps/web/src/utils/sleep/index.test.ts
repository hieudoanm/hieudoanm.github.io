import { sleep } from '.';

describe('sleep', () => {
  it('should delay for 10s', async () => {
    await sleep(1 * 1000);
  }, 20000);
});
