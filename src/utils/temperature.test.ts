import { ck, cf, fc, fk, kc, kf } from './temperature';

describe('celsius', () => {
  it('to fahrenheit', () => {
    expect(cf(1)).toEqual(33.8);
  });
  it('to kelvin', () => {
    expect(ck(1)).toEqual(274.15);
  });
});

describe('fahrenheit', () => {
  it('to celsius', () => {
    expect(fc(33.8)).toEqual(0.9999999999999984);
  });
  it('to kelvin', () => {
    expect(fk(33.8)).toEqual(274.15);
  });
});

describe('kelvin', () => {
  it('to celsius', () => {
    expect(kc(274.15)).toEqual(1);
  });
  it('to fahrenheit', () => {
    expect(kf(274.15)).toEqual(33.8);
  });
});
