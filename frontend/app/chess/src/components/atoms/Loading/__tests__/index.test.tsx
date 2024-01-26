import { render } from '@testing-library/react';
import { Loading } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
  usePathname: jest.fn().mockResolvedValue(''),
  useSearchParams: jest.fn().mockResolvedValue(new URLSearchParams()),
}));

describe('Loading', () => {
  it('to match snapshot', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
