import { HexagonPage } from '@hieudoanm/pages/animation/hexagon';
import { render } from '@testing-library/react';

describe('HexagonPage', () => {
  test('render default', () => {
    const wrapper = render(<HexagonPage />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
