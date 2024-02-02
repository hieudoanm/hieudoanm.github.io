import { NotFoundPage } from '@hieudoanm/pages/404';
import { render } from '@testing-library/react';

describe('NotFoundPage', () => {
  test('render default', () => {
    const wrapper = render(<NotFoundPage />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
