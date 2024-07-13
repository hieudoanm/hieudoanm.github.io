import { addZero, formatNumber } from './number';

describe('formatNumber', () => {
  it('should format number', () => {
    expect(formatNumber(1234)).toEqual('1,234');
  });
});

describe('addZero', () => {
  it('to match number', () => {
    expect(addZero(9)).toEqual('09');
    expect(addZero(10)).toEqual('10');
  });
});
