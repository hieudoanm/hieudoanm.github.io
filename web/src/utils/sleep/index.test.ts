import { sleep } from '.';

describe('sleep', () => {
  it('should delay for 10s', async () => {
    await sleep(10 * 1000);
  }, 20000);
});
