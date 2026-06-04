import { base } from '../base';

describe('base', () => {
  it('converts decimal to binary', () => {
    expect(base(10).from(10).to(2)).toBe('1010');
  });

  it('converts decimal to hex', () => {
    expect(base(255).from(10).to(16)).toBe('FF');
  });

  it('converts binary to decimal', () => {
    expect(base('1010').from(2).to(10)).toBe('10');
  });

  it('converts hex to decimal', () => {
    expect(base('FF').from(16).to(10)).toBe('255');
  });

  it('converts decimal to octal', () => {
    expect(base(8).from(10).to(8)).toBe('10');
  });

  it('returns error for invalid number', () => {
    expect(base('XYZ').from(10).to(2)).toBe('Invalid number or base');
  });
});
