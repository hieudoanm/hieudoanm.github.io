import { render } from '@testing-library/react';
import { Loading } from '..';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
}));

describe('Loading', () => {
  it('to match snapshot', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
