import { NotFoundPage } from '@hieudoanm/pages/404';
import { render } from '@testing-library/react';

describe('NotFoundPage', () => {
  test('render default', () => {
    const { container } = render(<NotFoundPage />);
    expect(container).toMatchSnapshot();
  });
});
