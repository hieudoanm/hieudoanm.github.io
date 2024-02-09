import { render } from '@testing-library/react';
import { Navbar } from '..';

describe('Navbar', () => {
  test('render default', () => {
    const wrapper = render(<Navbar />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
