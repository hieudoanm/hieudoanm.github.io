import AppsPage from '@hieudoanm/pages/apps';
import { render } from '@testing-library/react';

describe('AppsPage', () => {
  test('render default', () => {
    const { container } = render(<AppsPage />);
    expect(container).toMatchSnapshot();
  });
});
