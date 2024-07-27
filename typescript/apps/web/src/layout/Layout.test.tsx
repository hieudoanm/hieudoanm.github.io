import { render } from '@testing-library/react';
import { Layout } from '.';

describe('Layout', () => {
  it('to match snapshot', () => {
    const { container } = render(<Layout />);
    expect(container).toMatchSnapshot();
  });
});
