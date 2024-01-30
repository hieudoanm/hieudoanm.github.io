import { addZero } from '..';

describe('addZero', () => {
  it('for single number', () => {
    expect(addZero(9)).toEqual('09');
  });

  it('for double number', () => {
    expect(addZero(10)).toEqual('10');
  });
});
