import { validate } from './validate';

describe('validate', () => {
  it('should be valid image', () => {
    expect(validate('https://www.instagram.com/p/C578i4-tkI4/')).toBeTruthy();
  });
});
