import { render } from '@testing-library/react';
import { ChessClock } from './CheckClock';

describe('ChessClock', () => {
  test('render default', () => {
    const wrapper = render(<ChessClock />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
