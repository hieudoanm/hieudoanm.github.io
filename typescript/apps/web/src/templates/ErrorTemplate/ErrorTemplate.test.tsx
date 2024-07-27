import { ErrorRoute } from './ErrorTemplate';
import { render } from '@testing-library/react';

describe('ErrorRoute', () => {
  test('to match snapshot', () => {
    const { container } = render(<ErrorRoute />);
    expect(container).toMatchSnapshot();
  });
});
