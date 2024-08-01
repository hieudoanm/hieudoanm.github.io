import { render } from '@testing-library/react';
import { ChessOpenings } from './ChessOpenings';

describe('ChessOpenings', () => {
  test('render default', () => {
    const wrapper = render(<ChessOpenings />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
