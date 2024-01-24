import { render } from '@testing-library/react';
import Container from '..';

describe('Container', () => {
  test('render default', () => {
    const wrapper = render(<Container>Container</Container>);
    expect(wrapper.container).toMatchSnapshot();
  });
});
