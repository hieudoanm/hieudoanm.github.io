import { render } from '@testing-library/react';
import { Articles } from './News';

describe('Articles', () => {
  test('render default', () => {
    const wrapper = render(<Articles articles={[]} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
