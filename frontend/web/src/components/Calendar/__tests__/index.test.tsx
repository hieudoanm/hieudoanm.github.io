import { render } from '@testing-library/react';
import { Calendar } from '..';

describe('Calendar', () => {
  test('render default', () => {
    const wrapper = render(<Calendar />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
