import { render } from '@testing-library/react';
import { Layout } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
}));

describe('Layout', () => {
  it('to match snapshot', () => {
    const { container } = render(<Layout />);
    expect(container).toMatchSnapshot();
  });
});
