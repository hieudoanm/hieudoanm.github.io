import { ErrorPage } from '@hieudoanm/pages/500';
import { render } from '@testing-library/react';

describe('ErrorPage', () => {
  test('render default', () => {
    const wrapper = render(<ErrorPage />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
