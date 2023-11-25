import { randomNumber } from '..';

describe('random', () => {
  it('randomNumber', () => {
    expect(randomNumber()).toBeLessThan(101);
  });
});
