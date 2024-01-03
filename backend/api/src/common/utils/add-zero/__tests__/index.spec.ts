import { addZero } from '..';

describe('addZero', () => {
  it('should call status and json', () => {
    expect(addZero(9)).toEqual('09');
    expect(addZero(10)).toEqual('10');
  });
});
