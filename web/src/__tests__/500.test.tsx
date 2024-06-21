import { InternalServerErrorPage } from '@web/pages/500';
import { render } from '@testing-library/react';

describe('InternalServerErrorPage', () => {
  test('render default', () => {
    const { container } = render(<InternalServerErrorPage />);
    expect(container).toMatchSnapshot();
  });
});
