import { render } from '@testing-library/react';
import { NavbarColors } from './NavbarColors';

describe('NavbarColors', () => {
  it('to match snapshot', () => {
    const { container } = render(<NavbarColors />);
    expect(container).toMatchSnapshot();
  });
});
