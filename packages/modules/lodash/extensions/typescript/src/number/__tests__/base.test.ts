import { convertBase } from '../base';

describe('convertBase', () => {
  it('converts decimal to binary', () => {
    expect(convertBase(10).from(10).to(2)).toBe('1010');
  });

  it('converts decimal to hex', () => {
    expect(convertBase(255).from(10).to(16)).toBe('FF');
  });

  it('converts binary to decimal', () => {
    expect(convertBase('1010').from(2).to(10)).toBe('10');
  });

  it('converts hex to decimal', () => {
    expect(convertBase('FF').from(16).to(10)).toBe('255');
  });

  it('converts decimal to octal', () => {
    expect(convertBase(8).from(10).to(8)).toBe('10');
  });

  it('returns error for invalid number', () => {
    expect(convertBase('XYZ').from(10).to(2)).toBe('Invalid number or base');
  });
});
