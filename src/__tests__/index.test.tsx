import { HexagonPage } from '@hieudoanm/pages';
import { render } from '@testing-library/react';

describe('HexagonPage', () => {
  test('render default', () => {
    const wrapper = render(<HexagonPage />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
