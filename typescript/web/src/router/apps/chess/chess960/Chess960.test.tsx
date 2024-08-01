import { render } from '@testing-library/react';
import { Chess960 } from './Chess960';

describe('Chess960', () => {
  test('render default', () => {
    const wrapper = render(<Chess960 />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
