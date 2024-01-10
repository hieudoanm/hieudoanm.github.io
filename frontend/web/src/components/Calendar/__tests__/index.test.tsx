import { render } from '@testing-library/react';
import { Calendar } from '..';

describe('Calendar', () => {
  test('render default', () => {
    const wrapper = render(<Calendar year={1995} month={12} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
