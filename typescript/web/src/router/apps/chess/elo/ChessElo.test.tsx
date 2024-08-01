import { render } from '@testing-library/react';
import { ChessElo } from './ChessElo';

describe('ChessElo', () => {
  test('render default', () => {
    const wrapper = render(<ChessElo />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
