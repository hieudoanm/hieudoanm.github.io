import { addZero } from '..';

describe('addZero', () => {
  it('add 1 zero', () => {
    expect(addZero(9)).toEqual('09');
    expect(addZero(10)).toEqual('10');
  });

  it('add 2 zero', () => {
    expect(addZero(9, 2)).toEqual('009');
    expect(addZero(10, 2)).toEqual('010');
  });

  it('add 1 zero for -1', () => {
    expect(addZero(9, -1)).toEqual('9');
    expect(addZero(10, -1)).toEqual('10');
  });
});
