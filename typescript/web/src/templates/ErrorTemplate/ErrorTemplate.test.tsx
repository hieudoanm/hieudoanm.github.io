import { ErrorTemplate } from './ErrorTemplate';
import { render } from '@testing-library/react';

describe('ErrorTemplate', () => {
  test('to match snapshot', () => {
    const { container } = render(<ErrorTemplate />);
    expect(container).toMatchSnapshot();
  });
});
